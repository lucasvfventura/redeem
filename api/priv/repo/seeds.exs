alias Redeem.{Repo, User, Reward}

# Create users
admin_attrs = %{
  email: "admin@example.com",
  password: "password",
  password_confirmation: "password",
  role: "admin",
  balance_points: 1000
}

user_attrs = %{
  email: "user@example.com",
  password: "password",
  password_confirmation: "password",
  role: "user",
  balance_points: 500
}

admin_changeset = User.registration_changeset(%User{}, admin_attrs)
user_changeset = User.registration_changeset(%User{}, user_attrs)

Repo.insert!(admin_changeset)
Repo.insert!(user_changeset)

# Create 10 rewards (gift cards with different values)
for value <- 10..100//10 do
  reward_attrs = %{
    name: "Gift Card $#{value}",
    description: "A $#{value} gift card.",
    value_per_unit: value,
    quantity: 100
  }
  changeset = Reward.changeset(%Reward{}, reward_attrs)
  Repo.insert!(changeset)
end

IO.puts("Seeded 2 users and 10 rewards.")
