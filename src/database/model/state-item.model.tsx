import {Model} from '@nozbe/watermelondb';
import {action, field} from '@nozbe/watermelondb/decorators';

export default class StateItemModel extends Model {
  static table = 'state';

  @field('content') content!: string;

  @action async clear() {
    return await this.destroyPermanently();
  }
}
