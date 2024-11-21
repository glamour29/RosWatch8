import React, { useState, useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    showToast && (
      <div
        className={`fixed top-0 right-0 p-3 m-3 rounded-md shadow-md text-white
          ${type === 'success' ? 'bg-green-400' : 'bg-red-400'}`}
      >
        {message}
      </div>
    )
  );
};

export default Toast;
