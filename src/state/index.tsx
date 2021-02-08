import {persistStore} from 'redux-persist';
import {buildStore} from '../common/builder/state';

export const store = buildStore();
export const persistor = persistStore(store);
