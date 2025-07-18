import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../services/i18n';

const Page1 = () => (
  <View style={styles.container}>
    <Text>{i18n.t('page1')}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page1; 