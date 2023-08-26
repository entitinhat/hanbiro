import { gql } from 'graphql-request';

export const GET_LIENCES = gql`
  query q() {
    liences(){
        results{
            id
            name
            product
            item
            description
            quantity
            unitPrice
            unit
            amount
            billing
            action
          }
    }
  }
`;