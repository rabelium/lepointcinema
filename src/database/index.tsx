import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import StateItemModel from './model/state-item.model';

const adapter = new SQLiteAdapter({schema});

export const database = new Database({
  adapter,
  modelClasses: [StateItemModel],
  actionsEnabled: true,
});

export const StateItem = database.collections.get(StateItemModel.table);
