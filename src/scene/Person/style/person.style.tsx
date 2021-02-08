import {StyleSheet} from 'react-native';

import colors from '../../../assets/style/colors';
import metrics from '../../../assets/style/metrics';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
  container: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  photo: {
    width: metrics.images.huge,
    aspectRatio: 3 / 4,
  },
  flatList: {
    flex: 1,
  },
  infos: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
  },
  header: {
    borderRadius: 5,
    borderStartWidth: 5,
    flexDirection: 'row',
    borderColor: colors.primary,
  },
  headerDivider: {
    flex: 1,
    height: '66%',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  headerText: {
    fontSize: 24,
    color: colors.text,
    paddingHorizontal: 10,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  subHeader: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'ProximaNovaA-Light',
    marginTop: 7,
    marginBottom: 20,
    marginLeft: 15,
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
