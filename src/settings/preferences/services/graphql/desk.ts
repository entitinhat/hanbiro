import { gql } from 'graphql-request';

export const GET_SLA_SETTING = gql`
  query q($id: String) {
    setting_menuSetting(menu: "desk", key: "sla") {
      id
      menu
      key
      value
    }
  }
`;

export const UPDATE_SLA_SETTING = gql`
  mutation q($menuSetting: IMenuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;

export const GET_PRIORITY_SETTING = gql`
  query q($id: String) {
    setting_menuSetting(menu: "desk", key: "priority") {
      id
      menu
      key
      value
    }
  }
`;

export const UPDATE_PRIORITY_SETTING = gql`
  mutation q($menuSetting: IMenuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;

export const GET_RESPOND_PRIORITY_SETTING = gql`
  query q($id: String) {
    setting_menuSetting(menu: "desk", key: "respond_priority") {
      id
      menu
      key
      value
    }
  }
`;

export const UPDATE_RESPOND_PRIORITY_SETTING = gql`
  mutation q($menuSetting: IMenuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;
export const GET_RESOLVE_SLA_SETTING = gql`
  query q($id: String) {
    setting_menuSetting(menu: "desk", key: "resolve_sla") {
      id
      menu
      key
      value
    }
  }
`;

export const UPDATE_RESOLVE_SLA_SETTING = gql`
  mutation q($menuSetting: IMenuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;
export const GET_AUTO_CLOSE_TICKET_SETTING = gql`
  query q($id: String) {
    setting_menuSetting(menu: "desk", key: "auto_close_ticket") {
      id
      menu
      key
      value
    }
  }
`;

export const UPDATE_AUTO_CLOSE_TICKET_SETTING = gql`
  mutation q($menuSetting: IMenuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;

export const GET_SURVEY_TEMPLATE_SETTING = gql`
  query q($id: String) {
    setting_menuSetting(menu: "desk", key: "survey_template") {
      id
      menu
      key
      value
    }
  }
`;

export const UPDATE_SURVEY_TEMPLATE_SETTING = gql`
  mutation q($menuSetting: IMenuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;

export const GET_TICKET_CLASSIFICATION_SETTING = gql`
  query q($filter: SearchFilter) {
    desk_ticketClassifications(filter: $filter) {
      results {
        id
        name
        values
        active
      }
    }
  }
`;

export const GET_PUBLIC_TICKET_CLASSIFICATION_SETTING = gql`
  query q($token: String) {
    site_ticketClassifications(token: $token) {
      results {
        id
        name
        values
      }
    }
  }
`;

export const CREATE_TICKET_CLASSIFICATION_SETTING = gql`
  mutation q($classification: ITicketClassificationSetting) {
    desk_createTicketClassification(classification: $classification) {
      id
    }
  }
`;
export const UPDATE_TICKET_CLASSIFICATION_SETTING = gql`
  mutation q($classification: ITicketClassificationSetting) {
    desk_updateTicketClassification(classification: $classification) {
      id
    }
  }
`;
export const DELETE_TICKET_CLASSIFICATION_SETTING = gql`
  mutation q($ids: string) {
    desk_deleteTicketClassification(ids: $ids) {
      ids
    }
  }
`;

export const GET_TICKET_CATEGORIES = gql`
  query q($filter: FilterInput) {
    desk_ticketCategories(filter: $filter) {
      results {
        id
        name
        rules {
          id
          products {
            id
            name
          }
          isAllProducts
          priority {
            keyName
            languageKey
          }
          averageTimeResolve {
            duration
            durationUnit
          }
        }
      }
    }
  }
`;
export const CREATE_TICKET_CATEGORY = gql`
  mutation q($category: ITicketCategorySetting) {
    desk_createTicketCategory(category: $category) {
      id
    }
  }
`;
export const UPDATE_TICKET_CATEGORY = gql`
  mutation q($category: ITicketCategorySetting) {
    desk_updateTicketCategory(category: $category) {
      id
    }
  }
`;
export const DELETE_TICKET_CATEGORY = gql`
  mutation q($ids: string) {
    desk_deleteTicketCategory(ids: $ids) {
      ids
    }
  }
`;

export const CREATE_TICKET_CATEGORY_RULE = gql`
  mutation q($id: String, $rule: ITicketCategoryRule) {
    desk_createTicketCategoryRule(id: $id, rule: $rule) {
      id
    }
  }
`;
export const UPDATE_TICKET_CATEGORY_RULE = gql`
  mutation q($id: String, $rule: ITicketCategoryRule) {
    desk_updateTicketCategoryRule(id: $id, rule: $rule) {
      id
    }
  }
`;
export const DELETE_TICKET_CATEGORY_RULE = gql`
  mutation q($id: String, $ruleId: String) {
    desk_deleteTicketCategoryRule(id: $id, ruleId: $ruleId) {
      id
    }
  }
`;

export const UPDATE_TICKET_CATEGORY_2 = gql`
  mutation q($id: String, $rule: ITicketCategoryRule, $category: ITicketCategorySetting) {
    desk_updateTicketCategoryRule(id: $id, rule: $rule) {
      id
    }
    desk_updateTicketCategory(category: $category) {
      id
    }
  }
`;

export const GET_DESK_TAGS = gql`
  query q() {
    desk_tags() {
      results{
        id
        name
        linkedArticles
        linkedTickets
      }
    
    }
  }
`;
export const CREATE_DESK_TAG = gql`
  mutation q($tag: IDeskTag) {
    desk_createTag(tag: $tag) {
      id
    }
  }
`;
export const CREATE_DESK_TAGS = gql`
  mutation q($tags: IDeskTag) {
    desk_createTags(tags: $tags) {
      id
    }
  }
`;
export const UPDATE_DESK_TAG = gql`
  mutation q($tag: IDeskTag) {
    desk_updateTag(tag: $tag) {
      id
    }
  }
`;
export const DELETE_DESK_TAG = gql`
  mutation q($ids: string) {
    desk_deleteTag(ids: $ids) {
      id
    }
  }
`;

export const GET_DESK_CHANNELS = gql`
  query q() {
    desk_channels() {
      results{
        id
        name
        description
        active
        assignType
        assignedGroups{
          id
          name
        }
        assignedUsers{
          id 
          name
        }
        landingpage{
          id 
          name
        }
        useAssign
        type{
          keyName
          languageKey
        }
        realUrl
        shortUrl
        email
        createdAt
      }
    
    }
  }
`;
export const GET_DESK_CHANNEL = gql`
  query q($id: String) {
    desk_channels(id: $id) {
      id
      name
      description
      realUrl
      shortUrl
      email
      active
      assignType
      assignedGroups {
        id
        name
      }
      assignedUsers {
        id
        user {
          id
          name
        }
      }
      useAssign
      type
    }
  }
`;
export const CREATE_DESK_CHANNEL = gql`
  mutation q($channel: IDeskChannel) {
    desk_createChannel(channel: $channel) {
      id
    }
  }
`;

export const UPDATE_DESK_CHANNEL = gql`
  mutation q($channel: IDeskChannel) {
    desk_updateChannel(channel: $channel) {
      id
    }
  }
`;
export const DELETE_DESK_CHANNEL = gql`
  mutation q($ids: [String]) {
    desk_deleteChannel(ids: $ids) {
      ids
    }
  }
`;

export const GET_DESK_ASSIGNMENT_GROUPS = gql`
  query q($filter: FilterInput) {
    desk_assignmentGroups(filter: $filter) {
      results {
        id
        name
        active
        description
        totalReps
      }
    }
  }
`;
export const CREATE_ASSIGNMENT_GROUP = gql`
  mutation q($group: IAssignmentGroup) {
    desk_createAssignmentGroup(group: $group) {
      id
    }
  }
`;

export const UPDATE_ASSIGNMENT_GROUP = gql`
  mutation q($group: IAssignmentGroup) {
    desk_updateAssignmentGroup(group: $group) {
      id
    }
  }
`;
export const DELETE_ASSIGNMENT_GROUP = gql`
  mutation q($ids: string) {
    desk_deleteAssignmentGroup(ids: $ids) {
      ids
    }
  }
`;
export const GET_DESK_ASSIGNMENT_USERS = gql`
  query q($filter: FilterInput) {
    desk_assignmentUsers(filter: $filter) {
      results {
        id
        type
        name
        phone {
          country
          phoneNumber
        }
        email
        mobile {
          country
          phoneNumber
        }
        user {
          id
          name
        }
        active
      }
    }
  }
`;
export const CREATE_ASSIGNMENT_USER = gql`
  mutation q($user: IAssignmentUser) {
    desk_createAssignmentUser(user: $user) {
      id
    }
  }
`;

export const UPDATE_ASSIGNMENT_USER = gql`
  mutation q($user: IAssignmentUser) {
    desk_updateAssignmentUser(user: $user) {
      id
    }
  }
`;
export const DELETE_ASSIGNMENT_USER = gql`
  mutation q($ids: string) {
    desk_deleteAssignmentUser(ids: $ids) {
      ids
    }
  }
`;
export const GET_DESK_ASSIGNMENT_REPS = gql`
  query q($filter: FilterInput) {
    desk_assignmentGroupReps(filter: $filter) {
      results {
        id
        groupId
        active
        name
        email
        phone {
          country
          phoneNumber
        }
        mobile {
          country
          phoneNumber
        }
        user {
          id
          name
        }
      }
    }
  }
`;
export const ADD_ASSIGNMENT_REPS = gql`
  mutation q($rep: Rep) {
    desk_createAssignmentGroupRep(rep: $rep) {
      id
    }
  }
`;
export const UPDATE_ASSIGNMENT_REP = gql`
  mutation q($rep: Rep) {
    desk_updateAssignmentGroupRep(rep: $rep) {
      id
    }
  }
`;

export const DELETE_ASSIGNMENT_REPS = gql`
  mutation q($ids: string) {
    desk_deleteAssignmentGroupReps(ids: $ids) {
      ids
    }
  }
`;

export const GET_DESK_HOURS_SETTING = gql`
  query q($id: String) {
    setting_menuSetting(menu: "desk", key: "desk_hours") {
      id
      menu
      key
      value
    }
  }
`;
export const UPDATE_DESK_HOURS_SETTING = gql`
  mutation q($menuSetting: IMenuSetting) {
    setting_updateMenuSetting(menuSetting: $menuSetting) {
      id
    }
  }
`;

export const GET_ALL_TICKET_FORM = gql`
  query q($filter: SearchFilter) {
    setting_ticketForms(filter: $filter) {
      results {
        id
        name
      }
    }
  }
`;

export const GET_ALL_TICKETS_BY_TAG = gql`
  query q($filter: SearchFilter) {
    desk_tickets(filter: $filter) {
      results {
        id
        subject
        process {
          id
          name
        }
        product {
          id
          name
        }
        priority {
          keyName
          languageKey
        }
        category {
          id
          name
        }
        assignedGroup {
          id
          name
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
        customer {
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

export const GET_ALL_KNOWLEDGES_BY_TAG = gql`
  query q($filter: SearchFilter) {
    desk_knowledgebases(filter: $filter) {
      results {
        id
        subject
        category {
          id
          name
        }
        folder {
          id
          name
        }
        viewed
        inserted
        helped
        notHelped
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
export const GET_ALL_PUBLIC_CATEGORIES = gql`
  query q($filter: FilterInput, $token: String) {
    site_ticketCategories(filter: $filter, token: $token) {
      results {
        id
        name
        rules {
          priority {
            keyName
            languageKey
          }
        }
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query q($filter: FilterInput) {
    desk_ticketCategories(filter: $filter) {
      results {
        id
        name
        rules {
          priority {
            keyName
            languageKey
          }
        }
      }
    }
  }
`;
