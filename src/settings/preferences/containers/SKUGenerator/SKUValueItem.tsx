import { DeleteOutline } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, Stack, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import { SHOW_OPTIONS, SKU_GENERATOR_OPTION_CUSTOM, SKU_VALUE_OPTIONS } from '@product/item/config/sku';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SKUAutocompleteAttribute from './SKUAutocompleteAttribute';

interface SKUValueItemProps {
  rowIdx: number;
  valueRow: any;
  onDelete?: (id: string) => void;
  onChange?: (rowIdx: number, nData: any) => void;
}

const SKUValueItem = (props: SKUValueItemProps) => {
  const { rowIdx, valueRow, onDelete, onChange } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  // state
  const [letterNumber, setLetterNumber] = useState(valueRow.lettersNr);
  const [customValue, setCustomValue] = useState<string>(valueRow.customValue);

  // handlers
  const handleChangeValueRow = (type: string, nData: any) => {
    const nValueRow = { ...valueRow };
    nValueRow[type] = nData;
    onChange && onChange(rowIdx, nValueRow);
  };

  return (
    <Box mb={2}>
      <Grid container spacing={1}>
        <Grid item xs={7} md={3.5}>
          <Typography sx={{ pb: 1 }}>{t('ncrm_generalsetting_preferences_product_value')}</Typography>
          <SKUAutocompleteAttribute
            type="attribute"
            value={valueRow.attribute}
            options={SKU_VALUE_OPTIONS}
            onChange={(type: string, nData: any) => handleChangeValueRow(type, nData)}
          />
        </Grid>
        {valueRow.attribute?.value === SKU_GENERATOR_OPTION_CUSTOM ? (
          <Grid item xs={12} md={8.5}>
            <Typography sx={{ pb: 1 }}>{t('ncrm_generalsetting_preferences_desk_custom')}</Typography>
            <Stack direction="row" alignItems="center">
              <TextField
                value={customValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomValue(e.target.value)}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChangeValueRow('customValue', e.target.value)}
              />

              {/* remove button */}
              <Stack justifyContent="center" alignItems="center" sx={{ width: '10%', cursor: 'pointer' }}>
                <Tooltip title="Remove" placement="right">
                  <IconButton onClick={() => onDelete && onDelete(valueRow.id)}>
                    <DeleteOutline color="error" fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Grid>
        ) : (
          <Grid item xs={12} md={8.5}>
            <Typography sx={{ pb: 1 }}>{t('ncrm_generalsetting_preferences_product_show')}</Typography>
            <Stack direction="row" alignItems="center" sx={{ maxWidth: '70%' }}>
              <Box sx={{ width: '35%' }}>
                <SKUAutocompleteAttribute
                  type="show"
                  value={valueRow.show}
                  options={SHOW_OPTIONS}
                  onChange={(type: string, nData: any) => handleChangeValueRow(type, nData)}
                />
              </Box>

              {/* number input */}
              <Stack
                direction="row"
                alignItems="center"
                divider={<Divider orientation="vertical" variant="middle" flexItem />}
                sx={{ width: '55%', height: '41px', border: '1px solid' + theme.palette.grey[300], borderRadius: '4px', mx: '10px' }}
              >
                <TextField
                  type="number"
                  value={letterNumber}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-notchedOutline': { border: 0 }
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLetterNumber(e.target.value)}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChangeValueRow('lettersNr', Number(e.target.value))}
                />
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ px: '8px' }}>
                  <Typography noWrap sx={{ color: theme.palette.grey[400] }}>
                    {t('ncrm_generalsetting_preferences_product_letter')}
                  </Typography>
                </Stack>
              </Stack>

              {/* remove button */}
              <Stack justifyContent="center" alignItems="center" sx={{ width: '10%', cursor: 'pointer' }}>
                <Tooltip title={t('ncrm_generalsetting_tooltip_title_remove')} placement="right">
                  <IconButton onClick={() => onDelete && onDelete(valueRow.id)}>
                    <DeleteOutline color="error" fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SKUValueItem;
