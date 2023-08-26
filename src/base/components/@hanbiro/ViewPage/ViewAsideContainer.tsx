import { Box, Theme, styled } from '@mui/material';

const ViewAsideContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiAccordion-root': {
    // border: 'none !important',
    border: ` 1px solid !important`,
    borderRadius: 4,
    borderColor: `${theme.palette.divider} !important`,
    '& .MuiAccordionSummary-root': {
      backgroundColor: 'transparent !important',
      flexDirection: 'row !important',
      '& .MuiAccordionSummary-content': {
        marginLeft: 0
      },
      '& .MuiAccordionSummary-expandIconWrapper': {
        display: 'none'
      }
    },
    '& .MuiAccordionDetails-root': {
      // border: 'none !important',
      borderColor: `${theme.palette.divider} !important`,
      padding: 16
      // paddingTop: 0
    },
    '& .Mui-expanded': {
      color: `${theme.palette.primary.main} !important`
    }
  }
}));

export default ViewAsideContainer;
