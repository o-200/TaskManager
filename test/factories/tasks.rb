FactoryBot.define do
  factory :task do
    name { "MyString" }
    description { "MyText" }
    author_id { 1 }
    assignee_id { 1 }
    state { "MyString" }
    expired_at { "2023-05-19" }
  end
end
