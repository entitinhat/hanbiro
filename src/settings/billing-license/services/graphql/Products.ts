import { gql } from 'graphql-request';

export const GET_PRODUCTS = gql`
  query q() {
    products(){
        results{
            id: number;
            product: string;
            plan: string;
            users: number;
            actions: string;
        }
    }
  }
`;
