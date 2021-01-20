class Ingredient < ApplicationRecord
  belongs_to :recipes, optional: true
  validates :name, presence: true
  validates :position, presence: true
end
