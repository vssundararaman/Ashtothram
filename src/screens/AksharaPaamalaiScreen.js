import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import { useSettings } from '../SettingsProvider';
import poems_ta from '../assets/AksharaPaamalai_ta.json';
import poems_en from '../assets/AksharaPaamalai_en.json';
import mahaperiyavaImg from '../assets/images/Mahaperiyava.jpg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PinchZoomView from '../../PinchZoomView';

export default function AksharaPaamalaiScreen() {
  const { language, theme, themes, showRuler } = useSettings();
  const window = useWindowDimensions();
  const isWide = window.width >= 600;
  const currentTheme = themes?.[theme] || { background: '#fff', text: '#222', card: '#f7f7f7', primary: '#007bff', accent: '#e0e0e0' };
  const heading = language === 'ta' ? 'அட்க்ஷரப் பாமாலை' : 'Akshara Paamalai';
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
  const [showGeneralInfo, setShowGeneralInfo] = useState(false); // Hide info by default
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    <PinchZoomView>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}>
        <Image source={mahaperiyavaImg} style={styles.image} resizeMode="cover" />
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
        {/* Info Section at the top, toggled by i button */}
        {showGeneralInfo && (
          <View style={[styles.accordion, { backgroundColor: currentTheme.accent, width: isWide ? 600 : '100%', alignSelf: 'center', marginBottom: 16, marginTop: 8 }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: currentTheme.primary }}>
              {language === 'ta' ? 'பொது தகவல்' : 'General Info'}
            </Text>
            <Text style={{ fontSize, color: currentTheme.text, lineHeight: 22, fontWeight: bold ? 'bold' : 'normal', textAlign: 'left', alignSelf: 'stretch' }}>
              {language === 'ta'
                ? [
                  'அட்க்ஷரப் பாமாலை என்பது ஸ்ரீ சந்திரசேகரேந்திர சரஸ்வதி மகா ஸ்வாமிகள் அவர்களுக்கு அர்ப்பணிக்கப்பட்ட ஒரு பக்தி பாடல் தொகுப்பாகும். இதில் உள்ள ஒவ்வொரு வரியும் பக்தர்களுக்கு ஆன்மிக உற்சாகம் மற்றும் ஆனந்தம் அளிக்கிறது.\n\nஇந்த பாடலை 1983-ல் ஸ்ரீ வெங்கடேசன் அவர்கள் ஸ்ரீ மகா பெரியவா முன்னிலையில் பாடினார். பாடல் முடிந்ததும், "',
                  <Text key="bold" style={{ fontWeight: 'bold', fontSize }}>
                    பெரியவா வருவேன்
                  </Text>,
                  '" என்று ஸ்ரீ பெரியவா ஆசீர்வதித்தார்.'
                ]
                : [
                  'Akshara Paamalai is a devotional hymn dedicated to Sri Chandrasekharendra Saraswati Mahaswamigal. Each line in this collection inspires spiritual joy and devotion in the hearts of devotees.\n\nThis song was sung by Sri Venkatesan in front of Sri Mahaperiyava in 1983. After singing, he humbly requested Sri Periyava that whenever anyone sings this song, Periyava should come there. Sri Mahaperiyava blessed him saying, "',
                  <Text key="bold" style={{ fontWeight: 'bold', fontSize }}>
                    I will come
                  </Text>,
                  '".'
                ]}
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
                },
              ]}
            >
              {filteredPoem.title}
            </Text>
            <View style={styles.linesPanel}>
              {filteredPoem.lines.length > 0 ? (
                filteredPoem.lines.map((line, i) => {
                  if (language === 'en' && line.includes('I will come')) {
                    const parts = line.split(/(I will come)/);
                    return (
                      <View key={i}>
                        <Text style={[styles.poemLine, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
                          {parts.map((part, idx) =>
                            part === 'I will come'
                              ? <Text key={idx} style={{ fontWeight: 'bold' }}>{part}</Text>
                              : part
                          )}
                        </Text>
                        {showRuler && <View style={styles.ruler} />}
                      </View>
                    );
                  }
                  if (language === 'ta' && line.includes('வருவேன்')) {
                    const parts = line.split(/(வருவேன்)/);
                    return (
                      <View key={i}>
                        <Text style={[styles.poemLine, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
                          {parts.map((part, idx) =>
                            part === 'வருவேன்'
                              ? <Text key={idx} style={{ fontWeight: 'bold' }}>{part}</Text>
                              : part
                          )}
                        </Text>
                        {showRuler && <View style={styles.ruler} />}
                      </View>
                    );
                  }
                  return (
                    <View key={i}>
                      <Text style={[styles.poemLine, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{line}</Text>
                      {showRuler && <View style={styles.ruler} />}
                    </View>
                  );
                })
              ) : (
                <Text style={[styles.poemLine, { color: currentTheme.text, fontStyle: 'italic', fontSize }]}>{language === 'ta' ? 'பாடல் இல்லை' : 'No matching lines'}</Text>
              )}
            </View>
            {filteredPoem.meaning && filteredPoem.meaning.length > 0 && (
              <View />
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
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
  },
  ruler: { height: 1, backgroundColor: '#ccc', marginVertical: 4, alignSelf: 'stretch', opacity: 0.7 },
}); 