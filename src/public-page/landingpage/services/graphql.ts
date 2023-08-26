import { gql } from 'graphql-request';

export const SITE_LANDING_PAGE_GET = gql`
  query q($id: String, $token: String!) {
    site_digitalLandingPage(id: $id, token: $token) {
      id
      type
      name
      language
      products {
        id
        name
      }
      isAllProducts
      description
      assignTo {
        id
        name
      }
      template
      title
      html
      publish
      publishDate
      stage
      publishDate
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
export const SITE_TICKET_FORM_GET = gql`
  query q($id: String, $token: String!) {
    site_digitalTicketForm(id: $id, token: $token) {
      id
      submissionBehavior
      linkToResource {
        id
        name
      }
      createTicket
      ticketName
      displayMessage
      linkToPage
      linkToType
      template
      name
      language
      isAllProducts
      products {
        id
        name
      }
      description

      title
      html
      submissionDisplay

      createTicket
      ticketName

      stage
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

