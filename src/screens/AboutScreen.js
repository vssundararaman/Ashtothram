import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { useSettings } from '../SettingsProvider';

export default function AboutScreen() {
  const { language } = useSettings();
  const isTamil = language === 'ta';
  const [fontSize, setFontSize] = useState(15);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isTamil ? 'பற்றி' : 'About'}</Text>
      <View style={styles.fontAdjustRow}>
        <Button title="A-" onPress={() => setFontSize(f => Math.max(10, f - 2))} />
        <Button title="A+" onPress={() => setFontSize(f => Math.min(36, f + 2))} />
      </View>
      <View style={{ width: '90%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: fontSize + 3, marginBottom: 8 }}>
          {isTamil ? 'இந்த செயலியின் பற்றி' : 'About This App'}
        </Text>
        <Text style={{ fontSize, color: '#555', marginBottom: 12 }}>
          {isTamil
            ? 'தமிழ் கவிதை எக்ஸ்ப்ளோரர் என்பது பழமையான மற்றும் நவீன தமிழ் கவிதைகளை இருமொழி விளக்கங்களுடன் (தமிழ் மற்றும் ஆங்கிலம்) அறிந்து கொள்ள உதவும் செயலி. மாணவர்கள், ஆசிரியர்கள் மற்றும் இலக்கிய ஆர்வலர்களுக்காக வடிவமைக்கப்பட்டுள்ளது. வகைப்படுத்தப்பட்ட தொகுப்புகள், இடைமுக வழிசெலுத்தல் மற்றும் தமிழ் இலக்கியத்தின் ஆழமான பகுப்பாய்வை வழங்குகிறது.'
            : 'Tamil Poetry Explorer is a mobile application designed to help users discover and learn ancient and modern Tamil poems with bilingual explanations in Tamil and English. Ideal for students, educators, and literary enthusiasts, the app offers categorized collections, interactive navigation, and in-depth analysis of classic Tamil literature.'}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: fontSize + 1, marginTop: 12 }}>
          {isTamil ? 'பயன்பாட்டை உருவாக்கியவர் தகவல்' : 'Developer Information'}
        </Text>
        <Text style={{ fontSize, color: '#555' }}>{isTamil ? 'டெவலப்பர்: வித்யாசங்கர் சுந்தரராமன்' : 'Developer: Vidyasankar Sundararaman'}</Text>
        <Text style={{ fontSize, color: '#555' }}>{isTamil ? 'மின்னஞ்சல்: support@tamilexplorer.app' : 'Email: support@tamilexplorer.app'}</Text>
        <Text style={{ fontSize, color: '#555' }}>{isTamil ? 'இணையதளம்: https://tamilexplorer.app' : 'Website: https://tamilexplorer.app'}</Text>
        <Text style={{ fontSize, color: '#555', marginBottom: 12 }}>{isTamil ? 'இடம்: டல்லாஸ், டெக்சாஸ், அமெரிக்கா' : 'Location: Dallas, Texas, USA'}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: fontSize + 1, marginTop: 12 }}>{isTamil ? 'பதிப்புரிமை' : 'Copyright'}</Text>
        <Text style={{ fontSize, color: '#555', marginBottom: 12 }}>
          {isTamil
            ? '© 2025 வித்யாசங்கர் சுந்தரராமன். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.\nஅனைத்து கவிதை மொழிபெயர்ப்புகள் மற்றும் விளக்கங்கள் அசல் படைப்புகள் அல்லது பொதுமக்கள் உரிமை அல்லது கிரியேட்டிவ் காமன்ஸ் உரிமங்களின் கீழ் பெறப்பட்டவை.'
            : '© 2025 Vidyasankar Sundararaman. All rights reserved.\nAll poem translations and explanations are original work or sourced under appropriate public domain or Creative Commons licenses.'}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: fontSize + 1, marginTop: 12 }}>{isTamil ? 'பதிப்பு' : 'Version'}</Text>
        <Text style={{ fontSize, color: '#555' }}>{isTamil ? 'செயலி பதிப்பு: 1.0.0' : 'App Version: 1.0.0'}</Text>
        <Text style={{ fontSize, color: '#555', marginBottom: 12 }}>{isTamil ? 'கடைசியாக புதுப்பிக்கப்பட்டது: ஆகஸ்ட் 2, 2025' : 'Last Updated: August 2, 2025'}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: fontSize + 1, marginTop: 12 }}>{isTamil ? 'சட்டம்' : 'Legal'}</Text>
        <Text style={{ fontSize, color: '#555', marginBottom: 12 }}>
          {isTamil
            ? 'இந்த செயலியை பயன்படுத்துவதன் மூலம், நீங்கள் எங்கள்:\nதனியுரிமைக் கொள்கை\nபயன்பாட்டு விதிகள்\nஏற்கின்றீர்கள்.'
            : 'By using this app, you agree to our:\nPrivacy Policy\nTerms of Use'}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: fontSize + 1, marginTop: 12 }}>{isTamil ? 'அறிவிப்பு' : 'Disclaimer'}</Text>
        <Text style={{ fontSize, color: '#555', marginBottom: 24 }}>
          {isTamil
            ? 'இந்த செயலி கல்வி நோக்கங்களுக்காக மட்டுமே. துல்லியத்திற்காக அனைத்து முயற்சிகளும் மேற்கொள்ளப்பட்டுள்ளன, இருப்பினும் உள்ளடக்கத்துடன் தொடர்புடைய எந்தவொரு விளக்கம் அல்லது கல்வி விவாதங்களுக்கும் நாங்கள் பொறுப்பல்ல.'
            : 'This app is intended for educational purposes. While every effort has been made to ensure accuracy, we are not responsible for any interpretation or scholarly disputes related to the content.'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  fontAdjustRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12, gap: 12 },
}); 