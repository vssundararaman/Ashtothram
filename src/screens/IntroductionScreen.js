import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { AppContext } from '../constants/AppContext';
import i18n from '../services/i18n';

const IntroductionScreen = () => {
  const { fontSize } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize }}>{i18n.t('introduction')}</Text>
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
});

export default IntroductionScreen; 