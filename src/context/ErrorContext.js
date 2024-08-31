import React, { createContext, useContext, useState } from 'react';

import "./Error.css"

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  return (
    <ErrorContext.Provider value={{ error, showError }}>
      {children}
      {error && <div className="error-message">{error}</div>}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);

