//third-party
import { useNavigate } from 'react-router-dom';

//material
import { Box, Stack, Typography, useTheme } from '@mui/material';

//project
import { ADMINISTRATION_MENU } from '@base/config/routeMenus';
import { slideToObject } from '@base/utils/helpers/arrayUtils';

interface HeaderProps {
  title: string;
  menu: string;
}

const Header = (props: HeaderProps) => {
  const { title, menu } = props;

  const theme = useTheme();
  const navigate = useNavigate();

  let menuOptions = slideToObject(ADMINISTRATION_MENU ?? [], 'value', 'label');

  // category change
  const handeMenuChange = (newMenu: string) => {
    let { path } = menuOptions?.find((item: any) => item.value == newMenu);
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: 40,
        p: 2,
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Stack direction="row" spacing={10} alignItems="center">
        {/* <MenuFilter listFilter={menuOptions} value={menu ?? ''} onChange={handeMenuChange} label={menu} /> */}
        {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
        <Typography variant="h4">{title}</Typography>
      </Stack>
    </Box>
  );
};

export default Header;
