FactoryBot.define do
  factory :admin do

    first_name { generate :string }
    last_name { generate :string }
    email
    password {generate :string }
  end
end
