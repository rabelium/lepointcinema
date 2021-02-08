import {map, pickBy} from 'lodash';

import {createWatermelonPersistStorage} from '../../../common/storage';
import ReducerSettingInterface from '../../interface/reducer-settings.interface';

export default (
  key: string,
  reducers: Map<string, ReducerSettingInterface>,
) => ({
  key,
  storage: createWatermelonPersistStorage(),
  whitelist: map(
    pickBy(reducers, 'persist'),
    (_config: ReducerSettingInterface, name: string) => name,
  ),
});
