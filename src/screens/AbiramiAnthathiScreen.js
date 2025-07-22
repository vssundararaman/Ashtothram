import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import { List, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useSettings } from '../SettingsProvider';
import poems from '../assets/abirami_anthathi.json';

const POEMS_PER_PAGE = 10;

export default function AbiramiAnthathiScreen() {
  const [expanded, setExpanded] = useState(null);
  const { language, theme, themes } = useSettings();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const window = useWindowDimensions();
  const isWide = window.width >= 600; // Responsive breakpoint

  const heading = language === 'ta' ? 'அபிராமி அந்தாதி' : 'Abirami Anthathi';
  const verseLabel = language === 'ta' ? 'பாடல்' : 'Verse';
  const explanationLabel = language === 'ta' ? 'விளக்கம்' : 'Explanation';
  const searchPlaceholder = language === 'ta' ? 'தேடு...' : 'Search...';

  // Filter poems by search
  const filteredPoems = useMemo(() => {
    if (!search.trim()) return poems;
    const s = search.toLowerCase();
    return poems.filter(poem =>
      poem.title.toLowerCase().includes(s) ||
      poem.lines.join(' ').toLowerCase().includes(s) ||
      (poem.meaning && poem.meaning.join(' ').toLowerCase().includes(s))
    );
  }, [search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPoems.length / POEMS_PER_PAGE));
  const paginatedPoems = filteredPoems.slice((page - 1) * POEMS_PER_PAGE, page * POEMS_PER_PAGE);

  // Reset to page 1 if search changes or filteredPoems changes
  React.useEffect(() => { setPage(1); }, [search, filteredPoems.length]);

  // Fix expanded index when page changes
  React.useEffect(() => { setExpanded(null); }, [page, search]);

  const currentTheme = themes[theme] || themes.light;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Abirami.jpg' }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: currentTheme.text }]}>{heading}</Text>
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
            <Text style={[styles.poemHeading, { color: currentTheme.primary }]}>{item.title}</Text>
            <View style={styles.linesPanel}>
              {item.lines.map((line, i) => (
                <Text key={i} style={[styles.poemLine, { color: currentTheme.text }]}>{line}</Text>
              ))}
            </View>
            {item.meaning && item.meaning.length > 0 && (
              <View>
                <Text
                  style={{ color: currentTheme.primary, textAlign: 'center', marginVertical: 6, fontWeight: 'bold' }}
                  onPress={() => setExpanded(isExpanded ? null : poemIndex)}
                >
                  {isExpanded ? (language === 'ta' ? 'விளக்கத்தை மறை' : 'Hide Meaning') : (language === 'ta' ? 'விளக்கம்' : 'Show Meaning')}
                </Text>
                {isExpanded && (
                  <View style={[styles.accordion, { backgroundColor: currentTheme.accent }]}>
                    {item.meaning.map((meaningLine, i) => (
                      <Text key={i} style={[styles.meaningText, { color: currentTheme.text }]}>{meaningLine}</Text>
                    ))}
                  </View>
                )}
              </View>
            )}
            <Text style={styles.blankLine}>{' '}</Text>
          </View>
        );
      })}
      {/* Pagination Controls */}
      <View style={styles.pagination}>
        <Button
          disabled={page === 1}
          onPress={() => setPage(page - 1)}
          accessibilityLabel={language === 'ta' ? 'முந்தைய பக்கம்' : 'Previous page'}
          contentStyle={[styles.iconBtn, { backgroundColor: currentTheme.accent }]}
        >
          <MaterialIcons name="chevron-left" size={28} color={currentTheme.primary} />
        </Button>
        <Text style={[styles.pageNum, { color: currentTheme.text }]}>{page} / {totalPages}</Text>
        <Button
          disabled={page === totalPages}
          onPress={() => setPage(page + 1)}
          accessibilityLabel={language === 'ta' ? 'அடுத்த பக்கம்' : 'Next page'}
          contentStyle={[styles.iconBtn, { backgroundColor: currentTheme.accent }]}
        >
          <MaterialIcons name="chevron-right" size={28} color={currentTheme.primary} />
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
    maxWidth: 400,
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
    maxWidth: 500,
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
    textAlign: 'center',
  },
  linesPanel: {
    marginBottom: 8,
  },
  poemLine: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
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
    textAlign: 'center',
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