import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useSettings } from '../SettingsProvider';

export default function AboutScreen() {
  const { language } = useSettings();
  const isTamil = language === 'ta';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🧘 Slogan Mantra / ஸ்லோகன் மந்திரா</Text>
      {isTamil ? (
        <>
          <Text style={styles.body}>
            ஸ்லோகன் மந்திரா என்பது உங்கள் உள்ளார்ந்த அமைதி மற்றும் ஆன்மிக உன்னதத்திற்காக உருவாக்கப்பட்ட ஓர் செயலி. இது தினசரி தியானம், ஜபம் மற்றும் சிந்தனைக்காக ஆழமான அர்த்தம் கொண்ட மந்திரங்களை (வாசகங்கள்) வழங்குகிறது. பாரம்பரியத்தையும் நவீனத்தையும் இணைக்கும் இந்த செயலி உங்களுக்கு நேர்மறை ஆற்றலை அளிக்கும்.
          </Text>
          <Text style={styles.sectionTitle}>முக்கிய அம்சங்கள்</Text>
          <Text style={styles.body}>
            • தினசரி ஜப மந்திரங்கள்
            {'\n'}• அமைதி, வளம், கவனம், தைரியம்
            {'\n'}• விருப்பமான வாசகங்களை சேமிக்கவும்
            {'\n'}• விளம்பரமில்லா, மனநிலையுடன் கூடிய அனுபவம்
            {'\n'}• உள் அமைதிக்காக வடிவமைக்கப்பட்டது
          </Text>
          <Text style={styles.sectionTitle}>அப்ளிக்கேஷன் உருவாக்குநர் விவரங்கள்</Text>
          <Text style={styles.body}>
            பெயர்: Vidyasankar Sundararaman
            {'\n'}மின்னஞ்சல்: support@[yourdomain].com
            {'\n'}இருப்பிடம்: [City, State, Country]
            {'\n'}இணையதளம்: [yourdomain].com
          </Text>
          <Text style={styles.body}>
            நாம் ஒவ்வொரு நாளையும் நல்ல உந்துதலுடன் ஆரம்பிக்க, புனிதமான சொற்கள் மூலமாக உள்ளத்தை ஊக்குவிக்க நம்புகிறோம்.
          </Text>
          <Text style={styles.sectionTitle}>சட்ட மற்றும் பதிப்புரிமை அறிவிப்பு</Text>
          <Text style={styles.body}>
            © 2025 வித்யாசங்கர் சுந்தரராமன். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.\nஇந்த செயலியில் உள்ள மந்திரங்கள், வடிவமைப்புகள் மற்றும் உள்ளடக்கங்கள் சட்டபூர்வமான மற்றும் ஆன்மீக அடிப்படையில் பாதுகாக்கப்பட்டவை. இவை முறையற்ற விதத்தில் பயன்படுத்தக்கூடாது.
          </Text>
          <Text style={styles.sectionTitle}>மறுப்பு அறிவிப்பு</Text>
          <Text style={styles.body}>
            இந்த செயலி உங்களின் ஆன்மீக வளர்ச்சி மற்றும் மன அமைதிக்காக மந்திரங்களை வழங்குகிறது. இது எந்தவொரு மருத்துவ அல்லது உளவியல் ஆலோசனையின் மாற்றாக இல்லை. உங்கள் சூழ்நிலைப் பொருத்தமாக பயன்படுத்தவும்.
          </Text>
          <Text style={styles.sectionTitle}>பதிப்பு விவரம்</Text>
          <Text style={styles.body}>
            பதிப்பு: 1.0.0
            {'\n'}வெளியீடு: August 2025
            {'\n'}ஆதரிக்கப்படும் சாதனங்கள்: Android & iOS
          </Text>
          <Text style={styles.sectionTitle}>தனியுரிமை மற்றும் தரவு</Text>
          <Text style={styles.body}>
            நாங்கள் உங்களின் எந்தவொரு தனிப்பட்ட தகவலையும் சேகரிக்கவோ பகிரவோ இல்லைய. நீங்கள் சேமிக்கும் மந்திரங்கள் உங்கள் சாதனத்தில் மட்டுமே இருக்கின்றன.
          </Text>
          <Text style={styles.body}>
            முழு கொள்கைகள்:
            {'\n'}Privacy Policy: [yourdomain.com/privacy-policy]
            {'\n'}Terms of Use: [yourdomain.com/terms-of-use]
          </Text>
          <Text style={styles.sectionTitle}>கருத்துகள் மற்றும் ஆசீர்வாதங்கள்</Text>
          <Text style={styles.body}>
            உங்கள் ஆன்மீக பயணத்தில் இந்த செயலி உதவுகிறது எனில், தயவுசெய்து ஒரு நல்ல மதிப்பீடு வழங்குங்கள். உங்கள் கருத்துகள் எங்களை மேலும் சிறப்பாக செயல்பட ஊக்குவிக்கும்.
          </Text>
          <Text style={styles.body}>
            📧 Email: support@[yourdomain].com
            {'\n'}🌐 Website: https://yourdomain.com
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.body}>
            Slogan Mantra is a spiritual and wellness-focused app that helps you discover meaningful, powerful, and meditative slogans (mantras) for chanting, reflection, and daily inspiration. Rooted in traditional wisdom and modern simplicity, our app is your daily companion for inner peace, focus, and strength.
          </Text>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <Text style={styles.body}>
            • Daily chanting mantras
            {'\n'}• Themes: Peace, Prosperity, Focus, Strength
            {'\n'}• Save & bookmark your favorite chants
            {'\n'}• No ads, no distractions – just mindfulness
            {'\n'}• Designed for inner clarity and calm
          </Text>
          <Text style={styles.sectionTitle}>Developer Information</Text>
          <Text style={styles.body}>
            Name: Vidyasankar Sundararaman
            {'\n'}Email: support@[yourdomain].com
            {'\n'}Location: [City, State, Country]
            {'\n'}Website: [yourdomain].com
          </Text>
          <Text style={styles.body}>
            We believe in empowering minds through sacred sound and daily intention.
          </Text>
          <Text style={styles.sectionTitle}>Copyright & Legal</Text>
          <Text style={styles.body}>
            © 2025 Vidyasankar Sundararaman. All rights reserved.\nThis app and its content (texts, designs, mantras) are protected by copyright and spiritual integrity. Any misuse, modification, or redistribution is prohibited. Use of mantras should be done with respect and discretion.
          </Text>
          <Text style={styles.sectionTitle}>Disclaimer</Text>
          <Text style={styles.body}>
            This app provides mantras and chants for personal wellness and spiritual growth. It does not replace any medical or psychological treatment. Use at your discretion and with intention.
          </Text>
          <Text style={styles.sectionTitle}>Version Info</Text>
          <Text style={styles.body}>
            Version: 1.0.0
            {'\n'}Released on: August 2025
            {'\n'}Supported platforms: Android & iOS
          </Text>
          <Text style={styles.sectionTitle}>Privacy & Data</Text>
          <Text style={styles.body}>
            We do not collect or share any personal data. Your saved mantras are stored locally and never shared without your action.
          </Text>
          <Text style={styles.body}>
            Full policies:
            {'\n'}Privacy Policy: [yourdomain.com/privacy-policy]
            {'\n'}Terms of Use: [yourdomain.com/terms-of-use]
          </Text>
          <Text style={styles.sectionTitle}>Feedback & Blessings</Text>
          <Text style={styles.body}>
            If this app supports your spiritual journey, please leave us a kind review. Your feedback encourages us to serve better.
          </Text>
          <Text style={styles.body}>
            📧 Email: support@[yourdomain].com
            {'\n'}🌐 Website: https://yourdomain.com
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
}); 