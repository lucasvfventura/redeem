defmodule RedeemWeb.AuthPlug do
  @moduledoc """
  Plug to extract the current user from the Authorization header and add it to Absinthe context.
  """
  @behaviour Plug

  import Plug.Conn
  alias Redeem.Users
  alias RedeemWeb.JWT

  def init(opts), do: opts

  def call(conn, _opts) do
    user =
      with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
           {:ok, %{id: id}} <- JWT.verify_token(token),
           user when not is_nil(user) <- Users.get_user_by_id(id) do
        user
      else
        _ -> nil
      end

    assign(conn, :current_user, user)
  end
end
