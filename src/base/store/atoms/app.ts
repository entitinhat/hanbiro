import { atom, atomFamily, useRecoilValue, useSetRecoilState } from 'recoil';

import { COLORS, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_ACTIVITY, MENU_CUSTOMER, MENU_DESK, MENU_DESK_TICKET, MENU_INVENTORY, MENU_MYWORK } from '@base/config/menus';
import { Device, ListType, MenuData } from '@base/types/app';
// import { RootStateProps } from '@base/types/root';
import { Country } from '@base/types/setting';
import { useUserSetting } from '@base/services';
import { FormatSetting } from '@settings/general/types/interface';
// import { getDefaultAuth } from '@base/utils/vora';

// export const rootAtom = atom<RootStateProps>({
//   key: 'rootAtom',
//   default: {
//     auth: getDefaultAuth(),
//     menu: {
//       openItem: ['dashboard'],
//       openComponent: 'buttons',
//       drawerOpen: false,
//       componentDrawerOpen: true
//     }
//     /*calendar: {
//       calendarView: 'dayGridMonth',
//       error: false,
//       events: [],
//       isLoader: false,
//       isModalOpen: false,
//       selectedEventId: null,
//       selectedRange: null
//     }*/
//   }
// });

export const deviceAtom = atom<Device>({
  key: 'deviceAtom',
  default: {
    // device: 'desktop',
    // layout: 'layout1',
    isMobile: false,
    // isTablet: false,
    isDesktop: true,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
    // skin: 'light',
    // headerColor: COLORS[0].value,
    // language: 'en',
    // enableTrans: false
  } as Device
});

export const statesAtom = atom<any | null>({
  key: 'statesAtom',
  default: {}
});

export const citiesAtom = atom<any | null>({
  key: 'citiesAtom',
  default: {}
});

export const phonesAtom = atom<any[]>({
  key: 'phonesAtom',
  default: []
});

export const defaultPhoneAtom = atom<any | null>({
  key: 'defaultPhoneAtom',
  default: null
});

export const pageDataByMenuAtom = atomFamily<MenuData, string>({
  key: 'pageMenuDataAtom',
  default: (param) => ({
    isSplitMode: false,
    listType: defaultListType(param),
    filter: {
      baseFilters: {},
      headerFilters: {
        groupBy: defaultFilter(param)
        //dateBy
        //filterBy
      },
      searchFilters: {},
      keyword: '',
      paging: {
        page: 1,
        size: LIST_TABLE_PAGE_SIZE
      },
      sort: {
        field: defaultSortField(param),
        orderBy: DESC
      },
      query: 'default'
    },
    settingColumns: []
  })
});

function defaultSortField(menuKey: string) {
  const defaultFields = {
    [`${MENU_ACTIVITY}_comparison`]: 'user'
  };
  return defaultFields?.[menuKey] ?? 'createdAt';
}

function defaultListType(menuKey: string) {
  // console.log('defaultListType', menuKey);
  const activityMyMenu = `${MENU_ACTIVITY}_${MENU_MYWORK}`;
  if (activityMyMenu === menuKey) {
    return ListType.KANBAN;
  }
  // else if (param == MENU_DESK_TICKET) {
  //   return 'allTickets';
  // }
  return ListType.LIST;
}

function defaultFilter(menuKey: string) {
  //// console.log('defaultFilter', param);
  const activityMyMenu = `${MENU_ACTIVITY}_${MENU_MYWORK}`;
  const activityAllMenu = `${MENU_ACTIVITY}_${MENU_ACTIVITY}`;
  if (menuKey === activityAllMenu) {
    return 'all';
  } else if (menuKey === activityMyMenu) {
    return 'my';
  }
  // else if (param == MENU_DESK_TICKET) {
  //   return 'allTickets';
  // }
  return 'all';
}
export const formatSettingsAtom = atom<FormatSetting[]>({
  key: 'formatSettingsAtom',
  default: [
    {
      id: '',
      menu: 'format',
      key: 'number',
      value: {
        decimalSymbol: '.',
        noOfDecimal: 2,
        digitGroupingSymbol: ',',
        digitGroup: '123,456,789',
        negativeNumberFormat: '-1.1'
      }
    },
    // {
    //   id: '',
    //   menu: 'format',
    //   key: 'calendar',
    //   value: {
    //     from: 1930,
    //     to: 2029,
    //     firstDayOfWeek: 1
    //   }
    // },
    {
      id: '',
      menu: 'format',
      key: 'date',
      value: {
        firstDayOfWeek: 4,
        firstWeekOfYear: 1,
        dateFormat: 'M/d/yyyy',
        dateSeparator: '/'
      }
    },
    // {
    //   id: '',
    //   menu: 'format',
    //   key: 'business_hours',
    //   value: {
    //     startAt: '08:30',
    //     endAt: '18:00'
    //   }
    // },
    {
      id: '',
      menu: 'format',
      key: 'time',
      value: {
        timeFormat: 'yyyy-MM-dd',
        timeSeperator: ':'
      }
    },
    // {
    //   id: '',
    //   menu: 'format',
    //   key: 'fiscal_period',
    //   parse: true,
    //   value: {}
    // },
    {
      id: '',
      menu: 'format',
      key: 'timezone',
      value: [
        { nationEn: 'Vietnam/Hanoi', tzone: 'Asia/Saigon', sdtime: 'ICT', sdutc: '+0700', isDefault: true },
        { nationEn: 'Greece/Athens', tzone: 'Europe/Athens', sdtime: 'EEST', sdutc: '+0200', isDefault: false },
        { nationEn: 'Granada/Granada', tzone: 'America/Grenada', sdtime: 'AST', sdutc: '-0400', isDefault: false }
      ]
    },
    {
      id: '',
      menu: 'format',
      key: 'country',
      value: [
        {
          id: '',
          isoCode2: 'US',
          isoCode3: 'USA',
          country: 'United States',
          phoneCode: '1',
          region: 'Americas',
          currency: 'USD',
          isDefault: true
        },
        { id: '', isoCode2: 'VN', isoCode3: 'VNM', country: 'Vietnam', phoneCode: '84', region: 'Asia', currency: 'VND', isDefault: false },
        {
          id: '',
          isoCode2: 'AX',
          isoCode3: 'ALA',
          country: 'Aland Islands',
          region: 'Asia',
          currency: 'USD',
          phoneCode: '',
          isDefault: false
        }
      ]
    },
    {
      id: '',
      menu: 'format',
      key: 'currency',
      value: {
        currencyFormats: ['1,234,567.89', '1.234.567,89', '1 234 567,89'],
        currencyFormat: '1,234,567.89',
        negativeCurrencyFormats: ['-1,234,567.89', '-1.234.567,89', '-1 234 567,89'],
        negativeCurrencyFormat: '-1 234 567,89',
        usedCurrencies: [
          { code: 'AED', currencyName: 'UAE Dirham', currencySymbol: 'AED', isDefault: true },
          { code: 'AFN', currencyName: 'Afghan Afghani', currencySymbol: 'AFN', isDefault: false },
          { code: 'ANG', currencyName: 'Netherlands Antillian Guilder', currencySymbol: 'ƒ', isDefault: false },
          { code: 'AOA', currencyName: 'Angolan Kwanza', currencySymbol: 'AOA', isDefault: false },
          { code: 'ARS', currencyName: 'Argentine Peso', currencySymbol: '$', isDefault: false },
          { code: 'ALL', currencyName: 'Albanian Lek', currencySymbol: 'Lek', isDefault: false }
        ]
      }
    }
  ]
});

export const sideBarSizeAtom = atom({
  key: 'sideBarSizeAtom',
  default: 400
});

export const pinSubMenuSettingsAtom = atom<any | null>({
  key: 'pinSubMenuSettingsAtom',
  default: null
});

export const listPageSettingsAtom = atom<any | null>({
  key: 'listPageSettingsAtom',
  default: null
});

export const listFavoriteAtom = atom<any | null>({
  key: 'listFavoriteAtom',
  default: []
});

export const listPageSettingsByMenuAtom = atomFamily<string, string>({
  key: 'listPageSettingsByMenuAtom',
  default: ''
});

export const selectionFieldsAtom = atom<any | null>({
  key: 'SelectionFieldsAtom',
  default: {}
});
