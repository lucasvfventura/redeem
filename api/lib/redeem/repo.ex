defmodule Redeem.Repo do
  use Ecto.Repo,
    otp_app: :redeem,
    adapter: Ecto.Adapters.Postgres
end
