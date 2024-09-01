import React, { createContext, useContext, useState } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [layout, setLayout] = useState("standard");

  const handleLayoutChange = (layout) => {
      setLayout(layout)
    localStorage.setItem("lang", layout);
  };
      return (
    <UserContext.Provider value={{ layout, handleLayoutChange }}>
      {children}
    </UserContext.Provider>
  );
};

export const changeLayout = () => useContext(ErrorContext);

