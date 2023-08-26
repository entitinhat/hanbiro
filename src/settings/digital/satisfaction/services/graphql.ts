import { gql } from 'graphql-request';

export const SATISFACTION_SURVEY_GET_LIST = gql`
  query q($filter: SearchFilter) {
    setting_satisfactionSurveys(filter: $filter) {
      results {
        id
        name
        title
        bgColor
        question
        status
        language
        headerLineColor
        createdBy {
          id
          name
        }
        createdAt
        updatedAt
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const SATISFACTION_SURVEY_CREATE = gql`
  mutation q($satisfactionSurvey: SurveyInput) {
    setting_createSatisfactionSurvey(satisfactionSurvey: $satisfactionSurvey) {
      id
    }
  }
`;

export const SATISFACTION_SURVEY_DELETE = gql`
  mutation q($ids: [String]) {
    setting_deleteSatisfactionSurvey(ids: $ids) {
      ids
    }
  }
`;

export const SATISFACTION_SURVEY_UPDATE = gql`
  mutation q($satisfactionSurvey: SurveyInput) {
    setting_updateSatisfactionSurvey(satisfactionSurvey: $satisfactionSurvey) {
      id
    }
  }
`;

export const SATISFACTION_SURVEY_RESPONSE_CREATE = gql`
  mutation q($satisfactionSurveyAnswer: SurveyResponseInput) {
    setting_createSatisfactionSurveyAnswer(satisfactionSurveyAnswer: $satisfactionSurveyAnswer) {
      id
    }
  }
`;

// export const SURVEY_RESPONSE_GET = gql`
//   query q($id: String) {
//     setting_answer(id: $id) {
//       id
//       survey {
//         id
//         name
//       }
//       answers
//       answerBy {
//         id
//         name
//         fullName
//       }
//       answerAt
//     }
//   }
// `;

// export const SURVEY_RESPONSES_GET_LIST = gql`
//   query q($filter: filterInput) {
//     setting_answers(filter: $filter) {
//       results {
//         id
//         survey {
//           id
//           name
//         }
//         answers
//         answerBy {
//           id
//           name
//           fullName
//         }
//         answerAt
//       }
//       paging {
//         totalPage
//         totalItems
//         currentPage
//       }
//     }
//   }
// `;

// export const SURVEY_RESPONSE_DELETE = gql`
//   mutation q($ids: [String]) {
//     setting_deleteAnswer(ids: $ids) {
//       ids
//     }
//   }
// `;
