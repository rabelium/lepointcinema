import {StyleSheet} from 'react-native';

import colors from '../../../assets/style/colors';

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
    marginBottom: 20,
    flexDirection: 'row',
    borderColor: colors.primary,
  },
  decoration: {
    width: 5,
    borderRadius: 5,
    borderStartWidth: 5,
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
  loading: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
