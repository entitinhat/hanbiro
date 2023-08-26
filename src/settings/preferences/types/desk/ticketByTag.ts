import { IDeskPriority } from '@settings/assignment-rule/rule/services/ticket-service';

interface IBaseresponse {
  id: string;
  name: string;
}

export interface ITicketByTag {
  id: string;
  subject: string;
  process: IBaseresponse;
  product: IBaseresponse;
  category: IBaseresponse;
  assignedGroup: IBaseresponse;
  assignedUser: {
    user: IBaseresponse;
    group: IBaseresponse;
  };
  customer: IBaseresponse;
  priority: IDeskPriority;
  paging: {
    totalPage: number;
    totalItems: number;
    currentPage: number;
    itemPerPage: number;
  };
}
