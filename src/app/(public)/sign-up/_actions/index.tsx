"use server";

import { db } from "@/lib/db";
import { TInput, inputSchema } from "./schema";
import bcrypt from "bcrypt";
import { createSafeAction } from "@/utils";

const handler = async (data: TInput) => {
  const password = await bcrypt.hash(data.password, 12);
  const user = await db.user.create({
    data: {
      ...data,
      password,
    },
  });
  return user;
};

export const signUp = createSafeAction({ scheme: inputSchema, handler });
