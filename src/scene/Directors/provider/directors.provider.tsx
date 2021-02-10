import {uniqBy} from 'lodash';

import client from '../../../common/builder/client';
import updaters from '../../../common/builder/state/updaters';

const DirectorsUpdater = updaters.directors;

export const setLoading = (loading = false) => (dispatch: any) =>
  dispatch(DirectorsUpdater.loading(loading));

export const setRefreshing = (refreshing = false) => (dispatch: any) =>
  dispatch(DirectorsUpdater.refreshing(refreshing));

export const load = (page = 0, people = [], limit = 20) => (dispatch: any) =>
  call(
    page,
    people,
    limit,
  )(dispatch).finally(() => {
    dispatch(DirectorsUpdater.loading(false));
    dispatch(DirectorsUpdater.refreshing(false));
  });

export const call = (page = 0, people = [], limit = 20) => (dispatch: any) =>
  client
    .get(`rubrique/directeurs/limit/${limit}/offset/${page * limit}`)
    .then(({data}) => {
      dispatch(
        DirectorsUpdater.people(
          uniqBy(page === 0 ? data.persons : people.concat(data.persons), 'id'),
        ),
      );
      if (data.persons.length > 0) {
        dispatch(DirectorsUpdater.page(page));
      }
      return uniqBy(
        page === 0 ? data.persons : people.concat(data.persons),
        'id',
      );
    });
