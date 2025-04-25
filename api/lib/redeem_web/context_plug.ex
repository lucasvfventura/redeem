defmodule RedeemWeb.ContextPlug do
  @behaviour Plug

  alias Redeem.{Rewards}

  def init(opts), do: opts

  def call(conn, _opts) do
    # Optionally, you can pass conn.assigns or other context info if needed
    loader =
      Dataloader.new()
      |> Dataloader.add_source(:reward, Rewards.data())

    context = %{
      current_user: conn.assigns[:current_user],
      loader: loader
    }

    Absinthe.Plug.put_options(conn, context: context)
  end
end
