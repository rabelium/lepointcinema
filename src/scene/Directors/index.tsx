import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import ProgressCircle from 'react-native-progress/CircleSnail';

import style from './style/directors.style';
import colors from '../../assets/style/colors';
import metrics from '../../assets/style/metrics';
import {load, setLoading, setRefreshing} from './provider/directors.provider';
import PersonItemComponent from '../../common/component/person-item.component';

function DirectorsScene({
  load,
  people,
  page = 0,
  loading = false,
  refreshing = false,
  setLoading,
  setRefreshing,
  navigation,
}: {
  load: any;
  people: [];
  page: number;
  loading: boolean;
  refreshing: boolean;
  setLoading: any;
  setRefreshing: any;
}) {
  useEffect(() => {
    setLoading(true);
    load();
  }, [load, setLoading]);

  return (
    <View style={style.container}>
      {loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ProgressCircle size={metrics.images.huge} color={colors.primary} />
        </View>
      )}
      {!loading && (
        <>
          <View style={style.header}>
            <Text style={style.headerText}>Réalisateurs</Text>
            <View style={style.headerDivider} />
          </View>
          <FlatList
            refreshing={refreshing || false}
            style={style.flatList}
            data={people}
            renderItem={({item}: any) => (
              <PersonItemComponent item={item} navigation={navigation} />
            )}
            keyExtractor={(item: any) => `${item.id}`}
            onEndReached={() => {
              load(page + 1, people);
            }}
            onRefresh={() => {
              setRefreshing(true);
              load();
            }}
          />
        </>
      )}
    </View>
  );
}

const mapStateToProps = (state: any) => ({...state?.directors});

const mapDispatchToProps = (dispatch: any) => ({
  load: (page = 0, people = []) => dispatch(load(page, people)),
  setLoading: (loading = false) => dispatch(setLoading(loading)),
  setRefreshing: (refreshing = false) => dispatch(setRefreshing(refreshing)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DirectorsScene);
