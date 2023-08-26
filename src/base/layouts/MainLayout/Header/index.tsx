import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import Logo from '@base/components/Logo';
import { headerFontColor, headerHeight } from '@base/config/config';
import { navItems } from '@base/config/menuItems';
import { CloseRounded, MenuRounded } from '@mui/icons-material';
import { alpha, AppBarProps, Box, IconButton, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';
import Search from './HeaderContent/Search';
import SearchBox from './HeaderContent/Search/SearchBox';
import { useRecoilValue } from 'recoil';
import { menuWithDrawerOpen } from '../../../store/selectors/app';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import useDevice from '@base/hooks/useDevice';
import { licenseMenuAtom } from '@base/store/atoms/licenseMenu';

interface Props {
  open: boolean;
  handleDrawerToggle?: () => void;
}

const Header = ({ open, handleDrawerToggle }: Props) => {
  const theme = useTheme();
  const drawerOpen = useRecoilValue(menuWithDrawerOpen);
  const licenseMenu = useRecoilValue(licenseMenuAtom);
  const { isMobile } = useDevice();
  const [openSearch, setSearchOpen] = useState(false);
  const searchToggle = () => {
    setSearchOpen((prevOpen) => !prevOpen);
  };

  const mainHeader: ReactNode = (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: theme.palette.mode == 'dark' ? theme.palette.background.paper : theme.palette.header,
        borderBottom: theme.palette.mode == 'dark' ? `1px solid ${theme.palette.divider}` : 'none'
      }}
    >
      {!openSearch ? (
        <Stack direction="row" spacing={1} alignItems="center">
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              size="small"
              sx={{
                borderRadius: '50%',
                color: 'grey.400',
                '&:hover': {
                  bgcolor:
                    theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.15) : alpha(theme.palette.primary.light, 0.15)
                }
              }}
            >
              {open ? <CloseRounded sx={{ fontSize: 20 }} /> : <MenuRounded sx={{ fontSize: 20 }} />}
            </IconButton>
          )}
          <Logo />
        </Stack>
      ) : (
        <div></div>
      )}

      {!isMobile && (
        <>
          {openSearch && <SearchBox searchToggle={searchToggle} />}
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="center">
            {!openSearch &&
              licenseMenu.mainMenu.map((v) => {
                return (
                  <RouteLink id={v.id} key={v.id} to={v.url!!} style={{ textDecoration: 'none' }}>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        color: headerFontColor,
                        '&:hover': {
                          color: 'grey.400',
                          borderRadius: 1,
                          bgcolor:
                            theme.palette.mode === 'dark'
                              ? alpha(theme.palette.primary.dark, 0.15)
                              : alpha(theme.palette.primary.light, 0.15)
                        }
                      }}
                    >
                      <Typography variant={'voraMenu'}>
                        <SpanLang keyLang={v.title as string} textOnly />
                      </Typography>
                    </Box>
                  </RouteLink>
                );
              })}
            <Search searchToggle={searchToggle} openSearch={openSearch} />
          </Stack>
        </>
      )}
      {!drawerOpen && !openSearch && <HeaderContent />}
    </Toolbar>
  );

  const appBar: AppBarProps = {
    // position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      zIndex: 1200, // 1299
      // top: 0,
      // left: 0,
      // right: 0,
      height: headerHeight
    }
  };

  return (
    <>
      <AppBarStyled open={open} {...appBar}>
        {mainHeader}
      </AppBarStyled>
    </>
  );
};

export default Header;
