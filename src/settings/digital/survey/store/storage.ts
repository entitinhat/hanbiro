import IndexedDb from '@base/utils/storages/idb';

const databaseName = 'ncrm-survey';
const tableName = 'survey';
const ncrmDB = new IndexedDb(databaseName);

export const storeSurveyToStorage = async (data: any) => {
  // console.log('survey db - save >>> ', data);
  await ncrmDB.createObjectStore([tableName]);
  await ncrmDB.putValue(tableName, data);
};

//id = survey id
export const getSurveyFromStorage = async (id: string): Promise<any> => {
  //get from idb
  await ncrmDB.createObjectStore([tableName]);
  const storageData = await ncrmDB.getValue(tableName, id);
  // console.log('survey db - get >>> ', storageData);
  return storageData;
};

export const deleteSurveyFromStorage = async (id: string): Promise<any> => {
  //get from idb
  await ncrmDB.createObjectStore([tableName]);
  await ncrmDB.deleteValue(tableName, id);
};
