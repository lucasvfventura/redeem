defmodule RedeemWeb.Schema do
  use Absinthe.Schema

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  import_types(Absinthe.Type.Custom)
  import_types(RedeemWeb.Schema.User)
  import_types(RedeemWeb.Schema.Redeemption)
  import_types(RedeemWeb.Schema.Reward)

  query do
    import_fields(:user_queries)
    import_fields(:reward_queries)
    import_fields(:redemption_queries)
  end

  mutation do
    import_fields(:user_mutations)
    import_fields(:reward_mutations)
    import_fields(:redemption_mutations)
  end
end
