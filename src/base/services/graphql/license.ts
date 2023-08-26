import { gql } from 'graphql-request';

export const GET_AVAILABLE_MENUS_LICENSE = gql`
  query {
    setting_availableMenusLicense {
      results {
        label
        value
        children {
          label
          value
          children {
            label
            value
            children {
              label
              value
            }
          }
        }
      }
    }
  }
`;
