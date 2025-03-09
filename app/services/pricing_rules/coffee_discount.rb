module PricingRules
    class CoffeeDiscount
      def apply(items, total_price)
        coffee_items = items.select { |item| item.code == 'CF1' }
        return total_price if coffee_items.count < 3
  
        original_total = coffee_items.sum(&:price)
        # 2/3 discount for coffee
        discounted_total = coffee_items.count * (coffee_items.first.price.to_f * 2 / 3)
        total_price - original_total + discounted_total
      end
    end
end
  