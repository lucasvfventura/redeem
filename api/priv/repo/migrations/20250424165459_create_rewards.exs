defmodule Redeem.Repo.Migrations.CreateRewards do
  use Ecto.Migration

  def change do
    create table(:rewards) do
      add :name, :string, null: false
      add :description, :string, null: false
      add :value_per_unit, :integer, null: false
      add :quantity, :integer, null: false

      timestamps(type: :utc_datetime)
    end
  end
end
