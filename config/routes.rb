Rails.application.routes.draw do
  root 'home#index'

  # Existing API routes

  # Carts
  post '/cart/add_product', to: 'carts#add_product'
  get '/cart/total', to: 'carts#total'
  post '/cart/empty', to: 'carts#empty'
  get '/cart', to: 'carts#show'

  # Products
  get 'products/index'
  get "/products", to: "products#index"
  get "/products/new", to: "products#new"
  post "/products", to: "products#create"
  get "/products/:id", to: "products#show"
  get "/products/:id/edit", to: "products#edit"
  put "/products/:id", to: "products#update"
  delete "/products/:id", to: "products#destroy"
end
