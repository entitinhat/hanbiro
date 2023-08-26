import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CardContent, CardMedia, Typography } from '@mui/material';
import dialogContinue from '../assets/images/diaglog-continute.png';
import dialogSuccess from '../assets/images/dialog-success.png';
interface IntroSkipDialogProps {
  isOpen: boolean;
  isLastStep: boolean;
  onClose: () => void;
  onSkip: () => void;
}
export default function IntroSkipDialog(props: IntroSkipDialogProps) {
  const { isOpen, onClose, onSkip, isLastStep } = props;

  return (
    <>
      <Dialog
        maxWidth="xs"
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <CardContent style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <CardMedia
              component="img"
              height="170px"
              width="auto"
              style={{ maxWidth: '100%' }}
              image={isLastStep ? dialogSuccess : dialogContinue}
            />
            <Typography textAlign="center" variant="h3" marginTop="5px">
              Welcome to Vora CRM
            </Typography>
            <Typography textAlign="center" variant="h4" color="secondary">
              Thanks for signing up, we're happy to have you on board! Would you like us to take you on a quick product tour?
            </Typography>
          </CardContent>
        </DialogContent>
        <DialogActions>
          {!isLastStep && (
            <Button size="small" color="secondary" variant="outlined" onClick={onSkip}>
              Skip tutorial
            </Button>
          )}

          <Button size="small" variant="contained" onClick={onClose} autoFocus>
            {isLastStep ? 'Get Started' : 'Continue'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
