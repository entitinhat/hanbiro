import { queryKeys } from '@product/product/config/queryKeys';
import usePost from '@base/hooks/usePost';
import { Product } from '@product/product/types/product';
import { GET_PRODUCT_VENDOR } from '../services/graphql';

interface Props {
  menuSourceId: string;
}

export default ({ menuSourceId }: Props) => {
  let queryKey = [queryKeys.listRelatedVendor, 'vendor', menuSourceId];
  const response = usePost<Product>(queryKey, GET_PRODUCT_VENDOR, { id: menuSourceId });
  return response;
};
