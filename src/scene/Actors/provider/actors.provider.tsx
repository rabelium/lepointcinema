import {uniqBy} from 'lodash';

import client from '../../../common/builder/client';
import updaters from '../../../common/builder/state/updaters';

const ActorsUpdater = updaters.actors;

export const setLoading = (loading = false) => (dispatch: any) =>
  dispatch(ActorsUpdater.loading(loading));

export const setRefreshing = (refreshing = false) => (dispatch: any) =>
  dispatch(ActorsUpdater.refreshing(refreshing));

export const load = (page = 0, people = [], limit = 20) => (dispatch: any) =>
  call(
    page,
    people,
    limit,
  )(dispatch).finally(() => {
    dispatch(ActorsUpdater.loading(false));
    dispatch(ActorsUpdater.refreshing(false));
  });

export const call = (page = 0, people = [], limit = 20) => (dispatch: any) =>
  client
    .get(`rubrique/acteurs/limit/${limit}/offset/${page * limit}`)
    .then(({data}) => {
      dispatch(
        ActorsUpdater.people(
          uniqBy(page === 0 ? data.persons : people.concat(data.persons), 'id'),
        ),
      );
      if (data.persons.length > 0) {
        dispatch(ActorsUpdater.page(page));
      }
      return uniqBy(
        page === 0 ? data.persons : people.concat(data.persons),
        'id',
      );
    });
