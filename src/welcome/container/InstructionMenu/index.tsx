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
import { useIntroSetting } from '@base/hooks/user-setting/useIntroSetting';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookIcon from '@mui/icons-material/Book';
interface InstructionMenuProps {
  introMenus: IntroMenu[];
  onClickMenu: (introKey: string) => void;
}
const InstructionMenu = (props: InstructionMenuProps) => {
  const { onClickMenu, introMenus } = props;
  const theme = useTheme();
  const { introSetting, saveIntroSetting, isLoading } = useIntroSetting();
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [introMenu, setIntroMenus] = useState<string[]>([]);

  const handleClose = () => {
    setIsOpen(false);
  };
  const onReset = () => {
    saveIntroSetting([]);
  };

  useEffect(() => {
    if (introSetting) {
      const newMenu = JSON.parse(introSetting.value);
      setIntroMenus([...newMenu]);
    }
  }, [JSON.stringify(introSetting)]);

  const handleChange = (introKey: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? introKey : false);
    if (isExpanded) {
      onClickMenu(introKey);
    } else {
      onClickMenu('');
    }
  };

  const isDisabled = (introKey: string) => {
    return introMenu.includes(introKey);
  };

  return (
    <>
      <Snackbar
        sx={{ background: theme.palette.background.paper }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={isOpen}
        key={'bottom' + 'right'}
      >
        <Box>
          <Grid
            container
            spacing={1}
            justifyContent="flex-start"
            sx={{
              maxWidth: '240px',
              border: `1px solid ${theme.palette.divider}`,
              background: theme.palette.background.paper
            }}
          >
            <Grid padding={1} item xs={12}>
              <Grid container justifyContent="space-between">
                <Typography color="primary" variant="h5" fontWeight={700}>
                  <BookIcon color="primary" sx={{ fontSize: '16px' }} />
                  Tutorial
                </Typography>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
            {introMenus.map((menu) => {
              return (
                <Grid key={menu.introKey} padding={1} item xs={12}>
                  <Accordion
                    expanded={expanded === menu.introKey && !isDisabled(menu.introKey)}
                    onChange={handleChange(menu.introKey)}
                    disabled={isDisabled(menu.introKey)}
                    sx={{ border: 'none' }}
                  >
                    <AccordionSummary
                      sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Stack direction="row" justifyContent="space-between" alignContent="center">
                        <Typography fontWeight={700}>{menu.title}</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                      <MainCard
                        sx={{
                          p: 0,
                          '& .MuiCardContent-root': {
                            p: 1
                          }
                        }}
                        border={false}
                      >
                        <CardMedia component="img" height="auto" width="100%" style={{ maxWidth: '100%' }} image={menu.image} />
                        <CardContent>
                          <Typography>{menu.description}</Typography>
                        </CardContent>
                      </MainCard>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              );
            })}
            <Grid padding={1} item xs={12}>
              <Button size="small" onClick={onReset}>
                Reset Intro
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Snackbar>
    </>
  );
};

export default InstructionMenu;
