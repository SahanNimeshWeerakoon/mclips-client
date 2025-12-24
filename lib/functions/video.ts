import db from '@/lib/mongodb'
import { ObjectId } from 'mongodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

export async function increaseVideoDownloadCountByOne(id: string) {
    const database = await db();
    const videos = database.collection("videos");
    const result = await videos.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { downloadCount: 1 } },
        { returnDocument: "after" }
    );

    return result;
}

export async function increaseUserDownloadCountByOne(userIp: string) {
    const database = await db();
    const users = database.collection("users");
    const result = await users.findOneAndUpdate(
        { userId: new ObjectId(userIp) },
        { $inc: { downloadCount: 1 } },
        { returnDocument: "after" }
    );
    return result;
}

export async function getUploadSignedUrl(fileName: string, fileType: string) {
    try {
        const key = `videos/${Date.now()}_${fileName}`;
    
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: key,
            ContentType: fileType,
        });
    
        const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    
    
        return { uploadUrl, key };
    } catch(err) {
        throw {message: "Error in saving video", from: "lib/functions/video.ts=>getUploadSignedUrl", err};
    }
}

export async function uploadToS3(uploadUrl: string, video: any) {
    try {
        const res = await fetch(uploadUrl, {
            method: "PUT",
            body: video,
            headers: { "Content-Type": video.type }
        });

        return res;
    } catch(err) {
        throw {message: "Error in uploading video", from: "lib/functions/video.ts=>uploadToS3", err};
    }
}

export async function createVideoRecordInMongo(key: string, name: string, genres: string, description: string, thumbnailKey: string) {
    try {
        const database = await db();
        const result = await database.collection("videos").insertOne({
            key,
            name,
            genres,
            description,
            thumbnailKey,
            viewCount: 0,
            downloadCount: 0,
            createdAt: new Date(),
        });
    
        return result;
    } catch(err) {
        throw {message: "Error in saving video data", from: "lib/functions/video.ts=>createVideoRecordInMongo", err};
    }
}