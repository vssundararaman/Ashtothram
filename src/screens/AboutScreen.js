import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Linking, View, TouchableOpacity } from 'react-native';
import { useSettings } from '../SettingsProvider';

const EMAIL = 'vsundararaman@gmail.com';
const WEBSITE = 'https://www.facebook.com/profile.php?id=61574159045542';
const PRIVACY_URL = 'https://www.termsfeed.com/live/da3729ad-c5e6-4fff-baeb-e37b84abf786';
const TERMS_URL = 'https://www.termsfeed.com/live/da3729ad-c5e6-4fff-baeb-e37b84abf786';

export default function AboutScreen() {
  const { language } = useSettings();
  const isTamil = language === 'ta';
  const [fontSize, setFontSize] = useState(16);
  const [bold, setBold] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
        <TouchableOpacity onPress={() => setFontSize(f => Math.max(12, f - 2))} style={styles.roundControl}>
          <Text style={{ fontSize: 13 }}>A-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFontSize(f => Math.min(36, f + 2))} style={[styles.roundControl, { marginHorizontal: 4 }]}>
          <Text style={{ fontSize: 13 }}>A+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setBold(b => !b)} style={[styles.roundControl, { marginHorizontal: 4, borderWidth: bold ? 2 : 1, borderColor: bold ? '#007AFF' : '#aaa', backgroundColor: bold ? '#e6f0ff' : 'transparent' }]}>
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: bold ? '#007AFF' : '#333', textAlign: 'center' }}>B</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.heading, { fontSize: fontSize + 8, fontWeight: bold ? 'bold' : 'normal' }]}>{isTamil ? 'மந்திரங்கள்' : 'Mantras'}</Text>
      {isTamil ? (
        <>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
          மந்திரங்கள் என்பது உங்கள் உள்ளார்ந்த அமைதி மற்றும் ஆன்மிக உன்னதத்திற்காக உருவாக்கப்பட்ட ஓர் செயலி. இது தினசரி தியானம், ஜபம் மற்றும் சிந்தனைக்காக ஆழமான அர்த்தம் கொண்ட மந்திரங்களை (வாசகங்கள்) வழங்குகிறது. பாரம்பரியத்தையும் நவீனத்தையும் இணைக்கும் இந்த செயலி உங்களுக்கு நேர்மறை ஆற்றலை அளிக்கும்.
          </Text>
          <Text style={styles.sectionTitle}>முக்கிய அம்சங்கள்</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            • தினசரி மந்திரங்கள்
            {'\n'}• அமைதி, வளம், கவனம், தைரியம்
            {'\n'}• விருப்பமான வாசகங்களை சேமிக்கவும்
            {'\n'}• விளம்பரமில்லா, மனநிலையுடன் கூடிய அனுபவம்
            {'\n'}• உள் அமைதிக்காக வடிவமைக்கப்பட்டது
          </Text>
          <Text style={styles.sectionTitle}>அப்ளிக்கேஷன் உருவாக்குநர் விவரங்கள்</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            பெயர்: V S Sundararaman
            {'\n'}மின்னஞ்சல்: <Text style={styles.link} onPress={() => Linking.openURL(`mailto:${EMAIL}`)}>தொடர்பு</Text>
            {'\n'}இருப்பிடம்: Bentonville, Arkansas, USA
            {'\n'}இணையதளம்: <Text style={styles.link} onPress={() => Linking.openURL(WEBSITE)}>பார்க்க</Text>
          </Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            நாம் ஒவ்வொரு நாளையும் நல்ல உந்துதலுடன் ஆரம்பிக்க, புனிதமான சொற்கள் மூலமாக உள்ளத்தை ஊக்குவிக்க நம்புகிறோம்.
          </Text>
          <Text style={styles.sectionTitle}>சட்ட மற்றும் பதிப்புரிமை அறிவிப்பு</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            © 2025 வி எஸ் சுந்தரராமன். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.\nஇந்த செயலியில் உள்ள மந்திரங்கள், வடிவமைப்புகள் மற்றும் உள்ளடக்கங்கள் சட்டபூர்வமான மற்றும் ஆன்மீக அடிப்படையில் பாதுகாக்கப்பட்டவை. இவை முறையற்ற விதத்தில் பயன்படுத்தக்கூடாது.
          </Text>
          <Text style={styles.sectionTitle}>மறுப்பு அறிவிப்பு</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            இந்த செயலி உங்களின் ஆன்மீக வளர்ச்சி மற்றும் மன அமைதிக்காக மந்திரங்களை வழங்குகிறது. இது எந்தவொரு மருத்துவ அல்லது உளவியல் ஆலோசனையின் மாற்றாக இல்லை. உங்கள் சூழ்நிலைப் பொருத்தமாக பயன்படுத்தவும்.
          </Text>
          <Text style={styles.sectionTitle}>பதிப்பு விவரம்</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            பதிப்பு: 1.0.0
            {'\n'}வெளியீடு: August 2025
            {'\n'}ஆதரிக்கப்படும் சாதனங்கள்: Android & iOS
          </Text>
          <Text style={styles.sectionTitle}>தனியுரிமை மற்றும் தரவு</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            நாங்கள் உங்களின் எந்தவொரு தனிப்பட்ட தகவலையும் சேகரிக்கவோ பகிரவோ இல்லைய. நீங்கள் சேமிக்கும் மந்திரங்கள் உங்கள் சாதனத்தில் மட்டுமே இருக்கின்றன.
          </Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            முழு கொள்கைகள்:
            {'\n'}Privacy Policy: <Text style={styles.link} onPress={() => Linking.openURL(PRIVACY_URL)}>பார்க்க</Text>
            {'\n'}Terms of Use: <Text style={styles.link} onPress={() => Linking.openURL(TERMS_URL)}>பார்க்க</Text>
          </Text>
          <Text style={styles.sectionTitle}>கருத்துகள்</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            உங்கள் ஆன்மீக பயணத்தில் இந்த செயலி உதவுகிறது எனில், தயவுசெய்து ஒரு நல்ல மதிப்பீடு வழங்குங்கள். உங்கள் கருத்துகள் எங்களை மேலும் சிறப்பாக செயல்பட ஊக்குவிக்கும்.
          </Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            📧 Email: <Text style={styles.link} onPress={() => Linking.openURL(`mailto:${EMAIL}`)}>தொடர்பு</Text>
            {'\n'}🌐 Website: <Text style={styles.link} onPress={() => Linking.openURL(WEBSITE)}>பார்க்க</Text>
          </Text>
        </>
      ) : (
        <>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            Slogan Mantra is a spiritual and wellness-focused app that helps you discover meaningful, powerful, and meditative slogans (mantras) for chanting, reflection, and daily inspiration. Rooted in traditional wisdom and modern simplicity, our app is your daily companion for inner peace, focus, and strength.
          </Text>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            • Daily chanting mantras
            {'\n'}• Themes: Peace, Prosperity, Focus, Strength
            {'\n'}• Save & bookmark your favorite chants
            {'\n'}• No ads, no distractions – just mindfulness
            {'\n'}• Designed for inner clarity and calm
          </Text>
          <Text style={styles.sectionTitle}>Developer Information</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            Name: V S Sundararaman
            {'\n'}Email: <Text style={styles.link} onPress={() => Linking.openURL(`mailto:${EMAIL}`)}>Contact</Text>
            {'\n'}Location: Bentonville, Arkansas, USA
            {'\n'}Website: <Text style={styles.link} onPress={() => Linking.openURL(WEBSITE)}>Facebook</Text>
          </Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            We believe in empowering minds through sacred sound and daily intention.
          </Text>
          <Text style={styles.sectionTitle}>Copyright & Legal</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            © 2025 V S Sundararaman. All rights reserved.\nThis app and its content (texts, designs, mantras) are protected by copyright and spiritual integrity. Any misuse, modification, or redistribution is prohibited. Use of mantras should be done with respect and discretion.
          </Text>
          <Text style={styles.sectionTitle}>Disclaimer</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            This app provides mantras and chants for personal wellness and spiritual growth. It does not replace any medical or psychological treatment. Use at your discretion and with intention.
          </Text>
          <Text style={styles.sectionTitle}>Version Info</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            Version: 1.0.0
            {'\n'}Released on: August 2025
            {'\n'}Supported platforms: Android & iOS
          </Text>
          <Text style={styles.sectionTitle}>Privacy & Data</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            We do not collect or share any personal data. Your saved mantras are stored locally and never shared without your action.
          </Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            Full policies:
            {'\n'}Privacy Policy: <Text style={styles.link} onPress={() => Linking.openURL(PRIVACY_URL)}>View</Text>
            {'\n'}Terms of Use: <Text style={styles.link} onPress={() => Linking.openURL(TERMS_URL)}>View</Text>
          </Text>
          <Text style={styles.sectionTitle}>Feedback & Blessings</Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            If this app supports your spiritual journey, please leave us a kind review. Your feedback encourages us to serve better.
          </Text>
          <Text style={[styles.body, { fontSize, fontWeight: bold ? 'bold' : 'normal' }]}>
            📧 Email: <Text style={styles.link} onPress={() => Linking.openURL(`mailto:${EMAIL}`)}>Contact</Text>
            {'\n'}🌐 Website: <Text style={styles.link} onPress={() => Linking.openURL(WEBSITE)}>Facebook</Text>
          </Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'flex-start', padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center', textAlign: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', marginTop: 18, marginBottom: 6 },
  body: { fontSize: 15, color: '#444', marginBottom: 8, lineHeight: 22 },
  link: { color: '#007bff', textDecorationLine: 'underline' },
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