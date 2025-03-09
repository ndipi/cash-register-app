require "test_helper"

class CartsControllerTest < ActionDispatch::IntegrationTest
  test "should get add_product" do
    get carts_add_product_url
    assert_response :success
  end

  test "should get total" do
    get carts_total_url
    assert_response :success
  end
end
