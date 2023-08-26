import { gql } from 'graphql-request';

export const GET_PRODUCT_BASE_UNIT = gql`
  query q($filter: SearchFilter) {
    product_units(filter: $filter) {
      results {
        id
        name
        active
        createdBy {
          id
          name
        }
        createdAt
        updatedBy {
          id
          name
        }
        updatedAt
        # deletedBy {
        #   id
        #   name
        # }
        # deletedAt
        # deleted
        unitValues {
          id
          unit {
            id
            name
          }
          name
          qty
        }
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const GET_PRODUCT_UNIT_VALUES = gql`
  query q($filter: SearchFilter) {
    product_unitValues(filter: $filter) {
      results {
        id
        name
        qty
        unit {
          id
          name
        }
        createdBy {
          id
          name
        }
        createdAt
        updatedBy {
          id
          name
        }
        updatedAt
        deletedBy {
          id
          name
        }
        deletedAt
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const CREATE_UNIT = gql`
  mutation m($unit: Unit!) {
    product_createUnit(unit: $unit) {
      id
      name
      unitValues {
        id
        name
      }
    }
  }
`;

export const UPDATE_UNIT = gql`
  mutation m($unit: Unit!) {
    product_updateUnit(unit: $unit) {
      id
      name
      unitValues {
        id
        name
      }
    }
  }
`;

export const UPDATE_UNITS = gql`
  mutation m($ids: [String!], $unit: DaTa!) {
    product_updateUnits(ids: $ids, unit: $unit) {
      ids
    }
  }
`;

export const DELETE_UNIT = gql`
  mutation m($ids: [string]!) {
    product_deleteUnit(ids: $ids) {
      ids
    }
  }
`;

export const UPDATE_UNIT_VALUES = gql`
  mutation m($unitId: string!, $unitValues: [UnitValue!]) {
    product_updateUnitValues(unitId: $unitId, unitValues: $unitValues) {
      unitId
      unitValues {
        id
        name
        qty
      }
    }
  }
`;

export const PRODUCT_RESTORE_UNIT = gql`
  mutation m($ids: [String!]) {
    product_restoreUnit(ids: $ids) {
      ids
    }
  }
`;

export const PRODUCT_DELETE_UNIT_RECOVERY = gql`
  mutation m($ids: [String!]) {
    product_deleteUnitRecovery(ids: $ids) {
      ids
    }
  }
`;

export const PRODUCT_EMPTY_UNIT_RECOVERY = gql`
  mutation m() {
    product_emptyUnitRecovery() {
      success
    }
  }
`;

export const PRODUCT_UNIT_RELATED_PRODUCT = gql`
  query q($filter: SearchFilter) {
    product_unitRelatedProducts(filter: $filter, id: $id) {
      results {
        id
        name
        type
        canBeSold
        active
        group {
          id
          name
        }
        items {
          id
          name
        }
        attributes {
          id
          name
          values {
            id
            name
          }
        }
        assignTo {
          user {
            id
            name
          }
          group {
            id
            name
          }
        }
      }
      paging {
        totalPage
        totalItems
        currentPage
        itemPerPage
      }
    }
  }
`;