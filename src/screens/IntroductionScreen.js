import React from 'react';
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
      <Text style={styles.title}>{labels.title}</Text>
      <Text style={styles.subtitle}>{labels.subtitle}</Text>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('AbiramiAnthathi')}>
          <Image source={abiramiImg} style={styles.iconImg} />
          <Text style={styles.iconLabel}>{labels.abirami}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('KolaruPathigam')}>
          <Image source={shivaImg} style={styles.iconImg} />
          <Text style={styles.iconLabel}>{labels.kolaru}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('AksharaPaamalai')}>
          <Image source={mahaperiyavaImg} style={[styles.iconImg, styles.mahaperiyavaImg]} />
          <Text style={styles.iconLabel}>{labels.akshara}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('AshtaAiswaryaSidhiManthram')}>
          <Image source={mahaperiyavaImg} style={[styles.iconImg, styles.mahaperiyavaImg]} />
          <Text style={styles.iconLabel}>{labels.aiswarya}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('BairavaRundram')}>
          <Image source={shivaImg} style={styles.iconImg} />
          <Text style={styles.iconLabel}>{labels.bairava}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('About')}>
          <Image source={aboutImg} style={styles.iconImg} />
          <Text style={styles.iconLabel}>{labels.about}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('Settings')}>
          <Image source={settingsImg} style={styles.iconImg} />
          <Text style={styles.iconLabel}>{labels.settings}</Text>
        </TouchableOpacity>
        <View style={styles.iconBlock} />
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
}); 