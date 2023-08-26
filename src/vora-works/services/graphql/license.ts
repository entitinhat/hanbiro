import { gql } from 'graphql-request';

export const REGISTER_FREE_LICENSE = gql`
  mutation m($input: RegisterFreeLicenseRequest!) {
    setting_registerFreeLicense(input: $input) {
      results {
        tenantId
        orgId
        urls
      }
    }
  }
`;

export const FINISH_REGISTER_FREE_LICENSE = gql`
  query q($registerId: String!) {
    setting_finishedRegisterLicense(registerId: $registerId) {
      result
    }
  }
`;
