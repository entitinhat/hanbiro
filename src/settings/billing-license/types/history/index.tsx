export interface History {
    id: number;
    date: string;
    activityType: string;
    item: string;
    note: string;
    amount: number;
    user?: string;
    transactionId?: number;
    subject?: string;
}

export type HistoryType = {
    id: number;
    date: string;
    activityType: string;
    item: string;
    note: string;
    user?: string;
    amount: number;
    transactionId?: number;
    subject?: string;
}