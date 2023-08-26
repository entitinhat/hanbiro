import React, { useEffect, useState } from 'react';
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  Paper,
  Snackbar,
  Stack,
  styled,
  Typography
} from '@mui/material';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

const DialogPaper = styled(Paper)(({ theme }) => ({
  opacity: 0.3,
  background: `linear-gradient( -45deg, ${alpha(theme.palette.primary.lighter, 0.55)}, ${alpha(
    theme.palette.primary.lighter,
    0.55
  )} 55%, ${alpha(theme.palette.primary.light, 0.55)} 36%, ${alpha(theme.palette.primary.light, 0.55)} 86%,${alpha(
    theme.palette.primary.lighter,
    0.55
  )}, ${alpha(theme.palette.primary.lighter, 0.55)} 20% )`,
  color: 'rgba(0, 0, 0, 0.87)',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '4px',
  boxShadow: 'rgb(0 0 0 / 20%) 0px 11px 15px -7px, rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px',
  margin: ' 32px',
  position: 'relative',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 'calc(100% - 64px)',
  maxWidth: '400px'
}));
interface ProjectVersion {
  version: string;
  releaseDate: string;
  releaseNotes: string;
  reminderTime?: number;
  status?: 'updated' | 'notUpdated';
}

interface VersionDialogProps {}
const VersionDialog = (props: VersionDialogProps) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [version, setVersion] = useState<ProjectVersion | null>(null);

  const getData = () => {
    const curDomain = window.location.host;
    const protocol = window.location.protocol;
    fetch(`${protocol}//${curDomain}/version.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setVersion(myJson);
      });
  };
  useEffect(() => {
    if (process.env.NODE_ENV == 'production') {
      getData();
    }
  }, []);

  useEffect(() => {
    if (version) {
      let isOpenDialog = true;
      const projectVersionStr = localStorage.getItem('project-version');
      if (projectVersionStr) {
        const projectVersion = JSON.parse(projectVersionStr);
        if (version.version === projectVersion.version) {
          const now = new Date();
          if (projectVersion.status == 'updated' || now.getTime() < projectVersion.reminderTime) {
            isOpenDialog = false;
          }
        }
      }
      setIsOpen(isOpenDialog);
    }
  }, [version]);

  const getVersionWithExpiry = (date: number, status: 'updated' | 'notUpdated') => {
    const reminderTime = new Date();
    reminderTime.setDate(reminderTime.getDate() + date);
    let projectVersion = null;
    if (version) {
      projectVersion = {
        ...version,
        status: status,
        reminderTime: reminderTime.getTime()
      };
    }

    return projectVersion;
  };

  const handleClose = () => {
    const projectVersion = getVersionWithExpiry(1, 'notUpdated');

    localStorage.setItem('project-version', JSON.stringify(projectVersion));
    setIsOpen(false);
  };

  const handleUpdate = () => {
    localStorage.clear();
    const projectVersion = getVersionWithExpiry(0, 'updated');
    localStorage.setItem('project-version', JSON.stringify(projectVersion));
    sessionStorage.clear();
    indexedDB.deleteDatabase('ncrm');
    location.reload();
  };

  return (
    <>
      {version && (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={isOpen} key={'bottom' + 'right'}>
          <DialogPaper>
            <DialogContent>
              <Stack direction="row" spacing={1}>
                <LoadingButton size="large" loading loadingIndicator={<CircularProgress color="primary" size={24} />} />
                <Box>
                  <DialogContentText id="alert-dialog-slide-description">
                    {t(`ncrm_common_version_dialog_update`)}
                    <Typography fontWeight="bold" component="span">
                      {` ${version.releaseDate}`}
                    </Typography>
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-slide-description">{t(`ncrm_common_version_dialog_reload`)}</DialogContentText>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Stack justifyContent="flex-start" direction="row" spacing={2} alignItems="center">
                <Button size="small" color="primary" variant="contained" onClick={handleUpdate}>
                  {t(`ncrm_common_btn_update`)}
                </Button>
                <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
                  <SpanLang keyLang={`ncrm_common_btn_cancle`} />
                </Button>
              </Stack>
            </DialogActions>
          </DialogPaper>
        </Snackbar>
      )}
    </>
  );
};

export default VersionDialog;
