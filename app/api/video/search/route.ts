import db from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const database = await db();
        const collection = database.collection("clips");
        const clips = await collection.find({}).toArray();

        return NextResponse.json(
            {success: true, data: clips },
            { status: 200 } );
    } catch(err) {
        return NextResponse.json(
            { success: false, error: err },
            { status: 500 }
        );
    }
}
