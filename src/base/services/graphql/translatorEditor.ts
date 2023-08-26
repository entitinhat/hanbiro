import { gql } from 'graphql-request';

export const CREATE_SYSTEM_LANGUAGE = gql`
  mutation q($systemLanguage: systemLanguage) {
    createSystemLanguage(systemLanguage: $systemLanguage) {
      id
    }
  }
`;

export const UPDATE_SYSTEM_LANGUAGE = gql`
  mutation q($systemLanguage: systemLanguage) {
    updateSystemLanguage(systemLanguage: $systemLanguage) {
      id
    }
  }
`;

export const GET_LANGUAGE_BY_MENU = gql`
  query q($menus: [String]!, $lang: String) {
    menusLanguages(menus: $menus, lang: $lang) {
      results
    }
  }
`;

export const GET_SYSTEM_LANGUAGES = gql`
  query q($filter: filter) {
    systemLanguages(filter: $filter) {
      results {
        id
        menu
        langKey
        en
        ko
        vi
        jp
        ch
        zh
        ido
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;
