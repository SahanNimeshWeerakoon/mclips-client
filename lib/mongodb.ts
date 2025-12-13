import { MongoClient } from "mongodb"; 
import { MONGODB_URI } from '@/src/env'

let client;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined
}
console.log("MONGODB_URI", MONGODB_URI);
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

const db = async () => {
    const client = await clientPromise;
    return client.db();
}

export default db;