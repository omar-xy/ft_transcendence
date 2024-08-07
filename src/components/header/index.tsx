"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { useSession } from "@/components/session-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOutIcon, UserPenIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { session } = useSession();
  const { user } = session;
  return (
    <header className="border-b">
      <nav className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-4 px-container">
        <Link href="/">
          <span className="font-extrabold">LOGO</span>
        </Link>
        <div className="flex gap-2">
          <Link href="/">
            <Button variant={"ghost"}>Home</Button>
          </Link>
          <Link href="/users">
            <Button variant={"ghost"}>Users</Button>
          </Link>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} className="gap-3 pr-0">
              <span>{user?.name}</span>
              <Avatar>
                <AvatarImage src={user?.image || ""} alt="@shadcn" />
                <AvatarFallback>
                  {user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex max-w-[10rem] flex-col">
            <Button variant={"ghost"} className="w-full justify-start gap-2">
              <UserPenIcon size={16} />
              <span>Edit</span>
            </Button>
            <form action={logout}>
              <Button variant={"ghost"} className="w-full justify-start gap-2">
                <LogOutIcon size={16} />
                <span>Sign out</span>
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </nav>
    </header>
  );
}
