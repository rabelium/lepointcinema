import {uniqBy} from 'lodash';

import client from '../../../common/builder/client';
import updaters from '../../../common/builder/state/updaters';

const HomeUpdater = updaters.home;

export const setLoading = (loading = false) => (dispatch: any) =>
  dispatch(HomeUpdater.loading(loading));

export const setRefreshing = (refreshing = false) => (dispatch: any) =>
  dispatch(HomeUpdater.refreshing(refreshing));

export const load = (page = 0, people = [], limit = 20) => (dispatch: any) =>
  client
    .get(`rubrique/home/limit/${limit}/offset/${page * limit}`)
    .then(({data}) => {
      dispatch(
        HomeUpdater.people(
          uniqBy(page === 0 ? data.persons : people.concat(data.persons), 'id'),
        ),
      );
      if (data.persons.length > 0) {
        dispatch(HomeUpdater.page(page));
      }
      dispatch(HomeUpdater.loading(false));
      dispatch(HomeUpdater.refreshing(false));
    });
