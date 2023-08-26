import React, { useEffect } from 'react';

//material
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

//project base
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { LabelValue, ListType } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { MENU_CAMPAIGN } from '@base/config/menus';
import { FilterByOption, SortInput } from '@base/types/common';

//menu
import { groupByCategoryOptions, dateByOptions, filterByCategoryOptions, sortByOptions } from '@campaign/config/list-field';
import { CAMPAIGN_CATEGORY_ALL } from '@campaign/config/constants';
import * as keyNames from '@campaign/config/keyNames';

interface HeaderProps {
  isSplitMode: boolean;
  category: string; //'all' | 'email' | 'sms';
  checkedIds?: string[];
  moreMenuProps?: DropdownProps;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
  onRefresh: () => void;
  onChange?: (v: any) => void;
  onCancel?: () => void;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, category, columnsSettingProps, checkedIds, onCancel, onChange, ...restProps } = props;
  const { t } = useTranslation();

  //hook
  const pageDataKey = `${MENU_CAMPAIGN}_${category}`;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);
  const groupBy = filterValues?.groupBy;

  //group by options by category
  const groupByOptions =
    category && category !== CAMPAIGN_CATEGORY_ALL && groupByCategoryOptions?.[category]
      ? [...groupByCategoryOptions[category], ...groupByCategoryOptions.general]
      : groupByCategoryOptions?.[category];

  //filter by options by category
  const filterByOptions = filterByCategoryOptions?.[category]
    ? [...filterByCategoryOptions[category], ...filterByCategoryOptions.general]
    : filterByCategoryOptions.general;

  //init filter
  useEffect(() => {
    const curIdx = groupByOptions.findIndex((_ele: any) => _ele.value === filterValues?.groupBy);
    if (curIdx === -1) {
      setFilter({ ...filterValues, groupBy: groupByOptions[0].value });
    }
  }, [groupByOptions]);

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
    setSearch({ [keyNames.KEY_CAMPAIGN_NAME]: value });
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
    <Box sx={{ height: 55 }}>
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
          value: searchValues?.[keyNames.KEY_CAMPAIGN_NAME] || '',
          onChange: handleSearchTextChange
        }}
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
