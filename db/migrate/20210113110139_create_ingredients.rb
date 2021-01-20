# Creates the ingredient Model
class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients do |t|
      t.string :name, null: false
      t.integer :position
      t.references :recipe, index: true

      t.timestamps
    end
    add_foreign_key :ingredients, :recipes
  end
end
