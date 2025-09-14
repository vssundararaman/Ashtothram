import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { useSettings } from '../SettingsProvider';
import vinayagarImg from '../assets/images/Vinayagar.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PinchZoomView from '../../PinchZoomView';
import { db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function VinayagarAshtothramScreen() {
    const { language, theme, themes, showRuler } = useSettings();
    const window = useWindowDimensions();
    const isWide = window.width >= 600;
    const currentTheme = themes?.[theme] || { background: '#fff', text: '#222', card: '#f7f7f7', primary: '#007bff', accent: '#e0e0e0' };
    const heading = language === 'ta' ? 'விநாயகர் அஷ்டோத்திரம்' : 'Vinayagar Ashtothram';
    const explanationLabel = language === 'ta' ? 'விளக்கம்' : 'Meaning';
    const hideLabel = language === 'ta' ? 'விளக்கத்தை மறை' : 'Hide Meaning';
    const showLabel = language === 'ta' ? 'விளக்கம்' : 'Show Meaning';
    const searchPlaceholder = language === 'ta' ? 'தேடு...' : 'Search...';

    const [poems, setPoems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [fontSize, setFontSize] = useState(17);
    const [bold, setBold] = useState(false);
    const [showGeneralInfo, setShowGeneralInfo] = useState(false);

    // TEMP: Seed Firestore if empty
    useEffect(() => {
        async function seedIfEmpty() {
            const docRef = doc(db, 'vinayagarAshtothram', 'content');
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                const taContent = [
                    {
                        title: "விநாயகர் அஷ்டோத்திரம்",
                        lines: [
                            "ஓம் விநாயகாய நமஹ",
                            "ஓம் விக்னராஜாய நமஹ",
                            "ஓம் கௌரிபுத்ராய நமஹ",
                            "ஓம் கணேஷ்வராய நமஹ"
                        ],
                        meaning: [
                            "விநாயகருக்கு வணக்கம்.",
                            "விக்னங்களின் அரசருக்கு வணக்கம்.",
                            "கௌரியின் மகனுக்கு வணக்கம்.",
                            "கணங்களின் ஆண்டவருக்கு வணக்கம்."
                        ]
                    }
                ];
                const enContent = [
                    {
                        title: "Vinayagar Ashtothram",
                        lines: [
                            "Om Vinayakaya Namaha",
                            "Om Vighnarajaya Namaha",
                            "Om Gauriputraya Namaha",
                            "Om Ganeshvaraya Namaha"
                        ],
                        meaning: [
                            "Salutations to Vinayaka.",
                            "Salutations to the king of obstacles.",
                            "Salutations to the son of Gauri.",
                            "Salutations to the lord of the Ganas."
                        ]
                    }
                ];
                await setDoc(docRef, { ta: taContent, en: enContent });
            }
        }
        seedIfEmpty();
    }, []);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const docRef = doc(db, 'vinayagarAshtothram', 'content');
                const docSnap = await getDoc(docRef);
                console.log('language:', language);
                if (docSnap.exists()) {
                    console.log('Firestore data:', docSnap.data());
                    const poemsData = docSnap.data()[language] || [];
                    setPoems(poemsData);
                    console.log('poems:', poemsData);
                } else {
                    setPoems([]);
                    console.log('Firestore document does not exist');
                }
            } catch (e) {
                setPoems([]);
                console.log('Firestore fetch error:', e);
            }
            setLoading(false);
        }
        fetchData();
    }, [language]);

    const filteredPoem = useMemo(() => {
        if (!poems || !Array.isArray(poems) || poems.length === 0) return null;
        const poem = poems[0];
        if (!poem) return null;
        if (!search.trim()) return poem;
        const s = search.toLowerCase();
        return {
            ...poem,
            lines: Array.isArray(poem.lines) ? poem.lines.filter(line => line.toLowerCase().includes(s)) : [],
            meaning: Array.isArray(poem.meaning) ? poem.meaning.filter(meaningLine => meaningLine.toLowerCase().includes(s)) : [],
        };
    }, [search, poems]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: currentTheme.background }}>
                <ActivityIndicator size="large" color={currentTheme.primary} />
                <Text style={{ marginTop: 12, color: currentTheme.text }}>Loading...</Text>
            </View>
        );
    }
    if (!filteredPoem) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: currentTheme.background }}>
                <Text style={{ color: currentTheme.text, fontSize: 18 }}>No content found.</Text>
            </View>
        );
    }

    return (
        <PinchZoomView>
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}>
                <Image source={vinayagarImg} style={styles.image} resizeMode="cover" />
                <Text style={[styles.title, { color: currentTheme.text, fontWeight: bold ? 'bold' : 'normal' }]}>{heading}</Text>
                <TextInput
                    style={[styles.search, { backgroundColor: currentTheme.card, color: currentTheme.text, borderColor: currentTheme.accent }]}
                    placeholder={searchPlaceholder}
                    value={search}
                    onChangeText={setSearch}
                    placeholderTextColor={currentTheme.accent}
                />
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
                {showGeneralInfo && (
                    <View style={[styles.accordion, { backgroundColor: currentTheme.accent, width: isWide ? 600 : '100%', alignSelf: 'center', marginBottom: 16, marginTop: 8 }]}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: currentTheme.primary }}>
                            {language === 'ta' ? 'பொது தகவல்' : 'General Info'}
                        </Text>
                        <Text style={{ fontSize, color: currentTheme.text, lineHeight: 22, fontWeight: bold ? 'bold' : 'normal', textAlign: 'left', alignSelf: 'stretch' }}>
                            {language === 'ta'
                                ? 'விநாயகர் அஷ்டோத்திரம் என்பது விநாயகர் பக்தர்களால் விரும்பி பாடப்படும் பாடல் தொகுப்பு. (இங்கு விவரங்களை மாற்றவும்)'
                                : 'Vinayagar Ashtothram is a popular devotional hymn dedicated to Lord Ganesha. (Update this info as needed)'}
                        </Text>
                    </View>
                )}
                {filteredPoem && (
                    <View style={[styles.poemBlock, { backgroundColor: currentTheme.card, width: isWide ? 600 : '100%' }]}>
                        <Text
                            selectable={true}
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
                            {Array.isArray(filteredPoem.lines) && filteredPoem.lines.length > 0 ? (
                                filteredPoem.lines.map((line, i) => (
                                    <View key={i}>
                                        <Text selectable={true} style={[styles.poemLine, { color: currentTheme.text, fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{line}</Text>
                                        {showRuler && <View style={styles.ruler} />}
                                    </View>
                                ))
                            ) : (
                                <Text selectable={true} style={[styles.poemLine, { color: currentTheme.text, fontStyle: 'italic', fontSize }]}>{language === 'ta' ? 'பாடல் இல்லை' : 'No matching lines'}</Text>
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
