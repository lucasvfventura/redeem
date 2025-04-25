"use client";
import Link from "next/link";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <div className="navbar text-base-content">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost">Rewards</Link>
        {user && (
          <Link href="/redemptions" className="btn btn-ghost">Redemptions</Link>
        )}
        {user?.admin && (
          <Link href="/users" className="btn btn-ghost">Users</Link>
        )}
      </div>
      {user ? (
        <div className="flex gap-2">
          <span className="mr-2">Balance: <span className="font-mono">{user.balancePoints}</span></span>
          <button className="btn btn-outline btn-error btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
          <Link href="/register" className="btn btn-secondary btn-sm">Register</Link>
        </div>
      )}
    </div>
  );
}
