import { useMemo } from 'react';

import useConfig from '@base/hooks/useConfig';
import { Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';

import Customization from './Customization';
import Localization from './Localization';
import Notification from './Notification';
import Profile from './Profile';
import HelpTooltip from './HelpTooltip';
import LanguageTranslation from '@base/containers/TranslatorEditor';

const HeaderContent = () => {
  const { i18n } = useConfig();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  // const localization = useMemo(() => <Localization />, [i18n]);
  const { enableTrans } = useConfig();
  console.log('re-render header content');

  return (
    <Stack direction="row" justifyContent="flex-end">
      {/* {!matchesSm && localization} */}
      <Notification />
      <Customization />
      {!matchDownMd && <HelpTooltip />}
      <Profile />
      {enableTrans && <LanguageTranslation enableTrans={enableTrans} />}
      {/* <LanguageTranslation enableTrans={true} /> */}
    </Stack>
  );
};

export default HeaderContent;
