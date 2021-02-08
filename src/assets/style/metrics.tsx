import {Dimensions} from 'react-native';

const {width, height, scale} = Dimensions.get('window');
export const dimensions = {width, height, scale};

const metrics = {
  screenWidth: (width < height ? width : height) * scale,
  screenHeight: (width < height ? height : width) * scale,
  icons: {
    tiny: 16,
    small: 24,
    medium: 32,
    large: 48,
    xl: 64,
  },
  images: {
    small: 16,
    medium: 32,
    large: 64,
    huge: 128,
    logo: 256,
  },
};

export default metrics;
