import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native';
import { List, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useSettings } from '../SettingsProvider';
import poems_ta from '../assets/abirami_anthathi_ta.json';
import poems_en from '../assets/abirami_anthathi_en.json';
import icon from '../assets/images/Abirami.png';
import PinchZoomView from '../../PinchZoomView';

const POEMS_PER_PAGE = 10;

export default function AbiramiAnthathiScreen() {
  const [expanded, setExpanded] = useState(null);
  const { language, theme, themes, showRuler } = useSettings();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [bold, setBold] = useState(false);
  const [showGeneralInfo, setShowGeneralInfo] = useState(false);
  const window = useWindowDimensions();
  const isWide = window.width >= 600; // Responsive breakpoint

  const heading = language === 'ta' ? 'அபிராமி அந்தாதி' : 'Abirami Anthathi';
  const verseLabel = language === 'ta' ? 'பாடல்' : 'Verse';
  const explanationLabel = language === 'ta' ? 'விளக்கம்' : 'Explanation';
  const searchPlaceholder = language === 'ta' ? 'தேடு...' : 'Search...';

  const generalInfo_ta = `அபிராமி அந்தாதி என்பது அபிராமி பட்டரால் பாடப்பட்ட 100 பாடல்களின் தொகுப்பாகும். தேவியின் அருளை வேண்டி பாடப்பட்ட இந்த அந்தாதி, சங்கீத மற்றும் ஆன்மீக வளங்களை ஒன்றிணைத்தது. "அந்தாதி" எனப்படும் பாட்டுவகையில், ஒவ்வொரு பாடலும் முந்தைய பாடலின் இறுதி சொல்லால் தொடங்குகிறது. இதனை ஓதுவதால் மன அமைதி, அறிவு வளர்ச்சி, துன்பநிவாரணம் மற்றும் பக்தியில் நிலைத்தன்மை கிடைக்கும் என நம்பப்படுகிறது. அபிராமி தேவியின் அருள் பெறவும், வாழ்க்கையில் வளம், ஆரோக்கியம், நல்ல மனநிலை பெறவும் அபிராமி அந்தாதி ஓதுதல் ஒரு ஆன்மீக வழிபாடாக கருதப்படுகிறது.`;
  const generalInfo_en = `Abirami Anthathi is a collection of 100 devotional verses composed by Abirami Pattar in praise of Goddess Abirami. It belongs to the poetic style "Anthathi," where each verse begins with the ending word of the previous one. Reciting Abirami Anthathi is believed to bring peace of mind, wisdom, relief from difficulties, and deep devotion. Tradition holds that chanting these verses invokes the blessings of Goddess Abirami, granting prosperity, health, and mental strength to devotees.`;

  const poems = language === 'ta' ? poems_ta : poems_en;

  // Filter poems by search
  const filteredPoems = useMemo(() => {
    if (!search.trim()) return poems;
    const words = search.toLowerCase().split(/\s+/).filter(Boolean);
    return poems.filter(poem => {
      const haystack = [
        poem.title,
        poem.lines.join(' '),
        poem.meaning ? poem.meaning.join(' ') : ''
      ].join(' ').toLowerCase();
      return words.every(word => haystack.includes(word));
    });
  }, [search, poems]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPoems.length / POEMS_PER_PAGE));
  const paginatedPoems = filteredPoems.slice((page - 1) * POEMS_PER_PAGE, page * POEMS_PER_PAGE);

  // Reset to page 1 if search changes or filteredPoems changes
  React.useEffect(() => { setPage(1); }, [search, filteredPoems.length]);

  // Fix expanded index when page changes
  React.useEffect(() => { setExpanded(null); }, [page, search]);

  // Reset font size when page changes
  React.useEffect(() => { setFontSize(16); }, [page]);

  const currentTheme = themes[theme] || themes.light;

  return (
    <PinchZoomView>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}>
        <Image
          source={icon}
          style={{ width: 80, height: 80, borderRadius: 24, marginTop: 12, marginBottom: 8 }}
          resizeMode="cover"
        />
        <Text style={[styles.title, { color: currentTheme.text }]}>{heading}</Text>
        <TextInput
          style={[styles.search, { backgroundColor: currentTheme.card, color: currentTheme.text, borderColor: currentTheme.accent }]}
          placeholder={searchPlaceholder}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={currentTheme.accent}
        />
        {/* Top Menu Bar Controls */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 8, marginBottom: 12 }}>
          <TouchableOpacity disabled={page === 1} onPress={() => setPage(page - 1)} style={styles.roundControl}>
            <MaterialIcons name="chevron-left" size={18} color={currentTheme.primary} />
          </TouchableOpacity>
          <Text style={[styles.pageNum, { color: currentTheme.text, marginLeft: 4, fontSize: 13 }]}>{page} / {totalPages}</Text>
          <TouchableOpacity disabled={page === totalPages} onPress={() => setPage(page + 1)} style={[styles.roundControl, { marginLeft: 4 }]}>
            <MaterialIcons name="chevron-right" size={18} color={currentTheme.primary} />
          </TouchableOpacity>
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
          <View style={[styles.accordion, { backgroundColor: currentTheme.accent, width: isWide ? 600 : '100%', alignSelf: 'center', marginBottom: 16, marginTop: 8, paddingHorizontal: 12 }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: currentTheme.primary }}>{language === 'ta' ? 'பொது தகவல்' : 'General Info'}</Text>
            <Text style={{ fontSize, color: currentTheme.text, lineHeight: 22, fontWeight: bold ? 'bold' : 'normal', textAlign: 'left', alignSelf: 'stretch' }}>
              {language === 'ta' ? generalInfo_ta : generalInfo_en}
            </Text>
          </View>
        )}
        {paginatedPoems.map((item, idx) => {
          const poemIndex = idx + 1 + (page - 1) * POEMS_PER_PAGE;
          const isExpanded = expanded === poemIndex;
          return (
            <View key={poemIndex} style={[styles.poemBlock, { backgroundColor: currentTheme.card }]}>
              <Text style={[styles.poemHeading, { color: currentTheme.primary, fontSize: fontSize + 2, fontWeight: bold ? 'bold' : 'normal' }]} selectable={true}>{item.title}</Text>
              <View style={styles.linesPanel}>
                {item.lines.map((line, i) => (
                  <View key={i}>
                    <Text style={[styles.poemLine, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]} selectable={true}>{line}</Text>
                    {showRuler && <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 4, alignSelf: 'stretch', opacity: 0.7 }} />}
                  </View>
                ))}
              </View>
              {item.meaning && item.meaning.length > 0 && (
                <View>
                  <Text
                    style={{ color: currentTheme.primary, textAlign: 'center', marginVertical: 6, fontWeight: bold ? 'bold' : 'normal', fontSize }}
                    onPress={() => setExpanded(isExpanded ? null : poemIndex)}
                    selectable={true}
                  >
                    {isExpanded ? (language === 'ta' ? 'விளக்கத்தை மறை' : 'Hide Meaning') : (language === 'ta' ? 'விளக்கம்' : 'Show Meaning')}
                  </Text>
                  {isExpanded && (
                    <View style={[styles.accordion, { backgroundColor: currentTheme.accent }]}>
                      {(Array.isArray(item.meaning) ? item.meaning : [item.meaning]).map((meaningLine, i) => (
                        <Text key={i} style={[styles.meaningText, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]} selectable={true}>{meaningLine}</Text>
                      ))}
                    </View>
                  )}
                </View>
              )}
              <Text style={styles.blankLine}>{' '}</Text>
            </View>
          );
        })}
      </ScrollView>
    </PinchZoomView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    paddingBottom: 32,
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    marginTop: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
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
  poemBlock: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    elevation: 1,
  },
  poemHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'left',
  },
  linesPanel: {
    marginBottom: 8,
  },
  poemLine: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  accordion: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginTop: 8,
  },
  meaningText: {
    fontSize: 15,
    color: '#555',
    padding: 10,
    textAlign: 'left',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  pageNum: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  iconBtn: {
    minWidth: 40,
    justifyContent: 'center',
  },
  blankLine: {
    marginBottom: 8,
  },
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
}); 