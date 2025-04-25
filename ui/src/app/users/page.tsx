"use client";
import Link from "next/link";
// TODO: Replace with GraphQL query
const mockUsers = [
  { id: 1, email: "alice@example.com", balance: 100 },
  { id: 2, email: "bob@example.com", balance: 200 },
];

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link href={`/users/${user.id}`} className="link link-primary">
                  {user.email}
                </Link>
              </td>
              <td>{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
