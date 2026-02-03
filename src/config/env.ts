import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url().default("http://localhost:3000/api"),
  VITE_APP_NAME: z.string().default("ResApp"),
  MODE: z.enum(["development", "production", "test"]).default("development"),
});

const parseEnv = () => {
  const parsed = envSchema.safeParse({
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
    MODE: import.meta.env.MODE,
  });

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
};

export const env = parseEnv();
