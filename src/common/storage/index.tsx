import Queue from 'promise-queue';
import {sanitizedRaw} from '@nozbe/watermelondb/RawRecord';

import {database, StateItem} from '../../database';

const queue = new Queue(2, Infinity);

async function withCallback(callback: Function, func: Function) {
  try {
    const result = await func();
    if (callback) {
      callback(null, result);
    }
    return result;
  } catch (err) {
    if (callback) {
      callback(err);
    } else {
      throw err;
    }
  }
}

export function createWatermelonPersistStorage() {
  async function getItem(key: string, callback: Function) {
    return withCallback(callback, () =>
      queue.add(() =>
        StateItem.find(key)
          .then((item) => JSON.parse(item.content))
          .catch(() => {
            throw new Error(`Could not get item with key: '${key}'`);
          }),
      ),
    );
  }

  async function setItem(key: string, value: any, callback: Function) {
    return withCallback(callback, () =>
      queue.add(() =>
        StateItem.find(key)
          .then((item) =>
            database.action(() =>
              item.update((loadedItem) => {
                Object.assign(loadedItem, {content: JSON.stringify(value)});
              }),
            ),
          )
          .catch(() =>
            database.action(() =>
              StateItem.create((record) => {
                record._raw = sanitizedRaw(
                  {id: key, content: JSON.stringify(value)},
                  StateItem.schema,
                );
              }),
            ),
          ),
      ),
    );
  }

  async function removeItem(key: string, callback: Function) {
    return withCallback(callback, () =>
      queue.add(() =>
        StateItem.find(key).then((item) =>
          database.action(async () => item.destroyPermanently()),
        ),
      ),
    );
  }

  return {
    getItem,
    setItem,
    removeItem,
  };
}
