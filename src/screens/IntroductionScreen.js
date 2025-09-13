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
import PinchZoomView from '../../PinchZoomView';
import logoImg from '../assets/images/Logo.png';

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
    akshara: isTamil ? 'அட்க்ஷரப்பாமாலை' : 'Akshara Paamalai',
    aiswarya: isTamil ? 'அஷ்ட ஐஸ்வர்ய சித்தி மந்திரம்' : 'Ashta Aiswarya Sidhi',
    bairava: isTamil ? 'பைரவ ருத்ர மந்திரம்' : 'Bairava Rudram',
    about: isTamil ? 'பற்றி' : 'About',
    settings: isTamil ? 'அமைப்புகள்' : 'Settings',
    vinayagar: isTamil ? 'விநாயகர் அஷ்டோத்திரம்' : 'Vinayagar Ashtothram',
  };

  return (
    <PinchZoomView>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={introImg} style={styles.introImage} />
        <Text selectable={true} style={[styles.title, { fontSize: fontSize + 8, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.title}</Text>
        <Text selectable={true} style={[styles.subtitle, { fontSize, fontWeight: bold ? 'bold' : 'normal', marginBottom: 0 }]}>{labels.subtitle}</Text>
        {/* Menu Bar Controls - now immediately below subtitle */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 0, marginBottom: 12 }}>
          <TouchableOpacity onPress={() => setFontSize(f => Math.max(12, f - 2))} style={{ marginLeft: 4, padding: 6, borderRadius: 16, borderWidth: 1, borderColor: '#aaa' }}>
            <Text style={{ fontSize: 13 }}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontSize(f => Math.min(36, f + 2))} style={{ marginLeft: 4, padding: 6, borderRadius: 16, borderWidth: 1, borderColor: '#aaa' }}>
            <Text style={{ fontSize: 13 }}>A+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBold(b => !b)} style={{ marginLeft: 4, padding: 6, borderRadius: 16, borderWidth: bold ? 2 : 1, borderColor: bold ? '#007bff' : '#aaa', backgroundColor: bold ? '#e6f0ff' : 'transparent' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: bold ? '#007bff' : '#333', textAlign: 'center' }}>B</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('AbiramiAnthathi')}>
            <Image source={abiramiImg} style={styles.iconImg} />
            <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.abirami}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('KolaruPathigam')}>
            <Image source={shivaImg} style={styles.iconImg} />
            <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.kolaru}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('VinayagarAshtothram')}>
            <Image source={logoImg} style={[styles.iconImg, styles.mahaperiyavaImg]} />
            <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.vinayagar}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('AksharaPaamalai')}>
            <Image source={mahaperiyavaImg} style={[styles.iconImg, styles.mahaperiyavaImg]} />
            <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.akshara}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('AshtaAiswaryaSidhiManthram')}>
            <Image source={mahaperiyavaImg} style={[styles.iconImg, styles.mahaperiyavaImg]} />
            <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.aiswarya}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('BairavaRudram')}>
            <Image source={shivaImg} style={styles.iconImg} />
            <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.bairava}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('About')}>
            <Image source={aboutImg} style={styles.iconImg} />
            <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.about}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('Settings')}>
            <Image source={settingsImg} style={styles.iconImg} />
            <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.settings}</Text>
          </TouchableOpacity>
          <View style={styles.iconBlock} />
        </View>
      </ScrollView>
    </PinchZoomView>
  );
}

const styles = StyleSheet.create({
  introImage: {
    width: 120,
    height: 120,
    borderRadius: 24,
    marginBottom: 8, // reduced from 12
    marginTop: 0, // remove extra top space
    alignSelf: 'center',
  },
  container: { flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 10, paddingTop: 12 }, // reduced padding, align to top
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