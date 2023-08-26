import { gql } from 'graphql-request';

export const GET_ITEM_VIEW = gql`
  query q($id: String!) {
    product_item(id: $id) {
      id
      name
      code
      active
      prod {
        id
        name
        code
        type
        canBeSold
      }
      itemType
      inventoryType
      sku
      unit {
        id
        name
      }
      unitVal {
        id
        name
        qty
      }
      attrValues {
        id
        name
        attr {
          id
          name
        }
      }
      basePrice {
        amount
        currency
      }
      costPrice {
        amount
        currency
      }
      unitPrice {
        amount
        currency
      }
      purchasePrice {
        amount
        currency
      }
      images {
        id
        name
        orgName
      }
    }
  }
`;

export const GET_ITEM_VENDOR = gql`
  query q($id: String!) {
    product_item(id: $id) {
      id
      name
      vendor {
        id
        name
        code
        photo
        type {
          languageKey
          keyName
        }
        emails {
          id
          label
          labelValue
          email
        }
        phones {
          id
          label
          labelValue
          country
          phoneNumber
          extension
        }
      }
    }
  }
`;

export const GET_ITEMS = gql`
  query q($filter: SearchFilter) {
    product_items(filter: $filter) {
      results {
        id
        images {
          id
          name
          orgName
        }
        code
        name
        sku
        images {
          id
          name
          orgName
        }
        prod {
          id
          name
          type
          canBeSold
        }
        unit {
          id
          name
        }
        unitVal {
          id
          name
          qty
        }
        attrValues {
          id
          name
          attr {
            id
            name
          }
        }
        weight {
          unit
          val
        }
        warrantyPeriod {
          unit
          period
        }
        dimension {
          unit
          val {
            x
            y
            z
          }
        }
        inventoryType
        itemType
        unitPrice {
          amount
          currency
        }
        basePrice {
          amount
          currency
        }
        costPrice {
          amount
          currency
        }
        bestPrice {
          amount
          currency
        }
        purchasePrice {
          amount
          currency
        }
        createdAt
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const CREATE_ITEMS = gql`
  mutation q($items: ProductItemInput!) {
    product_createItems(items: $items) {
      ids
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation m($item: ItemData!) {
    product_updateItem(item: $item) {
      id
    }
  }
`;
export const UPDATE_ITEM_BATCH = gql`
  mutation m($ids: [String!], $item: ItemData!) {
    product_updateItems(ids: $ids, item: $item) {
      ids
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation m($ids: [String!]) {
    product_deleteItem(ids: $ids) {
      ids
    }
  }
`;

export const GET_ITEM_ASSIGN_REPS = gql`
  query q($id: String!) {
    product_itemAssignTo(id: $id) {
      results {
        id
        name
        fullName
        # photo
      }
    }
  }
`;

export const CREATE_ITEM_ASSIGN_REP = gql`
  mutation m($ids: [String], $assignTo: AssignToInput) {
    product_createItemAssignTo(ids: $ids, assignTo: $assignTo) {
      ids
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
  }
`;

export const DELETE_ITEM_ASSIGN_REP = gql`
  mutation m($ids: [String!], $refIds: [String!]) {
    product_deleteItemAssignTo(ids: $ids, refIds: $refIds) {
      ids
      refIds
    }
  }
`;

export const CHANGE_ITEM_ASSIGN_REP = gql`
  mutation m($ids: [String!], $from: String!, $to: String!) {
    product_changeItemAssignTo(ids: $ids, from: $from, to: $to) {
      ids
    }
  }
`;

export const GET_BULK_CODE_NEXT_ID = gql`
  mutation ($menu: String!, $bulk: Int) {
    setting_nextIdBulk(menu: $menu, bulk: $bulk) {
      codes
      setting {
        id
        prefixString
        autoGenerate
        nextNumber
      }
    }
  }
`;

export const GET_ITEM_ASSOCIATED_ITEMS = gql`
  query q($id: String!) {
    product_item(id: $id) {
      id
      name
      associatedItems {
        qty
        item {
          id
          name
          code
          sku
          unitVal {
            id
            name
            qty
          }
          attrValues {
            id
            name
            attr {
              id
              name
            }
          }
          basePrice {
            amount
            currency
          }
          costPrice {
            amount
            currency
          }
          unitPrice {
            amount
            currency
          }
        }
      }
    }
  }
`;

export const PRODUCT_RESTORE_ITEM = gql`
  mutation m($ids: [String!]) {
    product_restoreItem(ids: $ids) {
      ids
    }
  }
`;

export const PRODUCT_DELETE_ITEM_RECOVERY = gql`
  mutation m($ids: [String!]) {
    product_deleteItemRecovery(ids: $ids) {
      ids
    }
  }
`;

export const PRODUCT_EMPTY_ITEM_RECOVERY = gql`
  mutation m() {
    product_emptyItemRecovery() {
      success
    }
  }
`;
