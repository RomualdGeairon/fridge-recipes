class Api::IngredientController < ApplicationController
  def index
    render json: Ingredient.where(user_id: params[:id])
  end

  def create
    new_ingredient = Ingredient.create!(
      name: params[:name],
      user_id: params[:user_id]
    )
    if new_ingredient
      render json: new_ingredient
    else
      render json: new_ingredient.errors
    end
  end

  def destroy
    ingredient = Ingredient.find(params[:id])
    if ingredient
      ingredient.destroy
      render json: ingredient
    else
      render json: ingredient.errors
    end
  end
end
