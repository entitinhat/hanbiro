import IndexedDb from '@base/utils/storages/idb';
import { GET_MENU_PAGELAYOUT } from './graphql/pagelayout';
import { PageLayout, PageLayoutResponse, PageLayoutSchema } from '@base/types/pagelayout';
import aliasReadMasks from './pagelayoutReadmasks';
import { graphQLApi } from '@base/utils/axios/graphql';
import usePost from '../hooks/usePost';

const databaseName = 'ncrm';
const tableName = 'pagelayouts';
const ncrmDB = new IndexedDb(databaseName);

export const getPageLayout = async <T>(menu: string): Promise<T | undefined> => {
  const res = await graphQLApi<T>('setting_menuPagelayout', GET_MENU_PAGELAYOUT, { menu });
  //// console.log('api res', res);
  return res;
};

export const getResponsePageLayout = (menu: string, layoutData: PageLayout | undefined): PageLayoutResponse => {
  //response data
  let newResponseLayout: PageLayoutResponse = {
    menu,
    id: menu,
    list: {
      data: [],
      schema: '',
      keyNames: []
    },
    view: {
      data: [],
      schema: '',
      keyNames: []
    },
    write: {
      data: [],
      schema: '',
      keyNames: []
    }
  };

  if (layoutData) {
    Object.keys(layoutData).forEach((dataMode: string) => {
      let data: any[] = [];
      let schema: any[] = [];
      let keyName: string[] = [];

      const layoutModeData = layoutData[dataMode];
      //// console.log('layoutModeData', layoutModeData);

      if (layoutModeData?.sections) {
        //response
        data = layoutModeData.sections.map((_section: any) => {
          _section.children
            ? _section.children.map((_field: any) => {
                keyName.push(_field.keyName);
              })
            : null;

          let aliasReadMask = aliasReadMasks[_section.keyName];
          schema.push(_section.keyName + (aliasReadMask ? ' ' + aliasReadMask : ''));
          return {
            name: _section.keyName,
            isDefault: _section.defaultViewInList,
            dataType: _section.dataType,
            order: _section.orderInList,
            title: _section.languageKey,
            hidden: !_section.showInList,
            ..._section
          };
        });

        //update response
        newResponseLayout[dataMode].keyNames = keyName;
        newResponseLayout[dataMode].data = data;
        newResponseLayout[dataMode].schema = schema.join('\n');
        //// console.log('newResponseLayout', newResponseLayout);
      }
    });
  }

  return newResponseLayout;
};

//USE ASYNC
export const getPageLayoutForMenu = async (menu: string, device?: string): Promise<PageLayoutResponse> => {
  //call api to get data
  const layoutData = await getPageLayout<PageLayout>(menu);
  //// console.log('async layoutData', layoutData);

  return getResponsePageLayout(menu, layoutData);
};

//USE HOOK
export const usePageLayoutForMenu = (menu: string, device?: string): PageLayoutResponse => {
  // // console.log('usePagelayoutForMenu', ['menuPagelayout', menu]);
  //call api to get data
  const { data: layoutData } = usePost<PageLayout>(['menuPagelayout', menu], GET_MENU_PAGELAYOUT, {
    menu
  });
  //// console.log('hook layoutData', layoutData);
  return getResponsePageLayout(menu, layoutData);
};

export const storePageLayoutToStorage = async (data: PageLayoutResponse) => {
  //// console.log('store data', data);
  await ncrmDB.createObjectStore([tableName]);
  await ncrmDB.putValue(tableName, data);
};

export const getPagelayoutFromStorage = async (id: string, mode: string): Promise<PageLayoutSchema> => {
  //get from idb
  await ncrmDB.createObjectStore([tableName]);
  const storageData = await ncrmDB.getValue(tableName, id);
  //// console.log('get storageData', storageData);
  let newSchema: PageLayoutSchema = { data: [], schema: '', keyNames: [] };
  if (storageData) {
    newSchema = storageData[mode];
  }
  return newSchema;
};

export const hasPageLayoutInStorage = async (id: string): Promise<boolean> => {
  await ncrmDB.createObjectStore([tableName]);
  const storageData = await ncrmDB.getValue(tableName, id);
  //// console.log('get storageData', storageData);
  if (storageData) return true;
  return false;
};
