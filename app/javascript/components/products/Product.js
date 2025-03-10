// app/javascript/components/products/Product.jsx
import React from 'react';

const Product = ({ product, onAdd, smallScreen }) => {
  const price = parseFloat(product.price);
  const cardStyle = {
    ...styles.card,
    width: smallScreen ? '100%' : 'calc(33% - 10px)',
  };

  return (
    <div style={cardStyle}>
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.price}>€{price.toFixed(2)}</p>
      <button style={styles.button} onClick={() => onAdd(product.code)}>
        Add to Cart
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    marginBottom: '15px',
  },
  name: {
    fontSize: '1.1rem',
    margin: '0 0 10px',
  },
  price: {
    fontSize: '1rem',
    color: '#333',
    margin: '0 0 15px',
  },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default Product;
