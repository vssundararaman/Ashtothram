import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSettings } from '../SettingsProvider';
import content_en from '../assets/BairavaRundram_en.json';
import content_ta from '../assets/BairavaRundram_ta.json';
import shivaImg from '../assets/images/shiva.png';
import { Button } from 'react-native-paper';

export default function BairavaRundramScreen() {
  const { language, theme, themes, showRuler } = useSettings();
  const window = useWindowDimensions();
  const isWide = window.width >= 600;
  const currentTheme = themes?.[theme] || { background: '#fff', text: '#222', card: '#f7f7f7', primary: '#007bff', accent: '#e0e0e0' };
  const heading = language === 'ta' ? 'பைரவர் ருந்திரம்' : 'Bairava Rundram';
  const explanationLabel = language === 'ta' ? 'விளக்கம்' : 'Meaning';
  const hideLabel = language === 'ta' ? 'விளக்கத்தை மறை' : 'Hide Meaning';
  const showLabel = language === 'ta' ? 'விளக்கம்' : 'Show Meaning';
  const searchPlaceholder = language === 'ta' ? 'தேடு...' : 'Search...';
  const poems = language === 'ta' ? content_ta : content_en;

  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [fontSize, setFontSize] = useState(17);
  const [bold, setBold] = useState(false);

  const filteredPoem = useMemo(() => {
    if (!poems.length) return null;
    const poem = poems[0];
    if (!search.trim()) return poem;
    const s = search.toLowerCase();
    return {
      ...poem,
      lines: poem.lines.filter(line => line.toLowerCase().includes(s)),
      meaning: poem.meaning ? poem.meaning.filter(meaningLine => meaningLine.toLowerCase().includes(s)) : [],
    };
  }, [search, poems]);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}> 
      <Image source={shivaImg} style={styles.image} resizeMode="cover" />
      <Text style={[styles.title, { color: currentTheme.text, fontWeight: bold ? 'bold' : 'normal' }]}>{heading}</Text>
      <TextInput
        style={[styles.search, { backgroundColor: currentTheme.card, color: currentTheme.text, borderColor: currentTheme.accent }]}
        placeholder={searchPlaceholder}
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={currentTheme.accent}
      />
      {filteredPoem && (
        <View style={[styles.poemBlock, { backgroundColor: currentTheme.card, width: isWide ? 600 : '100%' }]}> 
          <Text
            style={[
              styles.poemHeading,
              {
                backgroundColor: currentTheme.primary,
                color: '#fff',
                borderRadius: 6,
                paddingVertical: 6,
                paddingHorizontal: 8,
                fontSize: fontSize + 3,
                fontWeight: bold ? 'bold' : 'normal',
              },
            ]}
          >
            {filteredPoem.title}
          </Text>
          <View style={styles.linesPanel}>
            {filteredPoem.lines.length > 0 ? (
              filteredPoem.lines.map((line, i) => (
                <View key={i}>
                  <Text style={[styles.poemLine, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{line}</Text>
                  {showRuler && <View style={styles.ruler} />}
                </View>
              ))
            ) : (
              <Text style={[styles.poemLine, { color: currentTheme.text, fontStyle: 'italic', fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{language === 'ta' ? 'பாடல் இல்லை' : 'No matching lines'}</Text>
            )}
          </View>
          {filteredPoem.meaning && filteredPoem.meaning.length > 0 && (
            <View>
              <TouchableOpacity onPress={() => setExpanded(expanded === 0 ? null : 0)}>
                <Text style={{ color: currentTheme.primary, textAlign: 'center', marginVertical: 6, fontWeight: 'bold', fontSize, fontWeight: bold ? 'bold' : 'normal' }}>
                  {expanded === 0 ? hideLabel : showLabel}
                </Text>
              </TouchableOpacity>
              {expanded === 0 && (
                <View style={[styles.accordion, { backgroundColor: currentTheme.accent }]}> 
                  {filteredPoem.meaning.map((meaningLine, i) => (
                    <Text key={i} style={[styles.meaningText, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{meaningLine}</Text>
                  ))}
                </View>
              )}
            </View>
          )}
          <Text style={styles.blankLine}>{' '}</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
        <TouchableOpacity onPress={() => setFontSize(f => Math.max(12, f - 2))} style={styles.roundControl}>
          <Text style={{ fontSize: 13 }}>A-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFontSize(f => Math.min(36, f + 2))} style={[styles.roundControl, { marginLeft: 4 }]}>
          <Text style={{ fontSize: 13 }}>A+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setBold(b => !b)} style={[styles.roundControl, { marginLeft: 4, borderWidth: bold ? 2 : 1, borderColor: bold ? '#007AFF' : '#aaa', backgroundColor: bold ? '#e6f0ff' : 'transparent' }]}>
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: bold ? '#007AFF' : '#333', textAlign: 'center' }}>B</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 120, height: 120, borderRadius: 60, marginTop: 12, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  search: {
    width: '100%',
    maxWidth: 600,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  poemBlock: { borderRadius: 12, padding: 16, marginBottom: 18, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  poemHeading: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  linesPanel: { marginBottom: 8 },
  poemLine: { fontSize: 17, marginVertical: 1, textAlign: 'left', alignSelf: 'stretch', lineHeight: 28 },
  accordion: { borderRadius: 8, padding: 10, marginTop: 4 },
  meaningText: { fontSize: 15, marginBottom: 2, textAlign: 'left', alignSelf: 'stretch', lineHeight: 26 },
  blankLine: { height: 8 },
  roundControl: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 0,
  },
  ruler: { height: 1, backgroundColor: '#ccc', marginVertical: 4, alignSelf: 'stretch', opacity: 0.7 },
});