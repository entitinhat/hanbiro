import React from 'react';
import { Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps, useTheme } from '@mui/material';
import { xor } from 'lodash';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Button } from '@mui/material';

export interface AllCheckingProps {
  sx?: CheckboxProps['sx'];
  rowIds: string[];
  checkedIds: string[];
  onToggle: (v: string[]) => void;
  label?: string;
  labelSx?: FormControlLabelProps['sx'];
  type?: 'checkbox' | 'button';
}

const AllChecking = ({ label, checkedIds, rowIds, onToggle, sx, labelSx, type = 'checkbox' }: AllCheckingProps) => {
  const theme = useTheme();

  const diffIds = xor(rowIds, checkedIds);

  const isAllRowsSelected = !!checkedIds.length && diffIds.length === 0;
  const isSomeRowsSelected = !!checkedIds.length && !!diffIds.length;

  const Control = () => (
    <Checkbox
      color="secondary"
      checked={isAllRowsSelected}
      indeterminate={isSomeRowsSelected}
      onChange={(_, checked) => (checked ? onToggle(rowIds) : onToggle([]))}
      sx={sx}
    />
  );

  return type == 'checkbox' ? (
    label ? (
      <FormControlLabel value="end" control={<Control />} label={<SpanLang keyLang={label} textOnly />} labelPlacement="end" sx={labelSx} />
    ) : (
      <Control />
    )
  ) : (
    <Button
      size={'small'}
      onClick={() => {
        isAllRowsSelected ? onToggle([]) : onToggle(rowIds);
      }}
      variant="outlined"
      color="inherit"
      sx={{
        borderColor: theme.palette.secondary.light,
        '&:hover': {
          backgroundColor: theme.palette.secondary.lighter,
          borderColor: theme.palette.secondary.light
        },
        display: 'flex',
        alignItems: 'center'
        // height: 32
      }}
    >
      <SpanLang keyLang={isAllRowsSelected ? `ncrm_common_un_select_all` : `ncrm_common_select_all`} textOnly />
    </Button>
  );
};

export default AllChecking;
