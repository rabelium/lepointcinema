import {StyleSheet} from 'react-native';

import colors from '../../../assets/style/colors';
import metrics from '../../../assets/style/metrics';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  filled: {
    backgroundColor: 'black',
  },
  wrapper: {
    flexDirection: 'column',
  },
  circle: {
    position: 'absolute',
    width: metrics.icons.medium * 1.2,
    height: metrics.icons.medium * 1.2,
    borderRadius: (metrics.icons.medium * 1.2) / 2,
  },
});
