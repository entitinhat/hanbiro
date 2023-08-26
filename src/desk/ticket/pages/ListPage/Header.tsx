import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { groupByOptions, dateByOptions, filterByOptions, sortByOptions } from '@desk/ticket/config/list-field/options';
import { LabelValue, ListType } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { MENU_DESK_TICKET } from '@base/config/menus';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import * as keyNames from '@desk/ticket/config/keyNames';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { FilterByOption, SortInput } from '@base/types/common';

interface HeaderProps {
  isSplitMode: boolean;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
  category: string;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, category, columnsSettingProps, ...restProps } = props;
  const pageDataKey = MENU_DESK_TICKET;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);
  const { t } = useTranslation();

  //init filter
  useEffect(() => {
    const curIdx = groupByOptions.findIndex((_ele: any) => _ele.value === filterValues?.groupBy);
    if (curIdx === -1) {
      setFilter({ ...filterValues, groupBy: groupByOptions[0]?.value });
    }
  }, [groupByOptions]);

  const handleGroupByChange = (item: LabelValue) => {
    setFilter({ ...filterValues, groupBy: item.value });
  };

  const handleDateByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, dateBy: value });
  };
  const handleFilterByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, filterBy: value });
  };

  const handleSearchTextChange = (value: string) => {
    setSearch({ [keyNames.KEY_TICKET_SUBJECT]: value });
  };

  const handleSortByChange = (value: SortInput) => {
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
          onChange: handleGroupByChange,
          selected: cusOptions(groupByOptions).find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0]
        }}
        dateByProps={{ items: cusOptions(dateByOptions), selected: filterValues?.dateBy, onChange: handleDateByChange }}
        filterByProps={{ items: cusOptions(filterByOptions), selected: filterValues?.filterBy, onChange: handleFilterByChange }}
        sortByProps={
          listType === ListType.GRID
            ? {
                items: cusOptions(sortByOptions),
                selected: sort || ({ field: 'createdAt', orderBy: 2 } as SortInput),
                onChange: handleSortByChange
              }
            : undefined
        }
        searchByProps={{ value: searchValues?.[keyNames.KEY_TICKET_SUBJECT] || '', onChange: handleSearchTextChange }}
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
