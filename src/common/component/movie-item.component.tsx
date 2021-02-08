import React from 'react';
import {API_URL} from '@env';
import {Text, View} from 'react-native';
import ReadMore from 'react-native-read-more-text';
import {map} from 'lodash';

import Image from './image.component';
import style from './style/movie-item.style';

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

export default ({item}: any) => (
  <View style={style.container}>
    <Image
      uri={`${API_URL}/images/film/${item.pictures[0]?.content?.name}`}
      style={style.photo}
    />
    <View style={style.infos}>
      <Text numberOfLines={1} style={style.title}>
        {item.original_title}
      </Text>
      <Text numberOfLines={1} style={style.subtitle}>
        {item.production_year} - {item.movie_duration} min
      </Text>
      <Text style={style.subtitle}>
        {map(item.fonctions, (job: any) => `${job.content.libelle}`).join(
          ' - ',
        )}
      </Text>
      <ReadMore
        numberOfLines={4}
        renderTruncatedFooter={_renderTruncatedFooter}
        renderRevealedFooter={_renderRevealedFooter}>
        <Text style={style.decription}>{item.description}</Text>
      </ReadMore>
    </View>
  </View>
);
