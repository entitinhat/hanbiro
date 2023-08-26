import './i18nInit';

import Locales from '@base/components/App/Locales';
// import RTLLayout from '@base/components/RTLLayout';
import ScrollTop from '@base/components/App/ScrollTop';
// auth provider
import { VoraAuthProvider as AuthProvider } from '@base/containers/Auth/VoraAuthContext'; //TODO
import Routes from '@base/routes';
// import { useMediaQuery, useTheme } from '@mui/material';
import useDevice from '@base/hooks/useDevice';

interface MainProps {}

function Main({}: MainProps) {
  // const theme = useTheme();
  // const matchesXl = useMediaQuery(theme.breakpoints.down('xl'));
  // const matchesLg = useMediaQuery(theme.breakpoints.down('lg'));
  // const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  // const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  // const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  // console.log('%cmatches Query', 'color: red', matchesXl, matchesLg, matchesMd, matchesSm, matchesXs);

  const { isMobile, isDesktop } = useDevice();
  console.log('%cmatches Query', 'color: red', 'isMobile', isMobile, 'isDesktop', isDesktop);

  return (
    <>
      {/* <RTLLayout> */}
      <Locales>
        <ScrollTop>
          <AuthProvider>
            <>
              <Routes />
            </>
          </AuthProvider>
        </ScrollTop>
      </Locales>
      {/* </RTLLayout> */}
    </>
  );
}

export default Main;
