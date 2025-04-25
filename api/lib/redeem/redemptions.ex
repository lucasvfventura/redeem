defmodule Redeem.Redemptions do
  import Ecto.Query, warn: false
  alias Ecto.Multi
  alias Redeem.{Repo, Redemption}

  def get_redemption_by_id(id) do
    Repo.get(Redemption, id)
  end

  def get_redemptions_by_user_id(user_id) do
    Redemption
    |> where([r], r.user_id == ^user_id)
    |> order_by([r], desc: r.inserted_at)
    |> Repo.all()
  end

  def create_redemption(user, %{reward_id: reward_id, quantity: quantity}) do
    with {:ok, reward} <- {:ok, Redeem.Rewards.get_reward_by_id(reward_id)},
         {:ok, %{cost: cost}} <- {:ok, %{cost: quantity * reward.value_per_unit}},
         true <- user.balance_points >= cost or {:error, "Not enough balance"},
         true <- reward.quantity >= quantity or {:error, "Not enough reward quantity"} do
      Multi.new()
      |> Multi.insert(
        :redemption,
        Redemption.changeset(%Redemption{}, %{
          user_id: user.id,
          reward_id: reward_id,
          quantity: quantity
        })
      )
      |> Multi.update(
        :update_reward,
        Redeem.Reward.changeset(reward, %{quantity: reward.quantity - quantity})
      )
      |> Multi.update(
        :update_user,
        Redeem.User.update_balance_points_changeset(user, %{
          balance_points: user.balance_points - cost
        })
      )
      |> Repo.transaction()
      |> case do
        {:ok, %{redemption: redemption}} -> {:ok, redemption}
        {:error, _step, reason, _changes} -> {:error, reason}
      end
    end
  end
end
