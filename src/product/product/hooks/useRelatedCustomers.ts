import { customerQueryKeys } from '@customer/config/queryKeys';
import { IdName, PaginateInput } from '@base/types/common';
import usePosts from '@base/hooks/usePosts';
import { PRODUCT_RELATED_CUSTOMER } from '../services/graphql';
import { BaseMutationResponse, BaseMutationKeysResponse } from '@base/types/response';
import { Customer } from '@customer/types/interface';
import { DESC } from '@base/config/constant';

interface Props {
    id: string
    keyword?: string;
    paging?: PaginateInput;
}

export const useRelatedCustomers = ({ id, keyword, paging }: Props) => {
    let query = '';
    if (keyword) {
        query += ` name:\"${keyword}\"`;
    }
    if (id) {
        query += ` relatedProducts:\"${id}\"`;
    }

    let queryKey = [customerQueryKeys.customersGet, query, paging];
    const response = usePosts<any[]>(
        [ ...queryKey],
        PRODUCT_RELATED_CUSTOMER,
        {
            filter: {
                query,
                paging,
                sort: { field: 'createdAt', orderBy: DESC }
            }
        }
    );
    return response;
};
