import { IdName } from '@base/types/common';

export interface Licenses {
    id: number;
    name: string;
    product: string;
    item: string;
    description: string;
    quantity: number;
    unitPrice: string;
    unit: string;
    amount: string;
    billing: string;
    action: string;
}


export type LicensesUsed = {
    id: number;
    product: string;
    item: string;
    description: string;
    quantity: number;
    unitPrice: string;
    unit: string;
    amount: string;
    billing: string;
    action: string;
}

export type LicensesGuide = {
    id: number;
    product: string;
    item: string;
    description: string;
    unitPrice: string;
    unit: string;
    billing: string;
}