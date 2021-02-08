import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScene from '../scene/Home';
import PersonScene from '../scene/Person';

import options from './options/header.options';

const SettingsStack = createStackNavigator();

function HomeNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Home"
        component={HomeScene}
        options={{title: 'Accueil', ...options}}
      />
      <SettingsStack.Screen
        name="Person"
        component={PersonScene}
        options={({route}) => ({title: route.params.name, ...options})}
      />
    </SettingsStack.Navigator>
  );
}

export default HomeNavigator;
