defmodule Redeem.Users do
  import Ecto.Query, warn: false
  alias Redeem.{Repo, User}

  def get_users() do
    User
    |> order_by(asc: :email)
    |> Repo.all()
  end

  def get_user_by_email(email) do
    Repo.get_by(User, email: email)
  end

  def get_user_by_id(id) do
    Repo.get(User, id)
  end

  def create_user(attrs) do
    %User{}
    |> User.registration_changeset(attrs)
    |> Repo.insert()
  end

  def authenticate_user(email, password) do
    user = get_user_by_email(email)

    cond do
      user && Bcrypt.verify_pass(password, user.hashed_password) ->
        {:ok, user}

      true ->
        :error
    end
  end

  def update_balance_points(%{user_id: user_id, points: points}) do
    user = get_user_by_id(user_id)

    user
    |> User.update_balance_points_changeset(%{balance_points: points})
    |> Repo.update()
  end
end
