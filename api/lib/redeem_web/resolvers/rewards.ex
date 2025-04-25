defmodule RedeemWeb.Resolvers.Reward do
  @moduledoc false

  alias Redeem.{Rewards}

  def all(_parent, _args, _context) do
    {:ok, Rewards.get_rewards()}
  end

  def get_reward_by_id(_parent, %{id: id}, _context) do
    {:ok, Rewards.get_reward_by_id(id)}
  end

  def create(
        _parent,
        %{
          name: name,
          description: description,
          value_per_unit: value_per_unit,
          quantity: quantity
        },
        _context
      ) do
    Rewards.create_reward(%{
      name: name,
      description: description,
      value_per_unit: value_per_unit,
      quantity: quantity
    })
  end
end
