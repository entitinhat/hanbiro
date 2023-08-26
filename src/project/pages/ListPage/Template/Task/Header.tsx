import _ from 'lodash';

import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { MENU_PROJECT_TEMPLATE } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValue } from '@base/types/app';
import { Box } from '@mui/material';
import { dateByOptions, filterByOptions } from '@project/config/list-field/options';

interface HeaderProps {
  category: string;
  onRefresh: () => void;
}

const Header = (props: HeaderProps) => {
  console.log('listheader');
  const { category, ...restProps } = props;
  const pageDataKey = `${MENU_PROJECT_TEMPLATE}_${category}`;
  const { filterValues, setFilter, searchValues, setSearch } = useListPageSettings(pageDataKey);

  const handleDateByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, dateBy: value });
  };

  const handleFilterByChange = (item: LabelValue) => {
    setFilter({ ...filterValues, filterBy: item });
  };

  const cDateByOptions = dateByOptions;
  const cFilterByOptions = filterByOptions;

  return (
    <Box sx={{ height: 50 }}>
      <ListHeader
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
