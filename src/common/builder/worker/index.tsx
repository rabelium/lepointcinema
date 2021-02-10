import {map} from 'lodash';
import {API_URL} from '@env';
import FastImage from 'react-native-fast-image';

import {store} from '../../../state';
import {call as loadActors} from '../../../scene/Actors/provider/actors.provider';
import {call as loadDirectors} from '../../../scene/Directors/provider/directors.provider';
import {call as loadProducers} from '../../../scene/Producers/provider/producers.provider';
import {call as loadPerson} from '../../../scene/Person/provider/person.provider';
import updaters from '../../../common/builder/state/updaters';

const AppUpdater = updaters.app;

const preloadPhotos = (result: [any, any, any]) => {
  const photos = []
    .concat(...result)
    .map((item) => ({uri: `${API_URL}/images/personne/${item.img}`}))
    .filter((v, i, a) => a.indexOf(v) === i);
  return FastImage.preload(photos);
};

const preloadDetailsPhotos = (details: any) => {
  const photos = map(details, (item: any) => ({
    uri: `${API_URL}/images/personne/${item.photo}`,
  })).filter((v, i, a) => a.indexOf(v) === i);
  //`${API_URL}/images/film/${item.pictures[0]?.content?.name}`
  const movies = [].concat(
    ...map(details, (person: any) =>
      map(person.movies, (movie: any) => ({
        uri: `${API_URL}/images/film/${movie.pictures[0]?.content?.name}`,
      })),
    ),
  );

  return FastImage.preload(photos.concat(movies));
};

const preloadDetails = (result: [any, any, any]) => {
  const ids = []
    .concat(...result)
    .map((item) => item.id)
    .filter((v, i, a) => a.indexOf(v) === i);
  Promise.all(ids.map((id) => loadPerson(id))).then((details: any[]) => {
    const storeDetails = {};
    details
      .filter((v) => v)
      .forEach((item) => {
        storeDetails[item.id] = item;
      });
    preloadDetailsPhotos(storeDetails);
    store.dispatch(AppUpdater.details(storeDetails));
  });
};

export const preload = () =>
  Promise.all([
    loadActors()(store.dispatch),
    loadDirectors()(store.dispatch),
    loadProducers()(store.dispatch),
  ])
    .then((result) => {
      preloadPhotos(result);
      preloadDetails(result);
    });
