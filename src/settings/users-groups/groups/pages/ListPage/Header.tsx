import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { ListHeader } from '@base/components/@hanbiro/List';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { Box } from '@mui/material';

interface HeaderProps {
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
  allCheckingProps?: AllCheckingProps;
}
const Header = (props: HeaderProps) => {
  const { onRefresh, allCheckingProps, moreMenuProps } = props;
  return (
    <Box sx={{ height: 55 }}>
      <ListHeader
        searchByProps={{ value: '', onChange: (nValue: string) => {} }}
        onRefresh={onRefresh}
        allCheckingProps={allCheckingProps}
        moreMenuProps={moreMenuProps}
      />
    </Box>
  );
};

export default Header;
