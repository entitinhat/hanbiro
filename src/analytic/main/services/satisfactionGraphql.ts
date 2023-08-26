import {gql} from "graphql-request";

export const ANALYTIC_SATISFACTIONTRENDCOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_satisfactionTrendCounting(filter: $filter) {
            firstCounting {
                highlySatisfied
                satisfied
                neutral
                dissatisfied
                highlyDissatisfied
            }
            lastCounting {
                highlySatisfied
                satisfied
                neutral
                dissatisfied
                highlyDissatisfied
            }
        }
    }
`;

export const ANALYTIC_QUESTIONSATISFACTIONCOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_questionSatisfactionCounting(filter: $filter) {
            highlySatisfied
            satisfied
            neutral
            dissatisfied
            highlyDissatisfied
        }
    }
`;

export const ANALYTIC_LISTSATISFACTIONQUESTIONS = gql`
    query q($filter: SearchFilter) {
        analytic_listSatisfactionQuestions(filter: $filter) {
            results {
                id
                name
            }
        }
    }
`;