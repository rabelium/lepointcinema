import React from 'react';
import {API_URL} from '@env';
import {Text, View} from 'react-native';

import Image from './image.component';
import style from './style/person-item.style';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default ({item, navigation}: any) => (
  <TouchableOpacity
    activeOpacity={1}
    style={style.container}
    onPress={() => {
      navigation.navigate('Person', {id: item.id, name: item.fullname});
    }}>
    <Image uri={`${API_URL}/images/personne/${item.img}`} style={style.photo} />
    <View style={style.infos}>
      <Text numberOfLines={1} style={style.title}>
        {item.fullname}
      </Text>
      <Text numberOfLines={1} style={style.subtitle}>
        {item.date_naissance} - {item.profession}
      </Text>
      <Text numberOfLines={6} style={style.decription}>
        {item.commentaire}
      </Text>
    </View>
  </TouchableOpacity>
);
