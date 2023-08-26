import React, { useEffect } from 'react';

//third-aprty
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

//peoject base
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { MENU_QUOTE, MENU_SALES } from '@base/config/menus';
import { LabelValue, ListType } from '@base/types/app';
import { FilterByOption, SortInput } from '@base/types/common';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';

//menu
import { dateByOptions, filterByOptions, groupByOptions, sortByOptions } from '@quote/config/list-field/options';
import { KEY_NAME_QUOTE_NAME } from '@quote/config/keyNames';

interface FilterProps {
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

const Filter = (props: FilterProps) => {
  const { isSplitMode, category, columnsSettingProps, checkedIds, onCancel, onChange, ...restProps } = props;
  const pageDataKey = `${MENU_SALES}_${MENU_QUOTE}`;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);
  const { t } = useTranslation();

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
    setSearch({ [KEY_NAME_QUOTE_NAME]: value });
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
          value: searchValues?.[KEY_NAME_QUOTE_NAME] || '',
          onChange: handleSearchTextChange
        }}
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Filter;
