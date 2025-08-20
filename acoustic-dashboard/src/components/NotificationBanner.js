import React from 'react';
import './NotificationBanner.css';

function NotificationBanner({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="notification-banner">
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
}

export default NotificationBanner;
