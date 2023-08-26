import { gql } from 'graphql-request';

export const GET_HISTORY = gql`
  query q() {
    history(){
        results{
        id: number;
        date: string;
        activityType: string;
        item: string;
        note: string;
        amount: number;
        transactionId: number;
        subject: string;
        }
    }
  }
`;