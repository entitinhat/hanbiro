import {gql} from "graphql-request";

export const ANALYTIC_SUSCLICKCOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_susClickCounting(filter: $filter) {
            results {
                date {
                    key
                    name
                }
                number
            }
        }
    }
`;

export const ANALYTIC_IDNAME_NUMBER_COUNTING_SCHEMA = `
    results {
        idName {
            id
            name
        }
        number1
    }
`;

export const ANALYTIC_CAMPAIGN_COUNTING_SCHEMA = `
    paging {
        totalPage
        totalItems
        currentPage
        itemPerPage
    }
    results {
        idName {
            id
            name
        }
        number1
        number2
        total
    }
`;