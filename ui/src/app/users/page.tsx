"use client";
import { useState } from "react";
import { useGetUsersQuery, useAddPointsMutation } from "@/generated/graphql";


export default function UsersPage() {
  const { data, loading, error, refetch } = useGetUsersQuery();
  const [addPoints] = useAddPointsMutation();
  const [amounts, setAmounts] = useState<{ [userId: string]: number }>({});
  const [loadingRow, setLoadingRow] = useState<string | null>(null);
  const [successRow, setSuccessRow] = useState<string | null>(null);
  const [errorRow, setErrorRow] = useState<string | null>(null);

  const handleAmountChange = (userId: string, value: string) => {
    setAmounts((prev) => ({ ...prev, [userId]: parseInt(value, 10) || 0 }));
  };

  const handleAddPoints = async (userId: string) => {
    const amount = amounts[userId] || 0;
    if (amount <= 0) return;
    setLoadingRow(userId);
    setErrorRow(null);
    setSuccessRow(null);
    try {
      await addPoints({
        variables: { userId, points: amount },
        onCompleted: () => {
          setSuccessRow(userId);
          setTimeout(() => setSuccessRow(null), 2000);
          setAmounts((prev) => ({ ...prev, [userId]: 0 }));
          refetch();
        },
        onError: () => {
          setErrorRow(userId);
        },
      });
    } finally {
      setLoadingRow(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {loading ? (
        <div className="flex justify-center my-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error">Error loading users.</div>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Balance</th>
              <th>Add Points</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user) =>
              user ? (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.balancePoints}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      className="input input-bordered input-sm w-20"
                      value={amounts[user.id] || ""}
                      onChange={(e) => handleAmountChange(user.id, e.target.value)}
                      disabled={loadingRow === user.id}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={loadingRow === user.id || (amounts[user.id] || 0) <= 0}
                      onClick={() => handleAddPoints(user.id)}
                    >
                      {loadingRow === user.id ? (
                        <span className="loading loading-spinner loading-xs mr-2"></span>
                      ) : null}
                      Add
                    </button>
                    {successRow === user.id && <span className="text-success ml-2">Added!</span>}
                    {errorRow === user.id && <span className="text-error ml-2">Error!</span>}
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
