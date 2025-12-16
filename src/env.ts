import { z } from 'zod'

const schema = z.object({
    ARCJET_KEY: z.string(),
    MONGODB_URI: z.string(),
    MONGODB_DB_NAME: z.string(),
    CLERK_SECRET_KEY: z.string(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string()
});

const env = schema.parse({
    ARCJET_KEY: process.env.ARCJET_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
});

export const ARCJET_KEY = env.ARCJET_KEY;
export const MONGODB_URI = env.MONGODB_URI;
export const MONGODB_DB_NAME = env.MONGODB_DB_NAME;
export const CLERK_SECRET_KEY = env.CLERK_SECRET_KEY;
export const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;