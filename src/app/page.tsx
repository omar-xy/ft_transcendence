import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

const defaultUsers = [
  {
    name: "John Doe",
    email: "johndoe@email.com",
    password: "password",
  },
  {
    name: "Jane Doe",
    email: "janedoe@email.com",
    password: "password",
  },
  {
    name: "Alice Doe",
    email: "alicedoe@email.com",
    password: "password",
  },
];
export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1_000));
  await db.user.deleteMany();
  await db.user.createMany({ data: defaultUsers });
  const users = await db.user.findMany();
  return (
    <main className="space-y-container p-container">
      <h1>{`Users (${users.length})`}</h1>
      <table className="table w-full table-fixed [&_td]:p-3 [&_th]:p-3 [&_th]:text-left [&_tr]:border-b">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
