import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();
export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState('ta');
  return (
    <SettingsContext.Provider value={{ language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
} 