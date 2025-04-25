defmodule RedeemWeb.Middleware.RequireAuth do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    case resolution.context do
      %{current_user: user} when not is_nil(user) ->
        resolution

      _ ->
        Absinthe.Resolution.put_result(resolution, {:error, "Not Authorized"})
    end
  end
end
