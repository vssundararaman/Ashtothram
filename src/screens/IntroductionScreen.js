import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../SettingsProvider';
import abiramiImg from '../assets/images/Abirami.png';
import shivaImg from '../assets/images/shiva.png';
import mahaperiyavaImg from '../assets/images/Mahaperiyava.jpg';
import introImg from '../assets/images/Intro.png';
import aboutImg from '../assets/images/abount.png';
import settingsImg from '../assets/images/settings.png';

export default function IntroductionScreen() {
  const navigation = useNavigation();
  const { language } = useSettings();
  const isTamil = language === 'ta';
  const [fontSize, setFontSize] = useState(16);
  const [bold, setBold] = useState(false);

  const labels = {
    title: isTamil ? 'மந்திரங்கள்' : 'Mandiram',
    subtitle: isTamil ? 'மந்திரம் செயலிக்கு வரவேற்கிறோம்!' : 'Welcome to the Mandiram App!',
    abirami: isTamil ? 'அபிராமி அந்தாதி' : 'Abirami Anthathi',
    kolaru: isTamil ? 'கோளறு பதிகம்' : 'Kolaru Pathigam',
    akshara: isTamil ? 'அக்ஷர பாமாலை' : 'Akshara Paamalai',
    aiswarya: isTamil ? 'அஷ்ட ஐஸ்வர்ய சித்தி மந்திரம்' : 'Ashta Aiswarya Sidhi',
    bairava: isTamil ? 'பைரவ ருத்ர மந்திரம்' : 'Bairava Rundram',
    about: isTamil ? 'பற்றி' : 'About',
    settings: isTamil ? 'அமைப்புகள்' : 'Settings',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={introImg} style={styles.introImage} />
      <Text style={[styles.title, { fontSize: fontSize + 8, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.title}</Text>
      <Text style={[styles.subtitle, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.subtitle}</Text>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('AbiramiAnthathi')}>
          <Image source={abiramiImg} style={styles.iconImg} />
          <Text style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.abirami}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('KolaruPathigam')}>
          <Image source={shivaImg} style={styles.iconImg} />
          <Text style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.kolaru}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('AksharaPaamalai')}>
          <Image source={mahaperiyavaImg} style={[styles.iconImg, styles.mahaperiyavaImg]} />
          <Text style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.akshara}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('AshtaAiswaryaSidhiManthram')}>
          <Image source={mahaperiyavaImg} style={[styles.iconImg, styles.mahaperiyavaImg]} />
          <Text style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.aiswarya}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('BairavaRundram')}>
          <Image source={shivaImg} style={styles.iconImg} />
          <Text style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.bairava}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('About')}>
          <Image source={aboutImg} style={styles.iconImg} />
          <Text style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.about}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('Settings')}>
          <Image source={settingsImg} style={styles.iconImg} />
          <Text style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.settings}</Text>
        </TouchableOpacity>
        <View style={styles.iconBlock} />
      </View>
      {/* Font size controls at the bottom */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 16, marginBottom: 8 }}>
        <TouchableOpacity onPress={() => setFontSize(f => Math.max(12, f - 2))} style={styles.roundControl} accessibilityLabel={language === 'ta' ? 'எழுத்து அளவு குறை' : 'Decrease font size'} accessibilityHint={language === 'ta' ? 'எழுத்து அளவை குறைக்கும்' : 'Decrease the font size'}>
          <Text style={{ fontSize: 13 }}>A-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFontSize(f => Math.min(36, f + 2))} style={[styles.roundControl, { marginHorizontal: 4 }]} accessibilityLabel={language === 'ta' ? 'எழுத்து அளவு அதிகரிக்க' : 'Increase font size'} accessibilityHint={language === 'ta' ? 'எழுத்து அளவை அதிகரிக்கும்' : 'Increase the font size'}>
          <Text style={{ fontSize: 13 }}>A+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setBold(b => !b)} style={[styles.roundControl, { marginHorizontal: 4, borderWidth: bold ? 2 : 1, borderColor: bold ? '#007AFF' : '#aaa', backgroundColor: bold ? '#e6f0ff' : 'transparent' }]} accessibilityLabel={language === 'ta' ? 'தடித்த எழுத்து' : 'Bold text'} accessibilityHint={language === 'ta' ? 'எழுத்தை தடித்தமாக மாற்றும்' : 'Toggle bold text'}>
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: bold ? '#007AFF' : '#333', textAlign: 'center' }}>B</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  introImage: {
    width: 120,
    height: 120,
    borderRadius: 24,
    marginBottom: 12,
    alignSelf: 'center',
  },
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 16, marginBottom: 24, color: '#555' },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    width: '100%',
    paddingHorizontal: 10,
  },
  iconBlock: {
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  iconImg: { width: 64, height: 64, borderRadius: 32, marginBottom: 8 },
  iconLabel: { fontSize: 14, textAlign: 'center', color: '#333' },
  mahaperiyavaImg: { width: 80, height: 80 },
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