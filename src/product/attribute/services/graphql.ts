import { gql } from 'graphql-request';

export const GET_PRODUCT_ATTRIBUTES = gql`
  query q($filter: SearchFilter) {
    product_attributes(filter: $filter) {
      results {
        id
        name
        values {
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

export const GET_PRODUCT_ATTRIBUTE_VALUES = gql`
  query q($filter: SearchFilter) {
    product_attributeValues(filter: $filter) {
      results {
        id
        name
        attr {
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

export const CREATE_PRODUCT_ATTRIBUTE = gql`
  mutation m($attribute: Attribute) {
    product_createAttribute(attribute: $attribute) {
      id
      name
      values {
        id
        name
      }
    }
  }
`;

export const DELETE_PRODUCT_ATTRIBUTE = gql`
  mutation q($ids: [String]) {
    product_deleteAttribute(ids: $ids) {
      ids
    }
  }
`;

export const UPDATE_PRODUCT_ATTRIBUTE = gql`
  mutation m($attribute: Attribute) {
    product_updateAttribute(attribute: $attribute) {
      id
    }
  }
`;

export const ADD_PRODUCT_VALUE = gql`
  mutation m($attrId: String!, $values: [AttributeValue]) {
    product_createAttributeValues(attrId: $attrId, values: $values) {
      values {
        id
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT_VALUE = gql`
  mutation m($value: AttributeValue!) {
    product_updateAttributeValue(value: $value) {
      id
    }
  }
`;

export const DELETE_PRODUCT_VALUE = gql`
  mutation m($id: String, $attrId: String) {
    product_deleteAttributeValue(id: $id, attrId: $attrId) {
      id
    }
  }
`;
