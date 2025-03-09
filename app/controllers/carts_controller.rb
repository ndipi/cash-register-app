class CartsController < ApplicationController
  before_action :set_checkout

  def add_product
    product = Product.find_by(code: params[:product_code])
    if product
      @checkout.scan(product)
      render json: { message: 'Product added to cart' }, status: :ok
    else
      render json: { error: 'Product not found' }, status: :not_found
    end
  end

  def total
    render json: { total: @checkout.total }, status: :ok
  end

  private

  def set_checkout
    pricing_rules = [
      PricingRules::BuyOneGetOneFree.new,
      PricingRules::BulkDiscount.new(code: 'SR1', min_quantity: 3, discounted_price: 4.50),
      PricingRules::CoffeeDiscount.new
    ]
    @checkout ||= Checkout.new(pricing_rules)
  end
end
