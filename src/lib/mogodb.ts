import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

let cachedDb: Db | null = null;

export async function dbConnect(): Promise<Db> {
    if(cachedDb) return cachedDb;

    await client.connect();

    cachedDb = client.db(process.env.MONGODB_DB_NAME!);
    return cachedDb;
}