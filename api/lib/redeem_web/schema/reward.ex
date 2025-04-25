defmodule RedeemWeb.Schema.Reward do
  use Absinthe.Schema.Notation

  object :reward do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
    field(:description, non_null(:string))
    field(:value_per_unit, non_null(:integer))
    field(:quantity, non_null(:integer))
    field(:inserted_at, :datetime)
    field(:updated_at, :datetime)
  end

  object :reward_queries do
    field :rewards, list_of(:reward) do
      resolve(&RedeemWeb.Resolvers.Reward.all/3)
    end

    field :reward, :reward do
      arg(:id, non_null(:id))
      resolve(&RedeemWeb.Resolvers.Reward.get_reward_by_id/3)
    end
  end

  object :reward_mutations do
    field :create_reward, :reward do
      arg(:name, non_null(:string))
      arg(:description, non_null(:string))
      arg(:value_per_unit, non_null(:integer))
      arg(:quantity, non_null(:integer))
      middleware(RedeemWeb.Middleware.RequireAdmin)
      resolve(&RedeemWeb.Resolvers.Reward.create/3)
    end
  end
end
