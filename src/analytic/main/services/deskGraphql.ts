import {gql} from "graphql-request";

export const ANALYTIC_TICKETTRENDCOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_ticketTrendCounting(filter: $filter) {
            firstCounting {
                new
                assigned
                unassigned
                overdue
                dueToday
                unresolved
                resolved
                avgCustomerSatisfaction
                avg1stResponseTime
                avg1stResponseTimeString
                avgResolutionTime
                avgResolutionTimeString
                avgResolveTimeEfficiency
                avgResolveTimeEfficiencyString
                avgAssignTime
                avgAssignTimeString
                resolvedWithinSla
            }
            lastCounting {
                new
                assigned
                unassigned
                overdue
                dueToday
                unresolved
                resolved
                avgCustomerSatisfaction
                avg1stResponseTime
                avg1stResponseTimeString
                avgResolutionTime
                avgResolutionTimeString
                avgResolveTimeEfficiency
                avgResolveTimeEfficiencyString
                avgAssignTime
                avgAssignTimeString
                resolvedWithinSla
            }
        }
    }
`;

export const ANALYTIC_TICKETBASECOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_ticketBaseCounting(filter: $filter) {
            results{
                user{
                    id
                    name
                }
                group{
                    id
                    name
                }
                category{
                    id
                    name
                }
                value
            }
        }
    }
`;

export const ANALYTIC_TICKETBYDATECOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_ticketByDateCounting(filter: $filter) {
            period {
                startTime
                endTime
            }
            results {
                date {
                    key
                    name
                }
                counting {
                    new
                    assigned
                    unassigned
                    overdue
                    dueToday
                    unresolved
                    resolved
                    avgCustomerSatisfaction
                    avg1stResponseTime
                    resolutionTime
                    avgResolutionTime
                    resolveTimeEfficiency
                    avgResolveTimeEfficiency
                    avgAssignTime
                    resolvedWithinSla
                }
            }
        }
    }
`;

export const ANALYTIC_TICKETAVGCUSTOMERSATISFACTION = gql`
    query q($filter: SearchFilter) {
        analytic_ticketAvgCustomerSatisfaction(filter: $filter) {
            counting {
                avgCustomerSatisfaction
            }
        }
    }
`;

export const ANALYTIC_TICKETPERFORMANCE = gql`
    query q($filter: SearchFilter) {
        analytic_ticketPerformance(filter: $filter) {
            results{
                group {
                    id
                    name
                }
                user {
                    id
                    name
                }
                counting {
                    assigned
                    resolved
                    unresolved
                    customerSatisfaction
                    avg1stResponseTimeString
                    resolutionTime
                    avgResolutionTime
                    avgResolutionTimeString
                    resolveTimeEfficiency
                    avgResolveTimeEfficiencyString
                    avgAssignTimeString
                    resolvedWithinSla
                }
            }
        }
    }
`;

export const ANALYTIC_TICKETCATEGORY = gql`
    query q($filter: SearchFilter) {
        analytic_ticketCategory(filter: $filter) {
            results {
                category{
                    id
                    name
                }
                total
            }
        }
    }
`;

export const ANALYTIC_TICKETPRIORITY = gql`
    query q($filter: SearchFilter) {
        analytic_ticketPriority(filter: $filter) {
            results {
                date{
                    key
                    name
                }
                countings {
                    priority
                    total
                }
            }
        }
    }
`;

export const ANALYTIC_KBDATECOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_kbDateCounting(filter: $filter) {
            results {
                date {
                    key
                    name
                }
                counting {
                    published
                    viewed
                    inserted
                }
            }
        }
    }
`;