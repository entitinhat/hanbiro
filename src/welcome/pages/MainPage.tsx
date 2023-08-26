import React, { Suspense, useState } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useLanguageByMenu } from '@base/services/i18n'; //getLanguageByMenu
import { MENU_QUOTE } from '@base/config/menus';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { Helmet } from 'react-helmet-async';
import SplitView, { EmptySplitView, SplitViewContainer } from '@base/components/@hanbiro/SplitView';
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
import { navItems } from '@base/config/menuItems';
import UserPage from '@analytic/dashboard/pages/UserPage';
import IntroSteps from '@base/containers/IntroSteps';
import { BaseIntro } from '@base/containers/IntroSteps/configs/base-intro';
import { CloseCircleOutlined } from '@ant-design/icons';
import IntroContent from '@base/containers/IntroSteps/IntroContent';
import MainCard from '@base/components/App/MainCard';
import CloseIcon from '@mui/icons-material/Close';
import InstructionMenu from '@welcome/container/InstructionMenu';
import { WelComeMenuIntro } from '@welcome/config/constants';
import useDevice from '@base/hooks/useDevice';
import IntroManagement from '@welcome/container/IntroManagement';
import * as keyNames from '@base/containers/IntroSteps/configs/keyNames';
const WelcomePage = () => {
  const theme = useTheme();
  const { isMobile } = useDevice();
  const [keyIntro, setKeyIntro] = useState(keyNames.MAIN_MENU_INTRO);
  const [isOpen, setIsOpen] = useState(true);
  const handleSelectKeyIntro = (keyIntro: string) => {
    setKeyIntro(keyIntro);
    if (keyIntro !== '') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  return (
    <>
      {isMobile ? (
        <IntroManagement introGroupSteps={[keyNames.MAIN_MENU_INTRO, keyNames.SETTINGS_INTRO]} />
      ) : (
        <IntroSteps introKey={keyIntro} defaultOpen={isOpen} />
      )}

      <UserPage />
      {/* I use this to debug  */}
      {!isMobile && (
        <InstructionMenu
          onClickMenu={(keyIntro) => {
            handleSelectKeyIntro(keyIntro);
          }}
          introMenus={WelComeMenuIntro}
        />
      )}
    </>
  );
};

export default WelcomePage;
