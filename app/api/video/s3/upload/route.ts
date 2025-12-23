import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

export async function POST(request: Request) {
    const { fileName, fileType } = await request.json();
    const key = `videos/${Date.now()}_${fileName}`;

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return NextResponse.json({ uploadUrl, key });

}