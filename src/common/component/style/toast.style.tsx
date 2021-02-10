import {StyleSheet} from 'react-native';

import colors from '../../../assets/style/colors';
import metrics from '../../../assets/style/metrics';

export default StyleSheet.create({
  container: {
    width: (metrics.screenWidth - 40) / 2,
    backgroundColor: colors.text,
    flexDirection: 'row',
    borderRadius: 5,
    padding: 15,
  },
  wrapper: {
    flexDirection: 'column',
    paddingLeft: 10,
    flex: 1,
  },
  title: {
    lineHeight: metrics.icons.medium,
    fontFamily: 'ProximaNovaA-Bold',
    color: colors.snow,
    fontSize: 14,
  },
  content: {
    fontFamily: 'ProximaNovaA-Light',
    color: colors.snow,
    fontSize: 14,
  },
  touch: {
    height: metrics.icons.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
