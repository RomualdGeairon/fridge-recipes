class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.string :rate
      t.string :author_tip
      t.string :prep_time
      t.string :author
      t.string :difficulty
      t.string :people_quantity
      t.string :cook_time
      t.string :total_time
      t.string :image

      t.timestamps
    end
  end
end
