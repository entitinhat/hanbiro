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
import { MENU_SETTING_TICKET_FORM } from '@base/config/menus';
import { FilterByOption, SortInput } from '@base/types/common';

//menu
import { groupByOptions, dateByOptions, filterByOptions, sortByOptions } from '@settings/digital/ticket-form/config/list-field';
import { KEY_TICKET_FORM_NAME } from '@settings/digital/ticket-form/config/keyNames';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  //hook
  const pageDataKey = MENU_SETTING_TICKET_FORM;
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
    setSearch({ [KEY_TICKET_FORM_NAME]: value });
  };

  const handleSortByChange = (value: SortInput) => {
    //console.log('...handleSortByChange...', value);
    setSort(value);
  };

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
          value: searchValues?.[KEY_TICKET_FORM_NAME] || '',
          onChange: handleSearchTextChange
        }}
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
