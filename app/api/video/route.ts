import db from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { success } from "zod";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const database = await db();
        const collection = database.collection("clips");

        const result = await collection.insertOne(body);

        return NextResponse.json(
            { success: true, insertedId: result.insertedId },
            { status: 201 }
        );
    } catch(err) {
        return NextResponse.json(
            { success: false, error: err },
            { status: 500 }
        );
    }
}

// TODO: Create logger
