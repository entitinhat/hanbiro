import { gql } from 'graphql-request';

export const CREATE_LEAD = gql`
  mutation m($lead: DaTa!) {
    lead_createLead(lead: $lead) {
      id
    }
  }
`;

export const UPDATE_LEAD = gql`
  mutation m($lead: DaTa!) {
    lead_updateLead(lead: $lead) {
      id
    }
  }
`;
export const leadGetListQuery = (schemas: string) => {
  return gql`
      query q($filter: SearchFilter) {
        lead_leads(filter: $filter) {
          results {
            ${schemas}
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
};

export const UPDATE_LEADS = gql`
  mutation m($ids: [String!], $lead: DaTa!) {
    lead_updateLeads(ids: $ids, lead: $lead) {
      ids
    }
  }
`;

export const DELETE_LEADS = gql`
  mutation m($ids: [String!]) {
    lead_deleteLead(ids: $ids) {
      ids
    }
  }
`;

export const LEAD_RESTORE = gql`
  mutation m($ids: [String!]) {
    lead_restoreLead(ids: $ids) {
      ids
    }
  }
`;

export const LEAD_DELETE_RECOVERY = gql`
  mutation m($ids: [String!]) {
    lead_deleteLeadRecovery(ids: $ids) {
      ids
    }
  }
`;

export const LEAD_EMPTY_RECOVERY = gql`
  mutation m() {
    lead_emptyLeadRecovery() {
      success
    }
  }
`;

export const GET_ALL_LEADS = gql`
  query q($filter: SearchFilter) {
    lead_leads(filter: $filter) {
      results {
        id
        type
        title
        collectionMethod {
          id
          name
        }
        contactName
        email {
          label
          labelValue
          email
        }
        phone {
          label
          labelValue
          country
          phoneNumber
          extension
        }
        createdAt
        createdBy {
          id
          name
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

export const hiddenSchemas = [
  `contactMethod{
    preferrer{
      id
      name
    }
    email
    bulkEmail
    phone
    sms
  }`,
  `painPoints{
    id
    name
  }`,
  `competitors{
    id
    name
    website{
      website
      protocol
    }
  }`,
  `contacts{
    id
    name
    buyingRole {
      id
      name
    }
    jobPosition{
      id
      name
    }
    phones{
      label
      id
      labelValue
      country
      phoneNumber
      extension
    }
    mobiles {
      id
      label
      country
      labelValue
      mobileNumber
    }
    emails{
      label
      labelValue
      email
    }
  }`
]

export const LEAD_CREATE_COMPETITOR = gql`
  mutation m($id: String!, $competitor: Data!) {
    lead_createCompetitor(id: $id, competitor: $competitor) {
      id
    }
  }`;

export const LEAD_DELETE_COMPETITOR = gql`
  mutation m($id: String!, $competitor: Data!) {
    lead_deleteCompetitor(id: $id, competitor: $competitor) {
      id
    }
  }`;

export const LEAD_CREATE_CONTACT = gql`
  mutation m($id: String!, $competitor: Data!) {
    lead_createContact(id: $id, contact: $contact) {
      id
    }
  }`;

export const LEAD_DELETE_CONTACT = gql`
  mutation m($id: String!, $contact: Data!) {
    lead_deleteContact(id: $id, contact: $contact) {
      id
    }
  }`;

export const LEAD_QUALIFY_LEADS = gql`
  mutation m($leads: [DaTa!], $customerCategory: String!, $customer: DaTa!, $opportunity: DaTa!) {
    lead_convertLeads(leads: $leads, customerCategory: $customerCategory, customer: $customer, opportunity: $opportunity) {
      ids
    }
  }`;

export const LEAD_QUALIFY_LEAD = gql`
  mutation m($lead: DaTa!, $customerCategory: String!, $customer: DaTa!, $opportunity: DaTa!) {
    lead_convertLead(lead: $lead, customerCategory: $customerCategory, customer: $customer, opportunity: $opportunity) {
      id
    }
  }`;