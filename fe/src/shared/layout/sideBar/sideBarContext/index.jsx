// src/shared/layout/sideBar/sideBarContext/index.jsx
import React, { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isShrinkView, setIsShrinkView] = useState(false);

  const toggleShrinkView = () => {
    setIsShrinkView((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isShrinkView, toggleShrinkView }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
