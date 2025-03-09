require 'rails_helper'

RSpec.describe Product, type: :model do
  context 'validations' do
    it 'is valid with name, code and price' do
      product = Product.new(name: 'Green Tea', code: 'GR1_TEST', price: 3.11)
      expect(product).to be_valid
    end

    it 'is invalid without a name' do
      product = Product.new(code: 'GR1_TEST', price: 3.11)
      expect(product).not_to be_valid
    end

    it 'is invalid without a code' do
      product = Product.new(name: 'Green Tea', price: 3.11)
      expect(product).not_to be_valid
    end

    it 'is invalid without a price' do
      product = Product.new(name: 'Green Tea', code: 'GR1_TEST')
      expect(product).not_to be_valid
    end

    it 'does not allow duplicate codes' do
      Product.find_or_create_by(name: 'Green Tea', code: 'GR1_TEST', price: 3.11)
      duplicate = Product.new(name: 'Other Tea', code: 'GR1_TEST', price: 2.50)
      expect(duplicate).not_to be_valid
    end
  end
end
