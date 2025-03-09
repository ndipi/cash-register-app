module PricingRules
    class BulkDiscount
      def initialize(code:, min_quantity:, discounted_price:)
        @code = code
        @min_quantity = min_quantity
        @discounted_price = discounted_price
      end
  
      def apply(items, total_price)
        # Select products with given code
        target_items = items.select { |item| item.code == @code }
        return total_price if target_items.count < @min_quantity
  
        original_total = target_items.sum(&:price)
        discounted_total = target_items.count * @discounted_price
        total_price - original_total + discounted_total
      end
    end
end
  