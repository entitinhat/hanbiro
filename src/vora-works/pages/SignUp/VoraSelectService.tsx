import ToolBar from './ToolBar';
import { Box, styled, useTheme } from '@mui/material';
import SettingLanguage from './LanguageSetting';

import Services from './Services';
import useDevice from '@base/hooks/useDevice';
import { useLocation, useParams } from 'react-router-dom';


export default function VoraSelectService() {
  //?products=vora-desk+vora-iam&edition=free&language=en
  const theme = useTheme();
  const { isMobile } = useDevice();

  return (
    <>
      <ToolBar title={'Vora Works Sign-up'} center={true} />
      <SettingLanguage />
      <Services />
    </>
  );
}
