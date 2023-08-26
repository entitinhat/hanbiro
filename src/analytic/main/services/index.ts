import {gql} from "graphql-request";

export const getQueryString = (menu: string, fieldSchema: string) => {
    return gql`
        query q($filter: SearchFilter) {
            ${menu}(filter: $filter) {
                ${fieldSchema}
            }
        }
    `;
};