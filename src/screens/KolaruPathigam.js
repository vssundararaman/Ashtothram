import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useSettings } from '../SettingsProvider';
import poems_ta from '../assets/kolaru_pathigam_ta.json';
import poems_en from '../assets/kolaru_pathigam_en.json';
import shivaImg from '../assets/images/shiva.png';

const POEMS_PER_PAGE = 10;

export default function KolaruPathigamScreen() {
  const [expanded, setExpanded] = useState(null);
  const { language, theme, themes } = useSettings();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [bold, setBold] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showGeneralInfo, setShowGeneralInfo] = useState(false);
  const window = useWindowDimensions();
  const isWide = window.width >= 600;

  const poems = language === 'ta' ? poems_ta : poems_en;
  const heading = language === 'ta' ? 'கோளறு பதிகம்' : 'Kolaru Pathigam';
  const searchPlaceholder = language === 'ta' ? 'தேடு...' : 'Search...';

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

  const explanation_ta = `மதுரை பாண்டிய மன்னன் நின்ற சீர்நெடுமாறன் சமண மதத்தில் பற்று கொண்டு, மற்ற சமயங்களைப் புறக்கணித்து வந்தார். அவர் மனைவி மங்கையர்க்கரசியார் சைவ சமயத்தில் பற்று கொண்டிருந்தார். சமணர்களின் அடாத செயல்களால் நாட்டில் குழப்பங்கள் நிலவ, அதைத் தடுக்கும் பொருட்டு திருஞான சம்பந்தர் மதுரைக்கு எழுந்தருளி சைவம் தழைக்கவும் நாட்டில் நல்லாட்சி நிலவவும் அழைப்பு விடுத்தார். திருஞான சம்பந்தரும், திருநாவுக்கரச பெருமானும் அப்போது திருமறைக்காட்டில் இருந்தனர்.

மதுரையம்பதி அரசியாரின் வேண்டுகோளை ஏற்று திருஞான சம்பந்தர் மதுரை செல்ல விரும்பி திருநாவுக்கரசரிடம் விடைபெறச் சென்றார். திருநாவுக்கரசரோ, அச்சமயம் நிலவிய கோள்களின் அமைப்பும் போக்கும் தீமை பயக்கும் என்று கூறி சம்பந்தரின் பயணத்தை ஒத்திப்போடச் சொன்னார்.`;
  const explanation_en = `King Nedumaran of Madurai, a Pandya ruler, became attached to Jainism and disregarded other faiths. His wife, Mangayarkkarasiyar, remained devoted to Saivism. Due to the improper actions of the Jains, confusion prevailed in the kingdom. To restore order and promote Saivism, Thirugnana Sambandar was invited to Madurai. At that time, both Sambandar and Thirunavukkarasar were at Thirumaraikkaadu.

Accepting the queen's request, Sambandar wished to go to Madurai and went to bid farewell to Thirunavukkarasar. Thirunavukkarasar, however, warned that the planetary positions at that time were inauspicious and advised Sambandar to postpone his journey.`;

  const generalInfo_ta = `கோளறு பதிகம் என்பது திருஞானசம்பந்தர் அருளிய பதிகமாகும். இது நவகிரகங்களின் தீமைகளை நீக்கி, பக்தர்களுக்கு நன்மை செய்யும் பாடல்களாகும். இந்த பதிகம் சிவபெருமானின் மகிமையைப் புகழ்ந்து, பக்தர்களுக்கு வாழ்வில் நல்லது நிகழும் என்று உறுதி அளிக்கிறது.`;
  const generalInfo_en = `Kolaru Pathigam is a hymn composed by Thirugnana Sambandar. It is believed to remove the malefic effects of the nine planets and bring good fortune to devotees. The hymn praises Lord Shiva and assures devotees of auspiciousness and well-being.`;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}> 
      <Image source={shivaImg} style={styles.image} resizeMode="cover" />
      <Text style={[styles.title, { color: currentTheme.text }]}>{heading}</Text>
      <TextInput
        style={[styles.search, { backgroundColor: currentTheme.card, color: currentTheme.text, borderColor: currentTheme.accent }]}
        placeholder={searchPlaceholder}
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={currentTheme.accent}
      />
      {/* Explanation Section */}
      <View style={{ width: isWide ? 600 : '100%', alignSelf: 'center', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => setShowExplanation(v => !v)} style={[styles.roundControl, { alignSelf: 'flex-end', marginBottom: 4, borderWidth: showExplanation ? 2 : 1, borderColor: showExplanation ? currentTheme.primary : '#aaa', backgroundColor: showExplanation ? '#e6f0ff' : 'transparent' }]}> 
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: showExplanation ? currentTheme.primary : currentTheme.text }}>?</Text>
        </TouchableOpacity>
        {showExplanation && (
          <View style={{ backgroundColor: currentTheme.card, borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#eee' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: currentTheme.primary }}>{language === 'ta' ? 'விளக்கம்' : 'Explanation'}</Text>
            <Text style={{ fontSize: 15, color: currentTheme.text, lineHeight: 22 }}>
              {language === 'ta' ? explanation_ta : explanation_en}
            </Text>
          </View>
        )}
      </View>
      {paginatedPoems.map((item, idx) => {
        const poemIndex = idx + 1 + (page - 1) * POEMS_PER_PAGE;
        const isExpanded = expanded === poemIndex;
        return (
          <View key={poemIndex} style={[styles.poemBlock, { backgroundColor: currentTheme.card }]}> 
            <Text style={[styles.poemHeading, { color: currentTheme.primary, fontSize: fontSize + 2, fontWeight: bold ? 'bold' : 'normal' }]}>{item.title}</Text>
            <View style={styles.linesPanel}>
              {item.lines.map((line, i) => (
                <Text key={i} style={[styles.poemLine, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{line}</Text>
              ))}
            </View>
            {item.meaning && item.meaning.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginVertical: 0 }}>
                <Text
                  style={{ padding: 0, margin: 0 }}
                  onPress={() => setExpanded(isExpanded ? null : poemIndex)}
                  accessibilityLabel={isExpanded
                    ? (language === 'ta' ? 'விளக்கத்தை மறை' : 'Hide Meaning')
                    : (language === 'ta' ? 'விளக்கம்' : 'Show Meaning')}
                >
                  <MaterialIcons
                    name={isExpanded ? 'expand-less' : 'expand-more'}
                    size={28}
                    color={currentTheme.primary}
                  />
                </Text>
              </View>
            )}
            {isExpanded && (
              <View style={[styles.accordion, { backgroundColor: currentTheme.accent }]}> 
                {item.meaning.map((meaningLine, i) => (
                  <Text key={i} style={[styles.meaningText, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{meaningLine}</Text>
                ))}
              </View>
            )}
          </View>
        );
      })}
      {/* Pagination Controls and Zoom */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
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
      {/* General Info Section at the bottom */}
      {showGeneralInfo && (
        <View style={{ width: isWide ? 600 : '100%', alignSelf: 'center', marginTop: 20, marginBottom: 16 }}>
          <View style={{ backgroundColor: currentTheme.card, borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#eee' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: currentTheme.primary }}>{language === 'ta' ? 'பொது தகவல்' : 'General Info'}</Text>
            <Text style={{ fontSize: 15, color: currentTheme.text, lineHeight: 22 }}>
              {language === 'ta' ? generalInfo_ta : generalInfo_en}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    paddingBottom: 32,
    width: '100%',
  },
  image: { width: 120, height: 120, borderRadius: 60, marginTop: 12, marginBottom: 16 },
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