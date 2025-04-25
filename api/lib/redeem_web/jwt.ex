defmodule RedeemWeb.JWT do
  @moduledoc """
  JWT token generation and verification using Phoenix.Token.
  """
  @salt "user auth"
  # 1 week
  @max_age 7 * 24 * 60 * 60

  def generate_token(user) do
    Phoenix.Token.sign(RedeemWeb.Endpoint, @salt, %{id: user.id, role: user.role})
  end

  def verify_token(token) do
    Phoenix.Token.verify(RedeemWeb.Endpoint, @salt, token, max_age: @max_age)
  end
end
