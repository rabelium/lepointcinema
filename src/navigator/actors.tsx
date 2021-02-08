import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PersonScene from '../scene/Person';
import ActorsScene from '../scene/Actors';

import options from './options/header.options';

const SettingsStack = createStackNavigator();

function ActorsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Actors"
        component={ActorsScene}
        options={{title: 'Acteurs', ...options}}
      />
      <SettingsStack.Screen
        name="Person"
        component={PersonScene}
        options={({route}) => ({title: route.params.name, ...options})}
      />
    </SettingsStack.Navigator>
  );
}

export default ActorsNavigator;
