import IconButton from '@base/components/@extended/IconButton';
import { CopyAllOutlined, DeleteOutline } from '@mui/icons-material';
import { Box, FormControl, FormControlLabel, Stack, Switch } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
//render footer
const Footer: React.FC<any> = (props) => {
  const { keyS, keyQ, required, onCopyQuestion, onRemoveQuestion, onRequiredQChange } = props;
  const { t } = useTranslation();

  const qCopyQEleId = 'q-copy-' + keyS + '-' + (keyQ + 1);
  const qRemoveEleId = 'q-remove-' + keyS + '-' + (keyQ + 1);
  const qRequiredEleId = 'q-required-' + keyS + '-' + (keyQ + 1);

  //render
  return (
    <Box>
      <Stack direction={'row'} alignItems={'center'} justifyContent="end">
        <IconButton id={qCopyQEleId} color="secondary" onClick={() => onCopyQuestion(keyS, keyQ)}>
          <CopyAllOutlined color="inherit" />
        </IconButton>
        <IconButton id={qRemoveEleId} color="secondary" onClick={() => onRemoveQuestion(keyS, keyQ)}>
          <DeleteOutline color="inherit" />
        </IconButton>
        <Box sx={{ mx: 2, height: '32px', borderLeft: '1px solid #dadce0' }}></Box>
        <FormControl component="fieldset">
          <FormControlLabel
            control={<Switch id={qRequiredEleId} checked={required} onChange={(e: any) => onRequiredQChange(e.target.checked)} />}
            label={t('ncrm_generalsetting_survey_required')}
            labelPlacement="end"
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default Footer;
