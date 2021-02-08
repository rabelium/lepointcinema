import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PersonScene from '../scene/Person';
import ProducersScene from '../scene/Producers';

import options from './options/header.options';

const SettingsStack = createStackNavigator();

function ProducersNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Producers"
        component={ProducersScene}
        options={{title: 'Producteurs', ...options}}
      />
      <SettingsStack.Screen
        name="Person"
        component={PersonScene}
        options={({route}) => ({title: route.params.name, ...options})}
      />
    </SettingsStack.Navigator>
  );
}

export default ProducersNavigator;
