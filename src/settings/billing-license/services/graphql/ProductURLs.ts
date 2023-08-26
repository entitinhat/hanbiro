import { gql } from 'graphql-request';

export const GET_PRODUCT_URLS = gql`
  query q() {
    products(){
        results{
          id: number;
          name: string;
          plan: string;
          url: string;
        }
    }
  }
`;
