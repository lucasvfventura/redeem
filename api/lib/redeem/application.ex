defmodule Redeem.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      RedeemWeb.Telemetry,
      Redeem.Repo,
      {DNSCluster, query: Application.get_env(:redeem, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Redeem.PubSub},
      # Start a worker by calling: Redeem.Worker.start_link(arg)
      # {Redeem.Worker, arg},
      # Start to serve requests, typically the last entry
      RedeemWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Redeem.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    RedeemWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
