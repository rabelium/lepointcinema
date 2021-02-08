import {appSchema} from '@nozbe/watermelondb';

import StateItemSchema from './schema/state-item.schema';

export default appSchema({
  version: 1,
  tables: [StateItemSchema],
});
