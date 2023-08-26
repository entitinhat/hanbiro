import usePublicPosts from '@base/hooks/publics/usePublicPosts';
import { keyStringify } from '@base/utils/helpers';
import { gql } from 'graphql-request';
import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
export interface IdName {
  id: string;
  name: string;
}
export interface IStatus {
  keyName: string;
  languageKey: string;
}
export interface IDeskTag {
  id: string;
  name?: string;
  active?: boolean;
  order?: number;
}
export interface ITicketCategory {
  id: string;
  name: string;
}
export interface Stage {
  id: string;
  name: string;
}
export interface ITicketCustomer {
  id: string;
  name: string;
}
export interface ITicketProduct {
  id: string;
  name: string;
}

export interface ITicketStatus {
  keyName: string;
  languageKey: string;
}
export interface ITicketPolicy {
  id: string;
  name: string;
}
export interface ITicketChannel {
  id: string;
  name: string;
}
export interface IDeskPriority {
  keyName: string;
  languageKey: string;
}
export interface TicketStatus {
  keyName: string;
  languageKey: string;
}
export interface ITicket {
  id: string;
  code: string;
  subject: string;
  category: ITicketCategory;
  customer: ITicketCustomer;
  contact?: ITicketCustomer;
  product: ITicketProduct;
  priority: IDeskPriority;
  status: TicketStatus;
  process?: IdName;
  channel?: ITicketChannel;
  duration?: number;
  durationUnit?: string;
  resolutionDue?: any;
  firstRespondDue?: any;
  tags?: IDeskTag[];
  content?: string;
  assignedGroup?: IdName;
  // assignedUser?: IAssignTo;
  // ccUsers?: IAssignTo[];
  // createdAt?: any;
  // createdBy?: User;
  // updatedAt?: any;
  // updatedBy?: User;
  // closedAt?: any;
  // closedBy?: User;
}
export const GET_TICKETS_AUTO_COMPLETE = gql`
  query q($filter: SearchFilter) {
    desk_tickets(filter: $filter) {
      results {
        id
        subject
      }
      paging {
        totalPage
        totalItems
        currentPage
        itemPerPage
      }
    }
  }
`;

export const useTicketAutoComplete = (params: any) => {
  const query = params?.filter?.query ?? '';
  let queryKey = ['desk_tickets', query];
  const response = usePost<BaseResponse<ITicket>>(queryKey, GET_TICKETS_AUTO_COMPLETE, params, {});
  return response;
};
