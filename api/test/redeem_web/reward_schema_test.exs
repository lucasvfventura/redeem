defmodule RedeemWeb.RewardSchemaTest do
  use ExUnit.Case, async: true
  use RedeemWeb.ConnCase

  alias Redeem.{Repo, Reward, User}
  alias RedeemWeb.Schema

  setup do
    admin = Repo.insert!(%User{
      email: "admin2@example.com",
      hashed_password: Bcrypt.hash_pwd_salt("adminpass"),
      role: "admin",
      balance_points: 1000
    })
    reward = Repo.insert!(%Reward{
      name: "Gift Card",
      description: "Amazon gift card",
      value_per_unit: 100,
      quantity: 10
    })
    {:ok, admin: admin, reward: reward}
  end

  describe "rewards query" do
    test "returns all rewards", %{reward: reward} do
      query = """
      query { rewards { id name description valuePerUnit quantity } }
      """
      {:ok, result} = Absinthe.run(query, Schema)
      assert %{data: %{"rewards" => rewards}} = result
      assert Enum.any?(rewards, &(&1["name"] == reward.name))
    end

    test "returns reward by id", %{reward: reward} do
      query = """
      query RewardById($id: ID!) {
        reward(id: $id) { id name description valuePerUnit quantity }
      }
      """
      variables = %{"id" => reward.id}
      {:ok, result} = Absinthe.run(query, Schema, variables: variables)
      assert %{data: %{"reward" => %{"id" => id, "name" => name}}} = result
      assert id == Integer.to_string(reward.id)
      assert name == reward.name
    end
  end

  describe "createReward mutation" do
    test "creates a reward as admin", %{admin: admin} do
      mutation = """
      mutation CreateReward($name: String!, $description: String!, $value_per_unit: Int!, $quantity: Int!) {
        create_reward(name: $name, description: $description, value_per_unit: $value_per_unit, quantity: $quantity) {
          id name description valuePerUnit quantity
        }
      }
      """
      variables = %{
        "name" => "Test Reward",
        "description" => "Test Desc",
        "value_per_unit" => 123,
        "quantity" => 7
      }
      context = %{current_user: admin}
      {:ok, result} = Absinthe.run(mutation, Schema, context: context, variables: variables)
      assert %{data: %{"create_reward" => %{"name" => "Test Reward", "description" => "Test Desc", "valuePerUnit" => 123, "quantity" => 7}}} = result
    end
  end
end
