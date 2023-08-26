import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { ListHeader } from '@base/components/@hanbiro/List';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValue } from '@base/types/app';
import { FilterByOption } from '@base/types/common';
import { Box, Stack, useTheme } from '@mui/material';
import { filterByOptions } from '@settings/users-groups/users/config/options';
import { useTranslation } from 'react-i18next';
import { Search } from '@mui/icons-material';
import { OutlinedInput } from '@mui/material';
import { Typography } from '@mui/material';

interface HeaderProps {
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
  allCheckingProps?: AllCheckingProps;
}
const Header = (props: HeaderProps) => {
  const { onRefresh, allCheckingProps, moreMenuProps } = props;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSettings('');
  const { t } = useTranslation();
  const theme = useTheme();

  const handleFilterByChange = (value: LabelValue) => {
    setFilter({ ...filterValues, filterBy: value });
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
      <Stack direction="row" spacing={0} sx={{ paddingLeft: '16px', alignItems: 'center' }}>
        <OutlinedInput
          sx={{
            bgcolor: theme.palette.grey[50],
            marginLeft: '10px',
            marginBottom: '12px',
            paddingRight: 0,
            height: '32px'
          }}
          placeholder="Enter name or email address"
          size="small"
          endAdornment={
            <Search
              sx={{
                // color: theme.palette.grey[500],
                width: '40px'
              }}
            />
          }
          // onChange={handleSearchQueryChange}
          // onKeyDown={handleKeyDown}
        />
        <ListHeader
          // searchByProps={{ value: '', onChange: (nValue: string) => {} }}
          onRefresh={onRefresh}
          allCheckingProps={allCheckingProps}
          filterByProps={{ items: cusOptions(filterByOptions), selected: filterValues?.filterBy, onChange: handleFilterByChange }}
          moreMenuProps={moreMenuProps}
        />
      </Stack>
    </Box>
  );
};

export default Header;
