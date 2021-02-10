import {uniqBy} from 'lodash';

import client from '../../../common/builder/client';
import updaters from '../../../common/builder/state/updaters';

const ProducersUpdater = updaters.producers;

export const setLoading = (loading = false) => (dispatch: any) =>
  dispatch(ProducersUpdater.loading(loading));

export const setRefreshing = (refreshing = false) => (dispatch: any) =>
  dispatch(ProducersUpdater.refreshing(refreshing));

export const load = (page = 0, people = [], limit = 20) => (dispatch: any) =>
  call(
    page,
    people,
    limit,
  )(dispatch).finally(() => {
    dispatch(ProducersUpdater.loading(false));
    dispatch(ProducersUpdater.refreshing(false));
  });

export const call = (page = 0, people = [], limit = 20) => (dispatch: any) =>
  client
    .get(`rubrique/producteurs/limit/${limit}/offset/${page * limit}`)
    .then(({data}) => {
      dispatch(
        ProducersUpdater.people(
          uniqBy(page === 0 ? data.persons : people.concat(data.persons), 'id'),
        ),
      );
      if (data.persons.length > 0) {
        dispatch(ProducersUpdater.page(page));
      }
      return uniqBy(
        page === 0 ? data.persons : people.concat(data.persons),
        'id',
      );
    });
