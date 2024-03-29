class User < ApplicationRecord
  has_secure_password

  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id

  validates :first_name, presence: true, length: { minimum: 2 }
  validates :last_name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, uniqueness: true, format: { with: /@/ }

  def self.ransackable_attributes(_auth_object = nil)
    ['avatar', 'created_at', 'email', 'first_name', 'id', 'last_name', 'password_digest', 'type', 'updated_at']
  end
end
