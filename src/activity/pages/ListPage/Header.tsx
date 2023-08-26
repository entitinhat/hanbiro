import _ from 'lodash';
import React, { useMemo, useState } from 'react';

import {
  KEY_NAME_ACTIVITY_CALL_RESULT,
  KEY_NAME_ACTIVITY_CALL_TYPE,
  KEY_NAME_ACTIVITY_DIRECTION,
  KEY_NAME_ACTIVITY_DURATION,
  KEY_NAME_ACTIVITY_EDURATION,
  KEY_NAME_ACTIVITY_STATUS,
  KEY_NAME_ACTIVITY_SUBJECT
} from '@activity/config/keyNames';
import {
  dateByMyworkOptions,
  dateByOptions,
  filterByOptions,
  groupByMyworkOptions,
  groupByOptions,
  myWorkFilterByOptions,
  sortsByOptions
} from '@activity/config/list-field/options';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { MENU_ACTIVITY, MENU_MYWORK } from '@base/config/menus';
import { LabelValue, ListType } from '@base/types/app';
import { Box } from '@mui/material';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { FilterByOption, SortInput } from '@base/types/common';
import { useTranslation } from 'react-i18next';
import { DESC } from '@base/config/constant';

interface HeaderProps {
  listType: ListType;
  category: string;
  isSplitMode: boolean;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
}

const Header = (props: HeaderProps) => {
  console.log('listheader');
  const { category, isSplitMode, columnsSettingProps, listType, ...restProps } = props;
  const { t } = useTranslation();
  const pageDataKey = `${MENU_ACTIVITY}_${category}`;
  const { filterValues, setFilter, searchValues, setSearch, sort, setSort } = useListPageSettings(pageDataKey);

  const handleGroupByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, groupBy: value.value });
  };

  const handleDateByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, dateBy: value });
  };

  const handleFilterByChange = (item: LabelValue) => {
    setFilter({ ...filterValues, filterBy: item });
  };

  const handleSearchTextChange = (value: string) => {
    // const newItem: LabelValue = { value: 'subject', label: 'Subject', extra: { data: value } };
    // const itemChange = { group: 'filter', type: 'filterBy', item: newItem };
    // onChange && onChange(itemChange);
    setSearch({ [KEY_NAME_ACTIVITY_SUBJECT]: value });
  };

  const filterByMyworkOptions = myWorkFilterByOptions;

  const cGroupByOptions = category == MENU_MYWORK ? groupByMyworkOptions : groupByOptions;
  const cDateByOptions = category == MENU_MYWORK ? dateByMyworkOptions : dateByOptions;
  const cFilterByOptions = category == MENU_MYWORK ? filterByMyworkOptions : filterByOptions;
  const groupBySelected =
    category == MENU_MYWORK
      ? groupByMyworkOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByMyworkOptions[0]
      : groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0];

  // custom options
  const cusOptions = (options: LabelValue[] | FilterByOption[]) => {
    const nOptions: LabelValue[] | FilterByOption[] = options.map((item: LabelValue | FilterByOption) => {
      return {
        ...item,
        label: t(item.label)
      };
    });
    return nOptions;
  };

  const handleSortByChange = (value: SortInput) => {
    setSort(value);
  };

  return (
    <Box sx={{ height: 50 }}>
      <ListHeader
        isSmall={isSplitMode}
        listType={listType}
        groupByProps={{
          items: cGroupByOptions,
          onChange: handleGroupByChange,
          selected: groupBySelected
        }}
        dateByProps={{
          items: cusOptions(cDateByOptions),
          onChange: handleDateByChange,
          selected: filterValues?.dateBy
        }}
        filterByProps={{
          items: cFilterByOptions,
          onChange: handleFilterByChange,
          selected: filterValues?.filterBy
        }}
        searchByProps={{}}
        sortByProps={
          listType === ListType.GRID
            ? {
                items: sortsByOptions || [],
                selected: sort || ({ field: 'subject', orderBy: DESC } as SortInput),
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
