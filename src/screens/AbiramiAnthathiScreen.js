import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import { List, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useSettings } from '../SettingsProvider';
import poems_ta from '../assets/abirami_anthathi_ta.json';
import poems_en from '../assets/abirami_anthathi_en.json';
import icon from '../assets/images/Abirami.png';

const POEMS_PER_PAGE = 10;

export default function AbiramiAnthathiScreen() {
  const [expanded, setExpanded] = useState(null);
  const { language, theme, themes } = useSettings();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [bold, setBold] = useState(false);
  const window = useWindowDimensions();
  const isWide = window.width >= 600; // Responsive breakpoint

  const heading = language === 'ta' ? 'அபிராமி அந்தாதி' : 'Abirami Anthathi';
  const verseLabel = language === 'ta' ? 'பாடல்' : 'Verse';
  const explanationLabel = language === 'ta' ? 'விளக்கம்' : 'Explanation';
  const searchPlaceholder = language === 'ta' ? 'தேடு...' : 'Search...';

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
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Image
        source={icon}
        style={{ width: 80, height: 80, borderRadius: 24, marginTop: 12, marginBottom: 8 }}
        resizeMode="cover"
      />
      <Text style={[styles.title, { color: currentTheme.text }]}>{heading}</Text>
      {/* Test local image */}
      {/* Test different remote image */}
      <TextInput
        style={[styles.search, { backgroundColor: currentTheme.card, color: currentTheme.text, borderColor: currentTheme.accent }]}
        placeholder={searchPlaceholder}
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={currentTheme.accent}
      />
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
              <View>
                <Text
                  style={{ color: currentTheme.primary, textAlign: 'center', marginVertical: 6, fontWeight: bold ? 'bold' : 'normal', fontSize }}
                  onPress={() => setExpanded(isExpanded ? null : poemIndex)}
                >
                  {isExpanded ? (language === 'ta' ? 'விளக்கத்தை மறை' : 'Hide Meaning') : (language === 'ta' ? 'விளக்கம்' : 'Show Meaning')}
                </Text>
                {isExpanded && (
                  <View style={[styles.accordion, { backgroundColor: currentTheme.accent }]}> 
                    {(Array.isArray(item.meaning) ? item.meaning : [item.meaning]).map((meaningLine, i) => (
                      <Text key={i} style={[styles.meaningText, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{meaningLine}</Text>
                    ))}
                  </View>
                )}
              </View>
            )}
            <Text style={styles.blankLine}>{' '}</Text>
          </View>
        );
      })}
      {/* Pagination Controls and Zoom */}
      <View style={[styles.pagination, { flexDirection: 'row', alignItems: 'center' }]}> 
        <Button
          disabled={page === 1}
          onPress={() => setPage(page - 1)}
          accessibilityLabel={language === 'ta' ? 'முந்தைய பக்கம்' : 'Previous page'}
          contentStyle={[styles.iconBtn, { backgroundColor: currentTheme.accent }]}
          style={{ minWidth: 28, height: 28, justifyContent: 'center', alignItems: 'center' }}
        >
          <MaterialIcons name="chevron-left" size={18} color={currentTheme.primary} />
        </Button>
        <Text style={[styles.pageNum, { color: currentTheme.text, marginLeft: 4, fontSize: 13 }]}>{page} / {totalPages}</Text>
        <Button
          disabled={page === totalPages}
          onPress={() => setPage(page + 1)}
          accessibilityLabel={language === 'ta' ? 'அடுத்த பக்கம்' : 'Next page'}
          contentStyle={[styles.iconBtn, { backgroundColor: currentTheme.accent }]}
          style={{ minWidth: 28, height: 28, justifyContent: 'center', alignItems: 'center', marginLeft: 4 }}
        >
          <MaterialIcons name="chevron-right" size={18} color={currentTheme.primary} />
        </Button>
        <Button onPress={() => setFontSize(f => Math.max(12, f - 2))} mode="outlined" style={{ minWidth: 28, height: 28, justifyContent: 'center', alignItems: 'center', marginLeft: 4, borderRadius: 14 }}>
          <Text style={{ fontSize: 13 }}>A-</Text>
        </Button>
        <Button onPress={() => setFontSize(f => Math.min(36, f + 2))} mode="outlined" style={{ minWidth: 28, height: 28, justifyContent: 'center', alignItems: 'center', marginLeft: 4, borderRadius: 14 }}>
          <Text style={{ fontSize: 13 }}>A+</Text>
        </Button>
        <Button onPress={() => setBold(b => !b)} mode={bold ? 'contained' : 'outlined'} style={{ minWidth: 28, height: 28, justifyContent: 'center', alignItems: 'center', marginLeft: 4, borderWidth: bold ? 2 : 1, borderColor: bold ? currentTheme.primary : '#aaa', paddingVertical: 0, paddingHorizontal: 0, borderRadius: 14 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: bold ? currentTheme.primary : currentTheme.text, textAlign: 'center' }}>B</Text>
        </Button>
      </View>
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
}); 