import React from 'react';
import posed from 'react-native-pose';
import {View, TouchableOpacity, Platform} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';

import metrics, {dimensions} from '../../assets/style/metrics';
import TabBarMask from './tab-bar-mask.component';
import style from './style/tab-bar.style';
import colors from '../../assets/style/colors';

const DEFAULT_TABBAR_HEIGHT = 49;
const COMPACT_TABBAR_HEIGHT = 32;

export const getPaddingBottom = (insets: EdgeInsets) =>
  Math.max(
    insets.bottom -
      Platform.select({
        ios: 4,
        default: 0,
      }),
    0,
  );

export const getTabBarHeight = (insets: EdgeInsets) => {
  const isLandscape = dimensions.width > dimensions.height;
  const paddingBottom = getPaddingBottom(insets);

  if (Platform.OS === 'ios' && !Platform.isPad && isLandscape) {
    return COMPACT_TABBAR_HEIGHT + paddingBottom;
  }

  return DEFAULT_TABBAR_HEIGHT + paddingBottom;
};

const boxSettings: any = {};
for (let i in [0, 1, 2, 3]) {
  boxSettings[`route_${i}`] = {
    width: (dimensions.width / 4) * parseInt(i, 10),
    transition: {
      default: {ease: 'easeOut', duration: 300},
    },
  };
}

const TabBarContent = ({
  unfocusedBoxSettings,
  focusedBoxSettings,
  paddingBottom,
  descriptors,
  navigation,
  height,
  state,
}) => {
  const FocusedBox = posed.View(focusedBoxSettings);
  const UnfocusedBox = posed.View(unfocusedBoxSettings);

  return (
    <View style={[style.container, {height, paddingBottom}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const icon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={style.item}>
            <FocusedBox
              pose={isFocused ? 'shown' : 'hidden'}
              style={style.focused}>
              {
                icon({
                  color: colors.primary,
                  size: metrics.icons.medium * 1.2,
                }).focused
              }
            </FocusedBox>
            <UnfocusedBox
              pose={isFocused ? 'hidden' : 'shown'}
              style={style.unfocused}>
              {
                icon({
                  color: colors.snow,
                  size: metrics.icons.medium,
                }).unfocused
              }
            </UnfocusedBox>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabBar = ({state, navigation, descriptors}) => {
  const insets = useSafeAreaInsets();
  const height = getTabBarHeight(insets);
  const paddingBottom = getPaddingBottom(insets);
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const focusedBoxSettings = {
    shown: {
      opacity: 1,
      bottom: (height - paddingBottom) / 2 - 4,
      transition: {
        bottom: {ease: 'linear', duration: 300},
        default: {ease: 'easeIn', duration: 300},
      },
    },
    hidden: {
      opacity: 0,
      bottom: 0,
      transition: {
        bottom: {ease: 'linear', duration: 300},
        default: {ease: 'easeIn', duration: 300},
      },
    },
  };

  const unfocusedBoxSettings = {
    shown: {
      opacity: 1,
      bottom: 0,
      transition: {
        bottom: {ease: 'linear', duration: 300},
        default: {ease: 'easeIn', duration: 300},
      },
    },
    hidden: {
      opacity: 0,
      bottom: (height - paddingBottom) / 2 - 4,
      transition: {
        bottom: {ease: 'linear', duration: 300},
        default: {ease: 'easeIn', duration: 300},
      },
    },
  };

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <MaskedView
      maskElement={<TabBarMask state={state} descriptors={descriptors} />}>
      <TabBarContent
        state={state}
        height={height}
        navigation={navigation}
        descriptors={descriptors}
        paddingBottom={paddingBottom}
        focusedBoxSettings={focusedBoxSettings}
        unfocusedBoxSettings={unfocusedBoxSettings}
      />
    </MaskedView>
  );
};

export default TabBar;
