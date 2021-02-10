import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import ProgressCircle from 'react-native-progress/CircleSnail';

import style from './style/list.style';
import colors from '../../assets/style/colors';
import metrics from '../../assets/style/metrics';
import PersonItemComponent from './person-item.component';

export default function ListComponent({
  load,
  title,
  people,
  page = 0,
  setLoading,
  navigation,
  setRefreshing,
  loading = false,
  refreshing = false,
}: any) {
  useEffect(() => {
    setLoading(true);
    load();
  }, [load, setLoading]);

  return (
    <View style={style.container}>
      {loading && people.length === 0 && (
        <View style={style.loading}>
          <ProgressCircle size={metrics.images.huge} color={colors.primary} />
        </View>
      )}
      {people.length > 0 && (
        <>
          <View style={style.header}>
            <View style={style.decoration} />
            <Text style={style.headerText}>{title}</Text>
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
