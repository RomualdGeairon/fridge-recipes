Rails.application.routes.draw do
  namespace :api do
    get 'recipe/index/:user_id', to: 'recipe#index'
    get 'recipe/show/:id', to: 'recipe#show'
  end
  namespace :api do
    get 'ingredient/index/:id', to: 'ingredient#index'
    post 'ingredient/create'
    delete 'ingredient/destroy/:id', to: 'ingredient#destroy'
  end
  namespace :api do
    post 'user/create'
    get 'user/show/:id', to: 'user#show'
  end
  root 'homepage#index'
  get 'test', to: 'test#index'
  get '/*path' => 'homepage#index'
end
