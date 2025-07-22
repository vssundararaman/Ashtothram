import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IntroductionScreen from './src/screens/IntroductionScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AboutScreen from './src/screens/AboutScreen';
import AbiramiAnthathiScreen from './src/screens/AbiramiAnthathiScreen';
import Poem2Screen from './src/screens/Poem2Screen';
import Poem3Screen from './src/screens/Poem3Screen';
import KolaruPathigamScreen from './src/screens/KolaruPathigam';
import { SettingsProvider, useSettings } from './src/SettingsProvider';

const Drawer = createDrawerNavigator();

const translations = {
  ta: {
    introduction: 'அறிமுகம்',
    abirami: 'அபிராமி அந்தாதி',
    kolaru: 'கோளறு பதிகம்',
    poem3: 'கவிதை 3',
    settings: 'அமைப்புகள்',
    about: 'பற்றி',
  },
  en: {
    introduction: 'Introduction',
    abirami: 'Abirami Anthathi',
    kolaru: 'Kolaru Pathigam',
    poem3: 'Poem 3',
    settings: 'Settings',
    about: 'About',
  },
};

function AppShell() {
  const { language } = useSettings();
  const t = translations[language];
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Introduction">
        <Drawer.Screen name="Introduction" component={IntroductionScreen} options={{ title: t.introduction }} />
        <Drawer.Screen name="AbiramiAnthathi" component={AbiramiAnthathiScreen} options={{ title: t.abirami }} />
        <Drawer.Screen name="KolaruPathigam" component={KolaruPathigamScreen} options={{ title: t.kolaru }} />
        <Drawer.Screen name="Poem3" component={Poem3Screen} options={{ title: t.poem3 }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: t.settings }} />
        <Drawer.Screen name="About" component={AboutScreen} options={{ title: t.about }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppShell />
    </SettingsProvider>
  );
}
