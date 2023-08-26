import { gql } from 'graphql-request';

export const CREATE_SYSTEM_LANGUAGE = gql`
  mutation q($systemLanguage: ILanguageData) {
    setting_createSystemLanguage(systemLanguage: $systemLanguage) {
      id
    }
  }
`;

export const UPDATE_SYSTEM_LANGUAGE = gql`
  mutation q($systemLanguage: ILanguageData) {
    setting_updateSystemLanguage(systemLanguage: $systemLanguage) {
      id
    }
  }
`;
