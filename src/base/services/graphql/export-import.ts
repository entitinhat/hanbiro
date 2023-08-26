import { gql } from 'graphql-request';

export const CREATE_EXPORT = gql`
  mutation m($export: export) {
    longrunning_createExport(export: $export) {
      operationId
    }
  }
`;

export const CREATE_IMPORT = gql`
  mutation m($import: import) {
    longrunning_createImport(import: $import) {
      operationId
    }
  }
`;

export const RUNNING_OPERATION = gql`
  query q($id: id) {
    longrunning_operation(id: $id) {
      id
      progressPercent
      fileId
      fileType
      done
      module
      action
    }
  }
`;

export const GET_IMPORT = gql`
  query q($import: import) {
    longrunning_getImport(import: $import) {
      fileId
      fileType
      fields {
        keyName
        languageKey
        label
        labelTo
      }
      fileHeaders
    }
  }
`;

export const CHECK_IMPORT = gql`
  mutation m($import: import) {
    longrunning_checkImport(import: $import) {
      allowed {
        count
        header {
          values
        }
        records {
          values
        }
      }

      skiped {
        count
        header {
          values
        }
        records {
          values
        }
      }

      unmap {
        keyName
        languageKey
        label
        labelTo
      }
    }
  }
`;

export const GET_SAMPLE_FILE = gql`
  query q($sampleFile: sampleFile) {
    longrunning_getSampleFile(sampleFile: $sampleFile) {
      fileId
      fileType
    }
  }
`;

export const GET_EXPORT = gql`
  query q($export: export) {
    longrunning_getExport(export: $export) {
      fields {
        keyName
        languageKey
        label
        labelTo
      }
    }
  }
`;
