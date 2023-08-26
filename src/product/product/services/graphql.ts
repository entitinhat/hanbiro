import { gql } from 'graphql-request';

export const GET_PRODUCTS_LIST = gql`
  query q($filter: SearchFilter) {
    product_products(filter: $filter) {
      results {
        id
        type
        canBeSold
        name
        group {
          id
          name
        }
        code
        # startDate
        # noEndDate
        # endDate
        createdAt
        active
        updatedAt
        unit {
          id
          name
          unitValues {
            id
            name
            qty
          }
        }
        useAttr
        attributes {
          id
          name
          values {
            id
            name
          }
        }
        countItems
        createdBy {
          id
          name
        }
        # costOfGoods
        updatedBy {
          id
          name
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
      }
    }
  }
`;

export const GET_PUBLIC_PRODUCTS_LIST = gql`
  query q($filter: SearchFilter, $token: String) {
    site_products(filter: $filter, token: $token) {
      results {
        id
        type
        canBeSold
        name
        group {
          id
          name
        }
        code
        # startDate
        # noEndDate
        # endDate
        createdAt
        active
        updatedAt
        unit {
          id
          name
          unitValues {
            id
            name
            qty
          }
        }
        useAttr
        attributes {
          id
          name
          values {
            id
            name
          }
        }
        countItems
        createdBy {
          id
          name
        }
        # costOfGoods
        updatedBy {
          id
          name
        }
        assignTo {
          id
          name
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

export const DELETE_PRODUCT = gql`
  mutation m($ids: [String!]) {
    product_deleteProduct(ids: $ids) {
      ids
    }
  }
`;

export const CLONE_PRODUCT = gql`
  mutation m($ids: [String!]) {
    product_copyProduct(ids: $ids) {
      ids
    }
  }
`;

export const UPDATE_PRODUCT_BATCH = gql`
  mutation m($products: [Product!]) {
    product_updateProductBatch(products: $products) {
      ids
    }
  }
`;

export const GET_PRODUCT_VIEW = gql`
  query q($id: string) {
    product_product(id: $id) {
      id
      type
      canBeSold
      name
      group {
        id
        name
      }
      code
      active
      unit {
        id
        name
        unitValues {
          id
          name
          qty
        }
      }
      useAttr
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
  }
`;

export const GET_PUBLISH_PRODUCT_LIST = gql`
  query q($filter: SearchFilter) {
    product_products(filter: $filter) {
      results {
        id
        type
        canBeSold
        name
        group {
          id
          name
        }
        unit {
          id
          name
          unitValues {
            id
            name
            qty
          }
        }
        useAttr
        attributes {
          id
          name
          values {
            id
            name
          }
        }
        items {
          id
          name
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

// export const RESTORE_PRODUCT = gql`
//   mutation m($ids: [String!]!) {
//     product_restoreProduct(ids: $ids) {
//       ids
//     }
//   }
// `;

// export const EMPTY_PRODUCT = gql`
//   mutation m($ids: [String!]!) {
//     product_deleteRecycleBin(ids: $ids) {
//       ids
//     }
//   }
// `;

export const UPDATE_PRODUCT = gql`
  mutation m($product: Product!) {
    product_updateProduct(product: $product) {
      id
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation q($product: ProductInput!) {
    product_createProduct(product: $product) {
      id
    }
  }
`;

export const GET_PRODUCT_ASSIGN_REPS = gql`
  query q($prodId: String!) {
    product_assignTo(prodId: $prodId) {
      results {
        id
        name
        fullName
        # photo
      }
    }
  }
`;

export const CREATE_PRODUCT_ASSIGN_REP = gql`
  mutation m($ids: [String], $assignTo: AssignToInput) {
    product_createAssignTo(ids: $ids, assignTo: $assignTo) {
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

export const DELETE_PRODUCT_ASSIGN_REP = gql`
  mutation m($ids: [String!], $refIds: [String!]) {
    product_deleteAssignTo(ids: $ids, refIds: $refIds) {
      ids
      refIds
    }
  }
`;

export const CHANGE_PRODUCT_ASSIGN_REP = gql`
  mutation m($ids: [String!], $from: String!, $to: String!) {
    product_changeAssignTo(ids: $ids, from: $from, to: $to) {
      ids
    }
  }
`;

export const GET_PRODUCT_VENDOR = gql`
  query q($id: String!) {
    product_product(id: $id) {
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

export const PRODUCT_RESTORE_PRODUCT = gql`
  mutation m($ids: [String!]) {
    product_restoreProduct(ids: $ids) {
      ids
    }
  }
`;

export const PRODUCT_DELETE_PRODUCT_RECOVERY = gql`
  mutation m($ids: [String!]) {
    product_deleteProductRecovery(ids: $ids) {
      ids
    }
  }
`;

export const PRODUCT_EMPTY_PRODUCT_RECOVERY = gql`
  mutation m() {
    product_emptyProductRecovery() {
      success
    }
  }
`;

export const UPDATE_PRODUCTS = gql`
  mutation m($ids: [String!], $product: Product!) {
    product_updateProducts(ids: $ids, product: $product) {
      ids
    }
  }
`;

export const PRODUCT_RELATED_CUSTOMER = gql`
  query q($filter: SearchFilter) {
    customer_customers(filter: $filter) {
      results {
        id
        photo
        code
        name
        category
        type
        industries {
          keyName
          languageKey
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
        mobiles {
          label
          labelValue
          country
          fCountry {
            country
            isoCode2
            isoCode3
            phoneCode
            region
          }
          mobileNumber
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
