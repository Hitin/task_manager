class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :state, :expired_at
  belongs_to :author
  belongs_to :assignee
end