import db from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url);
        const keyword = searchParams.get("keyword") || "";
        let genres: string | string[] = searchParams.get("genres") || "";

        genres = genres ? genres.split(",") : [];
        
        const database = await db();
        const collection = database.collection("videos");

        const query: any = {};

        if(keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }

        if(genres.length) {
            const combinedGenres = genres.map(genre => ({ genres: { $regex: genre, $options: "i" } }));

            if(query.$or) {
                query.$and = [
                    { $or: query.$or },
                    { $or: combinedGenres }
                ];
                delete query.$or;
            } else {
                query.$or = combinedGenres;
            }
        }

        const videos = await collection.find(query).toArray();

        return NextResponse.json(
            {success: true, data: videos },
            { status: 200 }
        );
    } catch(err) {
        return NextResponse.json(
            { success: false, error: err },
            { status: 500 }
        );
    }
}
