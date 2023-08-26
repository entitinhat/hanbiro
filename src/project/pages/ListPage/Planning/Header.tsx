import _ from 'lodash';

import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { MENU_PROCESS } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValue } from '@base/types/app';
import { dateByOptions, filterByOptions, groupByOptions } from '@project/config/list-field/options';
import { Box } from '@mui/material';

interface HeaderProps {
  category: string;
  isSplitMode: boolean;
  onRefresh: () => void;
}

const Header = (props: HeaderProps) => {
  console.log('listheader');
  const { category, isSplitMode, ...restProps } = props;
  const pageDataKey = `${MENU_PROCESS}_${category}`;
  const { filterValues, setFilter, searchValues, setSearch } = useListPageSettings(pageDataKey);

  const handleGroupByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, groupBy: value.value });
  };

  const handleDateByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, dateBy: value });
  };

  const handleFilterByChange = (item: LabelValue) => {
    setFilter({ ...filterValues, filterBy: item });
  };

  const cGroupByOptions = groupByOptions;
  const cDateByOptions = dateByOptions;
  const cFilterByOptions = filterByOptions;

  return (
    <Box sx={{ height: 50 }}>
      <ListHeader
        isSmall={isSplitMode}
        groupByProps={{
          items: cGroupByOptions,
          onChange: handleGroupByChange,
          selected: groupByOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0]
        }}
        dateByProps={{
          items: cDateByOptions,
          onChange: handleDateByChange,
          selected: filterValues?.dateBy
        }}
        filterByProps={{
          items: cFilterByOptions,
          onChange: handleFilterByChange,
          selected: filterValues?.filterBy
        }}
        searchByProps={{}}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
