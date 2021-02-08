import {StyleSheet} from 'react-native';

import colors from '../../../assets/style/colors';
import metrics from '../../../assets/style/metrics';

export default StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  photo: {
    width: metrics.images.huge,
    aspectRatio: 3 / 4,
  },
  infos: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    color: colors.text,
    fontFamily: 'ProximaNovaA-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: colors.tempest,
    fontFamily: 'ProximaNovaA-Light',
    marginBottom: 7,
  },
  decription: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'ProximaNovaA-Light',
  },
  more: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: 'ProximaNovaA-Light',
  },
});
