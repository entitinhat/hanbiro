import React from 'react';

//material
import { Box } from '@mui/material';

//project
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { LabelValue, ListType } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { MENU_SETTING } from '@base/config/menus';
import { FilterByOption, SortInput } from '@base/types/common';

//menu
import * as keyNames from '@settings/digital/cta/config/keyNames';
import { groupByOptions, dateByOptions, filterByOptions, sortByOptions } from '@settings/digital/cta/config/list-field';
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

const PageHeader = (props: HeaderProps) => {
  const { isSplitMode, category, onChange, columnsSettingProps, ...restProps } = props;

  //hook
  const pageDataKey = `${MENU_SETTING}_${category}`;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);

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

  // handler
  const handleGroupByChange = (value: LabelValue) => {
    // console.log('group by value: ', value.value);
    setFilter({ ...filterValues, groupBy: value.value });
  };

  const handleDateByChange = (value: LabelValue) => {
    // console.log('date by value: ', value);
    setFilter({ ...filterValues, dateBy: value });
  };

  const handleFilterByChange = (value: any) => {
    // console.log('filter by value: ', value);
    setFilter({ ...filterValues, filterBy: value });
  };

  const handleSearchTextChange = (value: string) => {
    setSearch({ [keyNames.KEY_SETTING_CTA_NAME]: value });
  };

  const handleSortByChange = (value: SortInput) => {
    //console.log('...handleSortByChange...', value);
    setSort(value);
  };

  return (
    <Box sx={{ height: 50 }}>
      <ListHeader
        isSmall={isSplitMode}
        groupByProps={{
          items: cusOptions(groupByOptions),
          selected: cusOptions(groupByOptions).find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0],
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
          value: searchValues?.[keyNames.KEY_SETTING_CTA_NAME] || '',
          onChange: handleSearchTextChange
        }}
        // columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default PageHeader;
