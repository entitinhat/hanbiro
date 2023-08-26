import { IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import { DeleteOutlined } from '@mui/icons-material';

interface RowFieldProps {
  row: any;
  options?: any[];
  id: string;
  rIdx: number;
  onChangeRow: (type: string, nVal: string, rowChange: any, idx: number) => any;
  onDeleteRow?: (idx: number) => void;
  disabledDelete: boolean;
}

const RowField = (props: RowFieldProps) => {
  const { row, onChangeRow, onDeleteRow, rIdx, id, options = [], disabledDelete } = props;
  const { t } = useTranslation();
  const [customTextField, setCustomTextField] = useState<any>(row?.labelTo);

  const handleSelectField = (fieldSelect: any) => {
    setCustomTextField(fieldSelect.languageKey);
    onChangeRow('select', fieldSelect.languageKey, fieldSelect, rIdx);
  };

  const handleDeleteField = () => {
    onDeleteRow && onDeleteRow(rIdx);
  };

  return (
    <MenuItem sx={{ width: '100%' }}>
      <Stack spacing={2} width={'100%'} direction="row" alignItems="center">
        <Stack width={'50%'} direction="row" alignItems="flex-start">
          <DragIndicatorIcon sx={{ cursor: 'move' }} />
          <SelectBox
            value={row}
            options={options.map((v: any) => ({ ...v, languageKey: v.label }))}
            onChange={(fieldSelect: any) => handleSelectField(fieldSelect)}
          />
        </Stack>

        <Stack width={'50%'} direction="row" alignItems="center">
          <TextField
            sx={{ flexGrow: 1 }}
            value={customTextField}
            onChange={(event: any) => {
              setCustomTextField(event.target.value);
              onChangeRow('input', event.target.value, row, rIdx);
            }}
          />

          <IconButton sx={{ ml: 2 }} color="error" disabled={disabledDelete} onClick={handleDeleteField}>
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </MenuItem>
  );
};

export default RowField;
