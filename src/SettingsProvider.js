import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './services/i18n';
import * as Localization from 'expo-localization';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('language');
        const savedTheme = await AsyncStorage.getItem('theme');
        let lang = savedLang || Localization.getLocales()[0]?.languageCode || 'en';
        i18n.locale = lang;
        setLanguage(lang);
        setTheme(savedTheme || 'light');
      } catch (e) {
        setLanguage('en');
        setTheme('light');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    i18n.locale = lang;
    await AsyncStorage.setItem('language', lang);
  };

  if (loading) return <>{'Loading...'}</>;

  return (
    <SettingsContext.Provider value={{ language, theme, changeLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}; 