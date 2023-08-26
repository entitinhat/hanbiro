import usePublicPost from '@base/hooks/publics/usePublicPost';
import usePost from '@base/hooks/usePost';
import {
  GET_ALL_EMAIL_TEMPLATES_BY_MENU,
  GET_ALL_TEMPLATES_BY_MENU,
  GET_AVAILABLE_COUNTRIES,
  GET_AVAILABLE_CURRENCIES,
  GET_AVAILABLE_LANGUAGES,
  GET_LANGUAGE_BY_MENU,
  GET_LIST_FAVORITE_LIST,
  GET_LIST_PAGE_CONFIG,
  GET_PIN_SUBMENU_CONFIG,
  GET_PUBLIC_THEME_CONFIG,
  GET_REGION_CITIES,
  GET_REGION_STATES,
  GET_SELECTION_FIELD_ITEMS_BY_SINGLE_KEY,
  GET_SELECTION_GROUPS_BY_MULTI_KEY,
  GET_TEMPLATE_DETAIL_BY_MENU,
  GET_THEME_CONFIG,
  GET_USER_SETTING,
  GET_USER_SETTINGS
} from '@base/services/graphql/setting';
import { FilterInput } from '@base/types/common';
import { BaseResponse } from '@base/types/response';
import { MenuLanguageResponse, MenuSetting, SettingSelectionPayload, Template, TemplateDetail, UserSetting } from '@base/types/setting';
import { graphQLApi } from '@base/utils/axios/graphql';
import { useQueries } from '@tanstack/react-query'; //v4

export const useGetSelectionFieldItemsBySingleKeyApi = (keyName: string) => {
  const params = {
    keyName: keyName
  };
  const res = usePost<SettingSelectionPayload>(['setting_selectionFieldItems'], GET_SELECTION_FIELD_ITEMS_BY_SINGLE_KEY, params);
  return res;
};

export const useGetSelectionGroupsByMultiKeyApi = (
  // filter: FilterInput,
  keyName: string[],
  format: string | 'tree'
) => {
  let filter: FilterInput = {
    filters: {
      keyRoots: keyName
    }
  };

  const params = {
    filter: filter,
    format: format
  };

  const res = usePost<SettingSelectionPayload>(['setting_selectionGroups'], GET_SELECTION_GROUPS_BY_MULTI_KEY, params);
  return res;
};

export const useGetAvailabelCountriesApi = (isEnabled?: boolean) => {
  const res = usePost<SettingSelectionPayload>(['usedCountries'], GET_AVAILABLE_COUNTRIES, {}, { enabled: isEnabled });
  return res;
};

export const useRegionStates = (countryCode: string) => {
  let filter: FilterInput = {
    // filters: {
    //   countryCode: countryCode
    // },
    query: `countryCode=${countryCode}`,
    paging: {
      page: 1,
      size: 500
    }
  };
  const params = {
    filter: filter
  };
  const res = usePost<SettingSelectionPayload>(['regions', countryCode], GET_REGION_STATES, params, { enabled: countryCode.length > 0 });
  return res;
};

export const useRegionCities = (stateCode: string) => {
  let filter: FilterInput = {
    // filters: {
    //   subdivision: stateCode
    // },
    query: `subdivision: ${stateCode}`,
    paging: {
      page: 1,
      size: 500
    }
  };
  const params = {
    filter: filter
  };
  const res = usePost<SettingSelectionPayload>(['regions', stateCode], GET_REGION_CITIES, params, { enabled: stateCode.length > 0 });
  return res;
};

export const getAvailabelCountriesApi = async () => {
  return await graphQLApi<SettingSelectionPayload>('usedCountries', GET_AVAILABLE_COUNTRIES, {});
};

export const useGetAvailabelCurrenciesApi = () => {
  return usePost<SettingSelectionPayload>(['usedCurrencies'], GET_AVAILABLE_CURRENCIES, {});
};

export const getAvailabelCurrenciesApi = async () => {
  return await graphQLApi<SettingSelectionPayload>('usedCurrencies', GET_AVAILABLE_CURRENCIES, {});
};

export const useGetAvailabelLanguagesApi = () => {
  return usePost<SettingSelectionPayload>(['usedLanguages'], GET_AVAILABLE_LANGUAGES, {});
};

export const getAvailabelLanguagesApi = async () => {
  return await graphQLApi<SettingSelectionPayload>('usedLanguages', GET_AVAILABLE_LANGUAGES, {});
};

export const getRegionStatesApi = async (countryCode: string) => {
  let filter: FilterInput = {
    filters: {
      countryCode: countryCode
    },
    paging: {
      page: 1,
      size: 500
    }
  };

  const params = {
    filter: filter
  };

  const res = await graphQLApi<SettingSelectionPayload>('regions', GET_REGION_STATES, params);

  return res;
};

export const getRegionCitiesApi = async (stateCode: string) => {
  let filter: FilterInput = {
    filters: {
      subdivision: stateCode
    },
    paging: {
      page: 1,
      size: 500
    }
  };

  const params = {
    filter: filter
  };

  const res = await graphQLApi<SettingSelectionPayload>('regions', GET_REGION_CITIES, params);

  return res;
};

export const getGeneralSettingApi = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['usedCountries'],
        queryFn: async () => await graphQLApi<SettingSelectionPayload>('usedCountries', GET_AVAILABLE_COUNTRIES, {})
      },
      {
        queryKey: ['usedCurrencies'] as any[],
        queryFn: async () => await graphQLApi<SettingSelectionPayload>('usedCurrencies', GET_AVAILABLE_CURRENCIES, {})
      },
      {
        queryKey: ['usedLanguages'] as any[],
        queryFn: async () => await graphQLApi<SettingSelectionPayload>('usedLanguages', GET_AVAILABLE_LANGUAGES, {})
      }
    ]
  });
  // const results = useQueries([
  //   {
  //     queryKey: ['usedCountries'],
  //     queryFn: async () =>
  //       await graphQLApi<ISettingSelectionPayload>('usedCountries', GET_AVAILABLE_COUNTRIES, {}),
  //   },
  // {
  //   queryKey: ['usedCurrencies'] as any[],
  //   queryFn: async () =>
  //     await graphQLApi<ISettingSelectionPayload>('usedCurrencies', GET_AVAILABLE_CURRENCIES, {}),
  // },
  // {
  //   queryKey: ['usedLanguages'] as any[],
  //   queryFn: async () =>
  //     await graphQLApi<ISettingSelectionPayload>('usedLanguages', GET_AVAILABLE_LANGUAGES, {}),
  // },
  // ]);
  return results;
};

export const getLanguageByMenuAPI = (menus: string[], lang: string) => {
  let params = {
    menus: menus,
    lang: lang
  };
  let key = 'setting_menusLanguages';
  const res = graphQLApi<MenuLanguageResponse>(key, GET_LANGUAGE_BY_MENU, params);
  return res;
};

export const useMenuTemplates = ({ templateGroup, keyword = '', templates, options }: any) => {
  //// console.log('TemplateGroup', templateGroup);
  const aQueries: string[] = ['group=' + templateGroup, 'name:' + keyword];
  let filter: FilterInput = {
    query: aQueries.join(' ')
  };
  let queryKey = ['setting_menuTemplates', templateGroup, keyword];
  let params = {
    filter
  };
  if (templates && templates.length) {
    options = {
      ...options,
      initialData: {
        results: templates
      }
    };
  }
  const response = usePost<BaseResponse<Template[]>>(queryKey, GET_ALL_TEMPLATES_BY_MENU, params, {
    ...options
  });
  return response;
};

export const useEmailTemplates = ({ templateGroup, keyword = '', templates }: any) => {
  let filter: FilterInput = {
    keyword: keyword,
    filters: {
      templateGroup: templateGroup
    }
  };
  let queryKey = ['setting_emailTemplates', templateGroup, keyword];
  let params = {
    filter
  };
  let options = {};
  if (templates && templates.length) {
    options = {
      initialData: {
        results: templates
      }
    };
  }
  const response = usePost<BaseResponse<Template>>(queryKey, GET_ALL_EMAIL_TEMPLATES_BY_MENU, params, options);
  return response;
};

export const useMenuTemplate = (templateId: string, templateGroup: string) => {
  let queryKey = ['setting_menuTemplateNew', templateId];
  let params = {
    templateId
    // templateGroup,
  };
  const response = usePost<TemplateDetail>(queryKey, GET_TEMPLATE_DETAIL_BY_MENU, params, {
    enabled: templateId != ''
  });
  return response;
};

export const useThemeConfig = () => {
  let queryKey = ['setting_menuSetting', 'common', 'theme'];
  const response = usePost<MenuSetting>(queryKey, GET_THEME_CONFIG, {});
  return response;
};

export const usePublicThemeConfig = (token: string) => {
  let queryKey = ['site_menuSetting', 'common', 'theme'];
  const response = usePublicPost<MenuSetting>(queryKey, GET_PUBLIC_THEME_CONFIG, { token });
  return response;
};

export const usePinSubMenuSettings = () => {
  let queryKey = ['setting_menuSetting', 'common', 'pin_submenu'];
  const response = usePost<MenuSetting>(queryKey, GET_PIN_SUBMENU_CONFIG, {});
  return response;
};
export const useListPageSettings = () => {
  let queryKey = ['setting_menuSetting', 'common', 'list_page_settings'];
  const response = usePost<MenuSetting>(queryKey, GET_LIST_PAGE_CONFIG, {});
  return response;
};

export const useListFavorite = () => {
  let queryKey = ['setting_userSetting', 'common', 'menu_favorite'];
  const response = usePost<UserSetting>(queryKey, GET_LIST_FAVORITE_LIST, {});
  return response;
};

export const useUserSettings = (menu?: string, key?: string, options?: any) => {
  const params: any = {};
  if (menu && menu != '') {
    params.menu = menu;
  }
  if (key && key != '') {
    params.key = key;
  }

  const response = usePost<BaseResponse<UserSetting>>(['setting_userSettings', menu, key], GET_USER_SETTINGS, params, options);
  return response;
};

export const useUserSetting = (menu: string, key: string, options?: any) => {
  let queryKey = ['setting_userSetting', menu, key];
  const response = usePost<UserSetting>(queryKey, GET_USER_SETTING, { menu: menu, key: key }, options);
  return response;
};
