import React, { createContext, useContext, useState } from 'react';

import "./Error.css"
import { useTranslation } from 'react-i18next';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  return (
    <ErrorContext.Provider value={{ error, showError }}>
      {children}
      {error && <div className="error-message">{t(error)}</div>}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);

