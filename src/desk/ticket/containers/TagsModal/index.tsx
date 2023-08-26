import React, { useState } from 'react';
import withMiModal from '@base/hooks/hocs/withMiModal';
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material';
import { blueGrey, grey, lightBlue } from '@mui/material/colors';
import { useTicketTags } from '@desk/ticket/hooks/useTicketTags';
import { useTranslation } from 'react-i18next';

interface TagsModalProps {
  fullScreen?: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onChange?: (params: any) => void;
}

const TagsModal = (props: TagsModalProps) => {
  const { isLoading = false, onClose, onChange, fullScreen = false } = props;
  //state
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const { data } = useTicketTags('');
  const { t } = useTranslation();

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

  console.log('data tag change', data);
  return (
    <Box position="relative">
      <Box
        sx={{ padding: 1, msOverflowStyle: 'none', scrollbarWidth: 'none', overflowY: 'auto !important' }}
        style={fullScreen ? { height: formHeight } : { maxHeight: formHeight }}
      >
        <Box sx={{ border: '1px solid ' + blueGrey[200], padding: 2 }}>
          <Box sx={{ padding: 1 }}>
            <Autocomplete
              options={data?.results ?? []}
              multiple
              renderInput={(params) => <TextField placeholder={!!selectedItem ? '' : 'Select...'} {...params} />}
              getOptionLabel={(option) => option.name}
              onChange={(event: any, item: any) => setSelectedItem(item)}
            />
          </Box>
        </Box>
      </Box>
      <Stack sx={{ padding: '10px 15px', display: 'flex', borderTop: '1px solid ' + blueGrey[200] }}>
        <Box marginLeft="auto">
          <Button
            size="small"
            variant="outlined"
            sx={{ marginRight: 1, border: '1px solid ' + blueGrey[200], lineHeight: '21px' }}
            color="secondary"
            onClick={onClose}
          >
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
            disabled={selectedItem === null || selectedItem?.tags === null}
            onClick={handleSaveChange}
          >
            {t('ncrm_common_btn_change')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default withMiModal(TagsModal);
