import { sql } from "@vercel/postgres";

export const createTableIfNotExists = async () => {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
    await sql`CREATE TABLE IF NOT EXISTS "messages" (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(250), email VARCHAR(250), message VARCHAR(250), created_at timestamp DEFAULT now() NOT NULL);`;
    console.log("Successfully initialized the messages table");
    return;
  } catch (error) {
    throw new Error(`Yikes! We ran into an error: ${error}`);
  }
};
