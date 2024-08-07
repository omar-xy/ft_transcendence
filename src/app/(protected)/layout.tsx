import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/components/session-provider";
import Header from "@/components/header";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) redirect("/sign-in");

  return (
    <SessionProvider session={session}>
      <main className="flex flex-col">
        <Header />
        <main>{children}</main>
      </main>
    </SessionProvider>
  );
}
