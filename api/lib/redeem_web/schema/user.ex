defmodule RedeemWeb.Schema.User do
  use Absinthe.Schema.Notation

  object :user do
    field(:id, non_null(:id))
    field(:email, non_null(:string))
    field(:role, non_null(:string))
    field(:balance_points, non_null(:integer))
  end

  object :session do
    field(:token, non_null(:string))
    field(:user, :user)
  end

  object :user_queries do
    field :me, :user do
      middleware(RedeemWeb.Middleware.RequireAuth)
      resolve(&RedeemWeb.Resolvers.User.me/3)
    end

    field :users, list_of(:user) do
      middleware(RedeemWeb.Middleware.RequireAdmin)
      resolve(&RedeemWeb.Resolvers.User.get_users/3)
    end
  end

  object :user_mutations do
    field :login, type: :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&RedeemWeb.Resolvers.User.login/3)
    end

    field :register, type: :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))
      arg(:password_confirmation, non_null(:string))

      resolve(&RedeemWeb.Resolvers.User.register/3)
    end

    field :add_points, :user do
      arg(:user_id, non_null(:id))
      arg(:points, non_null(:integer))
      middleware(RedeemWeb.Middleware.RequireAdmin)
      resolve(&RedeemWeb.Resolvers.User.add_points/3)
    end
  end
end
