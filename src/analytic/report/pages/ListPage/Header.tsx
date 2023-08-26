import { Box } from '@mui/material';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { LabelValue } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { MENU_ANALYTIC_REPORT } from '@base/config/menus';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import * as keyNames from '@analytic/report/config/keyNames';
import { dateByOptions, filterByOptions, groupByOptions } from '@analytic/report/config/list-field/option';

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
  const pageDataKey = MENU_ANALYTIC_REPORT;
  const { filterValues, setFilter, searchValues, setSearch } = useListPageSetting(pageDataKey);
  const handleGroupByChange = (item: LabelValue) => {
    setFilter({ ...filterValues, groupBy: item.value });
  };

  const handleDateByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, dateBy: value });
  };
  const handleFilterByChange = (value: LabelValue) => {
    //console.log('filter by value', value);
    setFilter({ ...filterValues, filterBy: value });
  };

  const handleSearchTextChange = (value: string) => {
    setSearch({ [keyNames.REPORT_NAME]: value });
  };

  return (
    <Box sx={{ height: 55 }}>
      <ListHeader
        isSmall={isSplitMode}
        groupByProps={{
          items: groupByOptions,
          onChange: handleGroupByChange,
          selected: groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0]
        }}
        dateByProps={{ items: dateByOptions, onChange: handleDateByChange, selected: filterValues?.dateBy }}
        filterByProps={{ items: filterByOptions, selected: filterValues?.filterBy, onChange: handleFilterByChange }}
        searchByProps={{ value: searchValues?.[keyNames.REPORT_NAME] || '', onChange: handleSearchTextChange }}
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
