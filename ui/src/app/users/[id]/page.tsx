"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
// TODO: Replace with GraphQL query
const mockUser = { id: 1, email: "alice@example.com", balance: 100 };

export default function UserDetailPage() {
  const { id } = useParams();
  const [points, setPoints] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleAddPoints = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call mutation
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="card bg-base-200 shadow-xl p-4">
        <div className="card-body">
          <div className="mb-2">
            <span className="font-bold">Email:</span> {mockUser.email}
          </div>
          <div className="mb-2">
            <span className="font-bold">Balance:</span> {mockUser.balance}
          </div>
          <form className="flex gap-2 items-center" onSubmit={handleAddPoints}>
            <input
              type="number"
              min={1}
              className="input input-bordered input-sm w-20"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
              required
            />
            <button className="btn btn-primary btn-sm" type="submit">
              Add Points
            </button>
            {success && <span className="text-success">Points added!</span>}
          </form>
        </div>
      </div>
    </div>
  );
}
