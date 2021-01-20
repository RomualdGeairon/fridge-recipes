class Recipe < ApplicationRecord
  has_many :ingredients
  validates :name, presence: true
  validates :author, presence: true
end
