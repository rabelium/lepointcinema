import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Icon} from '../assets/style/icons';
import TabBar from '../common/component/tab-bar.component';

import HomeNavigator from './home';
import ActorsNavigator from './actors';
import DirectorsNavigator from './directors';
import ProducersNavigator from './producers';

const Tab = createBottomTabNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen
          options={{
            tabBarLabel: 'Accueil',
            tabBarIcon: (props) => ({
              focused: <Icon {...props} name={'home_full'} />,
              unfocused: <Icon {...props} name={'home'} />,
            }),
          }}
          name="Home"
          component={HomeNavigator}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Acteurs',
            tabBarIcon: (props) => ({
              focused: <Icon {...props} name={'actor_full'} />,
              unfocused: <Icon {...props} name={'actor'} />,
            }),
          }}
          name="Actors"
          component={ActorsNavigator}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Réalisateurs',
            tabBarIcon: (props) => ({
              focused: <Icon {...props} name={'director_full'} />,
              unfocused: <Icon {...props} name={'director'} />,
            }),
          }}
          name="Directors"
          component={DirectorsNavigator}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Producteurs',
            tabBarIcon: (props) => ({
              focused: <Icon {...props} name={'producer_full'} />,
              unfocused: <Icon {...props} name={'producer'} />,
            }),
          }}
          name="Producers"
          component={ProducersNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
