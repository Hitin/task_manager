FactoryBot.define do
  factory :task do
    name
    description
    author { create :user }
    assignee { create :user }
  end
end
