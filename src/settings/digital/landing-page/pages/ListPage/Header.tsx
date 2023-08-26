import React from 'react';
//material
import { Box } from '@mui/material';

//project
import { MENU_SETTING_LANDINGPAGE } from '@base/config/menus'
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { LabelValue, ListType } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { FilterByOption, SortInput } from '@base/types/common';

//menu
import {
  groupByCategoryOptions,
  dateByOptions,
  filterByCategoryOptions,
  sortByOptions
} from '@settings/digital/landing-page/config/list-field';
// import { CUSTOMER_CATEGORY_ALL } from '@settings/digital/landing-page/config/constants';
import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import { t } from 'i18next';

interface HeaderProps {
  isSplitMode: boolean;
  category: string; //'all' | 'account' | 'contact';
  moreMenuProps?: DropdownProps;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
  onRefresh: () => void;
  onChange?: (v: any) => void;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, category, onChange, columnsSettingProps, ...restProps } = props;

  //hook
  const pageDataKey = MENU_SETTING_LANDINGPAGE;
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
    setSearch({ [keyNames.KEY_NAME_LANDING_PAGE_NAME]: value });
  };

  const handleSortByChange = (value: SortInput) => {
    setSort(value);
  };

  // translate options
  const cusOptions = (options: LabelValue[] | FilterByOption[]) => {
    const nOptions: LabelValue[] | FilterByOption[] = options.map((item: LabelValue | FilterByOption) => {
      return {
        ...item,
        label: t(item.label)
      };
    });
    return nOptions;
  };

  //group by options by category

  // console.log('groupByCategoryOptions', groupByCategoryOptions)
  // console.log('category',category)
  // console.log('groupByCategoryOptions[category]',groupByCategoryOptions[category])

  // const groupByOptions =
  //   category && category !== 'all' && groupByCategoryOptions?.[category]
  //     ? [...groupByCategoryOptions[category], ...groupByCategoryOptions.all]
  //     : groupByCategoryOptions?.[category];

  // console.log('groupByOptions',groupByOptions)

  //filter by options by category
  const filterByOptions = filterByCategoryOptions?.[category]
    ? [...filterByCategoryOptions[category], ...filterByCategoryOptions.general]
    : filterByCategoryOptions.general;

  return (
    <Box sx={{ height: 50 }}>
      <ListHeader
        isSmall={isSplitMode}
        groupByProps={{
          items: cusOptions(groupByCategoryOptions),
          // selected: groupByOptions?.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions![0],
          selected: cusOptions(groupByCategoryOptions).find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByCategoryOptions[0],
          onChange: handleGroupByChange
        }}
        dateByProps={{
          items: cusOptions(dateByOptions),
          selected: filterValues?.dateBy,
          onChange: handleDateByChange
        }}
        filterByProps={{
          items: cusOptions(filterByOptions),
          selected: filterValues?.filterBy,
          onChange: handleFilterByChange
        }}
        sortByProps={
          listType === ListType.GRID
            ? {
              items: cusOptions(sortByOptions),
              selected: sort || ({ field: 'createdAt', orderBy: 2 } as SortInput),
              onChange: handleSortByChange
            }
            : undefined
        }
        searchByProps={{
          value: searchValues?.[keyNames.KEY_NAME_LANDING_PAGE_NAME] || '',
          onChange: handleSearchTextChange
        }}
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Header;