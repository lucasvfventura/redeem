defmodule RedeemWeb.Resolvers.User do
  @moduledoc false

  alias Redeem.Users
  alias RedeemWeb.JWT

  def me(_parent, _args, %{context: %{current_user: user}}) do
    {:ok, user}
  end

  def get_users(_parent, _args, _context) do
    {:ok, Users.get_users()}
  end

  def login(_parent, %{email: email, password: password}, _context) do
    case Users.authenticate_user(email, password) do
      {:ok, user} ->
        token = JWT.generate_token(user)
        {:ok, %{token: token, user: user}}

      :error ->
        {:error, "Invalid email or password"}
    end
  end

  def register(
        _parent,
        %{email: email, password: password, password_confirmation: password_confirmation},
        _context
      ) do
    case Users.create_user(%{
           email: email,
           password: password,
           password_confirmation: password_confirmation,
           role: "user",
           balance_points: 1000
         }) do
      {:ok, user} ->
        token = JWT.generate_token(user)
        {:ok, %{token: token, user: user}}

      :error ->
        {:error, "Failed to create user"}
    end
  end

  def add_points(_parent, %{user_id: user_id, points: points}, _context) do
    case Users.update_balance_points(%{user_id: user_id, points: points}) do
      {:ok, user} -> {:ok, user}
      :error -> {:error, "Failed to add points"}
    end
  end
end
