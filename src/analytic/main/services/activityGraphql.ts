import {gql} from "graphql-request";

export const ANALYTIC_ACTIVITYTREND = gql`
    query q($filter: SearchFilter) {
        analytic_activityTrend(filter: $filter) {
            firstCounting {
                total
                overdue
                dueToday
                customerSatisfaction
                email
                call
                task
                sms
                avgDuration
                avgDurationString
            }
            lastCounting {
                total
                overdue
                dueToday
                customerSatisfaction
                email
                call
                task
                sms
                avgDuration
                avgDurationString
            }
        }
    }
`;

export const ANALYTIC_ACTIVITYPERFORMANCE = gql`
    query q($filter: SearchFilter) {
        analytic_activityPerformance(filter: $filter) {
            results {
                group {
                    id
                    name
                }
                user {
                    id
                    name
                }
                counting {
                    total
                    overdue
                    dueToday
                    customerSatisfaction
                    email
                    call
                    task
                    sms
                    avgDuration
                }
            }
        }
    }
`;

export const ANALYTIC_ACTIVITYBYPURPOSE = gql`
    query q($filter: SearchFilter) {
        analytic_activityByPurpose(filter: $filter) {
            results {
                purpose {
                    id
                    keyName
                    languageKey
                }
                total
            }
        }
    }
`;

export const ANALYTIC_ACTIVITYBYPRIORITY = gql`
    query q($filter: SearchFilter) {
        analytic_activityByPriority(filter: $filter) {
            results {
                priority
                total
            }
        }
    }
`;

export const ANALYTIC_ACTIVITYDATECOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_activityDateCounting(filter: $filter) {
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
                counting {
                    total
                    overdue
                    dueToday
                    customerSatisfaction
                    email
                    call
                    task
                    sms
                    duration
                    avgDuration
                }
            }
        }
    }
`;

export const ANALYTIC_ACTIVITYBASECOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_activityBaseCounting(filter: $filter) {
            results {
                key
                value
                counting {
                    total
                }
            }
        }
    }
`;

export const ANALYTIC_ACTIVITYTODOCOUNTING = gql`
    query q($filter: SearchFilter) {
        analytic_activityTodoCounting(filter: $filter) {
            results {
                key
                value
                counting {
                    total
                }
            }
        }
    }
`;

export const ANALYTIC_ACTIVITIES = gql`
    query q($filter: SearchFilter) {
        analytic_activities(filter: $filter) {
            paging {
                totalPage
                totalItems
                currentPage
            }
            results {
                id
                type
                subject
                priority
                customers{
                    id
                    name
                }
                status
                startTime
                endTime
            }
        }
    }
`;

export const ANALYTIC_ACTIVITYCOMPARISONS = gql`
    query q($filter: SearchFilter) {
        analytic_activityComparisons(filter: $filter) {
            results {
                user {
                    id
                    name
                }
                total {
                    outgoingCall
                    incomingCall
                    allCallDuration
                    sentEmail
                    receivedEmail
                    sentSms
                    task
                }
                lastTotal {
                    outgoingCall
                    incomingCall
                    allCallDuration
                    sentEmail
                    receivedEmail
                    sentSms
                    task
                }
            }
            total {
                user
                outgoingCall
                incomingCall
                allCallDuration
                sentEmail
                receivedEmail
                sentSms
                task
            }
            lastTotal {
                outgoingCall
                incomingCall
                allCallDuration
                sentEmail
                receivedEmail
                sentSms
                task
            }
        }
    }
`;
