"use server";
import { Prisma } from "@prisma/client";
import { TData } from "./schema";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/auth";

const defaultParams: Record<string, string> = {
  page: "1",
  perPage: "10",
};

const getOrderBy = (orderBy = "createdAt", or = "desc") => {
  const order: "asc" | "desc" = or === "desc" ? "desc" : "asc";
  if (orderBy === "createdAt") return { createdAt: order };
  if (orderBy === "name") return { name: order };
  return { createdAt: "desc" as "desc" };
};

export async function findMany(params = defaultParams): Promise<{
  data: TData;
  total: number;
}> {
  const session = await getServerSession();
  if (!session?.user) throw new Error("Unauthorized");

  const page = parseInt(params.page) || 1;
  const perPage = parseInt(params.perPage) || 10;
  const skip = (page - 1) * perPage;
  const take = perPage;

  const where: Prisma.UserWhereInput = {
    blocked: { none: { id: session.user.id } },
    OR: params.search
      ? [
          { name: { contains: params.search, mode: "insensitive" } },
          { email: { contains: params.search, mode: "insensitive" } },
        ]
      : undefined,
  };
  const orderBy = getOrderBy(params.orderBy, params.order);

  const result = await db.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      friends: { where: { id: session.user.id }, select: { id: true } },
      friendOf: { where: { id: session.user.id }, select: { id: true } },
      blockedBy: { where: { id: session.user.id }, select: { id: true } },
    },
    orderBy,
    take,
    skip,
  });

  const total = await db.user.count({ where });

  const data = result.map((item) => {
    const { friendOf, friends, blockedBy, ...rest } = item;
    const isFriend = friends.length > 0 || friendOf.length > 0;
    const isBlocked = blockedBy.length > 0;
    return { ...rest, isFriend, isBlocked };
  });

  return { data, total };
}

export async function toggleFrindship(id: string) {
  const session = await getServerSession();
  if (!session?.user) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      friends: { where: { id: session.user.id }, select: { id: true } },
      friendOf: { where: { id: session.user.id }, select: { id: true } },
    },
  });
  if (!user) throw new Error("User not found");
  const isFriend = user.friends.length > 0 || user.friendOf.length > 0;
  if (isFriend) {
    return await db.user.update({
      where: { id },
      data: {
        friends: { disconnect: { id: session.user.id } },
        friendOf: { disconnect: { id: session.user.id } },
      },
    });
  }
  if (!isFriend) {
    return await db.user.update({
      where: { id },
      data: {
        friends: { connect: { id: session.user.id } },
        friendOf: { connect: { id: session.user.id } },
      },
    });
  }
}
export async function toggleBlock(id: string) {
  const session = await getServerSession();
  if (!session?.user) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      blockedBy: { where: { id: session.user.id }, select: { id: true } },
    },
  });
  if (!user) throw new Error("User not found");
  const isBlocked = user.blockedBy.length > 0;
  if (isBlocked) {
    return await db.user.update({
      where: { id },
      data: {
        blockedBy: { disconnect: { id: session.user.id } },
      },
    });
  }
  if (!isBlocked) {
    return await db.user.update({
      where: { id },
      data: {
        blockedBy: { connect: { id: session.user.id } },
      },
    });
  }
}
