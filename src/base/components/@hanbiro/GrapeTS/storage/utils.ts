import IndexedDb from '@base/utils/storages/idb';

const databaseName = 'gts';
const tableName = 'templates';
const gtsDB = new IndexedDb(databaseName);

export const removeFromStorage = async (id: string) => {
  //// console.log('store data', data);
  await gtsDB.createObjectStore([tableName]);
  await gtsDB.deleteValue(tableName, id);
};

export const getFromStorage = async (id: string) => {
  //get from idb
  await gtsDB.createObjectStore([tableName]);
  const data = await gtsDB.getValue(tableName, id);
  return data;
};
