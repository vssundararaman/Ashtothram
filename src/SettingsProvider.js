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

  const themes = {
    light: {
      background: '#fff',
      text: '#222',
      primary: '#1976d2',
      card: '#f9f9f9',
      accent: '#e0e0e0',
    },
    dark: {
      background: '#181818',
      text: '#fff',
      primary: '#90caf9',
      card: '#232323',
      accent: '#333',
    },
    ocean: {
      background: '#e0f7fa',
      text: '#01579b',
      primary: '#00bcd4',
      card: '#b2ebf2',
      accent: '#4dd0e1',
    },
    minimalist: {
      background: '#ffffff',
      text: '#111111',
      primary: '#000000',
      card: '#f5f5f5',
      accent: '#e0e0e0',
    },
    modern: {
      background: '#f4f6fb',
      text: '#22223b',
      primary: '#3a86ff',
      card: '#ffffff',
      accent: '#bdb2ff',
    },
    vintage: {
      background: '#f5ecd7',
      text: '#6b4226',
      primary: '#b08968',
      card: '#e6ccb2',
      accent: '#a98467',
    },
    artdeco: {
      background: '#22223b',
      text: '#ffd700',
      primary: '#b5838d',
      card: '#4a4e69',
      accent: '#c9ada7',
    },
    brutalist: {
      background: '#f8f8f8',
      text: '#000',
      primary: '#ff0054',
      card: '#e0e0e0',
      accent: '#222',
    },
    scandinavian: {
      background: '#f6f7f4',
      text: '#2d2d2d',
      primary: '#7ca982',
      card: '#ffffff',
      accent: '#e2e2e2',
    },
    ecommerce: {
      background: '#f9f9f9',
      text: '#222',
      primary: '#ff6f61',
      card: '#fff',
      accent: '#ffe082',
    },
    portfolio: {
      background: '#f5f7fa',
      text: '#22223b',
      primary: '#3a86ff',
      card: '#fff',
      accent: '#bdb2ff',
    },
    blog: {
      background: '#fffdfa',
      text: '#333',
      primary: '#ffb703',
      card: '#f7f7f7',
      accent: '#e0e0e0',
    },
    landing: {
      background: '#f0f4f8',
      text: '#222',
      primary: '#00b4d8',
      card: '#fff',
      accent: '#caf0f8',
    },
    onepage: {
      background: '#f7fff7',
      text: '#1a535c',
      primary: '#ff6f61',
      card: '#fff',
      accent: '#4ecdc4',
    },
    news: {
      background: '#f5f5f5',
      text: '#222',
      primary: '#d7263d',
      card: '#fff',
      accent: '#f46036',
    },
    multipurpose: {
      background: '#f8fafc',
      text: '#222',
      primary: '#3a86ff',
      card: '#fff',
      accent: '#bdb2ff',
    },
  };

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

  const changeTheme = async (themeName) => {
    setTheme(themeName);
    await AsyncStorage.setItem('theme', themeName);
  };

  if (loading) return <>{'Loading...'}</>;

  return (
    <SettingsContext.Provider value={{ language, theme, setTheme: changeTheme, themes, changeLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}; 