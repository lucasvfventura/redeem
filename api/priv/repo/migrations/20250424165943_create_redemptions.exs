defmodule Redeem.Repo.Migrations.CreateRedemptions do
  use Ecto.Migration

  def change do
    create table(:redemptions) do
      add :quantity, :integer
      add :user_id, references(:users, on_delete: :nothing)
      add :reward_id, references(:rewards, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:redemptions, [:user_id])
    create index(:redemptions, [:reward_id])
  end
end
