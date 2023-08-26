import React, { useState } from 'react';
import withMiModal from '@base/hooks/hocs/withMiModal';
import { Box, Button, Stack } from '@mui/material';
import AssignGroupRep from '../AssignGroupRep';
import { blueGrey, grey, lightBlue } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';

interface GroupUserModalProps {
  fullScreen?: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onChange?: (params: any) => void;
}

const GroupUserModal = (props: GroupUserModalProps) => {
  const { t } = useTranslation();
  const { isLoading = false, onClose, onChange, fullScreen = false } = props;
  //state
  const [selectedItem, setSelectedItem] = useState<any>(null);

  let formHeight = 'calc(100vh - 300px)';
  if (fullScreen) {
    formHeight = 'calc(100vh - 120px)';
  }

  //change
  const handleSaveChange = () => {
    if (selectedItem) {
      onChange && onChange(selectedItem);
      onClose();
    }
  };

  return (
    <Box position="relative">
      <Box
        sx={{ padding: 1, msOverflowStyle: 'none', scrollbarWidth: 'none', overflowY: 'auto !important' }}
        style={fullScreen ? { height: formHeight } : { maxHeight: formHeight }}
      >
        <Box sx={{ border: '1px solid ' + blueGrey[200], padding: 2 }}>
          <Box sx={{ padding: 1 }}>
            <AssignGroupRep value={null} onChange={(item: any) => setSelectedItem(item)} />
          </Box>
        </Box>
      </Box>
      <Stack sx={{ padding: '10px 15px', display: 'flex', borderTop: '1px solid ' + blueGrey[200] }}>
        <Box marginLeft="auto">
          <Button
            size="small"
            sx={{ marginRight: 1, border: '1px solid ' + blueGrey[200], lineHeight: '21px' }}
            color="secondary"
            variant="outlined"
            onClick={onClose}
          >
            {/* Close */}
            {t('ncrm_common_btn_close')}
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              background: lightBlue[800],
              color: grey[50],
              lineHeight: '21px',
              '&.Mui-disabled': {
                background: lightBlue[300]
              }
            }}
            disabled={selectedItem === null || selectedItem?.assignedUser === null}
            onClick={handleSaveChange}
          >
            {/* Change */}
            {t('ncrm_common_btn_change')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default withMiModal(GroupUserModal);
