import React, { useState, useEffect } from 'react';
import Product from './products/Product';
import Cart from './cart/Cart';
import Notification from './notifications/Notification';

const CashRegisterApp = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [notification, setNotification] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 580);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
      setIsSmallScreen(window.innerWidth < 580);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch('/cart');
      const data = await res.json();
      if (res.ok) {
        setCartItems(data.cart);
        setTotal(data.total);
      } else {
        setNotification('Error fetching cart');
      }
    } catch (err) {
      setNotification('Error connecting to server');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddProduct = async (productCode) => {
    try {
      const res = await fetch('/cart/add_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({ product_code: productCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotification(data.message || 'Product added to cart');
      } else {
        setNotification(data.error || 'Error adding product');
      }
      fetchCart();
    } catch (err) {
      setNotification('Error connecting to server');
      console.error(err);
    }
  };

  const handleEmptyCart = async () => {
    try {
      const res = await fetch('/cart/empty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setNotification(data.message || 'Cart emptied');
      } else {
        setNotification(data.error || 'Error emptying cart');
      }
      fetchCart();
    } catch (err) {
      setNotification('Error connecting to server');
      console.error(err);
    }
  };

  const productsGridStyle = {
    display: 'flex',
    flexDirection: isSmallScreen ? 'column' : 'row',
    gap: '15px',
    alignItems: isSmallScreen ? 'center' : 'flex-start',
  };

  return (
    <div style={styles.container}>
      {notification && (
        <Notification message={notification} onDismiss={() => setNotification(null)} />
      )}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Online Cash Register</h1>
      </header>
      {isMobile ? (
        <div style={styles.mobileContent}>
          <aside style={{ ...styles.cartSection, marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
            <h2 style={styles.sectionHeader}>Your Cart</h2>
            <Cart items={cartItems} total={Number(total)} onEmpty={handleEmptyCart} />
          </aside>
          <section style={styles.productsSection}>
            <h2 style={styles.sectionHeader}>Products</h2>
            <div style={productsGridStyle}>
              {props.products.map((product) => (
                <Product key={product.code} product={product} onAdd={handleAddProduct} smallScreen={isSmallScreen} />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div style={styles.content}>
          <section style={styles.productsSection}>
            <h2 style={styles.sectionHeader}>Products</h2>
            <div style={productsGridStyle}>
              {props.products.map((product) => (
                <Product key={product.code} product={product} onAdd={handleAddProduct} smallScreen={false} />
              ))}
            </div>
          </section>
          <aside style={styles.cartSection}>
            <h2 style={styles.sectionHeader}>Your Cart</h2>
            <Cart items={cartItems} total={Number(total)} onEmpty={handleEmptyCart} />
          </aside>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    background: '#f2f2f2',
    minHeight: '100vh',
  },
  header: {
    background: '#007bff',
    color: '#fff',
    padding: '15px 20px',
    textAlign: 'center',
  },
  headerTitle: {
    margin: 0,
    fontSize: '2rem',
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '20px',
  },
  mobileContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '20px',
  },
  productsSection: {
    flex: 1,
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginRight: '20px',
    marginLeft: '20px',
  },
  cartSection: {
    width: '350px',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginLeft: '20px',
    marginRight: '20px',
  },
  sectionHeader: {
    fontSize: '1.5rem',
    marginBottom: '15px',
    borderBottom: '2px solid #007bff',
    paddingBottom: '5px',
  },
};

export default CashRegisterApp;
