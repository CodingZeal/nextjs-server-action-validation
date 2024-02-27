import { sql } from "@vercel/postgres";

type ValidFormData = {
  name: string;
  email: string;
  message: string;
};

export const createRow = async (data: ValidFormData) => {
  try {
    await sql`INSERT INTO "messages" (name, email, message) VALUES (${data.name}, ${data.email}, ${data.message});`;
    console.log("Successfully added row in messages table");
    return;
  } catch (error) {
    throw new Error(`Yikes! We ran into an error: ${error}`);
  }
};
