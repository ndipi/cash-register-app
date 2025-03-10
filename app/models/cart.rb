class Cart < ApplicationRecord
    has_many :cart_items, dependent: :destroy
    has_many :products, through: :cart_items

    def empty
        self.cart_items.destroy_all
    end
end
  