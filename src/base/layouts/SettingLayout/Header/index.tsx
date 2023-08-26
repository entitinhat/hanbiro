import { useRef, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';

//project
import IconButton from '@base/components/@extended/IconButton';
import MenuLayout from '@base/components/@hanbiro/MenuLayout';
import { NavItemType } from '@base/types/menu';

//material
import { KeyboardArrowDown, SettingsOutlined } from '@mui/icons-material';
import { Box, ClickAwayListener, Grow, Paper, Popper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

//local
import { drawerWidth } from '@base/config/config';

interface HeaderProps {
  title: string;
  menus?: NavItemType[];
}

const Header = (props: HeaderProps) => {
  const { title, menus = [] } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const anchorRef = useRef<any>(null);
  //const [selectedItem, setSelectedItem] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  //close
  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: 50,
        p: 2,
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <SettingsOutlined fontSize="small" />
        <Typography variant="h4">{title}</Typography>
        {matchesMd && (
          <IconButton color={'secondary'} ref={anchorRef} onClick={handleToggle}>
            <KeyboardArrowDown />
          </IconButton>
        )}
      </Stack>
      {matchesMd && (
        <Popper
          placement={'bottom'} //matchesMd ? 'bottom' : placement
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [matchesMd ? -4 : 0, 4]
                }
              }
            ]
          }}
          sx={{ zIndex: 1310, width: '204px' }} //matchDownSM ? '204px' : drawerWidth
          onResize={undefined}
          onResizeCapture={undefined}
          //{...popperProps}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper sx={{ boxShadow: (t) => t.customShadows.z1 }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <Box>
                    <MenuLayout menuItems={menus} />
                  </Box>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </Box>
  );
};

export default Header;
