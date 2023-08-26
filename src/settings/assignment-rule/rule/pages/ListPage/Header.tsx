import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { groupByOptions, dateByOptions, filterByOptions } from '@settings/assignment-rule/rule/config/list-field/options';
import { LabelValue } from '@base/types/app';
import { pageDataByMenuAtom } from '@base/store/atoms';
import { useRecoilValue } from 'recoil';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { MENU_SETTING_ASSIGNMENT_RULE } from '@base/config/menus';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { KEY_NAME_ASSIGNMENT_RULE_NAME } from '../../config/keyNames';
import { Stack } from '@mui/material';
import { FilterByOption, SortInput } from '@base/types/common';
// import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
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
  // groupTemplate: Template;
}



const Header = (props: HeaderProps) => {
  const { isSplitMode, onChange, category, columnsSettingProps, ...restProps } = props;
  // const pageDataKey = MENU_SETTING_CTA;
  const pageDataKey = MENU_SETTING_ASSIGNMENT_RULE;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);
  const { t } = useTranslation();
  const [tab, setTab] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
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
    setSearch({ [KEY_NAME_ASSIGNMENT_RULE_NAME]: value });
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

  return (

    <Box>
      {/* <Tabs sx={{ borderBottom: "1px solid #F0F0F0", display: isSplitMode ? 'none' : '' }} value={tab} onChange={handleChangeTab} aria-label="disabled tabs example">
        <Tab label="Desk" />
        <Tab label="Opportynity" />
      </Tabs> */}

      <ListHeader
        isSmall={isSplitMode}
        groupByProps={isSplitMode ? {
          items: cusOptions(groupByOptions),
          selected: cusOptions(groupByOptions).find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0],
          onChange: handleGroupByChange
        } : undefined}
        dateByProps={isSplitMode ? {
          items: cusOptions(dateByOptions),
          selected: filterValues?.dateBy,
          onChange: handleDateByChange
        } : undefined}
        // dateByProps={{ items: dateByOptions, onChange: handleDateByChange, selected: filterValues?.dateBy }}
        filterByProps={isSplitMode ? {
          items: cusOptions(filterByOptions),
          selected: filterValues?.filterBy,
          onChange: handleFilterByChange
        } : undefined}

        searchByProps={{
          value: searchValues?.[KEY_NAME_ASSIGNMENT_RULE_NAME] || '',
          onChange: handleSearchTextChange
        }}

        // columnsSettingProps={columnsSettingProps}
        {...restProps}
      />

    </Box>
  );
};

export default Header;
