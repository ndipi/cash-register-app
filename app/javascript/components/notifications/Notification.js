// app/javascript/components/Notification.jsx
import React, { useEffect, useState } from 'react';

const Notification = ({ message, duration = 2000, onDismiss }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!visible) return null;

  return (
    <div style={styles.toast}>
      {message}
    </div>
  );
};

const styles = {
  toast: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#45DCC8',
    color: '#000',
    padding: '10px 20px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    zIndex: 1000,
    opacity: 0.9,
    transition: 'visibility 0s 2s, opacity 2s linear'  }
};

export default Notification;
