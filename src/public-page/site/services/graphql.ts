import { pageLayoutSchema } from '@base/services/graphql/pagelayout';
import { gql } from 'graphql-request';

export const CREATE_TRACKING = gql`
  mutation q($tracking: Tracking!) {
    site_createTracking(tracking: $tracking)
  }
`;

export const GET_SITE_PAGE = gql`
  query q($id: String!, $token: String!) {
    site_site(id: $id, token: $token) {
      content
    }
  }
`;

export const TRACKING_TICKET = gql`
  query q($id: String!, $token: String!) {
    site_ticket(id: $id, token: $token) {
      content
    }
  }
`;
export const TRACKING_ALL_TICKETS = gql`
  query q($filter: SearchFilter, $token: String!) {
    site_tickets(filter: $filter, token: $token) {
      content
    }
  }
`;

export const getTrackingTicketsListQuery = (schemas: string) => {
  return gql`
    query q($filter: SearchFilter,  $token: String!) {
      site_tickets(filter: $filter, token: $token) {
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

export const getSiteTicketViewQuery = (schemas: string) => {
  return gql`
    query q($id: String!, $token: String!) {
      site_ticket(id: $id, token: $token) {
        ${schemas}
      }
    }
  `;
};

export const getTrackingTicketTimelineQuery = (schemas: string) => {
  return gql`
    query q($id: String!, $token: String!) {
      site_ticket(id: $id, token: $token) {
        ${schemas}
      }
    }
  `;
};

export const GET_TRACKING_TIMELINE_BY_MENU = gql`
  query q($filter: SearchFilter, $source: Source, $token: String!) {
    site_timelines(filter: $filter, source: $source, token: $token) {
      paging {
        totalItems
        totalPage
        currentPage
        itemPerPage
      }
      results {
        id
        menu
        tab
        section
        sectionId
        sourceId
        action
        timezone
        remoteIp
        userAgent
        content {
          field
          value
          lang
        }
        createdBy {
          id
          name
        }
        createdAt
      }
    }
  }
`;

export const GET_TRACKING_MENU_PAGELAYOUT = gql`
  query GetPageLayout($menu: String!) {
    site_menuPagelayout(layoutKey: $menu, device: "desktop") {
      list {
        ${pageLayoutSchema}
      }
      write {
        ${pageLayoutSchema}
      }
      view {
        ${pageLayoutSchema}
      }
    }
  }
`;

export const getTicketListQuery = (schemas: string) => {
  //// console.log('schemas', schemas);
  return gql`
    query q($filter: SearchFilter, $token: String) {
      site_tickets(filter: $filter, token: $token) {
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

export const SITE_TICKET_CREATE = gql`
  mutation q($ticket: TicketInput, $token: String) {
    site_createTicket(ticket: $ticket, token: $token) {
      id
    }
  }
`;

export const SITE_TICKET_CLOSE = gql`
  mutation q($ids: [String], $token: String) {
    site_closeTicket(ids: $ids, token: $token) {
      ids
    }
  }
`;

export const SITE_TICKET_CANCEL = gql`
  mutation q($ids: [String], $token: String) {
    site_cancleTicket(ids: $ids, token: $token) {
      ids
    }
  }
`;

export const SITE_TICKET_COMMENTS_GET = gql`
  query q($filter: FilterInput, $token: String!) {
    site_ticketComments(filter: $filter, token: $token) {
      results {
        id
        ticket {
          id
          subject
        }
        parent {
          id
        }
        kind
        countReplies
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
          to
          from
          cc
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
          to
          from
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
        call {
          subject
          to
          from
          content
          sendStatus
        }
        fax {
          subject
          to
          from
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
  }
`;

export const SITE_TICKET_COMMENT_CREATE = gql`
  mutation q($comment: CommentInput, $token: String) {
    site_createTicketComment(comment: $comment, token: $token) {
      id
    }
  }
`;

export const SITE_DESK_SURVEYS_GET = gql`
  query q($token: String!) {
    site_deskSiteSurveys(token: $token) {
      results {
        id
        name
      }
    }
  }
`;

export const SITE_SURVEY_GET = gql`
  query q($id: String, $token: String!) {
    site_survey(id: $id, token: $token) {
      id
      name
      title
      language
      description
      headerImage
      headerLineColor
      bgColor
      question
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
    }
  }
`;

//new:site_digitalCreateSurveyAnswer // old:site_createAnswer
export const SITE_SURVEY_ANSWER_CREATE = gql`
  mutation q($answer: AnswerInput, $token: String) {
    site_digitalCreateSurveyAnswer(answer: $answer, token: $token) {
      id
    }
  }
`;
