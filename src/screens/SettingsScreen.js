import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, Button } from 'react-native-paper';
import i18n from '../services/i18n';
import { AppContext } from '../constants/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

const SettingsScreen = () => {
  const { isDarkTheme, setIsDarkTheme, fontSize, setFontSize } = useContext(AppContext);
  const [, setLang] = useState(i18n.locale);

  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const changeLanguage = async (lang) => {
    i18n.locale = lang;
    await AsyncStorage.setItem('language', lang);
    setLang(lang);
    const isRTL = lang === 'ta';
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    RNRestart.Restart();
  };

  const increaseFontSize = async () => {
    const newSize = fontSize + 2;
    setFontSize(newSize);
    await AsyncStorage.setItem('fontSize', newSize.toString());
  };

  const decreaseFontSize = async () => {
    const newSize = fontSize - 2;
    setFontSize(newSize);
    await AsyncStorage.setItem('fontSize', newSize.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize }}>{i18n.t('language')}</Text>
      <View style={styles.row}>
        <Button onPress={() => changeLanguage('en')}>{i18n.t('english')}</Button>
        <Button onPress={() => changeLanguage('ta')}>{i18n.t('tamil')}</Button>
      </View>

      <Text style={{ fontSize }}>{i18n.t('theme')}</Text>
      <View style={styles.row}>
        <Text style={{ fontSize }}>{i18n.t('light')}</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        <Text style={{ fontSize }}>{i18n.t('dark')}</Text>
      </View>

      <Text style={{ fontSize }}>{i18n.t('fontSize')}</Text>
      <View style={styles.row}>
        <Button onPress={decreaseFontSize}>-</Button>
        <Text style={{ fontSize }}>{fontSize}</Text>
        <Button onPress={increaseFontSize}>+</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default SettingsScreen; 