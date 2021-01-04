# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    get 'ingredient/index/:id', to: 'ingredient#index'
    post 'ingredient/create'
    delete 'ingredient/destroy/:id', to: 'ingredient#destroy'
    post 'user/create'
    get 'user/show/:id', to: 'user#show'
  end
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'test', to: 'test#index'
  get '/*path' => 'homepage#index'
end
