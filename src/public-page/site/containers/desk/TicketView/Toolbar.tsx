import { useState } from 'react';

//material
import { AddOutlined, CancelOutlined, ExpandMoreOutlined, PrintOutlined } from '@mui/icons-material';
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Stack, useMediaQuery, useTheme } from '@mui/material';

//menu
import { useSiteTicketCancel, useSiteTicketClose } from '@public-page/site/hooks/useSiteMutations';
import LoadingButton from '@base/components/@extended/LoadingButton';
import SurveyForm from '../SurveyForm';
import PrintPreview from '../PrintPreview';

interface ToolbarProps {
  ticketId: string;
  token: string;
  layoutData: any;
  ticketCustomer: any;
  onOpenWrite?: () => void;
  onRefeshView?: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  const { ticketId, token, layoutData, ticketCustomer, onOpenWrite, onRefeshView } = props;
  const theme = useTheme();
  //state
  const [isOpenSurvey, setIsOpenSurvey] = useState(false);
  const [isOpenPrint, setIsOpenPrint] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  //hooks
  const mClose = useSiteTicketClose();
  const mCancel = useSiteTicketCancel();

  //open context menu
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //close ticket
  const handleCloseTicket = () => {
    const params = {
      ids: [ticketId],
      token
    };
    mClose.mutate(params);
  };

  //cancel ticket
  const handleCancelTicket = () => {
    const params = {
      ids: [ticketId],
      token
    };
    mCancel.mutate(params);
  };

  return (
    <>
      <Stack direction={'row'} alignItems={'center'} justifyContent="end" spacing={1.25}>
        <Button size="small" color="warning" variant="contained" onClick={() => setIsOpenSurvey(true)}>
          Survey
        </Button>
        <LoadingButton
          size="small"
          color="info"
          variant="contained"
          loading={mClose.isLoading}
          loadingPosition="start"
          startIcon={<></>}
          onClick={handleCloseTicket}
        >
          Close Ticket
        </LoadingButton>
        <Button size="small" color="primary" variant="contained" startIcon={<AddOutlined />} onClick={onOpenWrite}>
          New
        </Button>
        <Box>
          <LoadingButton
            variant="contained"
            color="secondary"
            endIcon={<ExpandMoreOutlined />}
            loading={mCancel.isLoading}
            loadingPosition="start"
            startIcon={<></>}
            onClick={handleOpenMenu}
          >
            More
          </LoadingButton>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: matchDownSM ? 'center' : 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: matchDownSM ? 'center' : 'right'
            }}
          >
            <Box>
              <MenuItem disableRipple onClick={handleCancelTicket}>
                <ListItemIcon>
                  <CancelOutlined color="error" />
                </ListItemIcon>
                <ListItemText>Cancel Ticket</ListItemText>
              </MenuItem>
              <MenuItem
                disableRipple
                onClick={() => {
                  setIsOpenPrint(true);
                  setAnchorEl(null);
                }}
              >
                <ListItemIcon>
                  <PrintOutlined color="success" />
                </ListItemIcon>
                <ListItemText>Print</ListItemText>
              </MenuItem>
            </Box>
          </Menu>
        </Box>
      </Stack>

      {/* modal for survey */}
      <SurveyForm token={token} isOpen={isOpenSurvey} onClose={() => setIsOpenSurvey(false)} />
      <PrintPreview
        token={token}
        layoutData={layoutData}
        ticketCustomer={ticketCustomer}
        isOpen={isOpenPrint}
        onClose={() => setIsOpenPrint(false)}
      />
    </>
  );
};

export default Toolbar;
