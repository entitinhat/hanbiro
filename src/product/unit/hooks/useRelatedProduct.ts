import { queryKeys } from '@product/unit/config/queryKeys';
import { IdName, PaginateInput } from '@base/types/common';
import usePosts from '@base/hooks/usePosts';
import { PRODUCT_UNIT_RELATED_PRODUCT } from '../services/graphql';
import { UnitValue } from '../types/unit';
import { DESC } from '@base/config/constant';

interface Props {
    id: string
    keyword?: string;
    paging?: PaginateInput;
}

export const useRelatedProduct = ({ id, keyword, paging }: Props) => {
    let query = '';
    if (keyword) {
    query += `name:\"${keyword}\"`;
    }

    let queryKey = [queryKeys.unitRelatedProducts, query, paging];
    const response = usePosts<UnitValue[]>(
        [ ...queryKey, id],
        PRODUCT_UNIT_RELATED_PRODUCT,
        {
            id: id,
            filter: {
                query,
                paging
            }
        }
    );
    return response;
};
