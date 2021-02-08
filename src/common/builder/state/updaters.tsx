import {AnyAction} from 'redux';
import {mapValues} from 'lodash';

import resetter from './resetter';

import stateSettings from '../../settings/state.settings';
import ReducerSettingInterface from '../../interface/reducer-settings.interface';

const UpdaterGenerator = (context: string, name: string, defaultValue: any) => (
  value: any,
) => {
  const action: AnyAction = {
    type: `${context.toUpperCase()}_${name.toUpperCase()}`,
  };
  action[name] = value || defaultValue;

  return action;
};

export const UpdatersGenerator = (
  context: string,
  reducers: Map<string, ReducerSettingInterface>,
) => ({
  ...mapValues(reducers, (config: ReducerSettingInterface, name: string) =>
    UpdaterGenerator(context, name, config.default),
  ),
  reset: resetter(context),
});

export default mapValues(
  stateSettings,
  (configuration: Map<string, ReducerSettingInterface>, context: string) =>
    UpdatersGenerator(context, configuration),
);
