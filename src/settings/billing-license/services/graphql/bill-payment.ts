import { gql } from 'graphql-request';

export const GET_BILL_PAYMENT = gql`
  query q() {
    billPayment(){
        results{
            id: number;
            name: string;
            billingCycle: string;
            startOn: string;
            endOn: string;
            purchasedOn: string;
            billingDate: String;
            amount: number;
            qty: number;
            unitPrice: string;
            unit: string;
            price: string;
            date: string;
            invoiceName: string;
            totalAmounit: string;
            payment: string;
        }
    }
  }
`;