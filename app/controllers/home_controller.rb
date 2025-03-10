class HomeController < ApplicationController
  def index
    @products = Product.all.as_json(only: [:id, :code, :name, :price])
  end
end
