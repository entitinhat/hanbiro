export interface BillPayment {
    id: number;
    name?: string;
    billingCycle?: string;
    startOn?: string;
    endOn?: string;
    purchasedOn?: string;
    billingDate?: String;
    amount?: number;
    qty?: number;
    unitPrice?: string;
    unit?: string;
    price?: string;
    date?: string;
    invoiceName?: string;
    totalAmounit?: string;
    payment?: string;
}

export type BillPaymentType = {
    id: number;
    item?: string;
    name?: string;
    billingCycle?: string;
    totalAmount?: number;
    startOn?: string;
    endOn?: string;
    purchasedOn?: string;
    billingDate?: String;
    amount?: number;
    qty?: number;
    unitPrice?: string;
    unit?: string;
    price?: string;
    date?: string;
    invoiceName?: string;
    totalAmounit?: string;
    payment?: string;
}