import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import { useSettings } from '../SettingsProvider';
import content_en from '../assets/AksharaPaamalai_en.json';
import content_ta from '../assets/AksharaPaamalai_ta.json';
import mahaperiyavaImg from '../assets/images/Mahaperiyava.jpg';

export default function AksharaPaamalaiScreen() {
  const { language, theme, themes } = useSettings();
  const window = useWindowDimensions();
  const isWide = window.width >= 600;
  const currentTheme = themes?.[theme] || { background: '#fff', text: '#222', card: '#f7f7f7', primary: '#007bff', accent: '#e0e0e0' };
  const heading = language === 'ta' ? 'அட்க்ஷரப்பாமாலை' : 'Akshara Paamalai';
  const explanationLabel = language === 'ta' ? 'விளக்கம்' : 'Meaning';
  const hideLabel = language === 'ta' ? 'விளக்கத்தை மறை' : 'Hide Meaning';
  const showLabel = language === 'ta' ? 'விளக்கம்' : 'Show Meaning';
  const searchPlaceholder = language === 'ta' ? 'தேடு...' : 'Search...';
  const poems = language === 'ta' ? content_ta : content_en;

  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [fontSize, setFontSize] = useState(17);

  // For single-poem array: filter lines and meaning lines by search
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
      <Image source={mahaperiyavaImg} style={styles.image} resizeMode="cover" />
      <Text style={[styles.title, { color: currentTheme.text }]}>{heading}</Text>
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
              },
            ]}
          >
            {filteredPoem.title}
          </Text>
          <View style={styles.linesPanel}>
            {filteredPoem.lines.length > 0 ? (
              filteredPoem.lines.map((line, i) => (
                <Text key={i} style={[styles.poemLine, { color: currentTheme.text, fontSize }]}>{line}</Text>
              ))
            ) : (
              <Text style={[styles.poemLine, { color: currentTheme.text, fontStyle: 'italic', fontSize }]}>{language === 'ta' ? 'பாடல் இல்லை' : 'No matching lines'}</Text>
            )}
          </View>
          {filteredPoem.meaning && filteredPoem.meaning.length > 0 && (
            <View>
              <TouchableOpacity onPress={() => setExpanded(expanded === 0 ? null : 0)}>
                <Text style={{ color: currentTheme.primary, textAlign: 'center', marginVertical: 6, fontWeight: 'bold', fontSize }}>
                  {expanded === 0 ? hideLabel : showLabel}
                </Text>
              </TouchableOpacity>
              {expanded === 0 && (
                <View style={[styles.accordion, { backgroundColor: currentTheme.accent }]}> 
                  {filteredPoem.meaning.map((meaningLine, i) => (
                    <Text key={i} style={[styles.meaningText, { color: currentTheme.text, fontSize }]}>{meaningLine}</Text>
                  ))}
                </View>
              )}
            </View>
          )}
          <Text style={styles.blankLine}>{' '}</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12, marginBottom: 8 }}>
        <TouchableOpacity onPress={() => setFontSize(f => Math.max(12, f - 2))} style={{ marginHorizontal: 8, padding: 6, backgroundColor: currentTheme.accent, borderRadius: 6 }}>
          <Text style={{ fontSize: 18, color: currentTheme.text }}>A-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFontSize(f => Math.min(36, f + 2))} style={{ marginHorizontal: 8, padding: 6, backgroundColor: currentTheme.accent, borderRadius: 6 }}>
          <Text style={{ fontSize: 22, color: currentTheme.text }}>A+</Text>
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
}); 