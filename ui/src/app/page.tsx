"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { useGetRewardsQuery, useRedeemMutation } from "@/generated/graphql";

export default function Home() {
  const { user, refresh } = useUser();
  const router = useRouter();
  const { data, loading, error, refetch } = useGetRewardsQuery({ fetchPolicy: "network-only" });
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [redeeming, setRedeeming] = useState<{ [key: string]: boolean }>({});
  const [success, setSuccess] = useState<{ [key: string]: boolean }>({});
  const [redeemError, setRedeemError] = useState<{ [key: string]: string }>({});
  const [redeem] = useRedeemMutation();

  const handleChange = (id: string, value: number) => {
    setQuantities((q) => ({ ...q, [id]: value }));
  };

  const handleRedeem = async (id: string) => {
    setRedeeming((r) => ({ ...r, [id]: true }));
    setRedeemError((e) => ({ ...e, [id]: "" })); // Clear previous error
    try {
      await redeem({ variables: { rewardId: id, quantity: quantities[id] || 1 } });
      refresh();
      refetch();
      setSuccess((s) => ({ ...s, [id]: true }));
      setTimeout(() => setSuccess((s) => ({ ...s, [id]: false })), 2000);
    } catch (err: any) {
      setRedeemError((e) => ({ ...e, [id]: err?.message || "Redeem failed. Please try again." }));
    } finally {
      setRedeeming((r) => ({ ...r, [id]: false }));
    }
  };

  if (loading) return <div className="flex justify-center py-8"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="text-error">Error loading rewards.</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Rewards</h1>
        {user?.admin && (
          <button
            className="btn btn-outline btn-primary"
            onClick={() => router.push("/rewards/new")}
          >
            + New Reward
          </button>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.rewards?.map((reward) => (
          <div key={reward?.id} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{reward?.name}</h2>
              <p className="mb-2 text-sm text-base-content/70">{reward?.description}</p>
              <p className="mb-2 text-sm text-base-content/70">Quantity: {reward?.quantity}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-primary badge-outline">Cost per unit: {reward?.valuePerUnit} pts</span>
              </div>
              {user && (
                <form
                  className="flex gap-2 items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRedeem(reward?.id || '');
                  }}
                >
                  <input
                    type="number"
                    min={1}
                    className="input input-bordered input-sm w-16"
                    value={quantities[reward?.id || ''] || 1}
                    onChange={(e) => handleChange(reward?.id || '', parseInt(e.target.value) || 1)}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={redeeming[reward?.id || '']}
                  >
                    {redeeming[reward?.id || ''] ? "Redeeming..." : "Redeem"}
                  </button>
                  {success[reward?.id || ''] && (
                    <span className="text-success">Redeemed!</span>
                  )}
                  {redeemError[reward?.id || ''] && (
                    <span className="text-error ml-2">{redeemError[reward?.id || '']}</span>
                  )}
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
