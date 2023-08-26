import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

//third=party
import _, { isEqual } from 'lodash';
import { useRecoilState } from 'recoil';

//project
import useUserSettingMutation from './useUserSettingMutation';
import { useUserSetting } from '@base/services/settingService';
import { pageDataByMenuAtom } from '@base/store/atoms';
import { ListType, MenuData, SearchFilter } from '@base/types/app';
import { PageLayoutSectionField } from '@base/types/pagelayout';
import { UserSetting } from '@base/types/setting';
import { keyStringify, parseExtraParamsToQuery, parseGroupFilterByToQuery, parseSearchFieldToQuery } from '@base/utils/helpers/schema';
import { FilterInput, PaginateInput } from '@base/types/common';
import { LIST_TABLE_PAGE_SIZE } from '@base/config/constant';

let currentSetting: { [key: string]: MenuData | null } = {};
const useListPageSettings = (menu: string, filterQueryFn?: (filter?: SearchFilter) => string) => {
  //hook: get+save page config
  const [pageData, setPageData] = useRecoilState(pageDataByMenuAtom(menu));
  const { data, isLoading } = useUserSetting(menu, 'list', { enabled: menu.length > 0 });
  const { mUpdateUserSetting } = useUserSettingMutation();
  const initialLoad = useRef<boolean>(false);
  // const currentSetting = useRef<any>(null);

  //save to db
  const handleSave = (newSetting: MenuData) => {
    const menuSetting = currentSetting[menu] ?? null;
    if (!isEqual(newSetting, menuSetting)) {
      const param = {
        userSetting: {
          menu: menu,
          key: 'list',
          value: JSON.stringify(newSetting)
        }
      };
      mUpdateUserSetting.mutate(param);
      currentSetting[menu] = newSetting;
    }
  };
  const handleSaveDebounce = useCallback(_.debounce(handleSave, 5000), [pageData]);

  const handleViewingFields = (fields: PageLayoutSectionField[], settingColumns: PageLayoutSectionField[]): PageLayoutSectionField[] => {
    // is Viewing
    const viewingFields = fields.filter((_ele: PageLayoutSectionField) => {
      const settingVal = settingColumns?.find((sCol: PageLayoutSectionField) => sCol.keyName === _ele.keyName);
      if (settingVal) {
        return settingVal.isViewing; //isViewing
      }
      return _ele.isViewing;
    });
    // order field position
    let correctColumnsPosition = viewingFields;
    if (settingColumns.length > 0) {
      correctColumnsPosition = [];
      settingColumns.map((sCol: PageLayoutSectionField, idx: number) => {
        const viewingField = viewingFields?.find((vCol: PageLayoutSectionField) => sCol.keyName === vCol.keyName);
        if (viewingField) {
          correctColumnsPosition.push(viewingField);
        }
      });
      // checking remain columns
      viewingFields.map((sCol: PageLayoutSectionField) => {
        const field = correctColumnsPosition?.find((vCol: PageLayoutSectionField) => sCol.keyName === vCol.keyName);
        if (!field) {
          correctColumnsPosition.push(sCol);
        }
      });
    }
    // return
    return correctColumnsPosition;
  };
  //check and save
  useEffect(() => {
    // only save to db when load setting from db and new setting != current setting
    const menuSetting = currentSetting[menu] ?? null;
    if (pageData && initialLoad.current && !isEqual(pageData, menuSetting)) {
      // console.log(`useListPageSettings ${debugId} -> do Saving`, pageData);
      handleSaveDebounce(pageData);
    }
  }, [pageData]);
  // console.log(`useListPageSettings ${debugId}`, initialLoad, pageData);
  // init config from db
  useEffect(() => {
    if (data && !isLoading && !initialLoad.current) {
      const newData = data as UserSetting;
      // console.log(`useListPageSettings >>> load from db ${debugId}`, JSON.parse(newData.value));
      if (newData?.value && newData?.value != '' && pageData.settingColumns?.length === 0) {
        // parse value
        try {
          let newValue = JSON.parse(newData.value);
          // get list page 1, keyword: ""
          newValue = { ...newValue, filter: { ...newValue.filter, paging: { ...newValue.filter.paging, page: 1 } } };

          if (!isEqual(pageData, newValue)) {
            setPageData(newValue);
            initialLoad.current = true;
            currentSetting[menu] = newValue;
          }
        } catch (error: any) {
          console.log('parse error');
        }
      }
    }
    // in case the menu has no db setting
    if (!data && !isLoading && !initialLoad.current) {
      console.log('has no setting');
      initialLoad.current = true;
      // currentSetting = pageData;
      currentSetting[menu] = pageData;
    }
    () => {
      initialLoad.current = false;
      // currentSetting = null;
      currentSetting[menu] = null;
    };
  }, [menu, data]);

  //set header filder
  //newVal = {groupBy, DateBy, FilterBy}
  const setHeaderFilters = (newVal: any) => {
    if (newVal) {
      const newPageData = {
        ...pageData,
        filter: {
          ...pageData.filter,
          headerFilters: { ...newVal }
        }
      };
      setPageData(newPageData);
    }
  };

  //newVal: {}
  const setSearchFilters = (newVal: any) => {
    if (newVal) {
      const newPageData = {
        ...pageData,
        filter: {
          ...pageData.filter,
          searchFilters: { ...newVal }
        }
      };
      setPageData(newPageData);
    }
  };

  //newVal: {}
  const setHeaderSort = (newVal: any) => {
    if (newVal) {
      const newPageData = {
        ...pageData,
        filter: {
          ...pageData.filter,
          sort: { ...newVal }
        }
      };
      setPageData(newPageData);
    }
  };

  // newVal: {}
  const setExtraParams = (newVal: any) => {
    if (newVal) {
      const newPageData = {
        ...pageData,
        filter: {
          ...pageData.filter,
          extraParams: { ...newVal }
        }
      };
      setPageData(newPageData);
    }
  };

  //newVal: { page, size }
  const setListPaging = (newVal: PaginateInput) => {
    if (newVal) {
      const newPageData = {
        ...pageData,
        filter: {
          ...pageData.filter,
          paging: { ...newVal }
        }
      };
      setPageData(newPageData);
    }
  };

  //newVal: string
  const setFilterKeyword = (newVal: string) => {
    if (newVal) {
      const newPageData = {
        ...pageData,
        filter: {
          ...pageData.filter,
          keyword: newVal
        }
      };
      setPageData(newPageData);
    }
  };

  //newVal: ListType
  const setPageViewType = (newVal: ListType) => {
    if (newVal) {
      const newPageData = {
        ...pageData,
        isSplitMode: newVal === ListType.SPLIT,
        listType: newVal
      };
      setPageData(newPageData);
    }
  };

  //newVal: ColumnSetting[]
  const setPageColumns = (newVal: PageLayoutSectionField[]) => {
    if (newVal) {
      const newPageData = {
        ...pageData,
        settingColumns: newVal
      };
      setPageData(newPageData);
    }
  };

  //get query string for api
  const getFilterQuery = () => {
    let newQuery: string[] = [];
    if (pageData?.filter?.headerFilters) {
      newQuery.push(parseGroupFilterByToQuery(pageData?.filter?.headerFilters));
    }
    if (pageData?.filter?.searchFilters) {
      newQuery.push(parseSearchFieldToQuery(pageData?.filter?.searchFilters));
    }
    if (pageData?.filter?.extraParams) {
      newQuery.push(parseExtraParamsToQuery(pageData?.filter?.extraParams));
    }
    return newQuery.join(' ');
  };

  const filtersQuery: FilterInput = {
    keyword: pageData.filter?.keyword ?? '',
    sort: pageData.filter?.sort,
    paging: pageData.filter?.paging,
    query: filterQueryFn ? filterQueryFn(pageData.filter) : getFilterQuery()
  };

  return {
    isLoadingSetting: isLoading,
    getViewingFields: handleViewingFields,
    filterValues: pageData.filter?.headerFilters, //maybe undefined
    filterQuery: filtersQuery.query,
    filtersQuery: filtersQuery,
    listQueryKey: [keyStringify(filtersQuery, '')] as any[],
    setFilter: setHeaderFilters,
    searchValues: pageData.filter?.searchFilters,
    setSearch: setSearchFilters,
    sort: pageData.filter?.sort,
    setSort: setHeaderSort,
    paging: {
      size: pageData.filter?.paging?.size || LIST_TABLE_PAGE_SIZE,
      page: pageData.filter?.paging?.page || 1
    },
    setPaging: setListPaging,
    keyword: pageData.filter?.keyword,
    setKeyword: setFilterKeyword,
    listType: pageData.listType,
    setListType: setPageViewType,
    settingColumns: pageData.settingColumns,
    setSettingColumns: setPageColumns,
    extraParams: pageData.filter?.extraParams,
    setExtraParams: setExtraParams
  };
};

export default useListPageSettings;
