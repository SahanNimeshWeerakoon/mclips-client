import db from '@/lib/mongodb'
import { ObjectId } from 'mongodb';

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
