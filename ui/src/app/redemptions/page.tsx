"use client";
import { useGetRedemptionsQuery } from "@/generated/graphql";

export default function RedemptionsPage() {
  const { data, loading, error } = useGetRedemptionsQuery({ fetchPolicy: "network-only" });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Redemptions</h1>
      {loading && (
        <div className="flex justify-center my-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {error && (
        <div className="alert alert-error">Error loading redemptions.</div>
      )}
      {!loading && !error && (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Reward</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.redemptions?.map((r) => (
              <tr key={r?.id}>
                <td>{r?.reward?.name}</td>
                <td>{r?.quantity}</td>
                <td>{new Date(r?.insertedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
