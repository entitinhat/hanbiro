import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import HanButtonGroup from './HanButtonGroup';

interface TextEditableProps {
  value: string;
  onClose: () => void;
  onSave: (params: any) => void;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}
const TextEditable: React.FC<TextEditableProps> = (props: TextEditableProps) => {
  const { value, onClose, onSave, isSaving = false, setIsSaving } = props;
  const [inputValue, setInputValue] = useState(value);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box mr="5px" width="100%">
        <TextField
          fullWidth
          value={inputValue}
          onChange={(e: any) => {
            setInputValue(e.target.value);
          }}
        />
      </Box>
      <HanButtonGroup
        onClose={() => onClose && onClose()}
        onSave={() => {
          onSave && onSave(inputValue);
        }}
        isSaving={isSaving}
      />
    </Box>
  );
};

export default TextEditable;
