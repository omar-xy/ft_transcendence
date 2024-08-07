"use client ";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/lib/auth";

export default function Header() {
  return (
    <header>
      <nav className="mx-auto flex h-20 max-w-screen-2xl items-center justify-end gap-4 px-container">
        <span className="mr-auto font-extrabold">LOGO</span>
        <form action={logout}>
          <Button variant={"outline"}>sign out</Button>
        </form>
      </nav>
    </header>
  );
}
