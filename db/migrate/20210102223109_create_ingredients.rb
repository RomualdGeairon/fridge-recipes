# Creates the ingredient Model
class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients do |t|
      t.string :name, null: false
      t.references :user, index: true

      t.timestamps
    end
    add_foreign_key :ingredients, :users
  end
end
