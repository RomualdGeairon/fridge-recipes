# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'json'

@file = File.read('storage/recipes.json')
@data = JSON.parse(@file)

@data.each do |recipe|
  new_recipe = Recipe.create!(
    name: recipe['name'],
    author: recipe['author'],
    rate: recipe['rate'],
    author_tip: recipe['author_tip'],
    prep_time: recipe['prep_time'],
    total_time: recipe['total_time'],
    difficulty: recipe['difficulty'],
    people_quantity: recipe['people_quantity'],
    cook_time: recipe['cook_time'],
    image: recipe['image']
  )

  recipe['ingredients'].each_with_index do |ingredient, i|
    Ingredient.create!(
      name: ingredient.downcase,
      position: i,
      recipe_id: new_recipe['id']
    )
  end
end
