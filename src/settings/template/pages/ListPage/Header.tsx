import React, { useState } from 'react';
import { Box } from '@mui/material';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { LabelValue } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';

import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';

import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { Template } from '@settings/template/types/template';

interface HeaderProps {
  isSplitMode: boolean;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
  onChange?: (v: any) => void;
  category: string;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
  groupTemplate: Template;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, onChange, category, columnsSettingProps, groupTemplate, ...restProps } = props;

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
          items: groupTemplate.groupByOptions,
          onChange: handleGroupByChange,
          selected:
            groupTemplate.groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupTemplate.groupByOptions[0]
        }}
        dateByProps={{ items: groupTemplate.dateByOptions, onChange: handleDateByChange, selected: filterValues?.dateBy }}
        filterByProps={{ items: groupTemplate.filterByOptions, selected: filterValues?.filterBy, onChange: handleFilterByChange }}
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
