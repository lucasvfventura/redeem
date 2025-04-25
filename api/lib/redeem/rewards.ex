defmodule Redeem.Rewards do
  import Ecto.Query, warn: false
  alias Redeem.{Repo, Reward}

  def get_reward_by_id(id) do
    Repo.get(Reward, id)
  end

  def get_rewards() do
    Reward
    |> Repo.all()
  end

  def create_reward(attrs) do
    %Reward{}
    |> Reward.changeset(attrs)
    |> Repo.insert()
  end

  def data() do
    Dataloader.Ecto.new(Repo, query: &query/2)
  end

  def query(queryable, _params) do
    queryable
  end
end
