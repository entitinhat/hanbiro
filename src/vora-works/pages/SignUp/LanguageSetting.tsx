import { authAtom } from '@sign-in/recoil/atoms/auth';
// import { Button, FormIcon } from '@base/components/form';

import { Alert, Box, ListItem, ListItemText, MenuItem, Stack, Typography } from '@mui/material';
import { QuestionCircleFilled } from '@ant-design/icons';
import MainCard from '@base/components/App/MainCard';
import { AlertTitle } from '@mui/material';
import Logo from '@base/components/Logo';
import { List } from '@mui/material';
import { SignUpLogoSetting } from '@vora-works/config/constants';
import { ListItemAvatar } from '@mui/material';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import HanPopper from '@base/components/@hanbiro/Popper';
import { LanguageValue } from '@base/types/app';
import { LANGUAGES } from '@base/config/constant';
import Flag from 'react-world-flags';
import { useState } from 'react';
import useDevice from '@base/hooks/useDevice';
import useConfig from '@base/hooks/useConfig';
import { I18n } from '@base/types/config';

interface LanguageSettingProps {}
function LanguageSetting(props: LanguageSettingProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { i18n: userLang, onChangeLocalization } = useConfig();
  const { isMobile } = useDevice();
  const handleClose = () => {
    setIsOpen(false);
  };
  const getCurrentLanguage = (code: I18n) => {
    const currentLanguage = LANGUAGES.find((lang) => lang.value == code)?.label;
    return currentLanguage ?? 'English';
  };
  const handleChangeLanguage = (code: I18n) => {
    onChangeLocalization(code);
  };
  return (
    <>
      {isOpen && !isMobile && (
        <List sx={{ padding: '8px 0px' }}>
          <ListItem sx={{ padding: '8px 0px' }} alignItems="flex-start">
            <Alert color="primary" onClose={handleClose} sx={{ width: '100%' }} icon={<QuestionCircleFilled />}>
              <AlertTitle>
                <Stack direction="row" alignItems="center">
                  <Typography fontWeight="bold">View this page in </Typography>
                  <HanPopper
                    disablePortal={false}
                    sx={{
                      zIndex: 1500,
                      '& .MuiPaper-root': {
                        m: 0
                      }
                    }}
                    title={`${getCurrentLanguage(userLang)}?`}
                    color={'primary'}
                  >
                    {LANGUAGES?.map((lang: LanguageValue, index: number) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            handleChangeLanguage(lang.value as I18n);
                          }}
                          key={index}
                          value={lang?.value}
                        >
                          <Flag code={lang.icon} height={14} width={16} />
                          <ListItemText primary={lang?.label} sx={{ pl: 1 }} />
                        </MenuItem>
                      );
                    })}
                  </HanPopper>
                </Stack>
              </AlertTitle>

              <Stack direction="row" spacing={5}>
                {SignUpLogoSetting.map((item) => {
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px 0px' }} key={item.label}>
                      <ListItemAvatar>
                        <HanAvatar name={item.label} size="md" />
                      </ListItemAvatar>
                      <ListItemText primary={item.label} />
                    </Box>
                  );
                })}
              </Stack>
            </Alert>
          </ListItem>
        </List>
      )}
    </>
  );
}
export default LanguageSetting;
