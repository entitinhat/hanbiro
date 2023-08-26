import { gql } from 'graphql-request';

export const getListQuery = (schemas: string) => {
  // console.log('schemas.....', schemas);
  return gql`
    query q($filter: SearchFilter) {
      desk_tickets(filter: $filter) {
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

export const getViewQuery = (schemas: string) => {
  return gql`
    query q($id: String) {
      desk_ticket(id: $id) {
        ${schemas}
      }
    }
  `;
};

export const CREATE_TICKET = gql`
  mutation q($ticket: Ticket) {
    desk_createTicket(ticket: $ticket) {
      id
    }
  }
`;

export const UPDATE_TICKET = gql`
  mutation q($ticket: Ticket) {
    desk_updateTicket(ticket: $ticket) {
      id
    }
  }
`;

export const DELETE_TICKET = gql`
  mutation q(id: String) {
    desk_deleteTicket(id: $id) {
      id
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query q($filter: FilterInput) {
    desk_tags(filter: $filter) {
      results {
        id
        name
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

export const GET_ALL_PUBLIC_TAGS = gql`
  query q($filter: FilterInput, $token: String) {
    site_tags(filter: $filter, token: $token) {
      results {
        id
        name
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

export const GET_ALL_PROCESSES = gql`
  query q($filter: FilterInput) {
    desk_ticketProcesses(filter: $filter) {
      results {
        id
        name
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
export const GET_ALL_CHANNELS = gql`
  query q($filter: FilterInput) {
    desk_channels(filter: $filter) {
      results {
        id
        name
        type
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
export const GET_ALL_POLICIES = gql`
  query q($filter: FilterInput) {
    desk_policies(filter: $filter) {
      results {
        id
        name
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
export const GET_ALL_PRIORITIES = gql`
  query q($filter: FilterInput) {
    desk_priorities(filter: $filter) {
      results {
        id
        name
        order
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const GET_ALL_TICKET_KNOWLEDGE_BASE = gql`
  query q($id: String) {
    desk_ticketKbs(id: $id) {
      results {
        id
        knowledge {
          id
          subject
          tags {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_TICKET_ASSIGNED_USERS = gql`
  query q($id: String) {
    desk_ticketAssignedUsers(id: $id) {
      results {
        id
        name
      }
    }
  }
`;
export const ADD_TICKET_ASSIGNED_USERS = gql`
  mutation q($ids: [string!], $users: [AssignToName!]) {
    desk_createTicketAssignedUsers(ids: $ids, users: $users) {
      ids
      users {
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
export const DELETE_TICKET_ASSIGNED_USERS = gql`
  mutation q($ids: [string!], $users: [string!]) {
    desk_deleteTicketAssignedUsers(ids: $ids, users: $users) {
      ids
    }
  }
`;

export const GET_TICKET_CC_USERS = gql`
  query q($id: String) {
    desk_ticketCcUsers(id: $id) {
      results {
        id
        name
      }
    }
  }
`;
export const ADD_TICKET_CC_USERS = gql`
  mutation q($ids: [string!], $users: [AssignToName!]) {
    desk_createTicketCcUsers(ids: $ids, users: $users) {
      ids
      users {
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
export const DELETE_TICKET_CC_USERS = gql`
  mutation q($ids: [string!], $users: [string!]) {
    desk_deleteTicketCcUsers(ids: $ids, users: $users) {
      ids
    }
  }
`;

export const GET_TICKET_CUSTOMERS = gql`
  query q($id: string) {
    desk_ticketCustomers(id: $id) {
      results {
        id
        name
      }
    }
  }
`;
export const ADD_TICKET_CUSTOMER = gql`
  mutation q($id: string, $customer: IdName) {
    desk_createTicketCustomer(id: $id, customer: $customer) {
      id
      name
    }
  }
`;
export const DELETE_TICKET_CUSTOMER = gql`
  mutation q($id: string, $customerId: string) {
    desk_deleteTicketCustomer(id: $id, customerId: $customerId) {
      id
    }
  }
`;
export const GET_TICKET_PRODUCTS = gql`
  query q($id: string) {
    desk_ticketProducts(id: $id) {
      results {
        id
        name
      }
    }
  }
`;
export const ADD_TICKET_PRODUCT = gql`
  mutation q($id: string, $product: IdName) {
    desk_createTicketProduct(id: $id, product: $product) {
      id
      name
    }
  }
`;
export const DELETE_TICKET_PRODUCT = gql`
  mutation q($id: string, $productId: string) {
    desk_deleteTicketProduct(id: $id, productId: $productId) {
      id
    }
  }
`;
export const GET_TICKET_KBS = gql`
  query q($id: string) {
    desk_ticketKbs(id: $id) {
      results {
        id
        name
      }
    }
  }
`;
export const ADD_TICKET_KB = gql`
  mutation q($id: string, $kb: IdName) {
    desk_createTicketKB(id: $id, kb: $kb) {
      id
      name
    }
  }
`;
export const DELETE_TICKET_KB = gql`
  mutation q($id: string, $kbId: string) {
    desk_deleteTicketKB(id: $id, kbId: $kbId) {
      id
    }
  }
`;
export const DELETE_TICKET_TAG = gql`
  mutation q($id: string, $tagId: string) {
    desk_deleteTicketTag(id: $id, tagId: $tagId) {
      id
    }
  }
`;

export const DESK_TICKET_BULK_UPDATE = gql`
  mutation q(
    $ids: [String]
    $assignedGroup: GroupInput
    $assignedUser: UserInput
    $tags: TagInput
    $category: CategoryInput
    $product: ProductInput
    $priority: PriorityInput
  ) {
    desk_bulkUpdateTicket(
      ids: $ids
      assignedGroup: $assignedGroup
      assignedUser: $assignedUser
      tags: $tags
      category: $category
      product: $product
      priority: $priority
    ) {
      ids
    }
  }
`;

export const DESK_TICKET_BULK_DELETE = gql`
  mutation q($ids: [String], $assignedUser: UserInput) {
    desk_bulkDeleteTicket(ids: $ids, assignedUser: $assignedUser) {
      ids
    }
  }
`;

export const DESK_TICKET_CLOSE = gql`
  mutation q($ids: [String]) {
    desk_closeTicket(ids: $ids) {
      ids
    }
  }
`;

export const DESK_TICKET_DELETE = gql`
  mutation q($ids: [String]) {
    desk_deleteTicket(ids: $ids) {
      ids
    }
  }
`;

export const DESK_TICKET_SPAM = gql`
  mutation q($ids: [String]) {
    desk_reportSpamTicket(ids: $ids) {
      ids
    }
  }
`;

export const DESK_TICKET_RESTORE = gql`
  mutation m($ids: [String!]) {
    desk_restoreTicket(ids: $ids) {
      ids
    }
  }
`;

export const DESK_TICKET_DELETE_RECOVERY = gql`
  mutation m($ids: [String!]) {
    desk_deleteTicketRecovery(ids: $ids) {
      ids
    }
  }
`;

export const DESK_TICKET_EMPTY_RECOVERY = gql`
  mutation m($ids: [String!]) {
    desk_emptyTicketRecovery {
      success
    }
  }
`;

/** ========= ticket comments */
export const TICKET_COMMENTS_GET = gql`
  query q($filter: FilterInput) {
    desk_ticketComments(filter: $filter) {
      results {
        id
        ticket {
          id
          subject
        }
        kind
        parent {
          id
        }
        comment {
          content
          display
          attachedFiles {
            id
            name
            size
            objectId
            objectUrl
          }
        }
        email {
          subject
          to {
            id
            name
            email
            phone
          }
          from {
            id
            name
            email
            phone
          }
          cc {
            id
            name
            email
            phone
          }
          content
          tpl {
            id
            name
          }
          attachedFiles {
            id
            name
            size
            objectId
            objectUrl
          }
          sendStatus
        }
        sms {
          subject
          to {
            id
            name
            email
            phone
          }
          from {
            id
            name
            email
            phone
          }
          content
          tpl {
            id
            name
          }
          attachedFiles {
            id
            name
            size
            objectId
            objectUrl
          }
          sendStatus
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
      }
    }
  }
`;

export const TICKET_COMMENT_CREATE = gql`
  mutation q($comment: CommentInput) {
    desk_createTicketComment(comment: $comment) {
      id
    }
  }
`;

export const TICKET_COMMENT_GET_DETAIL = gql`
  query q($id: String) {
    desk_ticketComment(id: $id) {
      id
      ticket {
        id
        subject
      }
      kind
      comment {
        content
        display
        attachedFiles {
          id
          name
          objectId
          objectUrl
        }
      }
      email {
        subject
        to {
          id
          name
          email
          phone
        }
        from {
          id
          name
          email
          phone
        }
        cc {
          id
          name
          email
          phone
        }
        content
        tpl {
          id
          name
        }
        attachedFiles {
          id
          name
          objectId
          objectUrl
        }
        sendStatus
      }
      sms {
        subject
        to {
          id
          name
          email
          phone
        }
        from {
          id
          name
          email
          phone
        }
        content
        tpl {
          id
          name
        }
        attachedFiles {
          id
          name
          objectId
          objectUrl
        }
        sendStatus
      }
      createdAt
      createdBy {
        id
        name
      }
    }
  }
`;

export const TICKET_COMMENT_UPDATE = gql`
  mutation q($comment: CommentInput) {
    desk_updateTicketComment(comment: $comment) {
      id
    }
  }
`;

export const TICKET_COMMENT_DELETE = gql`
  mutation q($ids: [String]) {
    desk_deleteTicketComment(ids: $ids) {
      ids
    }
  }
`;
/** ========= END ticket comments */
export const GET_ALL_TICKET_TODOS = gql`
  query q($filter: SearchFilter, $source: Source) {
    activity_activities(filter: $filter, source: $source) {
      results {
        id
        subject
        type
        status
        createdAt
        updatedAt
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

export const GET_ALL_TICKET_REPLIED_ACTIVITIES = gql`
  query q($filter: SearchFilter, $source: Source) {
    activity_activities(filter: $filter, source: $source) {
      results {
        id
        subject
        type
        direction
        from {
          id
          name
        }
        to {
          id
          name
        }
        content
        source {
          id
          menu
        }
        createdAt
        updatedAt
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
export const GET_TICKETS_AUTO_COMPLETE = gql`
  query q($filter: SearchFilter) {
    desk_tickets(filter: $filter) {
      results {
        id
        subject
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

export const GET_TICKET_VIEW = gql`
  query q($id: String) {
    desk_ticket(id: $id) {
      id
      subject
      content
    }
  }
`;

export const GET_TICKET_QUICK_VIEW = gql`
  query q($id: String!) {
    desk_ticket(id: $id) {
      id
      subject
      code
      priority {
        keyName
        languageKey
      }
      customer {
        id
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
          phoneNumber
          extension
        }
      }
      process {
        id
        name
      }
      contact {
        id
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
          phoneNumber
          extension
        }
      }
      status {
        keyName
        languageKey
      }

      category {
        id
        name
      }
      product {
        id
        name
      }

      product {
        id
        name
      }
      classifications {
        classification {
          id
          name
        }
        value
      }
      assignedGroup {
        id
        name
        reps {
          id
          user {
            id
            name
          }
        }
      }
      assignedUser {
        user {
          id
          name
        }
        group {
          id
          name
        }
      }
      ccUsers {
        user {
          id
          name
        }
        group {
          id
          name
        }
      }
      channel {
        id
        name
      }
      tags {
        id
        name
      }
      content
      description

      duration
      durationUnit

      firstRespondDue
      resolutionDue

      realDuration

      createdBy {
        id
        name
        fullName
      }
      createdAt
      updatedBy {
        id
        name
        fullName
      }
      updatedAt
      closedAt
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
