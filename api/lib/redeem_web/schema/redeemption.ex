defmodule RedeemWeb.Schema.Redeemption do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  object :redeemption do
    field(:id, non_null(:id))
    field(:quantity, non_null(:integer))
    field(:inserted_at, :datetime)
    field(:updated_at, :datetime)

    field(:reward, non_null(:reward), resolve: dataloader(:reward))
  end

  object :redemption_queries do
    field :redemptions, list_of(:redeemption) do
      middleware(RedeemWeb.Middleware.RequireAuth)
      resolve(&RedeemWeb.Resolvers.Redemption.get_redemptions_by_user_id/3)
    end
  end

  object :redemption_mutations do
    field :redeem, :redeemption do
      arg(:reward_id, non_null(:id))
      arg(:quantity, non_null(:integer))
      middleware(RedeemWeb.Middleware.RequireAuth)
      resolve(&RedeemWeb.Resolvers.Redemption.redeem/3)
    end
  end
end
