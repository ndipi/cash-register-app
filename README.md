# Cash Register Application

This application is a cash register system built with Ruby on Rails and React. It lets users add products to a cart, applies discount rules, and computes the total price.

## Overview

**Discount Rules:**

- Green Tea (GR1): Buy one get one free.
- Strawberries (SR1): Bulk discount – price drops to €4.50 each when purchasing 3 or more.
- Coffee (CF1): Price drops to 2/3 of the original when purchasing 3 or more.

**Responsive UI with React:**

- For desktop, Mobile (<1000px), Small screens (<580px).

## Setup

## Build & Run

1. Docker and Docker Compose installed.
  
2. Inside the project, build the containers writing this in terminal:
  
  `docker compose build`
  
3. Start the application:
  
  `docker compose up`
  
  The app will be available at [http://localhost:3000](http://localhost:3000).
  

## Testing

Data is seeded during setup so initial products are available to test in the frontend.

Backend tests are written using RSpec. Key test files include:

- Backend service tests: `spec/services/checkout_spec.rb`
- Model tests: `spec/models/product_spec.rb`

To run the tests:

1. Open a shell in the web container:
  
  `docker exec -it cash-register-app-web-1 bash`
  
2. Run the tests:
  
  `bundle exec rspec`
  

## Application Structure

**Backend (Rails):**

- **Models:**
  - `Product` (fields: code, name, price, id and timestamps)
  - `Cart` and `CartItem` to manage the cart.
- **Services:**
  - `Checkout` applies discount rules.
  - Custom discount rule classes (located in `app/services/pricing_rules/`) implement the pricing logic for Green Tea, Strawberries, and Coffee. Because they’re encapsulated in separate classes, updating discount criteria is easy.
- **Controllers:**
  - `CartsController` manages cart operations (adding products, showing cart, emptying cart).

**Frontend (React via react-rails and Shakapacker):**

- **Components:**
  - `CashRegisterApp`: Main container component.
  - `Product`: Renders individual product cards with an "Add to Cart" button.
  - `Cart`: Displays cart items, quantities, discounted prices, and the total.
  - `Notification`: Custom notification component.
- Some data is initially passed from Rails (HomeController#index) to React.