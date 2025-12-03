class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, presence: true
  validates :description, presence: true, length: { maximum: 500 }
  validates :author, presence: true

  state_machine initial: :new_task do
    event :to_development do
      transition [:new_task, :in_qa, :in_code_review] => :in_development
    end

    event :to_archived do
      transition [:new_task, :ready_for_release, :released] => :archived
    end

    event :to_qa do
      transition in_development: :in_qa
    end

    event :to_code_review do
      transition in_qa: :in_code_review
    end

    event :to_ready_for_release do
      transition in_code_review: :ready_for_release
    end

    event :to_released do
      transition ready_for_release: :released
    end
  end

  def self.ransackable_attributes(auth_object = nil)
    ["assignee_id", "author_id", "created_at", "description", "expired_at", "id", "name", "state", "updated_at"]
  end
end
