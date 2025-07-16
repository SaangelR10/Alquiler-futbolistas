import React, { createContext, useContext, useState } from 'react';

const PanelContext = createContext();

export const usePanel = () => useContext(PanelContext);

export const PanelProvider = ({ children }) => {
  const [showPerfil, setShowPerfil] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <PanelContext.Provider value={{ showPerfil, setShowPerfil, showChat, setShowChat }}>
      {children}
    </PanelContext.Provider>
  );
}; 