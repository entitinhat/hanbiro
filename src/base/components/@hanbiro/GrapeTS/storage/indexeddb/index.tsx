import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('grapests-indexeddb', (editor: any, opts = {}) => {
  const options = {
    ...{
      // Database name
      dbName: 'gts',

      // Collection name
      objectStoreName: 'templates',
    },
    ...opts,
  };

  let db: any;
  const sm = editor.StorageManager;
  const storageName = 'indexeddb';
  const objsName = options.objectStoreName;

  const getId = () => sm.getConfig().id || 'gts';

  // Functions for DB retrieving
  const getDb = () => db;
  const getAsyncDb = (clb: any) => {
    if (db) {
      clb(db);
    } else {
      const { indexedDB } = window; //|| window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
      const request = indexedDB.open(options.dbName, 1);
      const onError = () => sm.onError(storageName, request.error);
      request.onerror = onError;
      request.onsuccess = () => {
        db = request.result;
        db.onerror = onError;
        clb(db);
      };
      request.onupgradeneeded = (e: any) => {
        e?.currentTarget?.result?.createObjectStore(objsName, { keyPath: 'id' });
      };
    }
  };

  // Functions for object store retrieving
  const getObjectStore = () => {
    return db.transaction([objsName], 'readwrite').objectStore(objsName);
  };
  const getAsyncObjectStore = (clb: any) => {
    if (db) {
      clb(getObjectStore());
    } else {
      getAsyncDb((db: any) => clb(getObjectStore()));
    }
  };

  // Add custom storage to the editor
  sm.add(storageName, {
    getDb,

    getObjectStore,

    load: (keys: any, clb: any, clbErr: any) => {
      getAsyncObjectStore((objs: any) => {
        const request = objs.get(getId());
        request.onerror = clbErr;
        request.onsuccess = () => {
          const { id, ...data } = request.result || {};
          if (clb) clb(data);
        };
      });
    },

    store: (data: any, clb: any, clbErr: any) => {
      getAsyncObjectStore((objs: any) => {
        const request = objs.put({ id: getId(), ...data });
        request.onerror = clbErr;
        request.onsuccess = clb;
      });
    },
  });
});
