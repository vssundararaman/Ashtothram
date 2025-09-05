import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Button } from 'react-native-paper';
import { useSettings } from '../SettingsProvider';
import { Picker } from '@react-native-picker/picker';

export default function SettingsScreen() {
  const { language, changeLanguage, theme, setTheme, themes, showRuler, setShowRuler } = useSettings();
  return (
    <View style={styles.container}>
      <Text style={styles.title} selectable={true}>Settings</Text>
      <Text style={styles.label} selectable={true}>Language</Text>
      <View style={styles.langToggle}>
        <Button mode={language === 'ta' ? 'contained' : 'outlined'} onPress={() => changeLanguage('ta')}>தமிழ்</Button>
        <Button mode={language === 'en' ? 'contained' : 'outlined'} onPress={() => changeLanguage('en')}>English</Button>
      </View>
      <Text style={styles.label} selectable={true}>Theme</Text>
      <View style={[styles.themePicker, { width: 320 }]}>
        <Picker
          selectedValue={theme}
          style={{ width: 320, height: 56 }}
          onValueChange={(itemValue) => setTheme(itemValue)}
        >
          {Object.keys(themes).map((themeKey) => (
            <Picker.Item key={themeKey} label={themeKey.charAt(0).toUpperCase() + themeKey.slice(1)} value={themeKey} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label} selectable={true}>Show Ruler</Text>
      <View style={styles.rulerToggle}>
        <Switch
          value={showRuler}
          onValueChange={setShowRuler}
        />
        <Text style={{ marginLeft: 10 }}>{showRuler ? 'On' : 'Off'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 18, marginBottom: 8, marginTop: 16 },
  langToggle: { flexDirection: 'row', gap: 8 },
  themePicker: { marginTop: 8, width: 320 },
  rulerToggle: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
}); 