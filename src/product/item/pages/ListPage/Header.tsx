import React, { useState } from 'react';

import { Box } from '@mui/material';

import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { groupByOptions, dateByOptions, filterByOptions, sortsBy } from '@product/item/config/list-field';
import { LabelValue, ListType } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { MENU_PRODUCT_ITEM } from '@base/config/menus';
import * as keyNames from '@product/item/config/keyNames';
import { SortInput } from '@base/types/common';
import { DESC } from '@base/config/constant';

interface HeaderProps {
  isSplitMode: boolean;
  onRefresh: () => void;
  onChange?: (v: any) => void;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, onChange, columnsSettingProps, ...restProps } = props;

  //hook
  const pageDataKey = MENU_PRODUCT_ITEM;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);

  const handleGroupByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, groupBy: value.value });
  };

  const handleDateByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, dateBy: value });
  };

  const handleFilterByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, filterBy: value });
  };

  const handleSearchTextChange = (value: string) => {
    setSearch({ [keyNames.KEY_ITEM_NAME]: value });
  };

  const handleSortByChange = (value: SortInput) => {
    setSort(value);
  };

  return (
    <Box>
      <ListHeader
        isSmall={isSplitMode}
        listType={listType}
        groupByProps={{
          items: groupByOptions,
          selected: groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0],
          onChange: handleGroupByChange
        }}
        dateByProps={{
          items: dateByOptions,
          selected: filterValues?.dateBy,
          onChange: handleDateByChange
        }}
        filterByProps={{
          items: filterByOptions,
          selected: filterValues?.filterBy,
          onChange: handleFilterByChange
        }}
        searchByProps={{
          value: searchValues?.[keyNames.KEY_ITEM_NAME] || '',
          onChange: handleSearchTextChange
        }}
        sortByProps={
          listType === ListType.GRID
            ? {
                items: sortsBy || [],
                selected: sort || ({ field: 'createdAt', orderBy: DESC } as SortInput),
                onChange: handleSortByChange
              }
            : undefined
        }
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
