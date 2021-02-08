import React from 'react';
import posed from 'react-native-pose';
import {View, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import style from './style/tab-bar-mask.style';
import photos from '../../assets/style/photos';
import metrics, {dimensions} from '../../assets/style/metrics';
import {getTabBarHeight, getPaddingBottom} from './tab-bar.component';

const boxSettings: any = {};
for (let i in [0, 1, 2, 3]) {
  boxSettings[`route_${i}`] = {
    width: (dimensions.width / 4) * parseInt(i, 10),
    transition: {
      default: {ease: 'easeOut', duration: 300},
    },
  };
}

const Box = posed.View(boxSettings);

const TabBarMask = ({state, descriptors}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const insets = useSafeAreaInsets();
  const height = getTabBarHeight(insets);
  const width = dimensions.width / state.routes.length;
  const paddingBottom = getPaddingBottom(insets);
  const {index} = state;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={[style.container, {height}]}>
      <Box style={[style.filled, {height}]} pose={`route_${index}`} />
      <View style={[style.wrapper, {width}]}>
        <Image
          resizeMode="stretch"
          resizeMethod="scale"
          source={photos.tabIndicator}
          style={{height: height - paddingBottom, width}}
        />
        <View style={[style.filled, {height: paddingBottom}]} />
        <View
          style={[
            style.filled,
            style.circle,
            {
              bottom: (height - paddingBottom) / 2 + paddingBottom,
              left: width / 2 - metrics.icons.medium * 0.6,
            },
          ]}
        />
      </View>
      <Box
        style={[style.filled, {height}]}
        pose={`route_${state.routes.length - 1 - index}`}
      />
    </View>
  );
};

export default TabBarMask;
