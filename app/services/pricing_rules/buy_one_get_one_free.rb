module PricingRules
    class BuyOneGetOneFree
      def apply(items, total_price)
        # Filter green tea products
        green_tea_items = items.select { |item| item.code == 'GR1' }
        # Calculate discount
        discount = (green_tea_items.count / 2) * (green_tea_items.first ? green_tea_items.first.price.to_f : 0)
        total_price - discount
      end
    end
end
  