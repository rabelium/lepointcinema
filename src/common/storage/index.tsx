import {sanitizedRaw} from '@nozbe/watermelondb/RawRecord';

import {database, StateItem} from '../../database';

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
    return withCallback(callback, async function () {
      return await StateItem.find(key).catch(() => {
        throw new Error(`Could not get item with key: '${key}'`);
      });
    });
  }

  async function setItem(key: string, value: any, callback: Function) {
    return withCallback(callback, async function () {
      return await StateItem.find(key)
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
              console.log('key', key);
              console.log('value', value);
              record._raw = sanitizedRaw(
                {id: key, content: JSON.stringify(value)},
                StateItem.schema,
              );
            }),
          ),
        );
    });
  }

  async function removeItem(key: string, callback: Function) {
    return withCallback(callback, async function () {
      await StateItem.find(key).then((item) =>
        database.action(async () => item.destroyPermanently()),
      );
    });
  }

  return {
    getItem,
    setItem,
    removeItem,
  };
}
