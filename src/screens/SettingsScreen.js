import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useSettings } from '../SettingsContext';

export default function SettingsScreen() {
  const { language, setLanguage } = useSettings();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.label}>Language</Text>
      <View style={styles.langToggle}>
        <Button mode={language === 'ta' ? 'contained' : 'outlined'} onPress={() => setLanguage('ta')}>தமிழ்</Button>
        <Button mode={language === 'en' ? 'contained' : 'outlined'} onPress={() => setLanguage('en')}>English</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 18, marginBottom: 8 },
  langToggle: { flexDirection: 'row', gap: 8 },
}); 