import usePost from '@base/hooks/usePost';
import { queryKeys } from '@product/item/config/queryKeys';
import { GET_BULK_CODE_NEXT_ID } from '../services/graphql';

interface ItemIdsProps {
  itemsLength: number;
  opts: any;
}

interface IResponseBulk {
  codes: any;
  setting: any;
}

export const useItemCodes = (props: ItemIdsProps) => {
  const { itemsLength, opts } = props;
  const codeParams = {
    menu: 'item',
    bulk: itemsLength
  };
  return usePost<IResponseBulk>([queryKeys.nextIdBulk, JSON.stringify(codeParams)], GET_BULK_CODE_NEXT_ID, codeParams, {
    ...opts
  });
};
