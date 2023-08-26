import { isUndefined, isObject, isBoolean, isArray } from 'lodash';
import { gql } from 'graphql-request';
import { SearchFilter } from '@base/types/app';

interface Query {
  queryKey: string[] | string;
  schemas: string;
  // params: any;
  // enabled?: boolean;
  // menuKey?: string[];
}

export const buildViewSchema = ({ sections, configFields = {}, ignore = [], hiddenSchemas = [] }: any) => {
  let schemas: string[] = [];
  if (sections) {
    schemas.push('id');
  }
  if (sections && !isUndefined(hiddenSchemas) && hiddenSchemas.length > 0) {
    schemas.push(...hiddenSchemas);
  }
  sections?.forEach((section: { children: any[] }) => {
    const childrenData = section?.children || [];
    childrenData.forEach((item: { keyName: string; permissionType: string }) => {
      // console.log('item?.keyName', item?.keyName);
      const { schema } = configFields?.[item?.keyName] || {};
      if (
        ignore.indexOf(item?.keyName) == -1 &&
        !(item?.permissionType && item?.permissionType == 'custom') // TODO enabled custom field
      ) {
        schemas.push(schema || schema == '' ? schema : item?.keyName);
      }
    });
  });

  return schemas.join('\n');
};

export const buildListSchema = ({ fields, configFields = {}, ignore = [], customSchema = '' }: any) => {
  let schemas: string[] = ignore && ignore.includes('id') ? [] : ['id'];
  fields &&
    fields.forEach((item: { keyName: string; permissionType: string }) => {
      const { schema } = configFields?.[item?.keyName] || {};
      if (ignore.indexOf(item?.keyName) == -1) {
        if (item?.permissionType && item?.permissionType == 'custom') {
          //schemas.push(item?.keyName);
        } else {
          schemas.push(schema || schema == '' ? schema : item?.keyName);
        }
      }
    });

  if (customSchema != '') {
    return [schemas.join('\n'), customSchema].join('\n');
  } else {
    return schemas.join('\n');
  }
};

export const keyStringify = (data: { [key: string]: any }, preKey: string): { [key: string]: any } => {
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

export const getListQuery = (menu: string, schemas: string) => {
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
          itemPerPage
        }
      }
    }
  `;
};

export const getDeleteListQuery = (listQueryKey: string, menuKey: string, schemas: string) => {
  return gql`
    query q($filter: SearchFilter) {
      ${listQueryKey}(filter: $filter) {
        results {
          ${menuKey} {
            ${schemas}
          }
          id
          title
          aggId
          aggType
          restored
          createdBy {
            id
            name
            fullName
          }
          createdAt
          deletedBy {
            id
            name
            fullName
          }
          deletedAt
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

export const getViewQuery = (props: Pick<Query, 'queryKey' | 'schemas'>) => {
  const { queryKey, schemas } = props;
  const key = isArray(queryKey) ? queryKey[0] : queryKey;

  return gql`
    query q($id: String!) {
      ${key}(id: $id) {
        ${schemas}
      }
    }
  `;
};

/**
 *
 * @param queryValue object
 * format input: { queryKey: { value: string, operator: ':' | '=' } }
 * @returns query string
 */
export const generateFilterQuery = (queryValue: any): string => {
  let strQuery = '';
  //console.log('queryValue', queryValue);
  Object.keys(queryValue).map((_key: string) => {
    //multi condition or single condition
    if (queryValue[_key]?.criteria?.length > 0) {
      //multi condition
      if (queryValue[_key].criteria.length === 1) {
        //ONE: only AND
        const operator = queryValue[_key].criteria[0].operator;
        const value = queryValue[_key].criteria[0].value;
        const qryValue = Number.isInteger(value) ? value : `"${value}"`;
        strQuery += ` ${_key}${operator}${qryValue}`;
      } else {
        //MANY: check OR or AND
        strQuery += queryValue[_key].condition === 'AND' ? ' (' : ' {'; //start statement
        queryValue[_key].criteria.map((_ele: any, index: number) => {
          const operator = _ele?.operator;
          const value = _ele?.value;
          const qryValue = Number.isInteger(value) ? value : `"${value}"`;
          if (index > 0) strQuery += ' ';
          strQuery += ` ${_key}${operator}${qryValue}`;
        });
        strQuery += queryValue[_key].condition === 'AND' ? ')' : '}'; //end statement
      }
    } else {
      //single condition: AND
      const operator = queryValue[_key]?.operator || '=';
      const value = queryValue[_key]?.value || '';
      //&& value !== 'deletedAccount'
      if (value) {
        const qryValue = Number.isInteger(value) || isBoolean(value) ? value : `"${value}"`;
        strQuery += ` ${_key}${operator}${qryValue} `;
      }
    }
  });
  return strQuery;
};

/**
 *
 * @returns
 */
export function parseGroupFilterByToQuery(filterValues: any): string {
  let queries: string[] = [];
  Object.keys(filterValues).map((key) => {
    const value = filterValues[key];
    if (value) {
      switch (key) {
        case 'groupBy':
          queries.push(`${key}="${value}"`);
          break;
        case 'filterBy':
          if (Array.isArray(value)) {
            value.map((_ele: any) => {
              if (Array.isArray(_ele.data)) {
                if (_ele.data.length > 1) {
                  queries.push(`${_ele.value}>=${_ele.data[0]}`);
                  queries.push(`${_ele.value}<=${_ele.data[1]}`);
                }
              } else {
                queries.push(`${_ele.value}="${_ele.data}"`);
              }
            });
          }
          break;
        case 'dateBy':
          queries.push(`${value.value}>="${value?.data?.start}"`);
          queries.push(`${value.value}<="${value?.data?.end}"`);
          break;
      }
    }
  });

  let queryString = '';
  if (queries?.length) {
    queryString = `${queries.join(' ')}`;
  }
  // console.log('queryString', queryString);
  return queryString;
}

export function parseSearchFieldToQuery(searchValues: any): string {
  let queries: string[] = [];
  Object.keys(searchValues).map((key) => {
    const value = searchValues[key];
    if (value) {
      queries.push(`${key}:\"${value}\"`);
    }
  });

  let queryString = '';
  if (queries?.length) {
    queryString = `${queries.join(' ')}`;
  }
  // console.log('queryString', queryString);
  return queryString;
}

export function parseExtraParamsToQuery(extraParams: any[]): string {
  let queries: string[] = [];
  if (Array.isArray(extraParams)) {
    extraParams.map((_ele: any) => {
      queries.push(`${_ele.value}="${_ele.data}"`);
    });
  }
  let queryString = '';
  if (queries?.length) {
    queryString = `${queries.join(' ')}`;
  }
  return queryString;
}

export const RESTORE_SCHEMA = `restore {
  id
  aggId
  aggType
  deletedAt
  deletedBy {
    id
    name
  }
}`;
