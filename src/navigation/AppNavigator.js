import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import IntroductionScreen from '../screens/IntroductionScreen';
import Poem1Screen from '../screens/Poem1Screen';
import Poem2Screen from '../screens/Poem2Screen';
import Poem3Screen from '../screens/Poem3Screen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import i18n from '../services/i18n';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Introduction">
        <Drawer.Screen name="Introduction" component={IntroductionScreen} options={{ title: i18n.t('introduction') }} />
        <Drawer.Screen name="Poem1" component={Poem1Screen} options={{ title: i18n.t('poem1') }} />
        <Drawer.Screen name="Poem2" component={Poem2Screen} options={{ title: i18n.t('poem2') }} />
        <Drawer.Screen name="Poem3" component={Poem3Screen} options={{ title: i18n.t('poem3') }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: i18n.t('settings') }} />
        <Drawer.Screen name="About" component={AboutScreen} options={{ title: i18n.t('about') }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 