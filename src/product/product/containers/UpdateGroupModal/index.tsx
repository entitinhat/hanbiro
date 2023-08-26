import React, { useMemo, useState } from 'react';

import { Button, Grid, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Save } from '@mui/icons-material';

import MiModal from '@base/components/@hanbiro/MiModal';
import { ProductGroup } from '@product/group/types/group';
import MainCard from '@base/components/App/MainCard';
import ProductGroupAutoComplete from '@product/group/containers/ProductGroupAutoComplete';

interface UpdateGroupModalProps {
  isOpen: boolean;
  onClose?: any;
  isSaving?: boolean;
  onChange?: (params?: ProductGroup) => void;
}

const UpdateGroupModal = (props: UpdateGroupModalProps) => {
  const { isOpen, onClose, isSaving, onChange } = props;

  // state
  const [value, setValue] = useState<ProductGroup>();

  const handleOnSave = () => {
    onChange && onChange(value);
  };

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color={'primary'}
              loading={isSaving}
              disabled={isSaving || !value}
              loadingPosition="start"
              startIcon={<></>}
              onClick={handleOnSave}
            >
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isSaving, value]);

  return (
    <MiModal title={'Update Group'} isOpen={isOpen} size="xs" fullScreen={false} onClose={onClose} footer={Footer}>
      <MainCard sx={{ m: 1 }}>
        <ProductGroupAutoComplete
          onChange={(newGroup?: ProductGroup) => {
            setValue(newGroup);
          }}
        />
      </MainCard>
    </MiModal>
  );
};

export default UpdateGroupModal;
