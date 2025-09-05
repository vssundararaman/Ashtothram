import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSettings } from '../SettingsProvider';
import poems_ta from '../assets/BairavaRundram_ta.json';
import poems_en from '../assets/BairavaRundram_en.json';
import shivaImg from '../assets/images/shiva.png';
import { Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PinchZoomView from '../../PinchZoomView';

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
  const poemsData = language === 'ta' ? poems_ta : poems_en;
  // const generalInfo = poemsData.generalInfo; // Not present in JSON, handled below
  const poems = poemsData; // Use the array directly

  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [fontSize, setFontSize] = useState(17);
  const [bold, setBold] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showGeneralInfo, setShowGeneralInfo] = useState(false);

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

  const generalInfo_ta = `பைரவர் ருந்திரம் என்பது சிவபெருமானின் பைரவர் வடிவத்தைப் போற்றும் தமிழ் பாடலாகும். இது பக்தர்களுக்கு பாதுகாப்பும், சக்தியும், ஆன்மிக நன்மைகளும் தரும் என்று நம்பப்படுகிறது.`;
  const generalInfo_en = `Bairava Rundram is a Tamil hymn praising Lord Shiva in his Bairava form. It is believed to grant protection, strength, and spiritual benefits to devotees.`;

  return (
    <PinchZoomView>
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
        {/* Top Menu Bar Controls - Remove pagination controls, keep only font size, bold, and info */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 8, marginBottom: 12 }}>
          <TouchableOpacity onPress={() => setFontSize(f => Math.max(12, f - 2))} style={[styles.roundControl, { marginLeft: 4 }]}>
            <Text style={{ fontSize: 13 }}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontSize(f => Math.min(36, f + 2))} style={[styles.roundControl, { marginLeft: 4 }]}>
            <Text style={{ fontSize: 13 }}>A+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBold(b => !b)} style={[styles.roundControl, { marginLeft: 4, borderWidth: bold ? 2 : 1, borderColor: bold ? currentTheme.primary : '#aaa', backgroundColor: bold ? '#e6f0ff' : 'transparent' }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: bold ? currentTheme.primary : currentTheme.text, textAlign: 'center' }}>B</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowGeneralInfo(v => !v)} style={[styles.roundControl, { marginLeft: 4, borderWidth: showGeneralInfo ? 2 : 1, borderColor: showGeneralInfo ? currentTheme.primary : '#aaa', backgroundColor: showGeneralInfo ? '#e6f0ff' : 'transparent' }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: showGeneralInfo ? currentTheme.primary : currentTheme.text }}>i</Text>
          </TouchableOpacity>
        </View>
        {/* Info Section at the top, styled like AksharaPaamalaiScreen */}
        {showGeneralInfo && (
          <View style={[styles.accordion, { backgroundColor: currentTheme.accent, width: isWide ? 600 : '100%', alignSelf: 'center', marginBottom: 16, marginTop: 8 }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: currentTheme.primary }}>{language === 'ta' ? 'பொது தகவல்' : 'General Info'}</Text>
            <Text style={{ fontSize: 15, color: currentTheme.text, lineHeight: 22, fontWeight: bold ? 'bold' : 'normal' }}>
              {generalInfo_ta}
            </Text>
          </View>
        )}
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
                <TouchableOpacity onPress={() => setExpanded(expanded === 1 ? null : 1)}>
                  <Text style={{ color: currentTheme.primary, textAlign: 'center', marginVertical: 6, fontWeight: 'bold', fontSize, fontWeight: bold ? 'bold' : 'normal' }}>
                    {expanded === 1 ? hideLabel : showLabel}
                  </Text>
                </TouchableOpacity>
                {expanded === 1 && (
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
      </ScrollView>
    </PinchZoomView>
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
  pageNum: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#333',
  },
  ruler: { height: 1, backgroundColor: '#ccc', marginVertical: 4, alignSelf: 'stretch', opacity: 0.7 },
});