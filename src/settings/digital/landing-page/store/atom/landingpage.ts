import { atom } from 'recoil';
import { DESC } from '@base/config/constant';
// import { ListType } from '@base/types/enums';

export const landingPageListFilterState = atom({
  key: 'LandingPageListFilter',
  default: {
    isSplitMode: true,
    listType: 'LIST',
    activeMenu: '',
    activeId: '',
    activeTab: '', //detail
    settingColumns: [], //for viewing on table
    filter: {
      baseFilters: {},
      headerFilters: {},
      searchFilters: {},
      keyword: '',
      paging: {
        page: 1,
        size: 15,
      },
      sort: {
        field: 'createdAt',
        orderBy: DESC,
      },
    },
  },
});
