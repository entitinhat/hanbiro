import { gql } from 'graphql-request';

export const GET_SURVEY_LIST = gql`
  query q($filter: filterInput) {
    setting_surveys(filter: $filter) {
      results {
        id
        name
        title
        bgColor
        description
        isTemplate
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

export const SURVEY_CREATE = gql`
  mutation q($survey: SurveyInput) {
    setting_createSurvey(survey: $survey) {
      id
    }
  }
`;

export const SURVEY_DELETE = gql`
  mutation q($ids: [String]) {
    setting_deleteSurvey(ids: $ids) {
      ids
    }
  }
`;

export const SURVEY_UPDATE = gql`
  mutation q($survey: SurveyInput) {
    setting_updateSurvey(survey: $survey) {
      id
    }
  }
`;

export const SURVEY_RESPONSE_CREATE = gql`
  mutation q($answer: SurveyResponseInput) {
    setting_createAnswer(answer: $answer) {
      id
    }
  }
`;

export const SURVEY_RESPONSE_GET = gql`
  query q($id: String) {
    setting_answer(id: $id) {
      id
      survey {
        id
        name
      }
      answers
      answerBy {
        id
        name
        fullName
      }
      answerAt
    }
  }
`;

export const SURVEY_RESPONSES_GET_LIST = gql`
  query q($filter: filterInput) {
    setting_answers(filter: $filter) {
      results {
        id
        survey {
          id
          name
        }
        answers
        answerBy {
          id
          name
          fullName
        }
        answerAt
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const SURVEY_RESPONSE_DELETE = gql`
  mutation q($ids: [String]) {
    setting_deleteAnswer(ids: $ids) {
      ids
    }
  }
`;
