import { gql } from 'graphql-request';

export const customerGetList = (schemas: string) => {
  return gql`
    query q($filter: SearchFilter) {
      customer_customers(filter: $filter) {
        results {
          ${schemas}
        }
      }
    }
  `;
};

export const CUSTOMER_GET_LIST = gql`
  query q($filter: SearchFilter) {
    customer_customers(filter: $filter) {
      results {
        id
        photo
        code
        name
        type
        industries {
          id
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
        leadSources {
          id
          languageKey
        }
        staffs {
          id
          name
          properties {
            crmGroups {
              id
              name
            }
            crmBaseGroup {
              id
              name
            }
          }
        }
        createdAt
        updatedAt
        createdBy {
          id
          name
        }
        ranking {
          id
          languageKey
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

export const CUSTOMER_CUSTOMER = gql`
  query q($id: String!) {
    customer_customer(id: $id) {
      id
      category
      photo
      code
      name
      typeEnum
      type
      contactType
      industries {
        id
        languageKey
      }
      rating {
        id
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
        id
        label
        labelValue
        country
        mobileNumber
      }
      assignTo {
        id
        name
        properties {
          crmGroups {
            id
            name
          }
          crmBaseGroup {
            id
            name
          }
        }
      }
      account {
        id
        name
      }
      referralReward
      preferred
      saleCommission
      saleProducts {
        id
        name
      }
      relatedProducts {
        id
        name
      }
      department
      position
      role
    }
  }
`;

export const GET_CUSTOMER_DETAIL = gql`
  query q($id: String!, $menu: String!, $device: String) {
    getMenuView(id: $id, menu: $menu, device: $device) {
      rows {
        data_type
        key_name
        language_key
        permission_user {
          is_edit
          is_show
        }
        attributes {
          id
          key_name
          value
          default_value
          language_key
          is_enabled
          is_del
        }
        children {
          id
          data_type
          key_name
          _value_type
          _value
          is_basic_field
          language_key
          field_id
          _column_name
          permission {
            can_mark_required
            can_set_show_in_list
            can_set_show_in_view
            can_set_show_in_write
            can_move_unused
            can_delete
            can_edit_property
            can_move_position
            can_show_setting_button
            setting_button_tooltip
            can_change_field_name
          }
          permission_user {
            is_edit
            is_show
          }
          attributes {
            id
            key_name
            value
            default_value
            language_key
            is_enabled
            is_del
          }
          options {
            id
            layout_id
            key_name
            data_type
            type
            value
            language_key
          }
        }
      }
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation q($customer: CustomerInput) {
    customer_updateCustomer(customer: $customer) {
      id
    }
  }
`;

export const ADD_CUSTOMER = gql`
  mutation q($customer: CustomerInput) {
    customer_createCustomer(customer: $customer) {
      id
    }
  }
`;

export const CUSTOMER_DELETE = gql`
  mutation q($ids: [String!]!) {
    customer_deleteCustomer(ids: $ids) {
      ids
    }
  }
`;

export const GET_CUSTOMER_INFO = gql`
  query q($id: String!) {
    customer_customer(id: $id) {
      id
      name
      billAddress {
        id
        label
        labelValue
        country
        zipcode
        addrState
        city
        street
      }
      shipAddress {
        id
        label
        labelValue
        country
        zipcode
        addrState
        city
        street
      }
    }
  }
`;

export const CUSTOMER_LIST_FOR_SELECT = gql`
  query q($filter: SearchFilter) {
    customer_customers(filter: $filter) {
      results {
        id
        code
        name
        photo
        category
        type
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
          id
          label
          labelValue
          country
          mobileNumber
        }
        billAddress {
          id
          label
          labelValue
          country
          zipcode
          addrState
          city
          street
        }
        shipAddress {
          id
          label
          labelValue
          country
          zipcode
          addrState
          city
          street
        }
        employeeRole {
          languageKey
          keyName
        }
        department
        job {
          languageKey
          keyName
        }
        anniversaries {
          id
          label
          labelValue
          anniversary
        }
        gender
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const CUSTOMER_MARKETING_LIST = gql`
  query q($filter: SearchFilter) {
    customer_customers(filter: $filter) {
      results {
        id
        code
        name
        category
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
          id
          label
          labelValue
          country
          mobileNumber
        }
        account {
          id
          name
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

export const CUSTOMER_EMPLOYEE_CONTACT_LIST = gql`
  query q($filter: SearchFilter) {
    customer_customerAssignContacts: customer_customers(filter: $filter) {
      results {
        id
        code
        name
        photo
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const CUSTOMER_EMPLOYEE_CONTACT_ASSIGN = gql`
  mutation q($customer: CustomerAssignInput) {
    customer_updateCustomer(customer: $customer) {
      id
    }
  }
`;

export const CUSTOMER_EMPLOYEE_CONTACT_DELETE = gql`
  mutation q($id: String) {
    customer_deleteCustomer(id: $id) {
      id
    }
  }
`;

export const ADD_CUSTOMER_EMPLOYEE_CONTACT_ASSIGN = gql`
  mutation q($customer: CustomerInput) {
    customer_updateCustomer(customer: $customer) {
      id
    }
  }
`;

export const DELETE_CUSTOMER_EMPLOYEE_CONTACT_DELETE = gql`
  mutation q($ids: [String]) {
    customer_deleteCustomer(ids: $ids) {
      ids
    }
  }
`;

//START: assign rep
export const GET_CUSTOMER_ASSIGNED_REPS = gql`
  query q($id: String!) {
    customer_assignTo(id: $id) {
      results {
        id
        name
        properties {
          crmGroups {
            id
            name
          }
          crmBaseGroup {
            id
            name
          }
        }
      }
    }
  }
`;

export const DELETE_CUSTOMER_ASSIGN_REP = gql`
  mutation q($ids: [String], $repIds: [String]) {
    customer_deleteAssignTo(ids: $ids, repIds: $repIds) {
      ids
    }
  }
`;

export const CREATE_CUSTOMER_ASSIGN_REP = gql`
  mutation q($ids: [String], $assignTo: AssignToInput) {
    customer_createAssignTo(ids: $ids, assignTo: $assignTo) {
      ids
    }
  }
`;

export const CUSTOMER_CLONE = gql`
  mutation q($id: String) {
    customer_copyCustomer(id: $id) {
      id
    }
  }
`;

export const CUSTOMER_DUPLICATES_GET = gql`
  query q($filter: SearchFilter) {
    customer_duplicates(filter: $filter) {
      results {
        name
        ids
        count
      }
    }
  }
`;

export const CUSTOMER_RELATED_PRODUCT_GET = gql`
  query q($id: String!) {
    customer_customer(id: $id) {
      id
      relatedProducts {
        id
        name
      }
    }
  }
`;

export const CUSTOMER_RESTORE_CUSTOMER = gql`
  mutation m($ids: [String!]) {
    customer_restoreCustomer(ids: $ids) {
      ids
    }
  }
`;

export const CUSTOMER_DELETE_CUSTOMER_RECOVERY = gql`
  mutation m($ids: [String!]) {
    customer_deleteRecovery(ids: $ids) {
      ids
    }
  }
`;

export const CUSTOMER_EMPTY_CUSTOMER_RECOVERY = gql`
  mutation m {
    customer_emptyRecovery {
      success
    }
  }
`;

export const CUSTOMER_BULK_UPDATE = gql`
  mutation m($ids: [String!], $customer: CustomerInput) {
    customer_bulkUpdateCustomer(ids: $ids, customer: $customer) {
      ids
    }
  }
`;

export const CUSTOMER_QUICK_VIEW = gql`
  query q($id: String!) {
    customer_customer(id: $id) {
      id
      photo
      category
      code
      name
      contactType
      type
      rating {
        id
        languageKey
      }
      employeeRole {
        languageKey
        keyName
      }
      industries {
        keyName
        languageKey
      }
      account {
        id
        code
        name
        category
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
          fCountry {
            country
            isoCode2
            isoCode3
            phoneCode
            region
          }
          phoneNumber
          extension
        }
        websites {
          labelValue
          protocol
          website
        }
      }
      emails {
        id
        label
        labelValue
        email
      }
      mobiles {
        id
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
      phones {
        id
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
        phoneNumber
      }
      gender
      department
      job {
        languageKey
        keyName
      }

      anniversaries {
        id
        label
        labelValue
        anniversary
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
      mainProduct
      relatedProducts {
        id
        name
      }
      SLA

      billAddress {
        country
        fCountry {
          country
          isoCode2
          isoCode3
          phoneCode
          region
        }
        zipcode
        addrState
        city
        street
      }

      shipAddress {
        country
        fCountry {
          country
          isoCode2
          isoCode3
          phoneCode
          region
        }
        zipcode
        addrState
        city
        street
      }

      description
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
      restore {
        id
        aggId
        aggType
        deletedAt
        deletedBy {
          id
          name
        }
      }
    }
  }
`;
