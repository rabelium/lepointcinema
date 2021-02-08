import {tableSchema} from '@nozbe/watermelondb';

export default tableSchema({
  name: 'state',
  columns: [{name: 'content', type: 'string'}],
});
