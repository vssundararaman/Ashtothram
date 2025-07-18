import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { AppContext } from '../constants/AppContext';
import i18n from '../services/i18n';

const AboutScreen = () => {
  const { fontSize } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: fontSize + 4 }]}>{i18n.t('appName')}</Text>
      <Text style={{ fontSize }}>{i18n.t('version')}: 1.0.0</Text>
      <Text style={{ fontSize }}>{i18n.t('developer')}: Your Name</Text>
      <Text style={{ fontSize }}>{i18n.t('contact')}: your.email@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
});

export default AboutScreen; 