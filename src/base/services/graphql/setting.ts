import { gql } from 'graphql-request';

export const GET_SELECTION_FIELD_ITEMS_BY_SINGLE_KEY = gql`
  query q($keyName: String, $keyNames: [String]) {
    setting_selectionFieldItems(keyName: $keyName, keyNames: $keyNames) {
      results {
        id
        keyName
        languageKey
        keyRoot
        parentId
        isDefault
        children {
          id
          keyName
          languageKey
          parentId
        }
      }
    }
  }
`;

export const GET_SELECTION_GROUPS_BY_MULTI_KEY = gql`
  query q($filter: SearchFilter, $format: String) {
    setting_selectionGroups(filter: $filter, format: $format) {
      results {
        id
        keyName
        languageKey
        keyRoot
        parentId
        children {
          id
          keyName
          languageKey
          parentId
          children {
            id
            keyName
            languageKey
            parentId
            children {
              id
              keyName
              languageKey
              parentId
            }
          }
        }
      }
    }
  }
`;

export const GET_AVAILABLE_COUNTRIES = gql`
  query {
    usedCountries {
      results {
        country
        isoCode2
        isoCode3
        phoneCode
        region
        isDefault
      }
    }
  }
`;

export const GET_AVAILABLE_CURRENCIES = gql`
  query {
    usedCurrencies {
      results {
        code
        currencyName
        currencySymbol
        isDefault
      }
    }
  }
`;

export const GET_AVAILABLE_LANGUAGES = gql`
  query {
    usedLanguages {
      results {
        title
        code
      }
    }
  }
`;

export const GET_REGION_STATES = gql`
  query q($filter: SearchFilter) {
    regions(filter: $filter) {
      results {
        subdivision
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const GET_REGION_CITIES = gql`
  query q($filter: SearchFilter) {
    regions(filter: $filter) {
      results {
        city
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const GET_GENERAL_SETTINGS_COMMON = gql`
  query {
    usedCountries {
      results {
        country
        isoCode2
        isoCode3
        phoneCode
        region
        isDefault
      }
    }
    usedCurrencies {
      results {
        code
        currencyName
        currencySymbol
        isDefault
      }
    }
    usedLanguages {
      results {
        title
        code
      }
    }
    formatSettings {
      results {
        id
        menu
        key
        value
      }
    }
    priority: selectionFields(filter: { filters: { keyRoots: ["priority"] } }) {
      results {
        id
        languageKey
        keyName
        keyRoot
      }
    }
  }
`;

export const GET_LANGUAGE_BY_MENU = gql`
  query q($menus: [String]!, $lang: String) {
    setting_menusLanguages(menus: $menus, lang: $lang) {
      results
    }
  }
`;

export const GET_PUBLIC_LANGUAGE_BY_MENU = gql`
  query q($menus: [String]!, $lang: String, $token: String) {
    site_menusLanguages(menus: $menus, lang: $lang, token: $token) {
      results
    }
  }
`;

const GET_TEMPLATE_QUERY = `id
  title
  name
  type
  language
  isAllProducts
  products{
      id
      name
  }
  description
  assignTo{
      id
      name
  }
  html
`;
export const GET_TEMPLATE_DETAIL_BY_MENU = gql`
  query q($id: String!) {setting_menuTemplateNew(id: $id) {
    ${GET_TEMPLATE_QUERY}
  }
  }
`;

export const GET_ALL_TEMPLATES_BY_MENU = gql`
  query q($filter: FilterInput) {
    setting_menuTemplates(filter: $filter) {
      results {
        id
        name
        group
        thumbnail
        html
      }
    }
  }
`;
export const GET_ALL_EMAIL_TEMPLATES_BY_MENU = gql`
  query q($filter: FilterInput) {
    setting_emailTemplates(filter: $filter) {
      results {
        id
        templateName
        templateGroup
        properties
      }
    }
  }
`;
export const UPDATE_THEME_CONFIG = gql`
  mutation q($menuSetting: IMenuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;
export const GET_THEME_CONFIG = gql`
  query {
    setting_menuSetting(menu: "common", key: "theme") {
      id
      menu
      key
      value
    }
  }
`;

export const GET_PUBLIC_THEME_CONFIG = gql`
  query q($token: String) {
    site_menuSetting(menu: "common", key: "theme", token: $token) {
      id
      menu
      key
      value
    }
  }
`;

export const UPDATE_PIN_SUBMENU_CONFIG = gql`
  mutation q($menuSetting: IMenuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;
export const GET_PIN_SUBMENU_CONFIG = gql`
  query {
    setting_menuSetting(menu: "common", key: "pin_submenu") {
      id
      menu
      key
      value
    }
  }
`;
export const UPDATE_LIST_PAGE_CONFIG = gql`
  mutation q($menuSetting: IMenuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;
export const GET_LIST_PAGE_CONFIG = gql`
  query {
    setting_menuSetting(menu: "common", key: "list_page_settings") {
      id
      menu
      key
      value
    }
  }
`;

export const GET_LIST_FAVORITE_LIST = gql`
  query {
    setting_userSetting(menu: "common", key: "menu_favorite") {
      id
      menu
      key
      value
    }
  }
`;

export const GET_USER_SETTINGS = gql`
  query q($menu: string, $key: string) {
    setting_userSettings(menu: $menu, key: $key) {
      results {
        id
        menu
        key
        value
      }
    }
  }
`;

export const GET_USER_SETTING = gql`
  query q($menu: string!, $key: string!) {
    setting_userSetting(menu: $menu, key: $key) {
      id
      menu
      key
      value
    }
  }
`;

export const UPDATE_USER_SETTING = gql`
  mutation q($userSetting: UserSetting) {
    setting_updateUserSetting(userSetting: $userSetting) {
      id
    }
  }
`;

export const GET_NEXT_ID = gql`
  mutation q($menu: String!) {
    setting_nextId(menu: $menu) {
      code
      setting {
        prefixString
        autoGenerate
        nextNumber
      }
    }
  }
`;

export const GET_PUBLIC_NEXT_ID = gql`
  mutation q($menu: String!, $token: String) {
    site_nextId(menu: $menu, token: $token) {
      code
      setting {
        prefixString
        autoGenerate
        nextNumber
      }
    }
  }
`;

export const SETTING_NEXT_ID_UPDATE = gql`
  mutation q($menu: String!, $value: SettingInput) {
    setting_updateNextIdSetting(menu: $menu, value: $value) {
      id
    }
  }
`;
