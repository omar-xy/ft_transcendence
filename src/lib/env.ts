import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .url()
    .default(
      "postgresql://postgres:postgres@localhost:5432/tmp-db?schema=public",
    ),
  JWT_SECRET: z.string().default("secret"),
});

const env = envSchema.parse(process.env);

export default env;
