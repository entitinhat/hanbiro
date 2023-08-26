import { gql } from 'graphql-request';

export const SET_VIEW = gql`
  mutation m($logView: logView) {
    longrunning_moduleSetView(logView: $logView) {
      ids
    }
  }
`;
