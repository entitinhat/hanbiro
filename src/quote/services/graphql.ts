import { gql } from 'graphql-request';

export const QUOTE_CREATEQUOTE = gql`
  mutation q($quote: Quote!) {
    quote_createQuote(quote: $quote) {
      id
    }
  }
`;

export const QUOTE_UPDATEQUOTE = gql`
  mutation q($quote: Quote) {
    quote_updateQuote(quote: $quote) {
      id
    }
  }
`;

export const QUOTE_UPDATE_REVISION = gql`
  mutation q($id: String, $revision: QuoteRevision) {
    quote_updateQuoteRevision(id: $id, revision: $revision) {
      id
    }
  }
`;

export const QUOTE_BULKUPDATEQUOTE = gql`
  mutation q($ids: [String], $quote: Quote) {
    quote_bulkUpdateQuote(ids: $ids, quote: $quote) {
      ids
    }
  }
`;

export const QUOTE_CANCELQUOTE = gql`
  mutation q($ids: [String]) {
    quote_markQuoteAsCancelled(ids: $ids) {
      ids
    }
  }
`;

export const QUOTE_RESTOREQUOTE = gql`
  mutation q($ids: [String]) {
    quote_restoreQuote(ids: $ids) {
      ids
    }
  }
`;

export const QUOTE_RECOVERY_EMPTY = gql`
  mutation q($ids: [String]) {
    quote_emptyRecovery(ids: $ids) {
      ids
    }
  }
`;

export const QUOTE_RECOVERY_DELETE = gql`
  mutation q($ids: [String]) {
    quote_deleteRecovery(ids: $ids) {
      ids
    }
  }
`;

//assign customer
export const QUOTE_ASSIGN_CUSTOMER_LIST = gql`
  query q($filter: Filter) {
    quote_relatedCustomers(filter: $filter) {
      results {
        id
        customers {
          id
          code
          name
          photo
        }
      }
    }
  }
`;

export const QUOTE_DELETEQUOTE = gql`
  mutation q($ids: [String!]!) {
    quote_deleteQuote(ids: $ids) {
      ids
    }
  }
`;

export const QUOTE_COPYQUOTE = gql`
  mutation q($ids: [String!]!) {
    quote_copyQuote(ids: $ids) {
      ids
    }
  }
`;

// ---

export const QUOTE_CREATEASSIGNTO = gql`
  mutation m($ids: [String], $assignTo: AssignToInput) {
    quote_createAssignTo(ids: $ids, assignTo: $assignTo) {
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

export const QUOTE_DELETEASSIGNTO = gql`
  mutation m($ids: [String!], $refIds: [String!]) {
    quote_deleteAssignTo(ids: $ids, repIds: $refIds) {
      ids
      refIds
    }
  }
`;

export const QUOTE_CHANGEASSIGNTO = gql`
  mutation m($ids: [String!], $from: String!, $to: String!) {
    quote_changeAssignTo(ids: $ids, from: $from, to: $to) {
      ids
    }
  }
`;

export const QUOTE_ASSIGNTO = gql`
  query q($id: String!) {
    quote_assignTo(id: $id) {
      results {
        id
        name
      }
    }
  }
`;

export const QUOTE_CREATE_ITEM = gql`
  mutation q($id: String, $item: Item) {
    quote_createItem(id: $id, item: $item) {
      id
    }
  }
`;

export const QUOTE_UPDATE_ITEM = gql`
  mutation q($id: String, $item: Item) {
    quote_updateItem(id: $id, item: $item) {
      id
    }
  }
`;

export const QUOTE_DELETE_ITEM = gql`
  mutation q($id: String, $itemIds: [String]) {
    quote_deleteItem(id: $id, itemIds: $itemIds) {
      ids
    }
  }
`;

export const QUOTE_CREATE_FILE = gql`
  mutation q($id: String, $files: [Files]) {
    quote_createQuoteFile(id: $id, files: $files) {
      ids
    }
  }
`;

export const QUOTE_DELETE_FILE = gql`
  mutation q($id: String, $fileIds: [FileIds]) {
    quote_deleteQuoteFile(id: $id, fileIds: $fileIds) {
      ids
    }
  }
`;

export const QUOTE_QUICKLIST_GET = gql`
  query q($filter: Filter) {
    quote_quotes(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
        itemPerPage
      }
      results {
        id
        code
        name
        createdAt
        createdBy {
          id
          name
        }
      }
    }
  }
`;

export const QUOT_REVISION_QUICK_VIEW = gql`
  query q($id: String!) {
    quote_quoteRevision(id: $id) {
      id
      code
      name
      customer {
        id
        name
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
      customerCategory
      billTo {
        label
        labelValue
        country
        zipcode
        addrState
        city
        street
      }
      shipTo {
        label
        labelValue
        country
        zipcode
        addrState
        city
        street
      }
      quote {
        id
        code
        name
      }
      opportunity {
        id
        code
        title
      }
      quoteDate
      expiryDate
      expectedShipmentDate
      process {
        id
        name
      }
      stage {
        id
        name
      }
      status {
        id
        name
      }
      emailTpl {
        id
        name
      }
      salesRep {
        id
        name
      }
      description
      quoteTpl {
        id
        name
      }
      items {
        id
        type
        product {
          id
          name
        }
        productItem {
          id
          name
        }
        price
        qty
        discount
        amount
        prepaidType
        subscriptionTerm {
          time
          unit
        }
        subscriptionTermDiscount
      }
      currency
      fCurrency {
        code
        currencySymbol
      }
      totalDiscount
      subTotalAmount
      shipCharge
      isApplyTax
      tax
      taxAmount
      roundOff
      totalAmount
      termCondition {
        id
        name
      }
      termConditionContent
      customerNote
      files {
        id
        type
        file {
          id
          name
        }
        createdAt
        createdBy {
          id
          name
        }
      }
      createdAt
      createdBy {
        id
        name
      }
      updatedAt
      updatedBy {
        id
        name
      }
    }
  }
`;
