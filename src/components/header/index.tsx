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

export default function Header() {
  const { session } = useSession();
  const { user } = session;
  return (
    <header className="border-b">
      <nav className="mx-auto flex h-20 max-w-screen-2xl items-center justify-end gap-4 px-container">
        <span className="mr-auto font-extrabold">LOGO</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className="gap-3 rounded-full pr-0">
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
