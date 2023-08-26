import { useTranslation } from 'react-i18next';
import { IdName } from '@base/types/common';
import { Stack, Chip, Button, useTheme } from '@mui/material';
import useDeskTicketTagMutation from '@desk/ticket/hooks/useTicketTagMutation';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
interface ViewProps {
  value: IdName[];
  onAdd: () => void;
  componentProps?: any;
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { value, componentProps, onAdd } = props;

  return (
    <Stack direction={'row'} spacing={0.5} sx={{ flexWrap: 'wrap' }}>
      {value?.length > 0 &&
        value.map((_tag: IdName, idx: number) => <Chip sx={{ mb: 1 }} key={_tag?.id} label={_tag?.name} variant="outlined" />)}
      <Button
        sx={{
          mb: 1,
          height: 'fit-content',
          borderStyle: 'dashed',
          color: theme.palette.common.black,
          '&:hover': { border: `1px dashed ${theme.palette.common.black}` }
        }}
        onClick={onAdd}
        color="secondary"
        startIcon={<Add />}
        variant="outlined"
        size="small"
      >
        Add
      </Button>
    </Stack>
  );
};

export default View;
