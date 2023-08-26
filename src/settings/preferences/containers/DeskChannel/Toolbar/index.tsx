import React from 'react';

// icon

import AddIcon from '@mui/icons-material/Add';

//component
import WriteChangeModal from '../WriteChangeModal';
import { Button, Stack, Tooltip, useTheme } from '@mui/material';
import IconButton from '@base/components/@extended/IconButton';
import { useTranslation } from 'react-i18next';
import { ChannelType } from '@settings/preferences/types/desk/common';
import { DeskChannelType } from '@settings/preferences/types/desk/channel';

interface ToolbarProps {
  reloadList: () => void;
}

function Toolbar(props: ToolbarProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const { reloadList } = props;

  // State option to get type when create channel
  const [option, setOption] = React.useState<ChannelType | string>('');

  // Function => get value selected option via getOption props of ChannelTypeBox
  const handleSetOption = (item: ChannelType) => {
    setOption(item);
  };

  const handleClose = () => {
    setOpenModal(false);

    // Set default option is CTYPE_LANDING_PAGE to display the create channel screen when clicking close button of modal
    setOption(ChannelType.LANDING_PAGE);
  };

  return (
    <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end" sx={{ mb: '20px' }}>
      <Button size="small" onClick={handleOpen} variant="contained" startIcon={<AddIcon />}>
        {t('ncrm_common_btn_add')}
      </Button>

      {/* <Tooltip title={t('ncrm_common_btn_refresh')}>
        <IconButton
          variant="outlined"
          color="secondary"
          size="medium"
          sx={{
            borderColor: theme.palette.divider,
            marginLeft: 1,
            '&:hover': {
              backgroundColor: theme.palette.secondary.lighter,
              borderColor: theme.palette.secondary.light
            }
          }}
          onClick={() => {
            reloadList && reloadList();
          }}
        >
          <Sync fontSize="small" />
        </IconButton>
      </Tooltip> */}

      <WriteChangeModal openModal={openModal} handleClose={handleClose} option={option} handleSetOption={handleSetOption} />
    </Stack>
  );
}

export default Toolbar;
