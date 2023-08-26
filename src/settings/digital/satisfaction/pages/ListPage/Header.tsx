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
import { MENU_SETTING_SATISFACTION_SURVEY } from '@base/config/menus';
import { SortInput } from '@base/types/common';

//menu
import { groupByOptions, dateByOptions, filterByOptions, sortByOptions } from '@settings/digital/satisfaction/config/list-field';
import { KEY_SATISFACTION_SURVEY_NAME } from '@settings/digital/satisfaction/config/keyNames';

interface HeaderProps {
  isSplitMode: boolean;
  category: string;
  moreMenuProps?: DropdownProps;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
  onRefresh: () => void;
  onChange?: (v: any) => void;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, category, onChange, columnsSettingProps, ...restProps } = props;

  //hook
  const pageDataKey = MENU_SETTING_SATISFACTION_SURVEY; //`${}_${category}`;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);

  const handleGroupByChange = (value: LabelValue) => {
    //console.log('group by value', value);
    setFilter({ ...filterValues, groupBy: value.value });
  };

  const handleDateByChange = (value: LabelValue) => {
    //console.log('date by value', value);
    setFilter({ ...filterValues, dateBy: value });
  };

  const handleFilterByChange = (value: LabelValue) => {
    //console.log('filter by value', value);
    setFilter({ ...filterValues, filterBy: value });
  };

  const handleSearchTextChange = (value: string) => {
    setSearch({ [KEY_SATISFACTION_SURVEY_NAME]: value });
  };

  const handleSortByChange = (value: SortInput) => {
    //console.log('...handleSortByChange...', value);
    setSort(value);
  };

  return (
    <Box sx={{ height: 55 }}>
      <ListHeader
        isSmall={isSplitMode}
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
        sortByProps={
          listType === ListType.GRID
            ? {
                items: sortByOptions,
                selected: sort || ({ field: 'createdAt', orderBy: 2 } as SortInput),
                onChange: handleSortByChange
              }
            : undefined
        }
        searchByProps={{
          value: searchValues?.[KEY_SATISFACTION_SURVEY_NAME] || '',
          onChange: handleSearchTextChange
        }}
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
