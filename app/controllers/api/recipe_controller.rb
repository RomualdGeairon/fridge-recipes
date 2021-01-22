require 'json'

class Api::RecipeController < ApplicationController
  def index
    offset = params[:offset]
    limit = params[:limit]
    user_ingredients = UserIngredient.where(user_id: params[:user_id])
    formatted_ingredients = user_ingredients.as_json.map { |ingredient| ingredient['name'].downcase }
    where_clause = formatted_ingredients.map { |ingredient| "ing.name like '% #{ingredient.gsub("'", "''")} %'" }.join(' or ')

    # custom sql query WIP
    sql = "select r.*, i.matching_ingredients
    from recipes as r
    inner join (
      select ing.recipe_id, count(1) as matching_ingredients
      from ingredients ing
      where #{where_clause}
      group by ing.recipe_id
    ) i
    on i.recipe_id  = r.id
    group by r.id, i.recipe_id, i.matching_ingredients
    order by matching_ingredients desc
    limit #{limit}
    offset #{offset}"
    recipes = ActiveRecord::Base.connection.execute(sql)

    recipes_ids = recipes.map { |recipe| recipe['id'] }
    ingredients = Ingredient.where('recipe_id IN (?)', recipes_ids)

    recipes = recipes.to_a
    recipes.each do |recipe|
      recipe['ingredients'] = ingredients.select { |ingredient| ingredient['recipe_id'] == recipe['id'] }
    end

    render json: { recipes: recipes, total: Recipe.count }
  end

  def show
    recipe = Recipe.find(params[:id]).as_json
    recipe['ingredients'] = Ingredient.where(recipe_id: params[:id])
    render json: recipe
  end
end
