import { Box } from '@mui/material';

import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { groupByOptions, dateByOptions, filterByOptions, sortsBy } from '@lead/config/list-field';
import { LabelValue, ListType } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { MENU_SALES, MENU_LEAD } from '@base/config/menus';
import * as keyNames from '@lead/config/keyNames';
import { SortInput } from '@base/types/common';
import { DESC } from '@base/config/constant';
import { isDeleteList } from './Helper';
import useDevice from '@base/hooks/useDevice';

interface HeaderProps {
  isSplitMode: boolean;
  onRefresh: () => void;
  onChange?: (v: any) => void;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
  checkedIds?: any;
  totalItem?: number;
  onCancel?: () => void;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, onChange, columnsSettingProps, checkedIds, totalItem, onCancel, ...restProps } = props;

  console.log('restProps', restProps);
  const { isMobile } = useDevice();

  //hook
  const pageDataKey = `${MENU_SALES}_${MENU_LEAD}`;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);
  const groupBy = filterValues?.groupBy;
  const isDeletedGroup = isDeleteList(groupBy);
  const isBottomHeader = groupBy == 'myGroupLead1' || groupBy == 'myGroupLead2' || groupBy == 'allDeleted1' || groupBy == 'allDeleted2';

  const handleGroupByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, groupBy: value.value });
  };

  const handleDateByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, dateBy: value });
  };

  const handleFilterByChange = (value: LabelValue) => {
    console.log('handleFilterByChange', value);

    setFilter({ ...filterValues, filterBy: value });
  };

  const handleSearchTextChange = (value: string) => {
    setSearch({ [keyNames.KEY_LEAD_CONTACT_NAME]: value, [keyNames.KEY_LEAD_COMPANY_NAME]: value, [keyNames.KEY_LEAD_TITLE]: value });
  };

  const handleSortByChange = (value: SortInput) => {
    setSort(value);
  };

  return (
    <Box>
      <ListHeader
        listType={listType}
        isSmall={isSplitMode}
        totalItem={totalItem}
        groupByProps={
          listType === ListType.GRID && !isMobile
            ? undefined
            : {
                items: groupByOptions,
                selected: groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0],
                onChange: handleGroupByChange
              }
          // {
          //   items: groupByOptions,
          //   selected: groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0],
          //   onChange: handleGroupByChange
          // }
        }
        dateByProps={
          listType === ListType.LIST
            ? {
                items: dateByOptions,
                selected: filterValues?.dateBy,
                onChange: handleDateByChange
              }
            : undefined
        }
        filterByProps={
          listType === ListType.LIST || listType === ListType.SPLIT
            ? {
                items: filterByOptions,
                selected: filterValues?.filterBy,
                onChange: handleFilterByChange,
                sx: {
                  '& .MuiList-root': {
                    minWidth: 320
                  }
                }
              }
            : undefined
        }
        searchByProps={{
          value: searchValues?.[keyNames.KEY_LEAD_CONTACT_NAME] || '',
          onChange: handleSearchTextChange
        }}
        sortByProps={
          listType === ListType.GRID
            ? {
                items: sortsBy || [],
                selected: sort || ({ field: 'createdAt', orderBy: DESC } as SortInput),
                onChange: handleSortByChange
              }
            : undefined
        }
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
