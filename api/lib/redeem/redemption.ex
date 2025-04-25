defmodule Redeem.Redemption do
  use Ecto.Schema
  import Ecto.Changeset

  schema "redemptions" do
    field(:quantity, :integer)

    belongs_to(:reward, Redeem.Reward)
    belongs_to(:user, Redeem.User)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(redemption, attrs) do
    redemption
    |> cast(attrs, [:quantity, :user_id, :reward_id])
    |> validate_required([:quantity, :user_id, :reward_id])
  end
end
