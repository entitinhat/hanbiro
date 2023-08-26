import { Box } from '@mui/material';
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { LabelValue } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { MENU_SETTING_ASSIGNMENT_REPORT } from '@base/config/menus';
import { groupByOptions } from '../../config/list-field/options';

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
  const pageDataKey = MENU_SETTING_ASSIGNMENT_REPORT
  const { filterValues, setFilter} = useListPageSetting(pageDataKey);
  const handleGroupByChange = (item: LabelValue) => {
    setFilter({ ...filterValues, groupBy: item.value });
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
        {...restProps}
      />
    </Box>
  );
};

export default Header;
