import React from 'react';
import { Box, Button, Divider, Grid, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import { modeType } from '.';
import { DeleteOutline } from '@mui/icons-material';
import HanButtonGroup from '@base/components/@hanbiro/HanButtonGroup';

interface ProductCardProps {
  title: string;
  value: string | undefined;
  onChange: (nVal: string) => void;
  disabled?: boolean;
}

const ProductCard = (props: ProductCardProps) => {
  const { value, onChange, title, disabled } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
  };

  return (
    <Box border={`1px solid ${theme.palette.divider}`}>
      <Box p={2} borderBottom={`1px solid ${theme.palette.divider}`}>
        <Typography>{t(title)}</Typography>
      </Box>
      <Box p={2}>
        <TextField disabled={disabled} fullWidth multiline rows={4} value={value} onChange={handleChange}></TextField>
      </Box>
    </Box>
  );
};

interface ProductItemsProps {
  value: any;
  onChange: (nVal: any) => void;
  // productMode: string;
  disabled: boolean;
  setMode?: (mode: modeType) => void;
  mode: modeType;
  onDelete?: (id: string) => void;
  onCancel?: () => void;
  onSave?: (value: any) => void;
}

const ProductItems = (props: ProductItemsProps) => {
  const { value, onChange, disabled, mode, setMode, onDelete, onCancel, onSave } = props;
  const { product, customerNeedAnalysis, valueProposition, objections, id, isUpdateItem } = value;
  const theme = useTheme();
  const { t } = useTranslation();

  const handleOnChange = (nVal: any, field: string) => {
    if (nVal === '') {
      switch (field) {
        case 'customerNeedAnalysis':
          onChange &&
            onChange({
              ...value,
              customerNeedAnalysis: '',
              valueProposition: '',
              objections: '',
              isUpdateItem: mode === modeType.MODE_ADD ? true : false
            });
          break;
        case 'valueProposition':
          onChange &&
            onChange({
              ...value,
              valueProposition: '',
              objections: '',
              isUpdateItem: mode === modeType.MODE_ADD ? true : false
            });
          break;
        case 'objections':
          onChange &&
            onChange({
              ...value,
              objections: '',
              isUpdateItem: mode === modeType.MODE_ADD ? true : false
            });
          break;
      }
    } else {
      onChange &&
        onChange({
          ...value,
          [field]: nVal,
          isUpdateItem: mode === modeType.MODE_ADD ? true : false
        });
    }
  };

  const handleDeleteItem = (id: string) => {
    onDelete && onDelete(id);
  };

  return (
    <>
      <Box pb={2}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Stack direction={'row'} alignItems={'center'} spacing={1} height={56} width={'100%'}>
            <Typography>Product</Typography>
            {value?.isAddItem ? (
              <ProductAutoComplete
                sx={{ width: '100%' }}
                single
                value={product}
                onChange={(nVal: any) => {
                  handleOnChange(nVal, 'product');
                }}
              />
            ) : (
              <Typography color={theme.palette.primary.main}>{product?.name || ''}</Typography>
            )}
          </Stack>
          {!value?.isAddItem && (
            <IconButton color="error" size="small" sx={{ marginLeft: 'auto' }} onClick={() => handleDeleteItem(id)}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          )}
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={4}>
            <ProductCard
              title="Customer Need Analysis"
              value={customerNeedAnalysis}
              onChange={(nVal: string) => {
                handleOnChange(nVal, 'customerNeedAnalysis');
              }}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <ProductCard
              title="Value Proposition"
              value={valueProposition}
              onChange={(nVal: string) => {
                handleOnChange(nVal, 'valueProposition');
              }}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <ProductCard
              title="Objections"
              value={objections}
              onChange={(nVal: string) => {
                handleOnChange(nVal, 'objections');
              }}
              disabled={disabled}
            />
          </Grid>
        </Grid>
        {isUpdateItem && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
            <HanButtonGroup onClose={() => onCancel && onCancel()} onSave={() => onSave && onSave(value)} />
          </Stack>
        )}
      </Box>
      <Divider sx={{ marginLeft: -2, marginRight: -2 }} />
    </>
  );
};

export default ProductItems;
