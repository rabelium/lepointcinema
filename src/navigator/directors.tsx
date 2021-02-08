import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PersonScene from '../scene/Person';
import DirectorsScene from '../scene/Directors';

import options from './options/header.options';

const SettingsStack = createStackNavigator();

function DirectorsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Directors"
        component={DirectorsScene}
        options={{title: 'Réalisateurs', ...options}}
      />
      <SettingsStack.Screen
        name="Person"
        component={PersonScene}
        options={({route}) => ({title: route.params.name, ...options})}
      />
    </SettingsStack.Navigator>
  );
}

export default DirectorsNavigator;
