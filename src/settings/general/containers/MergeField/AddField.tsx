import useSnackBar from '@base/hooks/useSnackBar';
import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
import { Box, FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useMergeFieldMutations } from '@settings/general/hooks/merge-field/useMergeFieldMutations';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IAddMergeField {
  onClose: (val: boolean) => void;
  menu: string;
}

function AddMergeField(props: IAddMergeField) {
  const { onClose, menu } = props;
  // console.log('tabs: ', menu)
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [placeHolder, setPlaceHolder] = useState<string>('');
  const [replacement, setReplacement] = useState<string>('');
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`
  const { t } = useTranslation();


  const { mCreateMergeField } = useMergeFieldMutations();

  const handlePlaceHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceHolder(e.target.value);
  };

  const handleReplacement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplacement(e.target.value);
  };
  const { enqueueErrorBar } = useSnackBar();
  const handleSave = () => {
    setIsSaving(true);
    if (placeHolder == '' || replacement == '') {
      setTimeout(() => {
        enqueueErrorBar('Placeholder or Replacement is requirement');
        setIsSaving(false);
      }, 500);
    }
    else {
      const mergeField = {
        menu: menu,
        fieldTag: placeHolder,
        replace: replacement
      };
      // console.log('mergeField: ', mergeField)
      mCreateMergeField.mutate(
        { mergeField },
        {
          onSuccess: () => {
            onClose(false);
          },
          onSettled: () => {
            setIsSaving(false);
          }
        }
      );
    }
  };
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.divider }}>
      <Grid container sx={{ py: '12px', alignItems: 'flex-end' }}>
        <Grid item xs={12} md={4.8} sx={{ px: '20px' }}>
          <Stack direction="row" mb={1}>
            <Typography>{`${t('ncrm_generalsetting_placeholder')}:`}</Typography>
            <span style={{ color: 'red' }}>*</span>
          </Stack>
          {/* <Stack direction={'row'} border={border}>
            {'$$'}
            <TextField classes={{ root: classes.root }} value={placeHolder} InputProps={{
              style: {
                border: 'none',
              }
            }} onChange={handlePlaceHolder} autoFocus />
            {'$$'}
          </Stack> */}
          <FormControl fullWidth >
            {/* <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel> */}
            <OutlinedInput
              placeholder='Type a placeholder to use'
              startAdornment={<InputAdornment position="start">$$</InputAdornment>}
              endAdornment={<InputAdornment position="end">$$</InputAdornment>}
              onChange={handlePlaceHolder} autoFocus
            // label="Amount"
            />

          </FormControl>
        </Grid>
        <Grid item xs={12} md={4.8} sx={{ px: '20px' }}>
          <Stack direction="row" mb={1}>
            <Typography>{`${t('ncrm_generalsetting_replacement')}:`}</Typography>
            <span style={{ color: 'red' }}>*</span>
          </Stack>
          <TextField placeholder='Type a replacement to use' value={replacement} onChange={handleReplacement} fullWidth />
        </Grid>
        <Grid item xs={12} md={2.4} sx={{ px: '20px' }}>
          <Stack direction="row" justifyContent="center" alignItems="center" sx={{ pb: 0.5 }}>
            {isSaving ? (
              <CircularProgress size="18px" color="primary" />
            ) : (
              <Tooltip title={t('ncrm_common_tooltip_title_save')} placement="left">
                <IconButton
                  onClick={() => {
                    handleSave();
                  }}
                >
                  <SaveOutlined color="primary" fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={t('ncrm_generalsetting_tooltip_title_remove')} placement="right">
              <IconButton onClick={handleClose}>
                <DeleteOutline color="error" fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddMergeField;
