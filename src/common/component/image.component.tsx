import React from 'react';
import FastImage from 'react-native-fast-image';
import ProgressCircle from 'react-native-progress/Circle';
import {createImageProgress} from 'react-native-image-progress';

import photos from '../../assets/style/photos';
import metrics from '../../assets/style/metrics';
import colors from '../../assets/style/colors';

const BaseImage = createImageProgress(FastImage);

export default ({
  uri,
  style = {},
  resizeMode = 'cover',
}: {
  style: any;
  uri: string;
  resizeMode: string;
}) => {
  const renderErrorCallback = () => {
    return <FastImage style={style} source={photos.placeholder} />;
  };

  return (
    <BaseImage
      indicator={(props: any) => (
        <ProgressCircle
          {...props}
          size={metrics.images.medium}
          color={colors.primary}
        />
      )}
      renderError={renderErrorCallback}
      style={style}
      source={{uri}}
      resizeMode={resizeMode}
    />
  );
};
