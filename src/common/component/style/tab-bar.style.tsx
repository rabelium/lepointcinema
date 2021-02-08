import {StyleSheet} from 'react-native';

import colors from '../../../assets/style/colors';
import metrics from '../../../assets/style/metrics';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {fontSize: 28, color: colors.text, textAlign: 'center'},
  item: {
    flex: 1,
    alignItems: 'center',
    padding: 4,
    overflow: 'visible',
  },
  focused: {
    backgroundColor: colors.snow,
    width: metrics.icons.medium * 1.2,
    height: metrics.icons.medium * 1.2,
    borderRadius: (metrics.icons.medium * 1.2) / 2,
    position: 'absolute',
  },
  unfocused: {
    backgroundColor: colors.transparent,
    borderRadius: metrics.icons.medium,
    height: metrics.icons.medium,
    width: metrics.icons.medium,
  },
});
