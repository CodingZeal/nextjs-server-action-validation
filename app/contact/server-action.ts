"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createTableIfNotExists } from "./create-table-action";
import { createRow } from "./create-row-action";

const MIN = 20;
const MAX = 500;

const schema = z.object({
  name: z.string().min(1, "Name cannot be blank"),
  email: z.string().email().min(1, "Email cannot be blank"),
  message: z.string().max(MAX).min(MIN),
});

export default async function contactAction(_prevState: any, params: FormData) {
  const validation = schema.safeParse({
    name: params.get("name"),
    email: params.get("email"),
    message: params.get("message"),
  });

  if (validation.success) {
    await createTableIfNotExists().then(() => createRow(validation.data));
    redirect("/");
  } else {
    return {
      errors: validation.error.issues,
    };
  }
}

export const getConfig = async () => {
  return {
    message: {
      min: MIN,
      max: MAX,
    },
  };
};
