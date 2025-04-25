defmodule RedeemWeb.UserSchemaTest do
  use ExUnit.Case, async: true
  use RedeemWeb.ConnCase

  alias Redeem.{Repo, User}
  alias RedeemWeb.Schema

  setup do
    admin =
      Repo.insert!(%User{
        email: "admin@example.com",
        hashed_password: Bcrypt.hash_pwd_salt("adminpass"),
        role: "admin",
        balance_points: 1000
      })

    user =
      Repo.insert!(%User{
        email: "user@example.com",
        hashed_password: Bcrypt.hash_pwd_salt("userpass"),
        role: "user",
        balance_points: 500
      })

    {:ok, admin: admin, user: user}
  end

  describe "users query (admin only)" do
    test "returns all users for admin", %{admin: admin, user: user} do
      query = """
      query { users { id email role balancePoints } }
      """

      context = %{current_user: admin}
      {:ok, result} = Absinthe.run(query, Schema, context: context)
      assert %{data: %{"users" => users}} = result
      assert Enum.any?(users, &(&1["email"] == admin.email))
      assert Enum.any?(users, &(&1["email"] == user.email))
    end

    test "returns error for non-admin", %{user: user} do
      query = """
      query { users { id email role balancePoints } }
      """

      context = %{current_user: user}
      {:ok, result} = Absinthe.run(query, Schema, context: context)
      assert %{errors: [%{message: "Not Authorized"}]} = result
    end
  end

  describe "add_points mutation (admin only)" do
    test "adds points for user as admin", %{admin: admin, user: user} do
      mutation = """
      mutation AddPoints($userId: ID!, $points: Int!) {
        addPoints(userId: $userId, points: $points) { id balancePoints }
      }
      """

      context = %{current_user: admin}
      variables = %{"userId" => user.id, "points" => 100}
      {:ok, result} = Absinthe.run(mutation, Schema, context: context, variables: variables)

      assert %{data: %{"addPoints" => %{"id" => returned_id, "balancePoints" => balance}}} =
               result

      assert returned_id == Integer.to_string(user.id)
      assert is_integer(balance)
    end

    test "returns error for non-admin", %{user: user} do
      mutation = """
      mutation AddPoints($userId: ID!, $points: Int!) {
        addPoints(userId: $userId, points: $points) { id balancePoints }
      }
      """

      context = %{current_user: user}
      variables = %{"userId" => user.id, "points" => 100}
      {:ok, result} = Absinthe.run(mutation, Schema, context: context, variables: variables)
      assert %{errors: [%{message: "Not Authorized"}]} = result
    end
  end

  describe "me query (authed user)" do
    test "returns current user info", %{user: user} do
      query = """
      query { me { id email role balancePoints } }
      """

      context = %{current_user: user}
      {:ok, result} = Absinthe.run(query, Schema, context: context)
      assert %{data: %{"me" => %{"email" => email}}} = result
      assert email == user.email
    end
  end

  describe "login mutation (public)" do
    test "returns error for invalid login" do
      mutation = """
      mutation { login(email: "bad@example.com", password: "bad") { token user { id } } }
      """

      {:ok, result} = Absinthe.run(mutation, Schema)
      assert %{errors: [%{message: _}]} = result
    end
  end
end
