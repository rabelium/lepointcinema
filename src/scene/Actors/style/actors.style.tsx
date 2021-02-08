import {StyleSheet} from 'react-native';

import colors from '../../../assets/style/colors';
import metrics from '../../../assets/style/metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flatList: {
    flex: 1,
    marginHorizontal: -20,
  },
  header: {
    borderRadius: 5,
    borderStartWidth: 5,
    flexDirection: 'row',
    borderColor: colors.primary,
    marginBottom: 20,
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
});
