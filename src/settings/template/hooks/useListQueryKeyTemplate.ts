import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { authAtom } from '@base/store/atoms/auth';
import { FilterInput } from '@base/types/common';
import { keyStringify } from '@base/utils/helpers';
import { useRecoilState } from 'recoil';
import { USER_ID } from '../config/constants';
import { parseStringQuery } from '../utils/helper';

export function useListQueryKeyTemplate(menuSource: string, templateGroup: string) {
  const { filtersQuery, filterQuery } = useListPageSettings(menuSource);
  const [auth] = useRecoilState(authAtom);
  let filter: FilterInput = {
    ...filtersQuery,
    query: parseStringQuery([templateGroup, filterQuery].join(' '), auth?.user?.id ?? USER_ID)
  };

  const filterKey = keyStringify(filter, '');
  return filterKey;
}
