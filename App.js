import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { AppProvider } from './src/constants/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './src/services/i18n';
import * as Localization from 'expo-localization';

export default function App() {

  useEffect(() => {
    const loadSettings = async () => {
      const savedLang = await AsyncStorage.getItem('language');

      if (savedLang) {
        i18n.locale = savedLang;
      } else {
        i18n.locale = Localization.locale.split('-')[0];
      }
    };

    loadSettings();
  }, []);

  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}
