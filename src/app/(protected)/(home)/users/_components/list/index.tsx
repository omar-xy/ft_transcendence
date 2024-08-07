"use client";
import React from "react";
import { TData } from "../../_actions/schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toggleBlock, toggleFrindship } from "../../_actions";

function FriendButton({ id, isFriend }: { id: string; isFriend: boolean }) {
  const router = useRouter();
  async function action() {
    await toggleFrindship(id);
    router.refresh();
  }
  return (
    <form action={action}>
      <Button type="submit" variant="outline">
        {isFriend ? "Unfriend" : "Add friend"}
      </Button>
    </form>
  );
}
function BlockButton({ id, isBlocked }: { id: string; isBlocked: boolean }) {
  const router = useRouter();
  async function action() {
    await toggleBlock(id);
    router.refresh();
  }
  return (
    <form action={action}>
      <Button type="submit" variant="outline">
        {isBlocked ? "Unblock" : "Block"}
      </Button>
    </form>
  );
}

export default function List({ data }: { data: TData }) {
  return (
    <table className="table w-full table-fixed [&_td]:p-3 [&_th]:p-3 [&_th]:text-left [&_tr]:border-b">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th className="">action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="flex items-center justify-center gap-2">
              <FriendButton id={user.id} isFriend={user.isFriend} />
              <BlockButton id={user.id} isBlocked={user.isBlocked} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
