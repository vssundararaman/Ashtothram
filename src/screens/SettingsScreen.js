import React from 'react';
import { View, Text, StyleSheet, Switch, Image, useWindowDimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { useSettings } from '../SettingsProvider';
import { Picker } from '@react-native-picker/picker';
import settingsImg from '../assets/images/settings.png';

export default function SettingsScreen() {
  const { language, changeLanguage, theme, setTheme, themes, showRuler, setShowRuler } = useSettings();
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const currentTheme = themes?.[theme] || { background: '#fff', text: '#222', card: '#f7f7f7', primary: '#007bff', accent: '#e0e0e0' };
  return (
    <View style={styles.container}>
      <Image source={settingsImg} style={styles.logo} />
      <Text style={styles.title} selectable={true}>Settings</Text>
      {/* Language Section */}
      <View style={styles.cardSection}>
        <Text style={styles.sectionHeader}>Language</Text>
        <View style={styles.langToggleRow}>
          <Picker
            selectedValue={language}
            style={[styles.themePicker, { backgroundColor: currentTheme.card, borderColor: currentTheme.accent }]}
            onValueChange={changeLanguage}
            itemStyle={{ fontSize: 20, color: currentTheme.text }}
            dropdownIconColor={currentTheme.text}
          >
            <Picker.Item label="தமிழ் (Tamil)" value="ta" color={currentTheme.text} />
            <Picker.Item label="English" value="en" color={currentTheme.text} />
            <Picker.Item label="తెలుగు (Telugu)" value="te" color={currentTheme.text} />
            <Picker.Item label="संस्कृतम् (Sanskrit)" value="sa" color={currentTheme.text} />
          </Picker>
        </View>
      </View>
      {/* Ruler Section */}
      <View style={styles.cardSection}>
        <View style={styles.rulerRowHeader}>
          <Text style={styles.sectionHeader}>Show Ruler</Text>
          <View style={styles.rulerRow}>
            <Switch
              value={showRuler}
              onValueChange={setShowRuler}
            />
            <Text style={{ marginLeft: 12, fontSize: 16 }}>{showRuler ? 'On' : 'Off'}</Text>
          </View>
        </View>
      </View>
      {/* Theme Section (now in its own card) */}
      <View style={styles.cardSection}>
        <Text style={styles.sectionHeader}>Theme</Text>
        <View style={styles.themeRow}>
          <Picker
            selectedValue={theme}
            style={[styles.themePicker, { fontSize: 18 }]}
            onValueChange={(itemValue) => setTheme(itemValue)}
            itemStyle={{ fontSize: 18 }}
          >
            {Object.keys(themes).map((themeKey) => (
              <Picker.Item key={themeKey} label={themeKey.charAt(0).toUpperCase() + themeKey.slice(1)} value={themeKey} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f6f8fa',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 8,
    marginTop: 8,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222',
  },
  cardSection: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  rowSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 0,
  },
  colSection: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: 0,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 14,
    color: '#3a86ff',
    letterSpacing: 0.2,
  },
  langToggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  langBtn: {
    minWidth: 100,
  },
  rulerRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 0,
    marginBottom: 0,
  },
  rulerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    marginBottom: 0,
  },
  themeRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 4,
    width: '100%',
  },
  themePicker: {
    width: '100%',
    minWidth: 120,
    maxWidth: 400,
    height: 56,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
}); 