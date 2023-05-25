FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :avatar, :name, :description, :state] do |n|
    "string#{n}"
  end

  sequence :email do |n|
    "person#{n}@example.com"
  end

  sequence :expired_at do |n|
    Date.strptime('2000-12-31', '%Y-%m-%d') + n
  end
end
