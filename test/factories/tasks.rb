FactoryBot.define do
  factory :task do
    name
    description
    author_id { nil }
    assignee_id { nil }
  end
end
