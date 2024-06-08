import React, { createContext, useContext, useState } from "react";

const WarningContext = createContext();

export const useWarning = () => useContext(WarningContext);

export const WarningProvider = ({ children }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [showWarning2, setShowWarning2] = useState(false);
  const [showWarning3, setShowWarning3] = useState(false);

  const openWarning = () => setShowWarning(true);
  const closeWarning = () => setShowWarning(false);

  const openWarning2 = () => setShowWarning2(true);
  const closeWarning2 = () => setShowWarning2(false);

  const openWarning3 = () => setShowWarning3(true);
  const closeWarning3 = () => setShowWarning3(false);

  return (
    <WarningContext.Provider
      value={{
        showWarning,
        showWarning2,
        showWarning3,
        openWarning,
        closeWarning,
        openWarning2,
        closeWarning2,
        openWarning3,
        closeWarning3,
      }}
    >
      {children}
    </WarningContext.Provider>
  );
};
