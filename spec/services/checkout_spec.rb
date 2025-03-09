require 'rails_helper'


RSpec.describe Checkout do
  let(:green_tea)      { Product.find_or_create_by!(name: 'Green Tea', code: 'GR1', price: 3.11) }
  let(:strawberries)   { Product.find_or_create_by!(name: 'Strawberries', code: 'SR1', price: 5.00) }
  let(:coffee)         { Product.find_or_create_by!(name: 'Coffee', code: 'CF1', price: 11.23) }

  let(:pricing_rules) do
    [
      PricingRules::BuyOneGetOneFree.new,
      PricingRules::BulkDiscount.new(code: 'SR1', min_quantity: 3, discounted_price: 4.50),
      PricingRules::CoffeeDiscount.new
    ]
  end

  subject { described_class.new(pricing_rules) }

  context 'when scanning products' do
    it 'applies buy-one-get-one-free for Green Tea' do
      subject.scan(green_tea)
      subject.scan(green_tea)
      expect(subject.total).to eq(3.11)
    end

    it 'applies bulk discount for Strawberries' do
      3.times { subject.scan(strawberries) }
      expect(subject.total).to eq(4.50 * 3)
    end

    it 'applies coffee discount when 3 or more coffees are scanned' do
      3.times { subject.scan(coffee) }
      expected_total = (coffee.price * 2 / 3) * 3
      expect(subject.total).to eq(expected_total.round(2))
    end

    it 'calculates mixed basket correctly' do
      subject.scan(green_tea)
      subject.scan(coffee)
      subject.scan(strawberries)
      subject.scan(coffee)
      subject.scan(coffee)
      expect(subject.total).to eq(30.57)
    end
  end
end
