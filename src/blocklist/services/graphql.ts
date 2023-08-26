import { gql } from 'graphql-request';

export const customerGetList = (schemas: string) => {
  return gql`
    query q($filter: SearchFilter) {
      customer_customers(filter: $filter) {
        results {
          ${schemas}
        }
      }
    }
  `;
};
