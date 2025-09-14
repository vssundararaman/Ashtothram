import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, TouchableOpacity } from 'react-native';
import IntroductionScreen from './src/screens/IntroductionScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AboutScreen from './src/screens/AboutScreen';
import AbiramiAnthathiScreen from './src/screens/AbiramiAnthathiScreen';
import AksharaPaamalaiScreen from './src/screens/AksharaPaamalaiScreen';
import KolaruPathigamScreen from './src/screens/KolaruPathigam';
import AshtaAiswaryaSidhiManthramScreen from './src/screens/AshtaAiswaryaSidhiManthramScreen';
import BairavaRudramScreen from './src/screens/BairavaRudramScreen';
import VinayagarAshtothramScreen from './src/screens/VinayagarAshtothram';
import { SettingsProvider, useSettings } from './src/SettingsProvider';
import abiramiImg from './src/assets/images/Abirami.png';
import mahaperiyavaImg from './src/assets/images/Mahaperiyava.jpg';
import iconImg from './assets/icon.png';
import shivaImg from './src/assets/images/shiva.png';
import aboutImg from './src/assets/images/abount.png';
import introImg from './src/assets/images/Intro.png';
import { MaterialIcons } from '@expo/vector-icons';
import PinchZoomView from './PinchZoomView';
import logoImg from './src/assets/images/Logo.png';
import SeedFirestoreScreen from './src/screens/SeedFirestoreScreen';
import vinayagarImg from './src/assets/images/Vinayagar.png';
import ShivaAshtothramScreen from './src/screens/ShivaAshtothramScreen';

const Drawer = createDrawerNavigator();

const translations = {
  ta: {
    introduction: 'அறிமுகம்',
    abirami: 'அபிராமி அந்தாதி',
    kolaru: 'கோளறு பதிகம்',
    poem3: 'கவிதை 3',
    akshara: 'அட்க்ஷரப்பாமாலை',
    vinayagar: 'விநாயகர் அஷ்டோத்திரம்',
    settings: 'அமைப்புகள்',
    about: 'பற்றி',
  },
  en: {
    introduction: 'Introduction',
    abirami: 'Abirami Anthathi',
    kolaru: 'Kolaru Pathigam',
    poem3: 'Poem 3',
    akshara: 'Akshara Paamalai',
    vinayagar: 'Vinayagar Ashtothram',
    settings: 'Settings',
    about: 'About',
  },
};

function AppShell() {
  const { language, theme, themes } = useSettings();
  const t = translations[language] || translations["en"];
  const currentTheme = themes?.[theme] || themes.light;
  const VinayagarHeading = language === 'ta' ? 'விநாயகர் அஷ்டோத்திரம்' : 'Vinayagar Ashtothram';
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Introduction"
        screenOptions={{
          headerStyle: { backgroundColor: currentTheme.primary },
          headerTintColor: '#fff',
        }}
      >
        <Drawer.Screen
          name="Introduction"
          component={IntroductionScreen}
          options={{
            title: t.introduction,
            drawerIcon: ({ size }) => (
              <Image source={introImg} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ),
          }}
        />
        <Drawer.Screen
          name="AbiramiAnthathi"
          component={AbiramiAnthathiScreen}
          options={{
            title: t.abirami,
            drawerIcon: ({ size }) => (
              <Image source={abiramiImg} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ),
          }}
        />
        <Drawer.Screen
          name="KolaruPathigam"
          component={KolaruPathigamScreen}
          options={{
            title: t.kolaru,
            drawerIcon: ({ size }) => (
              <Image source={shivaImg} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ),
          }}
        />
        <Drawer.Screen
          name="AksharaPaamalai"
          component={AksharaPaamalaiScreen}
          options={{
            title: t.akshara,
            drawerIcon: ({ size }) => (
              <Image source={mahaperiyavaImg} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ),
          }}
        />
        <Drawer.Screen
          name="VinayagarAshtothram"
          component={VinayagarAshtothramScreen}
          options={{
            title: VinayagarHeading,
            drawerIcon: ({ size }) => (
              <Image source={vinayagarImg} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ),
          }}
        />
        <Drawer.Screen
          name="AshtaAiswaryaSidhiManthram"
          component={AshtaAiswaryaSidhiManthramScreen}
          options={{
            title: language === 'ta' ? 'அஷ்ட ஐஸ்வர்ய சித்தி மந்திரம்' : 'Ashta Aiswarya Sidhi Manthram',
            drawerIcon: ({ size }) => (
              <Image source={mahaperiyavaImg} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ),
          }}
        />
        <Drawer.Screen
          name="BairavaRudram"
          component={BairavaRudramScreen}
          options={{
            title: language === 'ta' ? 'பைரவ ருத்ர மந்திரம்' : 'BairavaRudram',
            drawerIcon: ({ size }) => (
              <Image source={shivaImg} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: t.about,
            drawerIcon: ({ size }) => (
              <Image source={aboutImg} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: t.settings,
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="settings" size={size} color={color || '#007bff'} />
            ),
          }}
        />
        <Drawer.Screen
          name="SeedFirestore"
          component={SeedFirestoreScreen}
          options={{
            title: 'Seed Firestore (Dev)',
            drawerIcon: ({ size }) => (
              <Image source={require('./src/assets/images/settings.png')} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ),
          }}
        />
        <Drawer.Screen
          name="ShivaAshtothram"
          component={ShivaAshtothramScreen}
          options={{
            title: language === 'ta' ? 'சிவ அஷ்டோத்திரம்' : 'Shiva Ashtothram',
            drawerIcon: ({ size }) => (
              <Image source={shivaImg} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider>
        <AppShell />
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}
