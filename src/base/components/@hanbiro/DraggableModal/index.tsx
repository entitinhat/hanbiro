import React, { useState } from 'react';

//material
import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Divider, Grid, Tooltip, IconButton } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

interface DraggableModalProps {
  title?: string | React.ReactElement;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  size?: number | string;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper
        {...props}
        sx={{
          width: props?.style?.width,
          pointerEvents: 'all',
          top: 'auto',
          left: 'auto',
          bottom: 0,
          maxHeight: 'calc(100% - 6rem)',
          margin: '4.25rem auto 1.75rem auto !important'
        }}
      />
    </Draggable>
  );
}

const DraggableModal = (props: DraggableModalProps) => {
  const theme = useTheme();

  const { title = 'New Item', isOpen, children, onClose, size = 500 } = props;

  return (
    <Dialog
      keepMounted
      open={isOpen}
      PaperComponent={PaperComponent}
      PaperProps={{ style: { width: size } }}
      aria-labelledby="draggable-dialog-title"
      onClose={onClose}
    >
      <DialogTitle
        sx={{ p: 1, bgcolor: theme.palette.grey[100], borderBottom: `1px solid ${theme.palette.grey[100]}`, cursor: 'move' }}
        id="draggable-dialog-title"
      >
        <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 1 }}>
          <Grid item sx={{ color: theme.palette.grey[800] }}>
            {title}
          </Grid>
          <Grid item>
            <Tooltip title="Close" placement="top">
              <IconButton
                size="medium"
                sx={{ color: alpha(theme.palette.grey[400], 0.5) }}
                onClick={(ev) => {
                  onClose();
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </DialogTitle>
      <>
        <Divider />
        <DialogContent sx={{ padding: 0 }}>{children}</DialogContent>
      </>
    </Dialog>
  );
};

export default DraggableModal;
