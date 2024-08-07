"use server";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import env from "./env";
import { User } from "@prisma/client";
import { db } from "./db";
import bcrypt from "bcrypt";

export type SessionUser = Omit<User, "password">;

export type Session = {
  user: SessionUser;
  expires: Date;
};

const secretKey = env.JWT_SECRET;

export async function encrypt(payload: Session) {
  const { expires } = payload;
  const token = sign(payload, secretKey, {
    expiresIn: Math.floor(expires.getTime() / 1000),
  });
  return token;
}

export async function decrypt(input: string): Promise<Session> {
  const payload = verify(input, env.JWT_SECRET);
  return payload as Session;
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<{
  error?: string;
  user?: SessionUser;
}> {
  // Verify credentials && get the user
  const { email, password } = data;
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) return { error: "Invalid email or password" };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return { error: "Invalid email or password" };

  const expires = new Date(Date.now() + 5_000 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
  return { user };
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/sign-in");
}

export async function getServerSession() {
  try {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
  } catch {
    return null;
  }
}
