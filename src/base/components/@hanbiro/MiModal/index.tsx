import React, { useState } from 'react';

import { ArrowBackOutlined, ArrowForwardOutlined, Close, Fullscreen, FullscreenExit, LaunchOutlined, Minimize } from '@mui/icons-material';
import {
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';
import { drawerWidth, headerHeight } from '@base/config/config';

const MIMODAL_ANCHOR_CENTER: string = 'center';
const MIMODAL_ANCHOR_RIGHT: string = 'right';

type MiModalAnchor = 'center' | 'right';

interface MiModalProps {
  title: string | React.ReactElement;
  isOpen: boolean;
  size: Breakpoint | false;
  fullScreen?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: (value: any) => void;
  onScroll?: (e: any) => void;
  anchor?: MiModalAnchor;
  isCloseByBackdrop?: boolean; // accept close modal by click away on backdrop or not, default is false
}

const MiModal = (props: MiModalProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    title = 'New Item',
    isOpen,
    size,
    fullScreen = false,
    children,
    footer,
    onClose,
    onScroll,
    anchor = MIMODAL_ANCHOR_CENTER,
    isCloseByBackdrop = false,
  } = props;

  //state
  const [miState, setMiState] = useState({
    isShrink: false,
    isMinimize: false,
    isFullScreen: fullScreen,
    anchor: anchor
  });

  const { isMobile } = useDevice();

  // default don't close dialog when click backdorp
  const handleOnClose = (e: any, reason: 'escapeKeyDown' | 'backdropClick') => {
    if (reason == 'backdropClick' && !isCloseByBackdrop) {
      return
    }
    onClose && onClose(e);
  };

  return (
    <Dialog
      maxWidth={size}
      fullWidth
      fullScreen={miState.isFullScreen || isMobile || miState.anchor === MIMODAL_ANCHOR_RIGHT}
      keepMounted
      onClose={handleOnClose}
      open={isOpen}
      sx={
        miState.isMinimize
          ? { width: 500, top: 'auto', left: 'auto', bottom: 0, transform: 'none', pointerEvents: 'all' }
          : {
              '& .MuiDialog-paper': {
                p: 0,
                ...(isMobile && {
                  mx: 0,
                  width: '100%',
                  maxHeight: '100%',
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0
                }),
                ...(miState.anchor === MIMODAL_ANCHOR_RIGHT && {
                  mx: 0,
                  width: 'auto',
                  maxWidth: 800,
                  minWidth: drawerWidth,
                  maxHeight: '100%',
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0
                })
              },
              '& .MuiDialog-container': {
                justifyContent: miState.anchor === MIMODAL_ANCHOR_RIGHT ? 'flex-end' : 'center'
              },
              top: isMobile || miState.anchor === MIMODAL_ANCHOR_RIGHT ? 0 : headerHeight,
              '.MuiBackdrop-root': { bgcolor: 'rgba(15,21,32,.5)' }
            }
      }
      hideBackdrop={miState.isMinimize}
    >
      <DialogTitle
        sx={{
          p: 1,
          bgcolor: miState.anchor === MIMODAL_ANCHOR_RIGHT ? 'primary.main' : theme.palette.header,
          height: headerHeight
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 1 }}>
          <Grid item sx={{ color: theme.palette.common.white }}>
            {title}
          </Grid>
          <Grid item>
            {/* {!isMobile && (
              <Tooltip title={miState.isMinimize ? t('ncrm_common_maximize') : t('ncrm_common_minimize')} placement="top">
                <IconButton
                  size="medium"
                  sx={{ color: theme.palette.common.white }}
                  // sx={{ color: alpha(theme.palette.common.white, 0.5) }}
                  onClick={() => {
                    setMiState({
                      ...miState,
                      isMinimize: !miState.isMinimize,
                    });
                  }}
                >
                  {miState.isMinimize ? <LaunchOutlined /> : <Minimize sx={{ mb: 2 }} />}
                </IconButton>
              </Tooltip>
            )} */}
            {!isMobile && (
              <Tooltip
                title={miState.anchor === MIMODAL_ANCHOR_CENTER ? t('ncrm_common_swipe_to_right') : t('ncrm_common_swipe_to_center')}
                placement="top"
              >
                <IconButton
                  size="medium"
                  sx={{ color: theme.palette.common.white }}
                  // sx={{ color: alpha(theme.palette.common.white, 0.5) }}
                  onClick={() => {
                    setMiState({
                      ...miState,
                      anchor: miState.anchor === MIMODAL_ANCHOR_CENTER ? MIMODAL_ANCHOR_RIGHT : MIMODAL_ANCHOR_CENTER
                    });
                  }}
                >
                  {miState.anchor === MIMODAL_ANCHOR_CENTER ? <ArrowForwardOutlined /> : <ArrowBackOutlined />}
                </IconButton>
              </Tooltip>
            )}
            {!isMobile && miState.anchor === MIMODAL_ANCHOR_CENTER && (
              <Tooltip title={miState.isFullScreen ? t('ncrm_common_close_full_screen') : t('ncrm_common_full_screen')} placement="top">
                <IconButton
                  size="medium"
                  sx={{ color: theme.palette.common.white }}
                  // sx={{ color: alpha(theme.palette.common.white, 0.5) }}
                  onClick={(e: any) => {
                    e.stopPropagation()
                    setMiState({
                      ...miState,
                      isFullScreen: !miState.isFullScreen,
                      anchor: MIMODAL_ANCHOR_CENTER
                    });
                  }}
                >
                  {miState.isFullScreen ? <FullscreenExit /> : <Fullscreen />}
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={t('ncrm_common_close') as string} placement="top">
              <IconButton
                size="medium"
                sx={{ color: theme.palette.common.white }}
                // sx={{ color: alpha(theme.palette.common.white, 0.5) }}
                onClick={onClose}
              >
                <Close />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </DialogTitle>
      {!miState.isMinimize && (
        <>
          <Divider />
          <DialogContent
            onScroll={onScroll}
            sx={{ p: 0, bgcolor: theme.palette.background.paper }}
            className="dialog-content-print scroll-box"
            id="write-grapes"
          >
            {children}
          </DialogContent>
          {footer && (
            <>
              <Divider />
              <DialogActions sx={{ p: 1, bgcolor: theme.palette.background.paper }}>{footer}</DialogActions>
            </>
          )}
        </>
      )}
    </Dialog>
  );
};

export default MiModal;
