import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../SettingsProvider';
import shivaImg from '../assets/images/shiva.png';
import mahaperiyavaImg from '../assets/images/Mahaperiyava.jpg';
import introImg from '../assets/images/Intro.png';
import aboutImg from '../assets/images/abount.png';
import settingsImg from '../assets/images/settings.png';
import PinchZoomView from '../../PinchZoomView';
import logoImg from '../assets/images/Logo.png';
import vinayagarImg from '../assets/images/Vinayagar.png';

export default function IntroductionScreen() {
  const navigation = useNavigation();
  const { language } = useSettings();
  const isTamil = language === 'ta';
  const [fontSize, setFontSize] = useState(16);
  const [bold, setBold] = useState(false);
  const [tooltipIdx, setTooltipIdx] = useState(null);

  const labels = {
    title: isTamil ? 'அஷ்டோத்திரம்' : 'Mandiram',
    subtitle: isTamil ? 'மந்திரம் செயலிக்கு வரவேற்கிறோம்!' : 'Welcome to the Mandiram App!',
    akshara: isTamil ? 'அட்க்ஷரப்பாமாலை' : 'Akshara Paamalai',
    about: isTamil ? 'பற்றி' : 'About',
    settings: isTamil ? 'அமைப்புகள்' : 'Settings',
    vinayagar: isTamil ? 'விநாயகர் அஷ்டோத்திரம்' : 'Vinayagar Ashtothram',
    shiva: isTamil ? 'சிவ அஷ்டோத்திரம்' : 'Shiva Ashtothram',
    venkateswara: isTamil ? 'வெங்கடேஸ்வர அஷ்டோத்திரம்' : 'Venkateswara Ashtothram',
    lakshmi: isTamil ? 'மகா லட்சுமி அஷ்டோத்திரம்' : 'Lakshmi Ashtothram',
    hanuman: isTamil ? 'ஹனுமான் அஷ்டோத்திரம்' : 'Hanuman Ashtothram',
    saibaba: isTamil ? 'சாய்பாபா அஷ்டோத்திரம்' : 'Sai Baba Ashtothram',
  };

  const iconData = [
    { label: labels.vinayagar, img: vinayagarImg, nav: 'VinayagarAshtothram' },
    { label: labels.venkateswara, img: shivaImg, nav: 'VenkateswaraAshtothram' },
    { label: labels.lakshmi, img: shivaImg, nav: 'LakshmiAshtothram' },
    { label: labels.hanuman, img: shivaImg, nav: 'HanumanAshtothram' },
    { label: labels.saibaba, img: shivaImg, nav: 'SaiBabaAshtothram' },
    { label: labels.shiva, img: shivaImg, nav: 'ShivaAshtothram' },
    { label: labels.akshara, img: mahaperiyavaImg, nav: 'AksharaPaamalaiScreen' },
  ];
  // Split into 2 columns
  const col1 = iconData.filter((_, i) => i % 2 === 0);
  const col2 = iconData.filter((_, i) => i % 2 === 1);

  return (
    <PinchZoomView>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={introImg} style={[styles.introImage, { alignSelf: 'center' }]} />
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
        <View style={{ width: '100%', alignItems: 'center', marginTop: 16, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              {col1.map((icon, idx) => (
                <TouchableOpacity
                  key={icon.label}
                  style={{ alignItems: 'center', marginBottom: 28, width: 110 }}
                  onPress={() => navigation.navigate(icon.nav)}
                >
                  <Image source={icon.img} style={[styles.iconImg, styles.mahaperiyavaImg]} />
                  <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal', textAlign: 'center', marginTop: 6 }]}>{icon.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              {col2.map((icon, idx) => (
                <TouchableOpacity
                  key={icon.label}
                  style={{ alignItems: 'center', marginBottom: 28, width: 110 }}
                  onPress={() => navigation.navigate(icon.nav)}
                >
                  <Image source={icon.img} style={[styles.iconImg, styles.mahaperiyavaImg]} />
                  <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal', textAlign: 'center', marginTop: 6 }]}>{icon.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('About')}>
            <Image source={aboutImg} style={styles.iconImg} />
            <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.about}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('Settings')}>
            <Image source={settingsImg} style={styles.iconImg} />
            <Text selectable={true} style={[styles.iconLabel, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>{labels.settings}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PinchZoomView>
  );
}

const styles = StyleSheet.create({
  introImage: {
    width: 90,
    height: 90,
    borderRadius: 18,
    marginBottom: 8, // reduced from 12
    marginTop: 0, // remove extra top space
    alignSelf: 'center',
  },
  container: { flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 10, paddingTop: 12 }, // reduced padding, align to top
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 16, marginBottom: 24, color: '#555' },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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