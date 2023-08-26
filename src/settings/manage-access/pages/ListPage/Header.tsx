import React, { useState } from 'react';
import { Box } from '@mui/material';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { groupByOptions, dateByOptions, filterByOptions } from '@desk/ticket/config/list-field/options';
import { LabelValue } from '@base/types/app';
import { pageDataByMenuAtom } from '@base/store/atoms';
import { useRecoilValue } from 'recoil';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';

interface HeaderProps {
  isSplitMode: boolean;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
  onChange?: (v: any) => void;
  category: string;
  columnsSettingProps?: ColumnsSettingProps;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, onChange, category, columnsSettingProps, ...restProps } = props;

  return (
    <Box sx={{ height: 58 }}>
      {/* <ListHeader
        isSmall={isSplitMode}
        groupByProps={{
          items: groupByOptions,
          onChange: groupByOnChange,
          selected: selectedGroup
        }}
        dateByProps={{ items: dateByOptions, onChange: dateByOnChange, selected: selectedDate }}
        filterByProps={{ items: filterByOptions }}
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      /> */}
    </Box>
  );
};

export default Header;
