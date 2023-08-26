import { GET_SYSTEM_LANGUAGES } from '@base/services/graphql/translatorEditor';
import usePosts from '../usePosts';
import { queryKeys } from './queryKeys';

export const useTranslatorEditors = (keyword: any, menus?: string[], isTransKo?: boolean, paging?: any) => {
  const menusQuery: string = menus && menus[0] !== '' ? `menu=_in_[${menus}]` : '';
  const isTransKoQuery: string = isTransKo ? `ko=""` : '';
  let params: any = {
    filter: {
      query: `${menusQuery} ${isTransKoQuery} { langKey:"${keyword}" en:"${keyword}" }`,
      paging: paging
        ? paging
        : {
            size: 15,
            page: 1
          }
    }
  };
  const response: any = usePosts<any[]>(
    [queryKeys.systemLanguages, keyword], //query keys
    GET_SYSTEM_LANGUAGES,
    params,
    {
      keepPreviousData: true
    }
  );
  return response;
};
