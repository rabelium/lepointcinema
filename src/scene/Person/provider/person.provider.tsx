import {map, mapValues} from 'lodash';

import client from '../../../common/builder/client';
import updaters from '../../../common/builder/state/updaters';

const AppUpdater = updaters.app;

export const load = (id: number, details: any) => (dispatch: any) =>
  call(id).then((content) => {
    details[id] = content;
    dispatch(AppUpdater.details(details));
  });

export const call = (id: number) =>
  client
    .get(`personne/${id}`)
    .then(({data}) => {
      data.content.id = id;
      data.content.movies = map(
        mapValues(data.content.movies, (movie: any, key: number) => ({
          id: key,
          ...movie.content,
        })),
      );
      return data?.content;
    })
    .catch(() => {});
