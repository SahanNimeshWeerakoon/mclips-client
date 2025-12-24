import db from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const database = await db();
        const collection = database.collection("videos");
        const videos = await collection.find({}).toArray();

        return NextResponse.json(
            {success: true, data: videos },
            { status: 200 } );
    } catch(err) {
        return NextResponse.json(
            { success: false, error: err },
            { status: 500 }
        );
    }
}
