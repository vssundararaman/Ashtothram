import React, { createContext, useState, useMemo, useEffect } from 'react';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedFontSize = await AsyncStorage.getItem('fontSize');

      if (savedTheme) {
        setIsDarkTheme(savedTheme === 'dark');
      }
      if (savedFontSize) {
        setFontSize(parseInt(savedFontSize, 10));
      }
      setLoading(false);
    };

    loadSettings();
  }, []);

  const theme = isDarkTheme ? DarkTheme : DefaultTheme;

  const contextValue = useMemo(() => ({
    isDarkTheme,
    setIsDarkTheme,
    fontSize,
    setFontSize,
  }), [isDarkTheme, fontSize]);

  if (loading) {
    return null;
  }

  return (
    <AppContext.Provider value={contextValue}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </AppContext.Provider>
  );
}; 