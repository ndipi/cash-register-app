# app/services/checkout.rb
class Checkout
    attr_reader :items
  
    def initialize(pricing_rules = [])
      @pricing_rules = pricing_rules
      @items = []
    end
  
    def scan(product)
      @items << product
    end
  
    def total
      total_price = @items.sum(&:price)
      @pricing_rules.each do |rule|
        total_price = rule.apply(@items, total_price)
      end
      total_price.round(2)
    end
  end
  