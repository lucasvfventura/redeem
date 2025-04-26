"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../context/UserContext";
import { gql, useMutation } from "@apollo/client";

const CREATE_REWARD = gql`
  mutation CreateReward($name: String!, $description: String!, $quantity: Int!, $valuePerUnit: Int!) {
    createReward(name: $name, description: $description, quantity: $quantity, valuePerUnit: $valuePerUnit) {
      id
      name
      description
      quantity
      valuePerUnit
    }
  }
`;

export default function NewRewardPage() {
  const { user } = useUser();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: 1,
    valuePerUnit: 1,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [createReward, { loading }] = useMutation(CREATE_REWARD);

  if (!user || !user.admin) {
    return <div className="text-error">Access denied. Admins only.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "quantity" || name === "valuePerUnit" ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await createReward({ variables: form });
      setSuccess(true);
      setForm({ name: "", description: "", quantity: 1, valuePerUnit: 1 });
      setTimeout(() => router.push("/"), 1500);
    } catch (err: any) {
      setError(err.message || "Failed to create reward.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create New Reward</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label" htmlFor="name"><span className="label-text">Reward Name</span></label>
          <input
            id="name"
            name="name"
            className="input input-bordered w-full"
            placeholder="Reward Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="description"><span className="label-text">Description</span></label>
          <textarea
            id="description"
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="quantity"><span className="label-text">Quantity</span></label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            className="input input-bordered w-full"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="valuePerUnit"><span className="label-text">Value Per Unit (pts)</span></label>
          <input
            id="valuePerUnit"
            name="valuePerUnit"
            type="number"
            min={1}
            className="input input-bordered w-full"
            placeholder="Value Per Unit (pts)"
            value={form.valuePerUnit}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Reward"}
          </button>
          {error && <div className="text-error">{error}</div>}
          {success && <div className="text-success">Reward created!</div>}
        </div>
      </form>
    </div>
  );
}
