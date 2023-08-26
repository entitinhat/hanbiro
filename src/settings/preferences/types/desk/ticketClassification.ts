import { IdName } from '@base/types/common';

export interface TicketClassification {
  id: string;
  name: string;
  values: any[];
  active: boolean;
}

export interface TicketClassificationValue {
  classification: IdName;
  value: string;
}
