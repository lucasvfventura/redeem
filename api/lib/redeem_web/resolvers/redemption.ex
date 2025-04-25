defmodule RedeemWeb.Resolvers.Redemption do
  @moduledoc false

  alias Redeem.{Redemptions, Rewards}

  def redeem(_parent, %{reward_id: reward_id, quantity: quantity}, %{
        context: %{current_user: user}
      }) do
    case Redemptions.create_redemption(user, %{
           reward_id: reward_id,
           quantity: quantity
         }) do
      {:ok, redemption} ->
        {:ok, redemption}

      {:error, reason} ->
        {:error, reason}
    end
  end

  def get_redemptions_by_user_id(_parent, _args, %{context: %{current_user: user}}) do
    {:ok, Redeem.Redemptions.get_redemptions_by_user_id(user.id)}
  end

  def get_reward_by_id(%{reward_id: reward_id}, _args, _context) do
    {:ok, Rewards.get_reward_by_id(reward_id)}
  end
end
