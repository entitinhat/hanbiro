import { gql } from 'graphql-request';

export const GET_SETTINGS = gql`
  query q() {
    project_settings {
      results {
        id
        name
        type
        meta
        fixed
        default
      }
    }
  }
`;

export const CREATE_SETTING = gql`
  mutation q($setting: Setting!) {
    project_createSetting(setting: $setting) {
      id
    }
  }
`;

export const UPDATE_SETTING = gql`
  mutation q($setting: Setting!) {
    project_updateSetting(setting: $setting) {
      id
    }
  }
`;

export const DELETE_SETTING = gql`
  mutation q($id: String!) {
    project_deleteSetting(id: $id) {
      id
    }
  }
`;

