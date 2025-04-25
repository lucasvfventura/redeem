defmodule RedeemWeb.Middleware.RequireAdmin do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    case resolution.context do
      %{current_user: user} when not is_nil(user) and user.role == "admin" ->
        resolution

      _ ->
        Absinthe.Resolution.put_result(resolution, {:error, "Not Authorized"})
    end
  end
end
