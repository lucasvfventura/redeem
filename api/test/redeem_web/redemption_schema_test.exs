defmodule RedeemWeb.RedemptionSchemaTest do
  use ExUnit.Case, async: true
  use RedeemWeb.ConnCase

  alias Redeem.{Repo, User, Reward, Redemption}
  alias RedeemWeb.Schema

  setup do
    user = Repo.insert!(%User{
      email: "redeemer@example.com",
      hashed_password: Bcrypt.hash_pwd_salt("userpass"),
      role: "user",
      balance_points: 1000
    })
    reward = Repo.insert!(%Reward{
      name: "Coffee Mug",
      description: "Branded mug",
      value_per_unit: 200,
      quantity: 5
    })
    {:ok, user: user, reward: reward}
  end

  describe "redemptions query" do
    test "returns all redemptions for user", %{user: user, reward: reward} do
      redemption = Repo.insert!(%Redemption{
        user_id: user.id,
        reward_id: reward.id,
        quantity: 2
      })
      query = """
      query { redemptions { id quantity reward { id name } } }
      """
      loader =
        Dataloader.new()
        |> Dataloader.add_source(:reward, Redeem.Rewards.data())
      context = %{current_user: user, loader: loader}
      {:ok, result} = Absinthe.run(query, Schema, context: context)
      assert %{data: %{"redemptions" => redemptions}} = result
      assert Enum.any?(redemptions, &(&1["id"] == Integer.to_string(redemption.id)))
    end
  end

  describe "redeem mutation" do
    test "successfully redeems a reward", %{user: user, reward: reward} do
      mutation = """
      mutation Redeem($rewardId: ID!, $quantity: Int!) {
        redeem(rewardId: $rewardId, quantity: $quantity) { id quantity reward { id name } }
      }
      """
      variables = %{"rewardId" => reward.id, "quantity" => 1}
      loader =
        Dataloader.new()
        |> Dataloader.add_source(:reward, Redeem.Rewards.data())
      context = %{current_user: user, loader: loader}
      {:ok, result} = Absinthe.run(mutation, Schema, context: context, variables: variables)
      assert %{data: %{"redeem" => %{"id" => _, "quantity" => 1, "reward" => %{"id" => rid}}}} = result
      assert rid == Integer.to_string(reward.id)
    end

    test "fails if not enough balance", %{user: user, reward: reward} do
      mutation = """
      mutation Redeem($rewardId: ID!, $quantity: Int!) {
        redeem(rewardId: $rewardId, quantity: $quantity) { id quantity } }
      """
      variables = %{"rewardId" => reward.id, "quantity" => 100} # too expensive
      context = %{current_user: user}
      {:ok, result} = Absinthe.run(mutation, Schema, context: context, variables: variables)
      assert %{errors: [%{message: _}]} = result
    end

    test "fails if not enough reward quantity", %{user: user, reward: reward} do
      mutation = """
      mutation Redeem($rewardId: ID!, $quantity: Int!) {
        redeem(rewardId: $rewardId, quantity: $quantity) { id quantity } }
      """
      variables = %{"rewardId" => reward.id, "quantity" => 100} # more than available
      context = %{current_user: user}
      {:ok, result} = Absinthe.run(mutation, Schema, context: context, variables: variables)
      assert %{errors: [%{message: _}]} = result
    end
  end
end
