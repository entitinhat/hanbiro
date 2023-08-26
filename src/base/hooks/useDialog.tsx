import { ArrowForwardIos, CloseOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from '@mui/styles/styled';
import { Stack } from '@mui/system';
import toast from 'react-hot-toast';

const SnackbarContainer = styled(Box)(({ color, bgcolor }: { color: string; bgcolor: string }) => ({
  padding: '8px 12px',
  minWidth: '200px',
  maxWidth: '400px',
  borderRadius: '4px',
  background: bgcolor,
  color: color
}));

export default function useDialog() {
  const theme = useTheme();

  const enqueueDefaultDialog = (message: string) => {
    toast.custom(
      (t) => {
        return <DefaultDialog visible={t.visible} status={'Default'} message={message} id={t.id} />;
      },
      {
        duration: 3000,
        position: 'top-center'
      }
    );
  };

  return {
    enqueueDefaultDialog
  };
}

interface DefaultDialogProps {
  visible: boolean;
  id: string;
  status: string;
  message: string;
}

const DefaultDialog = ({ visible, status, message, id }: DefaultDialogProps) => {
  return (
    <Box>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={visible}
        keepMounted
        onClose={() => toast.dismiss(id)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => toast.dismiss(id)}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
