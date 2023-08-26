import useDialog from '@base/hooks/useDialog';
import { Box, Button, DialogActions, DialogContent, DialogContentText, Paper, styled } from '@mui/material';
import Site from '@settings/digital/cta/containers/PageViewLinked/Site';
import Survey from '@settings/digital/cta/containers/PageViewLinked/Survey';
import LandingPage from '@settings/digital/cta/containers/PageViewLinked/LandingPage';

import {
  TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE,
  TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_PAGE,
  TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_RESOURCE,
  TICKET_FORM_LINK_TYPE_SITE,
  TICKET_FORM_LINK_TYPE_LANDING_PAGE,
  TICKET_FORM_LINK_TYPE_SURVEY
} from '../../config/constants';
import { useEffect, useState } from 'react';

interface BehaviorCheckProps {
  submissionDisplay: string; //"DISPLAY_MESSAGE", "LINK_TO_PAGE",''"LINK_TYPE_LANDING_PAGE"
  displayMessage: string;
  linkToPage: string;
  linkToResource: any; //id
  linkToType: string;
  onBehaviorCheck: (value: boolean) => void;
  isChecking: boolean;
}

const DialogPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgb(255, 255, 255)',
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
  maxWidth: '600px'
}));

const BehaviorCheck = (props: BehaviorCheckProps) => {
  const { submissionDisplay, displayMessage, linkToPage, linkToType, linkToResource, onBehaviorCheck, isChecking } = props;
  const [dataBehavior, setDataBehavior] = useState<null | {
    submissionDisplay: string; //"DISPLAY_MESSAGE", "LINK_TO_PAGE",''"LINK_TYPE_LANDING_PAGE"
    displayMessage: string;
    linkToPage: string;
    linkToResource: any; //id
    linkToType: string;
  }>(null);
  useEffect(() => {
    if (isChecking) {
      const checkingData = {
        submissionDisplay,
        displayMessage,
        linkToPage,
        linkToResource,
        linkToType
      };
      onBehaviorCheck(false);
      setDataBehavior(checkingData);
    }
  }, [isChecking]);
  const height = '500px';
  return (
    <Box className="scroll-box" sx={{ height: height, border: 1, borderColor: 'divider' }}>
      {dataBehavior?.submissionDisplay == TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE && (
        <Box sx={{ height: '100%', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DialogPaper>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {dataBehavior?.displayMessage ? dataBehavior?.displayMessage : 'This is sample message'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button size="small" onClick={() => {}}>
                Agree
              </Button>
            </DialogActions>
          </DialogPaper>
        </Box>
      )}
      {dataBehavior?.submissionDisplay == TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_PAGE && (
        <Box sx={{ height: '100%', p: 1 }}>
          <iframe src={linkToPage} height="100%" width="100%" style={{ borderStyle: 'none' }}></iframe>
        </Box>
      )}
      {dataBehavior?.submissionDisplay == TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_RESOURCE && (
        <>
          {dataBehavior?.linkToType == TICKET_FORM_LINK_TYPE_SITE && dataBehavior?.linkToResource?.id && (
            <Box sx={{ height: '100%', p: 1 }}>
              <Site id={dataBehavior?.linkToResource?.id} />
            </Box>
          )}

          {dataBehavior?.linkToType == TICKET_FORM_LINK_TYPE_SURVEY && dataBehavior?.linkToResource?.id && (
            <Box sx={{ height: '100%', p: 1 }}>
              <Survey id={dataBehavior?.linkToResource?.id} />
            </Box>
          )}

          {dataBehavior?.linkToType == TICKET_FORM_LINK_TYPE_LANDING_PAGE && dataBehavior?.linkToResource?.id && (
            <Box sx={{ height: '100%', p: 1 }}>
              <LandingPage id={dataBehavior?.linkToResource?.id} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BehaviorCheck;
