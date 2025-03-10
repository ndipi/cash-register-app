class CartsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def current_cart
    cart = Cart.find_by(id: session[:cart_id])
    unless cart
      cart = Cart.create!
      session[:cart_id] = cart.id
    end
    cart
  end

  def add_product
    product = Product.find_by(code: params[:product_code])
    if product
      cart = current_cart
      cart_item = cart.cart_items.find_by(product: product)
      if cart_item
        cart_item.increment!(:quantity)
      else
        cart.cart_items.create!(product: product, quantity: 1)
      end
      render json: { message: 'Product added to cart' }, status: :ok
    else
      render json: { error: 'Product not found' }, status: :not_found
    end
  end

  def total
    cart = current_cart
    render json: { total: compute_cart_total(cart) }, status: :ok
  end

  def show
    cart = current_cart
    items = cart.cart_items.includes(:product).map do |item|
      {
        id: item.product_id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }
    end
    render json: { cart: items, total: compute_cart_total(cart) }, status: :ok
  end

  def empty
    current_cart.cart_items.destroy_all
    render json: { message: 'Cart emptied' }, status: :ok
  end

  private

  def compute_cart_total(cart)
    pricing_rules = [
      PricingRules::BuyOneGetOneFree.new,
      PricingRules::BulkDiscount.new(code: 'SR1', min_quantity: 3, discounted_price: 4.50),
      PricingRules::CoffeeDiscount.new
    ]
    checkout = Checkout.new(pricing_rules)
    cart.cart_items.each do |item|
      item.quantity.times { checkout.scan(item.product) }
    end
    checkout.total
  end
end
