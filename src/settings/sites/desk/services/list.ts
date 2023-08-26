import { graphQLGetsApi } from '@base/utils/axios/graphql';
import { gql } from 'graphql-request';
import usePosts from '@base/hooks/usePosts';
import { isObject } from 'lodash';

const keyStringify = (data: { [key: string]: any }, preKey: string): { [key: string]: any } => {
  let newData: { [key: string]: any } = {};

  for (const i in data) {
    if (isObject(data[i])) {
      newData = { ...newData, ...keyStringify(data[i], i) };
    } else {
      newData[preKey ? `${preKey}.${i}` : i] = data[i];
    }
  }

  return newData;
};

export const getQueryString = (menu: string, schemas: string) => {
  return gql`
    query q($filter: SearchFilter) {
      ${menu}(filter: $filter) {
        results {
          ${schemas}
        }
        paging {
          totalPage
          totalItems
          currentPage
        }
      }
    }
  `;
};

export const getList = async (menu = '', schemas = '', params: any = {}) => {
  const query = getQueryString(menu, schemas);
  const res = await graphQLGetsApi<any>(menu, query, params);
  return res;
};

export function useGetList<T>(menu: string, schemas: string, params?: any, initialData?: any) {
  const queryString = getQueryString(menu, schemas);
  const menuKey = [menu, keyStringify(params, '')];
  const filter = {
    filter: params,
  };
  const res = usePosts<T>(menuKey, queryString, filter, {
    keepPreviousData: true,
    enabled: schemas != 'id',
    initialData: initialData ?? undefined,
  });
  return res;
}
