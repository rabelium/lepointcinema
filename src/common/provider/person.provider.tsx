import {map, mapValues} from 'lodash';

import client from '../builder/client';

export const load = (id: string) =>
  client.get(`personne/${id}`).then(({data}) => {
    data.content.movies = map(
      mapValues(data.content.movies, (movie: any, key: number) => ({
        id: key,
        ...movie.content,
      })),
    );
    return data.content;
  });
