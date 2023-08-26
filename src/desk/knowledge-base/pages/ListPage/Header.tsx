import React, { useState } from 'react';
import { Box } from '@mui/material';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { groupByOptions, dateByOptions, filterByOptions } from '@desk/knowledge-base/config/list-field/options';
import { LabelValue, ListType } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { MENU_DESK_KNOWLEDGE } from '@base/config/menus';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import * as keyNames from '@desk/knowledge-base/config/keyNames';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';

interface HeaderProps {
  listType: ListType;
  isSplitMode: boolean;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
  onChange?: (v: any) => void;
  category: string;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, onChange, category, columnsSettingProps, listType, ...restProps } = props;
  const pageDataKey = MENU_DESK_KNOWLEDGE;
  const { filterValues, setFilter, searchValues, setSearch } = useListPageSetting(pageDataKey);

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
    setSearch({ [keyNames.KEY_KNOWLEDGE_BASE_SUBJECT]: value });
  };
  return (
    <Box sx={{ height: 55 }}>
      <ListHeader
        isSmall={isSplitMode}
        listType={listType}
        groupByProps={{
          items: groupByOptions,
          onChange: handleGroupByChange,
          selected: groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0],
          minWidth: 300
        }}
        dateByProps={{ items: dateByOptions, onChange: handleDateByChange, selected: filterValues?.dateBy }}
        filterByProps={{ items: filterByOptions, selected: filterValues?.filterBy, onChange: handleFilterByChange }}
        // columnsSettingProps={columnsSettingProps}
        searchByProps={{
          value: searchValues?.[keyNames.KEY_KNOWLEDGE_BASE_SUBJECT] || '',
          onChange: handleSearchTextChange
        }}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
