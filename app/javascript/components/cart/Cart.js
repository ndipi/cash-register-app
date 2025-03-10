// app/javascript/components/cart/Cart.jsx
import React from 'react';

const Cart = ({ items, total, onEmpty }) => {
  const computeDiscountedPrice = (item) => {
    const originalPrice = item.price * item.quantity;
    let discountedPrice = originalPrice;

    if (item.name === 'Strawberries' && item.quantity >= 3) {
      discountedPrice = item.quantity * 4.50;
    } else if (item.name === 'Coffee' && item.quantity >= 3) {
      discountedPrice = item.quantity * (item.price * 2 / 3);
    } else if (item.name === 'Green Tea') {
      const chargeable = Math.ceil(item.quantity / 2);
      discountedPrice = chargeable * item.price;
    }
    return { originalPrice, discountedPrice };
  };

  return (
    <div style={styles.container}>
      {items.length === 0 ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={styles.list}>
            {items.map((item, index) => {
              const { originalPrice, discountedPrice } = computeDiscountedPrice(item);
              const hasDiscount = discountedPrice < originalPrice;
              return (
                <li key={index} style={styles.item}>
                  <span style={styles.itemName}>{item.name}</span>
                  <span style={styles.itemQuantity}>x{item.quantity}</span>
                  <span style={styles.itemPrice}>
                    €{discountedPrice.toFixed(2)}
                    {hasDiscount && (
                      <span style={styles.originalPrice}>
                        {' '}({originalPrice.toFixed(2)})
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
          <div style={styles.total}>Total: €{Number(total).toFixed(2)}</div>
          <button style={styles.emptyButton} onClick={onEmpty}>
            Empty Cart
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  empty: {
    fontSize: '1rem',
    color: '#777',
    textAlign: 'center'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee'
  },
  itemName: {
    flex: '1'
  },
  itemQuantity: {
    width: '40px',
    textAlign: 'center'
  },
  itemPrice: {
    width: '120px',
    textAlign: 'right'
  },
  originalPrice: {
    textDecoration: 'line-through',
    color: '#888',
    marginLeft: '5px',
    fontSize: '0.9rem'
  },
  total: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'right',
    margin: '15px 0'
  },
  emptyButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Cart;
