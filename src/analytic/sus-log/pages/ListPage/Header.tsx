import {Box} from '@mui/material';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import {DropdownProps} from '@base/components/@hanbiro/Dropdown';
import {LabelValue} from '@base/types/app';
import {ColumnsSettingProps} from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import {MENU_ANALYTIC_SUS_LOG} from '@base/config/menus';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import {AllCheckingProps} from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import * as keyNames from '@analytic/sus-log/config/keyNames';
import {dateByOptions, groupByOptions} from '@analytic/sus-log/config/list-field/option';

interface HeaderProps {
  isSplitMode: boolean;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
  category: string;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
}

const Header = (props: HeaderProps) => {
  const {isSplitMode, category, columnsSettingProps, ...restProps} = props;
  const {filterValues, setFilter, searchValues, setSearch} = useListPageSetting(MENU_ANALYTIC_SUS_LOG);
  const handleGroupByChange = (item: LabelValue) => {
    setFilter({...filterValues, groupBy: item.value});
  };

  const handleDateByChange = (value: LabelValue) => {
    setFilter({...filterValues, dateBy: value});
  };

  const handleSearchTextChange = (value: string) => {
    setSearch({[keyNames.SUS_LOG_URL]: value});
  };

  return (
    <Box sx={{height: 55}}>
      <ListHeader
        isSmall={isSplitMode}
        groupByProps={{
          items: groupByOptions,
          onChange: handleGroupByChange,
          selected: groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0]
        }}
        dateByProps={{items: dateByOptions, onChange: handleDateByChange, selected: filterValues?.dateBy}}
        searchByProps={{value: searchValues?.[keyNames.SUS_LOG_URL] || '', onChange: handleSearchTextChange}}
        columnsSettingProps={columnsSettingProps}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
