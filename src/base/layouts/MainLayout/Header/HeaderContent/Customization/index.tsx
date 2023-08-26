import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { HighlightOutlined, LayoutOutlined, SettingOutlined, TranslationOutlined } from '@ant-design/icons';
import MainCard from '@base/components/App/MainCard';
import Logo from '@base/components/Logo';
import SimpleBar from '@base/components/third-party/SimpleBar';
import { headerHeight } from '@base/config/config';
import useConfig from '@base/hooks/useConfig';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Switch,
  Tooltip,
  Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import ColorScheme from './ColorScheme';
import ThemeMode from './ThemeMode';
import { useRecoilState, useRecoilValue } from 'recoil';
import { menuWithDrawerOpen } from '@base/store/selectors/app';
import { I18n } from '@base/types/config';
import { LANGUAGES } from '@base/config/constant';
import { LanguageValue } from '@base/types/app';
import LangSelect from '@base/components/@hanbiro/LangSelect';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import IntroSteps from '@base/containers/IntroSteps';
import useDevice from '@base/hooks/useDevice';
import { OpenInNew } from '@mui/icons-material';
import { licenseMenuAtom } from '@base/store/atoms/licenseMenu';

const Customization = () => {
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = useRecoilState(menuWithDrawerOpen);
  const { i18n: userLang, mode, presetColor, enableTrans, onLanguageTranslator, onChangeLocalization } = useConfig();
  const licenseMenu = useRecoilValue(licenseMenuAtom);
  const avaiLanguages: any[] = LANGUAGES;
  const found: any = avaiLanguages.find((_ele: any) => _ele.value === userLang);
  const [selectedLang, setSelectedLang] = useState<any>(found ?? { value: 'en', label: 'English' });
  const { isMobile } = useDevice();
  // translator
  // const [enableTranslator, setEnableTranslator] = useState<boolean>(enableTrans);
  const handleChangeModeTranslator = () => {
    // setEnableTranslator(!enableTranslator);
    onLanguageTranslator(!enableTrans);
  };
  // TODO
  const themeMode = useMemo(() => <ThemeMode />, [mode]);
  const themeColor = useMemo(() => <ColorScheme />, [presetColor]);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = () => {
    setDrawerOpen(false);
  };

  const LogoHeader = useMemo(() => <Logo />, []);

  return (
    <>
      <Box sx={{ flexShrink: 0 }}>
        <Tooltip title="Settings">
          <IconButton
            id="settings"
            sx={{
              borderRadius: '50%',
              color: 'grey.400',
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.15) : alpha(theme.palette.primary.light, 0.15)
              }
            }}
            onClick={handleToggle}
            aria-label="settings toggler"
          >
            <SettingOutlined />
          </IconButton>
        </Tooltip>
      </Box>
      <Drawer
        // sx={{
        //   zIndex: 2001
        // }}
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 280
          }
        }}
      >
        {open && (
          <MainCard
            title={LogoHeader}
            sx={{
              border: 'none',
              borderRadius: 0,
              height: '100vh',
              '& .MuiCardHeader-root': {
                color: 'background.paper',
                minHeight: headerHeight,
                py: 1,
                px: 3,
                bgcolor: 'primary.main'
              }
            }}
            content={false}
          >
            <SimpleBar
              sx={{
                '& .simplebar-content': {
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              <Box
                sx={{
                  height: 'calc(100vh - 64px)',
                  '& .MuiAccordion-root': {
                    borderColor: theme.palette.divider,
                    '& .MuiAccordionSummary-root': {
                      bgcolor: 'transparent',
                      flexDirection: 'row',
                      pl: 1
                    },
                    '& .MuiAccordionDetails-root': {
                      border: 'none'
                    },
                    '& .Mui-expanded': {
                      color: theme.palette.primary.main
                    }
                  }
                }}
              >
                {licenseMenu.settingMenu.map((menu) => {
                  const childMenus = menu.children;
                  return (
                    <Accordion key={menu.license} defaultExpanded sx={{ borderTop: 'none' }}>
                      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <IconButton
                            disableRipple
                            color="primary"
                            sx={{ bgcolor: 'primary.lighter' }}
                            onClick={handleToggle}
                            aria-label="settings toggler"
                          >
                            <LayoutOutlined />
                          </IconButton>
                          <Stack>
                            <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'uppercase' }}>
                              {/* <SpanLang keyLang="ncrm_common_admin_setting" /> */}
                              <SpanLang keyLang={menu.title as string} />
                            </Typography>
                          </Stack>
                        </Stack>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List sx={{ p: 0 }}>
                          {childMenus &&
                            childMenus.map((_m) => {
                              return (
                                <ListItem key={_m.id} id={_m.id} disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <LayoutOutlined />
                                    </ListItemIcon>
                                    {/* <ListItemText primary="Assignment Rule" /> */}
                                    <Typography
                                      component={Link}
                                      variant="subtitle1"
                                      color="textPrimary"
                                      to={_m.url as string}
                                      sx={{ textDecoration: 'none' }}
                                      onClick={handleMenuClick}
                                    >
                                      {/* <SpanLang keyLang="ncrm_common_admin_menu_general" /> */}
                                      <SpanLang keyLang={_m.title as string} />
                                    </Typography>
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}

                {/* admin setting */}
                {/* <Accordion defaultExpanded sx={{ borderTop: 'none' }}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <IconButton
                        disableRipple
                        color="primary"
                        sx={{ bgcolor: 'primary.lighter' }}
                        onClick={handleToggle}
                        aria-label="settings toggler"
                      >
                        <LayoutOutlined />
                      </IconButton>
                      <Stack>
                        <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'uppercase' }}>
                          <SpanLang keyLang="ncrm_common_admin_setting" />
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List sx={{ p: 0 }}>
                      <ListItem id="admin-general" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon> */}
                {/* <ListItemText primary="Assignment Rule" /> */}
                {/* <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/settings/general`}
                            sx={{ textDecoration: 'none' }}
                            onClick={handleMenuClick}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_general" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-preferences" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon> */}
                {/* <ListItemText primary="Sample" /> */}
                {/* <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/settings/preferences`}
                            sx={{ textDecoration: 'none' }}
                            onClick={handleMenuClick}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_preferences" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-templates" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon> */}
                {/* <ListItemText primary="Sample" /> */}
                {/* <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/settings/template/email`}
                            sx={{ textDecoration: 'none' }}
                            onClick={handleMenuClick}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_templates" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-baselayout" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon>
                          <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            sx={{ textDecoration: 'none' }}
                            to={`/customer`}
                            onClick={handleMenuClick}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_page_layout" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-site" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon>
                          <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/settings/sites/desk`}
                            sx={{ textDecoration: 'none' }}
                            onClick={handleMenuClick}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_site" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-online-digital" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon>
                          <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/settings/digital`}
                            sx={{ textDecoration: 'none' }}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_online_digital" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-bill-license" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon>
                          <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/customer`}
                            sx={{ textDecoration: 'none' }}
                            onClick={handleMenuClick}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_bill_license" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-users-groups" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon>
                          <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/settings/manage-users-groups`}
                            sx={{ textDecoration: 'none' }}
                            onClick={handleMenuClick}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_manage_users_groups" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-manage-access" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon>
                          <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/settings/manage-access`}
                            sx={{ textDecoration: 'none' }}
                            onClick={handleMenuClick}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_manage_access" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion> */}
                {/* rules/tools/process */}
                {/* <Accordion defaultExpanded>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <IconButton
                        disableRipple
                        color="primary"
                        sx={{ bgcolor: 'primary.lighter' }}
                        onClick={handleToggle}
                        aria-label="settings toggler"
                      >
                        <LayoutOutlined />
                      </IconButton>
                      <Stack>
                        <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'uppercase' }}>
                          <SpanLang keyLang="ncrm_common_admin_menu_rules_tools_process" />
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List sx={{ p: 0 }}>
                      <ListItem id="admin-assignment-rule" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon>
                          <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/settings/assignment/rule`}
                            sx={{ textDecoration: 'none' }}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_assignment_rule" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-business-process" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon>
                          <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/process/business`}
                            sx={{ textDecoration: 'none' }}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_business_process" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-auto-rule" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon>
                          <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/process/automation_rule`}
                            sx={{ textDecoration: 'none' }}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_auto_rule" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                      <ListItem id="admin-step-trigger-attribute" disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LayoutOutlined />
                          </ListItemIcon>
                          <Typography
                            component={Link}
                            variant="subtitle1"
                            color="textPrimary"
                            to={`/process/setting`}
                            sx={{ textDecoration: 'none' }}
                          >
                            <SpanLang keyLang="ncrm_common_admin_menu_step_trigger_attribute" />
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion> */}
                {/* Skin */}
                <Accordion defaultExpanded expanded>
                  <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                    sx={{
                      '& .MuiAccordionSummary-expandIconWrapper': {
                        display: 'none'
                      }
                    }}
                  >
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <IconButton
                        disableRipple
                        color="primary"
                        sx={{ bgcolor: 'primary.lighter' }}
                        onClick={handleToggle}
                        aria-label="settings toggler"
                      >
                        <HighlightOutlined />
                      </IconButton>
                      <Stack>
                        <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'uppercase' }}>
                          <SpanLang keyLang="ncrm_common_admin_skins" />
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          <SpanLang keyLang="ncrm_common_admin_skins_desc" />
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>{themeMode}</AccordionDetails>
                </Accordion>
                {/* translator editor process.env.NODE_ENV === 'development' && */}
                {
                  <Accordion defaultExpanded expanded>
                    <AccordionSummary
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                      sx={{
                        '& .MuiAccordionSummary-expandIconWrapper': {
                          display: 'none'
                        }
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <IconButton
                          disableRipple
                          color="primary"
                          sx={{ bgcolor: 'primary.lighter' }}
                          onClick={handleToggle}
                          aria-label="settings toggler"
                        >
                          <TranslationOutlined />
                        </IconButton>
                        <Stack>
                          <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'uppercase' }}>
                            <SpanLang keyLang="ncrm_common_admin_translation_editor" />
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            <SpanLang keyLang="ncrm_common_admin_translation_editor_desc" />
                          </Typography>
                        </Stack>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Switch checked={enableTrans} size="small" onChange={handleChangeModeTranslator} />
                      <List sx={{ p: 0 }}>
                        <ListItem id="admin-translator" disablePadding>
                          <ListItemButton sx={{ padding: '8px' }}>
                            <ListItemIcon>
                              <OpenInNew fontSize="small" color="primary" />
                            </ListItemIcon>
                            <Typography
                              component={Link}
                              variant="subtitle1"
                              color="textPrimary"
                              to={`/translator`}
                              sx={{ textDecoration: 'none' }}
                            >
                              <SpanLang keyLang="Go to Translator" />
                            </Typography>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                }
                {/* languages */}
                <Accordion defaultExpanded expanded>
                  <AccordionSummary
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                    sx={{
                      '& .MuiAccordionSummary-expandIconWrapper': {
                        display: 'none'
                      }
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <IconButton
                        disableRipple
                        color="primary"
                        sx={{ bgcolor: 'primary.lighter' }}
                        onClick={handleToggle}
                        aria-label="settings toggler"
                      >
                        <TranslationOutlined />
                      </IconButton>
                      <Stack>
                        <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'uppercase' }}>
                          <SpanLang keyLang="ncrm_common_primary_language" />
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          <SpanLang keyLang="ncrm_common_primary_language_desc" />
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* <Dropdown
                      sx={{ ml: 2 }}
                      title={selectedLang.label}
                      items={avaiLanguages}
                      disabledValues={[selectedLang.value]}
                      onChange={(selected: any) => {
                        setSelectedLang(selected);
                        onChangeLocalization(selected.value as I18n);
                      }}
                    /> */}
                    <LangSelect
                      value={selectedLang?.value ?? 'en'}
                      onChange={(nLang?: LanguageValue) => {
                        if (nLang) {
                          setSelectedLang(nLang as any);
                          onChangeLocalization(nLang?.value as I18n);
                        }
                      }}
                      disabledValues={[selectedLang.value]}
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </SimpleBar>
            {open && !isMobile && <IntroSteps introKey={'settings'} defaultOpen={open} />}
          </MainCard>
        )}
      </Drawer>
    </>
  );
};

export default Customization;
