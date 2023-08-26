import React, { useEffect, useState } from 'react';

// mui import
import { Box } from '@mui/material';

// project import
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { LabelValue, ListType } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { MENU_PRODUCT_UNIT } from '@base/config/menus';
import { SortInput } from '@base/types/common';

// menu import
import { 
  groupByOptions, 
  dateByOptions, 
  filterByOptions, 
  sortsBy, 
  prodPerUnitFilterByOptions, 
  deletedUnitFilterByOptions 
} from '@product/unit/config/list-field';
import * as keyNames from '@product/unit/config/keyNames';
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
  const pageDataKey = MENU_PRODUCT_UNIT;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);
  const groupBy = filterValues?.groupBy;
  const groupByDelete = groupBy == 'deletedUnit';
  const groupByProdPerUnit = groupBy == 'prodPerUnit'

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
    setSearch({ [keyNames.KEY_UNIT_NAME]: value });
  };

  const handleSortByChange = (value: SortInput) => {
    setSort(value);
  };

  return (
    <Box>
      <ListHeader
        listType={listType}
        isSmall={isSplitMode}
        groupByProps={{
          items: groupByOptions,
          selected: groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0],
          onChange: handleGroupByChange
        }}
        dateByProps={
          groupByProdPerUnit ? undefined : //none dispay on groupBy 'Prod by Unit'
          {
          items: dateByOptions,
          selected: filterValues?.dateBy,
          onChange: handleDateByChange
          }
      }
        filterByProps={
          {
          items: groupByProdPerUnit ? prodPerUnitFilterByOptions : groupByDelete ? deletedUnitFilterByOptions : filterByOptions,
          selected: filterValues?.filterBy,
          onChange: handleFilterByChange
          }
      }
        searchByProps={
          groupByProdPerUnit ? undefined : //none dispay on groupBy 'Prod by Unit'
          {
          value: searchValues?.[keyNames.KEY_UNIT_NAME] || '',
          onChange: handleSearchTextChange
          }
      }
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
