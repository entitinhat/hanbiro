import React, { useEffect } from 'react';

//material
import { Box } from '@mui/material';

//project
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { LabelValue, ListType } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { MENU_CUSTOMER } from '@base/config/menus';
import { FilterByOption, SortInput } from '@base/types/common';

//menu
import { groupByCategoryOptions, dateByOptions, filterByCategoryOptions, sortByOptions } from '@customer/config/list-field';
import { CUSTOMER_CATEGORY_ALL } from '@customer/config/constants';
import * as keyNames from '@customer/config/keyNames';
import { useTranslation } from 'react-i18next';

interface FilterProps {
  isSplitMode: boolean;
  category: string; //'all' | 'account' | 'contact';
  checkedIds?: string[];
  moreMenuProps?: DropdownProps;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
  onRefresh: () => void;
  onChange?: (v: any) => void;
  onCancel?: () => void;
}

const Filter = (props: FilterProps) => {
  const { isSplitMode, category, onChange, columnsSettingProps, ...restProps } = props;
  const { t } = useTranslation();

  //hook
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);
  //console.log('header filterValues', filterValues);

  //group by options by category: category && category !== CUSTOMER_CATEGORY_ALL &&
  const groupByOptions = groupByCategoryOptions?.[category]
    ? [...groupByCategoryOptions[category], ...groupByCategoryOptions.general]
    : groupByCategoryOptions?.[category];

  // console.log('groupByOptions: ', groupByOptions);
  // console.log('category: ', category);

  //filter by options by category
  const filterByOptions = filterByCategoryOptions?.[category]
    ? [...filterByCategoryOptions[category], ...filterByCategoryOptions.general]
    : filterByCategoryOptions.general;

  //init filter
  useEffect(() => {
    const curIdx = groupByOptions.findIndex((_ele: any) => _ele.value === filterValues?.groupBy);
    if (curIdx === -1) {
      setFilter({ ...filterValues, groupBy: groupByOptions[0]?.value });
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
    setSearch({ [keyNames.KEY_NAME_CUSTOMER_NAME]: value });
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

  // console.log('groupByOptions: ', groupByOptions);
  // console.log('dateByOptions: ', dateByOptions);
  // console.log('filterByOptions: ', filterByOptions);
  // console.log('sortByOptions: ', sortByOptions);

  return (
    <Box sx={{ height: 55 }}>
      <ListHeader
        isSmall={isSplitMode}
        listType={listType}
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
          value: searchValues?.[keyNames.KEY_NAME_CUSTOMER_NAME] || '',
          onChange: handleSearchTextChange
        }}
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Filter;
