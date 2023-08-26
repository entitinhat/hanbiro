import {gql} from "graphql-request";

export const getDateCountingQueryString = (menu: string, fieldSchema: string) => {
    return gql`
        query q($filter: SearchFilter) {
            ${menu}(filter: $filter) {
            period {
                startTime
                endTime
            }
            results {
                date {
                    key
                    name
                    period {
                        startTime
                        endTime
                    }
                }
                ${fieldSchema}
            }
        }
        }
    `;
};

export const ANALYTIC_CUSTOMERTRENDCOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_customerTrendCounting(filter: $filter) {
            firstCounting {
                total
                account
                contact
            }
            lastCounting {
                total
                account
                contact
            }
        }
    }
`;

export const ANALYTIC_CUSTOMERINDUSTRYCOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_customerIndustryCounting(filter: $filter) {
            results {
                industry{
                    id
                    name
                    languageKey
                }
                counting {
                    total
                }
            }
        }
    }
`;