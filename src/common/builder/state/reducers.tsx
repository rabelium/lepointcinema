import {mapValues} from 'lodash';
import {AnyAction, combineReducers, Reducer, ReducersMapObject} from 'redux';

import ReducerSettingInterface from '../../interface/reducer-settings.interface';

const ReducerGenerator = (
  context: string,
  name: string,
  defaultState = null,
): Reducer<any, AnyAction> => (state = defaultState, action: AnyAction) => {
  if (action.type === `${context.toUpperCase()}_${name.toUpperCase()}`) {
    return action[name] || null;
  }

  if (action.type === `${context.toUpperCase()}_RESET`) {
    return defaultState;
  }

  return state;
};

const generate = (
  context: string,
  reducers: Map<string, ReducerSettingInterface>,
): ReducersMapObject<any, AnyAction> =>
  mapValues(reducers, (config: ReducerSettingInterface, name: string) =>
    ReducerGenerator(context, name, config.default),
  );

export default (
  context: string,
  reducers: Map<string, ReducerSettingInterface>,
): Reducer<any, AnyAction> => combineReducers(generate(context, reducers));
