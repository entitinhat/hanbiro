import usePublicPost from '@base/hooks/publics/usePublicPost';
import { SITE_TICKET_FORM_GET } from '@public-page/landingpage/services/graphql';
import { queryKeys } from '@public-page/landingpage/configs/queryKeys';

export const useTicketForm = (token: string, id: string) => {
  const queryKey: string[] = [queryKeys.ticketFormPublic, id, 'public'];
  const response: any = usePublicPost(
    queryKey,
    SITE_TICKET_FORM_GET,
    { id: id, token }, //token:...
    { enabled: id?.length > 0 }
  );
  return response;
};
