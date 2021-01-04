require 'json'

class Api::RecipeController < ApplicationController
  @file = File.read('storage/recipes.json')
  @@data = JSON.parse(@file)

  def index
    ingredients = Ingredient.where(user_id: params[:user_id])
    formatted_ingredients = ingredients.as_json.map { |ingredient| ingredient['name'].downcase }

    matching_recipes = []

    @@data.each do |recipe, id|
      matching_ingredients = []
      # for each recipe ingredients, check if the user owns some
      formatted_ingredients.each do |ingredient|
        matching_ingredients << ingredient if recipe['ingredients'].any? { |i| i.downcase.match(/^(.*?(\b#{ingredient}\b))$/) }
      end

      # skip if no match
      matching_ingredients.empty? && next

      # add recipe to list
      recipe[:matching_ingredients] = matching_ingredients
      recipe[:id] = id
      matching_recipes << recipe
    end

    render json: matching_recipes
  end

  def show
    render json: data[params.id]
  end
end
