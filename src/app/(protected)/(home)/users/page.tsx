import ParamsSearch from "@/components/params-search";
import { db } from "@/lib/db";
import { findMany } from "./_actions";
import Header from "./_components/header";
import List from "./_components/list";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { total, data } = await findMany(searchParams);
  return (
    <main className="space-y-6 px-container py-6">
      <Header total={total} />
      <List data={data} />
    </main>
  );
}
