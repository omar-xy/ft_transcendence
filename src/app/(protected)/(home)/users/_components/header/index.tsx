import ParamsPagination from "@/components/params-pagination";
import ParamsSearch from "@/components/params-search";

export default async function Page({ total }: { total: number }) {
  return (
    <header className="items-between flex flex-wrap gap-4">
      <h3 className="flex-1">{`Users (${total})`}</h3>
      <ParamsSearch />
      <div className="flex flex-1 justify-end">
        <ParamsPagination total={total} />
      </div>
    </header>
  );
}
