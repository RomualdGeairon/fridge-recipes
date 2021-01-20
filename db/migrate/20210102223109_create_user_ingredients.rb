# Creates the ingredient Model
class CreateUserIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :user_ingredients do |t|
      t.string :name, null: false
      t.references :user, index: true

      t.timestamps
    end
    add_foreign_key :user_ingredients, :users
  end
end
