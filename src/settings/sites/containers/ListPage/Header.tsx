import React, { useState } from 'react';
import { Box } from '@mui/material';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { LabelValue } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { MENU_DESK_KNOWLEDGE, MENU_SETTING_SITE_DESK } from '@base/config/menus';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import * as keyNames from '@desk/knowledge-base/config/keyNames';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { Site } from '@settings/sites/types/site';

interface HeaderProps {
  isSplitMode: boolean;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
  onChange?: (v: any) => void;
  category: string;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
  groupSite: Site;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, onChange, category, columnsSettingProps, groupSite, ...restProps } = props;

  const { filterValues, setFilter, searchValues, setSearch } = useListPageSetting(category);

  const handleGroupByChange = (item: LabelValue) => {
    setFilter({ ...filterValues, groupBy: item.value });
  };

  const handleDateByChange = (item: LabelValue) => {
    // onChange && onChange(itemChange);
    setFilter({ ...filterValues, dateBy: item });
  };
  const handleFilterByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, filterBy: value });
  };
  const handleSearchTextChange = (value: string) => {
    setSearch({ name: value });
  };
  return (
    <Box sx={{ height: 55 }}>
      <ListHeader
        isSmall={isSplitMode}
        groupByProps={{
          items: groupSite.groupByOptions,
          onChange: handleGroupByChange,
          selected: groupSite.groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupSite.groupByOptions[0]
        }}
        dateByProps={{ items: groupSite.dateByOptions, onChange: handleDateByChange, selected: filterValues?.dateBy }}
        filterByProps={{ items: groupSite.filterByOptions, selected: filterValues?.filterBy, onChange: handleFilterByChange }}
        searchByProps={{
          value: searchValues?.name || '',
          onChange: handleSearchTextChange
        }}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
