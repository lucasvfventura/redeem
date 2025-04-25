defmodule Redeem.Reward do
  use Ecto.Schema
  import Ecto.Changeset

  schema "rewards" do
    field :name, :string
    field :description, :string
    field :value_per_unit, :integer
    field :quantity, :integer

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(reward, attrs) do
    reward
    |> cast(attrs, [:name, :description, :value_per_unit, :quantity])
    |> validate_required([:name, :description, :value_per_unit, :quantity])
  end
end
