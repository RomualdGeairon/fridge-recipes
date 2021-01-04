class Api::UserController < ApplicationController
  def create
    if User.exists?(name: params[:name])
      puts(User.find_by(name: params[:name]))
      render json: User.find_by(name: params[:name])
    else
      new_user = User.create!(name: params[:name])
      if new_user
        render json: new_user
      else
        render json: new_user.errors
      end
    end
  end

  def show
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  private

  def user
    @user ||= User.find(params[:id])
  end
end
