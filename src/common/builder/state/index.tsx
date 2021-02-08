import {mapValues} from 'lodash';
import {persistReducer} from 'redux-persist';
import {AnyAction, combineReducers, ReducersMapObject, Store} from 'redux';

import persisterBuilder from './persister';
import reducersBuilder from './reducers';
import storeBuilder from './store';

import stateSettings from '../../settings/state.settings';
import ReducerSettingInterface from '../../interface/reducer-settings.interface';

const createReducers = (): ReducersMapObject<any, AnyAction> =>
  mapValues(
    stateSettings,
    (configuration: Map<string, ReducerSettingInterface>, context: string) =>
      persistReducer(
        persisterBuilder(context, configuration),
        reducersBuilder(context, configuration),
      ),
  );

export const buildStore = (): Store =>
  storeBuilder(combineReducers(createReducers()));
