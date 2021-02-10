import {API_URL} from '@env';
import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import ReadMore from 'react-native-read-more-text';
import ProgressCircle from 'react-native-progress/CircleSnail';

import style from './style/person.style';
import colors from '../../assets/style/colors';
import {load} from './provider/person.provider';
import metrics from '../../assets/style/metrics';
import Image from '../../common/component/image.component';
import MovieItemComponent from '../../common/component/movie-item.component';

const _renderTruncatedFooter = (handlePress: any) => (
  <Text style={style.more} onPress={handlePress}>
    plus
  </Text>
);
const _renderRevealedFooter = (handlePress: any) => (
  <Text style={style.more} onPress={handlePress}>
    moins
  </Text>
);

function PersonScene({route, load, details = {}}: any) {
  const loading = !Boolean(details[route?.params?.id]);
  const infos = details[route?.params?.id] || {};

  useEffect(() => {
    load(route?.params?.id, details);
  }, [route, load]);
  return (
    <View style={style.wrapper}>
      {loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ProgressCircle size={metrics.images.huge} color={colors.primary} />
        </View>
      )}
      {!loading && (
        <>
          <View style={style.header}>
            <Text style={style.headerText}>{infos.nom}</Text>
            <View style={style.headerDivider} />
          </View>
          <Text style={style.subHeader}>
            {infos.profession} de nationalité {infos.nationalite}
          </Text>
          <View style={style.container}>
            <Image
              uri={`${API_URL}/images/personne/${infos.photo}`}
              style={style.photo}
            />
            <View style={style.infos}>
              <Text style={style.subtitle}>
                Naissance en {infos.date_naissance} - {infos.lieu_naissance}
              </Text>
              {infos?.commentaire?.length && (
                <ReadMore
                  numberOfLines={8}
                  renderTruncatedFooter={_renderTruncatedFooter}
                  renderRevealedFooter={_renderRevealedFooter}>
                  <Text style={style.decription}>{infos.commentaire}</Text>
                </ReadMore>
              )}
            </View>
          </View>
          <Text style={style.subHeader} />
          <View style={style.header}>
            <Text style={style.headerText}>Cinématographie</Text>
            <View style={style.headerDivider} />
          </View>
          {infos?.movies?.length && (
            <FlatList
              style={style.flatList}
              data={infos.movies}
              renderItem={({item}: any) => <MovieItemComponent item={item} />}
              keyExtractor={(item: any) => `${item.id}`}
            />
          )}
        </>
      )}
    </View>
  );
}

const mapStateToProps = (state: any) => ({
  details: state?.app?.details,
});

const mapDispatchToProps = (dispatch: any) => ({
  load: (id: number, details: any) => dispatch(load(id, details)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PersonScene);
