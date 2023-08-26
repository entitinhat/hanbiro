import React, { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Add, EditOutlined, Remove } from '@mui/icons-material';
import { Email } from '@customer/types/interface';

interface CellDropListCustom {
  value: Email[];
  onChange?: (params: Email[]) => void;
  canAdd?: boolean;
}
const CellDropListCustom = (props: CellDropListCustom) => {
  const { value, onChange } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const [data, setData] = useState<Email[]>([]);

  useEffect(() => {
    if (value?.length > 0) setData(value);
  }, [value]);

  const onChangeItem = (value: string, index: number) => {
    const nValue = data.map((item: Email, idx) => {
      if (index === idx) return { ...item, email: value };
      else return item;
    });
    setData(nValue);
    onChange && onChange(nValue);
  };
  const onDeleteItem = (index: number) => {
    const nVal = data.splice(index, 1);

    setData(nVal);
    onChange && onChange(nVal);
  };
  const onAddItem = () => {
    const nVal = [...data, { email: '' }];
    setData;
  };
  return (
    <Box>
      {data.map((item: Email, index: number) => (
        <Stack spacing={0.5} direction="row" sx={{ py: '5px' }}>
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              minWidth: '100px'
            }}
            value={item?.email}
            onChange={(e) => onChangeItem(e.target.value, index)}
          />
          <IconButton
            size={'small'}
            onClick={() => {
              onDeleteItem(index);
            }}
          >
            <Remove color={'error'} />
          </IconButton>
        </Stack>
      ))}
      <Stack spacing={1} direction="row">
        <Button
          color="primary"
          size="small"
          onClick={() => {
            onAddItem();
          }}
          startIcon={<Add />}
        >
          Add email
        </Button>
      </Stack>
    </Box>
  );
};
export default CellDropListCustom;
