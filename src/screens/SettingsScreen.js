import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useSettings } from '../SettingsProvider';
import { Picker } from '@react-native-picker/picker';

export default function SettingsScreen() {
  const { language, setLanguage, theme, setTheme, themes } = useSettings();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.label}>Language</Text>
      <View style={styles.langToggle}>
        <Button mode={language === 'ta' ? 'contained' : 'outlined'} onPress={() => setLanguage('ta')}>தமிழ்</Button>
        <Button mode={language === 'en' ? 'contained' : 'outlined'} onPress={() => setLanguage('en')}>English</Button>
      </View>
      <Text style={styles.label}>Theme</Text>
      <View style={styles.themePicker}>
        <Picker
          selectedValue={theme}
          style={{ width: 220, height: 44 }}
          onValueChange={(itemValue) => setTheme(itemValue)}
        >
          {Object.keys(themes).map((themeKey) => (
            <Picker.Item key={themeKey} label={themeKey.charAt(0).toUpperCase() + themeKey.slice(1)} value={themeKey} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 18, marginBottom: 8, marginTop: 16 },
  langToggle: { flexDirection: 'row', gap: 8 },
  themePicker: { marginTop: 8, width: 220 },
}); 