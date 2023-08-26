import { graphQLGetsApi } from '@base/utils/axios/graphql';
import { gql } from 'graphql-request';
import usePosts from '@base/hooks/usePosts';
import { isObject } from 'lodash';
import { getListQuery } from '@base/utils/helpers/schema';

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

export const getList = async (menu = '', schemas = '', params: any = {}) => {
  const query = getListQuery(menu, schemas);
  const res = await graphQLGetsApi<any>(menu, query, params);
  return res;
};

export function useGetList<T>(menu: string, schemas: string, params?: any, initialData?: any) {
  const queryString = getListQuery(menu, schemas);
  const menuKey = [menu, keyStringify(params, '')];
  const filter = {
    filter: params
  };
  const res = usePosts<T>(menuKey, queryString, filter, {
    keepPreviousData: true,
    enabled: schemas != 'id',
    initialData: initialData ?? undefined
  });
  return res;
}
