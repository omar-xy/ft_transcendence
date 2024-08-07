import ParamsPagination from "@/components/params-pagination";
import ParamsSearch from "@/components/params-search";

export default async function Page({ total }: { total: number }) {
  return (
    <header className="items-between flex justify-between gap-4">
      <h3>{`Users (${total})`}</h3>
      <ParamsSearch />
      <ParamsPagination total={total} />
    </header>
  );
}
