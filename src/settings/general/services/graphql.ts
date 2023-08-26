import { gql } from 'graphql-request';

export const SETTING_SELECTION_FIELD_GET = gql`
  query q($filter: FilterInput) {
    setting_selectionFields(filter: $filter) {
      results {
        id
        keyName
        languageKey
        keyGroup
        isDefault
        isBase
        languageData {
          en
          vi
          ko
          jp
          zh
          ido
        }
      }
    }
  }
`;

export const GET_MENU_SETTING = gql`
  query q($menu: String, $key: String) {
    setting_menuSetting(menu: $menu, key: $key) {
      id
      key
      menu
      value
    }
  }
`;

export const GET_MENU_SETTINGS = gql`
  query q($menus: [String], $keys: [String]) {
    setting_menusSettings(menus: $menus, keys: $keys) {
      results {
        id
        value
        key
        menu
      }
    }
  }
`;

export const UPDATE_MENU_SETTING = gql`
  mutation q($menuSetting: menuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;

export const CREATE_MENU_SETTING = gql`
  mutation ($menuSetting: menuSetting) {
    setting_createMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;

export const DELETE_MENU_SETTING = gql`
  mutation ($menu: String, $key: String) {
    setting_deleteMenuSetting(menu: $menu, key: $key) {
      id
    }
  }
`;

export const SETTING_SELECTION_FIELD_UPDATE = gql`
  mutation ($selection: SelectionInput) {
    setting_updateSelection(selection: $selection) {
      id
    }
  }
`;

export const SETTING_SELECTION_CREATE = gql`
  mutation q($selection: SelectionInput) {
    setting_createSelection(selection: $selection) {
      id
    }
  }
`;

export const SETTING_SELECTION_DELETE = gql`
  mutation q($id: String, $selectType: string) {
    setting_deleteSelection(id: $id, selectType: $selectType) {
      id
    }
  }
`;

export const UPDATE_FORMAT_SETTING = gql`
  mutation q($key: String, $value: String) {
    setting_updateFormatSetting(key: $key, value: $value) {
      id
    }
  }
`;
//=====Selection graphql=======

export const LANGUAGE_VALUE = `
    language {
        en
        vi
        ko
        jp
        zh
        ido
    }
`;
export const GET_ALL_SELECTION_FIELDS = gql`
  query {
    setting_selectionFields {
      results {
        id
        languageKey
        keyName
        ${LANGUAGE_VALUE}
      }
    }
  }
`;

export const GET_SELECTION_FIELD_ITEMS = gql`
  query q($keyName: String) {
    setting_selectionFieldItems(keyName: $keyName) {
      results {
        id
        languageKey
        keyName
        ${LANGUAGE_VALUE}
      }
    }
  }
`;

export const GET_ALL_FORMAT_SETTING = gql`
  query {
    setting_formatSettings {
      results {
        id
        menu
        key
        value
      }
    }
  }
`;
export const GET_ALL_SELECTION_GROUPS = gql`
  query {
    setting_selectionGroups {
      results {
        id
        languageKey
        keyName
        ${LANGUAGE_VALUE}
      }
    }
  }
`;
export const GET_SELECTION_GROUP_ITEMS = gql`
  query q($parentId: String) {
    setting_selectionGroupData(parentId: $parentId) {
      results {
        id
        languageKey
        keyName
        parentId
        ${LANGUAGE_VALUE}
      }
    }
  }
`;

export const SETTING_SELECTION_MOVE = gql`
  mutation q($ids: [String!]) {
    setting_moveSelections(ids: $ids) {
      success
    }
  }
`;

/** ================================ SUS ======================================== */
export const SUS_CUSTOM_DOMAIN_CREATE = gql`
  mutation q($suses: SUSInput) {
    builtin_createSus(suses: $suses) {
      suses {
        id
      }
    }
  }
`;

export const SUS_CUSTOM_DOMAINS_GET = gql`
  query q($filter: Filter) {
    builtin_susLogs(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        sUrl
        url
        urlType
        cta {
          id
          name
        }
        campaign {
          id
          name
        }
        source
        medium
        term
        content
        customer {
          id
          name
        }
        activity {
          id
          name
        }
        process {
          id
          name
        }
        document {
          id
          name
        }
        email
        mobile
        totalClick
        createdAt
        createdBy {
          id
          name
        }
        updatedAt
        updatedBy {
          id
          name
        }
      }
    }
  }
`;

export const SUS_CUSTOM_DOMAIN_DELETE = gql`
  mutation q($ids: [String]) {
    builtin_deleteSus(ids: $ids) {
      ids
    }
  }
`;
