import { gql } from 'graphql-request';

export const SITE_SURVEY_GET = gql`
  query q($id: String, $token: String!) {
    site_digitalSurvey(id: $id, token: $token) {
      id
      name
      title
      type
      language
      status
      description

      headerImage
      headerLineColor
      bgColor
      sections

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
