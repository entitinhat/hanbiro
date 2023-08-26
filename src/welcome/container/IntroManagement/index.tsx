import React, { Suspense, useEffect, useState } from 'react';
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
import CircularProgressWithLabel from '@welcome/components/CircularProgressWithLabel';
import { stepsIntros } from '@base/containers/IntroSteps/configs';
import { IntroMenu } from '@base/containers/IntroSteps/types';

interface IntroManagementProps {
  introGroupSteps: string[]; //step 1 (Scenario 1) -> step 2 (Scenario 2) -> step 3 (Scenario 3) -> step 4 (Scenario 4)
}
const IntroManagement = (props: IntroManagementProps) => {
  const { introGroupSteps } = props;
  const [keyIntro, setKeyIntro] = useState<string>('');
  
  useEffect(() => {
    setKeyIntro(introGroupSteps[0]);
  }, [JSON.stringify(introGroupSteps)]);

  const handleChangeKey = (introKey: string) => {
    const currentIndex = introGroupSteps.findIndex((step) => step === introKey);
    if (currentIndex !== -1) {
      const nextIndex = currentIndex + 1;
      const lastIndex = introGroupSteps.length - 1;
      if (nextIndex <= lastIndex) {
        setKeyIntro(introGroupSteps[nextIndex]);
      }
    }
  };
  return (
    <>
      <IntroSteps onSkip={handleChangeKey} introKey={keyIntro} defaultOpen={true} />
    </>
  );
};

export default IntroManagement;
