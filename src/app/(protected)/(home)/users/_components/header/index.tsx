import ParamsSearch from "@/components/params-search";

export default async function Page({ total }: { total: number }) {
  return (
    <header className="flex justify-between">
      <h3>{`Users (${total})`}</h3>
      <ParamsSearch />
    </header>
  );
}
