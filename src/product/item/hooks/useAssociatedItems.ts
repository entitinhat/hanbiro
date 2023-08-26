import { queryKeys } from '@product/item/config/queryKeys';
import usePost from '@base/hooks/usePost';
import { GET_ITEM_ASSOCIATED_ITEMS } from '../services/graphql';
import { Item } from '@product/item/types/item';

interface Props {
  menuSourceId: string;
}

export default ({ menuSourceId }: Props) => {
  let queryKey = [queryKeys.listAssociatedItem, 'associatedItems', menuSourceId];
  const response = usePost<Item>(queryKey, GET_ITEM_ASSOCIATED_ITEMS, { id: menuSourceId }, { enabled: menuSourceId != '' });
  return response;
};
