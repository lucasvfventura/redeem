defmodule Redeem.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:email, :string)
    field(:hashed_password, :string)
    field(:role, :string, default: "user")
    field(:balance_points, :integer, default: 0)

    # Virtual fields for password handling
    field(:password, :string, virtual: true)
    field(:password_confirmation, :string, virtual: true)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def registration_changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password, :password_confirmation, :role, :balance_points])
    |> validate_required([:email, :password, :password_confirmation, :role, :balance_points])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
    |> validate_inclusion(:role, ["admin", "user"])
    |> validate_number(:balance_points, greater_than_or_equal_to: 0)
    |> validate_confirmation(:password)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case get_change(changeset, :password) do
      nil -> changeset
      password -> put_change(changeset, :hashed_password, Bcrypt.hash_pwd_salt(password))
    end
  end

  def update_balance_points_changeset(user, attrs) do
    user
    |> cast(attrs, [:balance_points])
    |> validate_required([:balance_points])
    |> validate_number(:balance_points, greater_than_or_equal_to: 0)
  end
end
