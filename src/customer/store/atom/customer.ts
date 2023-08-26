import { atom } from 'recoil';
//import { ICustomerModel } from '@customer/customer/types/interface/customer';
import { DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { ListType } from '@base/types/app';

export const customerListState = atom({
  key: 'CustomerList',
  default: []
});

export const customerListFilterState = atom({
  key: 'CustomerListFilter',
  default: {
    isSplitMode: false,
    activeMenu: 'account',
    activeId: '',
    activeTab: '',
    listType: ListType.LIST,
    settingColumns: {
      all: [],
      account: [],
      contact: []
    } as any, //for viewing on table
    filter: {
      /* query definition:  
          ONE PARAMETER: { [keyName]: { value: '', operator: ''} }
            *with operator is : (like), = (equal), ...
          MANY PARAMETERS: { condition: OR | AND, criteria: [ { [keyName]: { value: '', operator: ''} }, ... ] } 
        */
      all: {
        //groupByFilters: {}, //NOT USE
        //dateFilters: {}, //NOT USE
        //headerFilters: {}, //NOT USE
        //searchFilters: {},
        //keyword: '',
        query: {} as any,
        paging: {
          page: 1,
          size: 10 //LIST_TABLE_PAGE_SIZE
        },
        sort: {
          field: 'createdAt',
          orderBy: DESC
        }
      },
      account: {
        //groupByFilters: {}, //NOT USE
        //dateFilters: {}, //NOT USE
        //headerFilters: {}, //NOT USE
        //searchFilters: {},
        //keyword: '',
        query: {} as any,
        paging: {
          page: 1,
          size: 15
        },
        sort: {
          field: 'createdAt',
          orderBy: DESC
        }
      },
      contact: {
        //groupByFilters: {}, //NOT USE
        //dateFilters: {}, //NOT USE
        //headerFilters: {}, //NOT USE
        //searchFilters: {},
        //keyword: '',
        query: {} as any,
        paging: {
          page: 1,
          size: 15
        },
        sort: {
          field: 'createdAt',
          orderBy: DESC
        }
      }
    } as any
  }
});

export const customerWriteOptionAtom = atom({
  key: 'CustomerWriteOptionAtom',
  default: {
    writeType: '', //'acount', 'contact'
    writeMenu: 'list', //'list', 'view', ....
    isOpenWrite: false
  }
});
