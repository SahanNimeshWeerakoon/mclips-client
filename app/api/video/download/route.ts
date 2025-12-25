import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function GET(request: Request) {
    const { key } = Object.fromEntries(new URL(request.url).searchParams) as { key: string };
    if(!key) return NextResponse.json({ success: false, message: "Key missing" }, { status: 400 });

    const decodedKey = decodeURIComponent(key);


    const command = new GetObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: decodedKey });
    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

    return NextResponse.json({ success: true, data: url }, { status: 200 });
}