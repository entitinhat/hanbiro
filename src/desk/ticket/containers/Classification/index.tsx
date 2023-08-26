import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useTicketClassificationsSetting } from '@settings/preferences/hooks/desk/useTicketClassification';
import { useEffect, useState, Suspense } from 'react';

import { Autocomplete, TextField, Grid, Stack, InputLabel, useTheme, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ClassifficationValue } from '@desk/ticket/types/classification';
import { TicketClassification } from '@settings/preferences/types/desk/ticketClassification';
import { useTranslation } from 'react-i18next';
import { AddOutlined, CancelOutlined } from '@mui/icons-material';

import _ from 'lodash';

interface ClassificationProps {
  column?: number;
  value?: ClassifficationValue[];
  isPublic?: boolean;
  token?: string;
  onChange?: (val: ClassifficationValue[]) => void;
  filterToolbarAction?: boolean; // Check if is filter toolbar checked action
  isMultiple?: boolean;
  isSmall?: boolean;
}

const Classification = (props: ClassificationProps) => {
  const {
    column = 2,
    isPublic = false,
    token = '',
    value,
    onChange,
    filterToolbarAction = false,
    isMultiple = false,
    isSmall = false
  } = props;
  const { t } = useTranslation();
  //state
  const [regionOptions, setRegionOptions] = useState<ClassifficationValue[]>([]);
  const [languageOptions, setLanguageOptions] = useState<ClassifficationValue[]>([]);
  const [curRegion, setCurRegion] = useState<ClassifficationValue | null>(null);
  const [curLanguage, setCurLanguage] = useState<ClassifficationValue | null>(null);
  // ===== languague translate ======
  const regionPlaceholder = 'ncrm_common_region_placeholder_select';
  const languagePlaceholder = 'ncrm_common_language_placeholder_select';
  const theme = useTheme();

  //HOOK get options
  const { data, isLoading } = useTicketClassificationsSetting(isPublic, token);

  // initial row
  const defaultRow: any = {};

  // state row
  const [rows, setRows] = useState<any[]>([defaultRow]);

  // Handle add row to use for classification when UI is filter a bulk action
  const handleAddMore = () => {
    let newRows = [...rows];
    newRows.push({});
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  // Handle remove row to use for classification when UI is filter a bulk action
  const handleRemove = (index: number) => {
    let newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  // Handle change to use for classification when UI is filter a bulk action
  const handleChange = (keyName: string, index: number, keyValue: any) => {
    const newRows = [...rows];
    newRows[index] = keyValue;
    setRows(newRows);
  };

  //init data
  useEffect(() => {
    if (value && value.length > 0) {
      const region = value.find((_item) => _item.classification.name === 'Region');
      const language = value.find((_item) => _item.classification.name === 'Language');
      if (region) {
        setCurRegion(region);
      }
      if (language) {
        setCurLanguage(language);
      }
    } else {
      setCurRegion(null);
      setCurLanguage(null);
    }
  }, [value]);

  //init options
  useEffect(() => {
    if (!isLoading && data?.results) {
      let newRegionOptions: ClassifficationValue[] = [];
      let newLangOptions: ClassifficationValue[] = [];
      const regionResult = data.results.find((_ele: TicketClassification) => _ele.name === 'Region');
      if (regionResult) {
        newRegionOptions = regionResult.values.map((_ele: string) => ({
          classification: {
            id: regionResult.id,
            name: regionResult.name
          },
          value: _ele,
          label: _ele
        }));
        setRegionOptions(newRegionOptions);
      }
      const languageResult = data.results.find((_ele: TicketClassification) => _ele.name === 'Language');
      if (languageResult) {
        newLangOptions = languageResult.values.map((_ele: string) => ({
          classification: {
            id: languageResult.id,
            name: languageResult.name
          },
          value: _ele,
          label: _ele
        }));
        setLanguageOptions(newLangOptions);
      }
    }
  }, [data]);

  //value change
  const handleValueChange = (keyName: string, keyValue: ClassifficationValue | null) => {
    if (keyName === 'region') {
      setCurRegion(keyValue);
      //callback
      const newValue: ClassifficationValue[] = keyValue ? [keyValue] : [];
      if (curLanguage) {
        newValue.push(curLanguage);
      }
      onChange && onChange(newValue);
    }
    if (keyName === 'language') {
      setCurLanguage(keyValue);
      //callback
      const newValue: ClassifficationValue[] = keyValue ? [keyValue] : [];
      if (curRegion) {
        newValue.push(curRegion);
      }
      onChange && onChange(newValue);
    }
  };

  // const LanguageValueOptions = [
  //   {
  //     classification: {
  //       id: '1',
  //       name: 'Language'
  //     },
  //     value: 'English',
  //     label: 'English'
  //   },
  //   {
  //     classification: {
  //       id: '2',
  //       name: 'Language'
  //     },
  //     value: 'Spanish',
  //     label: 'Spanish'
  //   }
  // ];

  // const RegionValueOptions = [
  //   {
  //     classification: {
  //       id: '1',
  //       name: 'Region'
  //     },
  //     value: 'Europe',
  //     label: 'Europe'
  //   },
  //   {
  //     classification: {
  //       id: '2',
  //       name: 'Region'
  //     },
  //     value: 'Asia',
  //     label: 'Asia'
  //   }
  // ];

  return (
    <>
      {/* Check if is checked action && column prop = 1 when calling Classification to display */}
      {filterToolbarAction && column === 1 ? (
        <>
          {rows.map((row, index) => (
            <Stack spacing={1} sx={{ pl: 1, pr: 1 }}>
              <Box>
                {/* Display input select a classification */}
                <Autocomplete
                  sx={{ marginTop: '5px' }}
                  id="asynchronous-language-value"
                  renderInput={(params) => <TextField placeholder={'Type or click to select a language'} {...params} />}
                  getOptionLabel={(option: any) => option?.label ?? ''}
                  options={languageOptions}
                  onChange={(event, value) => handleChange('region', index, value)}
                  value={row?.value}
                />
                {/* Display input select a value */}
                <Autocomplete
                  sx={{ marginTop: '5px' }}
                  id="asynchronous-region-value"
                  renderInput={(params) => <TextField placeholder={'Type or click to select a region'} {...params} />}
                  getOptionLabel={(option: any) => option?.label ?? ''}
                  options={regionOptions}
                  onChange={(event, value) => handleChange('region', index, value)}
                  value={row?.value}
                />
              </Box>
              {/* Delete and Add buttons */}
              <Stack direction="row">
                {isMultiple && index !== 0 && (
                  <Button
                    size="small"
                    color="error"
                    sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
                    startIcon={<CancelOutlined />}
                    onClick={() => handleRemove(index)}
                  >
                    {t('ncrm_common_btn_delete')}
                  </Button>
                )}
                {isMultiple && index === rows.length - 1 && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
                    startIcon={<AddOutlined />}
                    onClick={handleAddMore}
                  >
                    {t('Add another line')}
                  </Button>
                )}
              </Stack>
            </Stack>
          ))}
        </>
      ) : (
        <Grid container>
          <Grid item xs={12} lg={6} sx={{ pr: 1, mb: 1 }}>
            <Stack spacing={0.5}>
              <Stack spacing={1} direction="row" alignItems="center">
                <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                  <SpanLang
                    sx={{ fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary }}
                    keyLang="Classifications"
                  />
                </InputLabel>
              </Stack>
            </Stack>
            <Suspense fallback={<></>}>
              <Autocomplete
                id="asynchronous-language"
                renderInput={(params) => <TextField value={curLanguage} placeholder={t(languagePlaceholder) as string} {...params} />}
                getOptionLabel={(option: any) => option?.label ?? ''}
                options={languageOptions}
                onChange={(event, value) => handleValueChange('language', value)}
                value={curLanguage}
                readOnly
                inputValue={'Language'}
              />
              <Autocomplete
                sx={{ marginTop: '5px' }}
                id="asynchronous-region"
                renderInput={(params) => <TextField value={curRegion} placeholder={t(regionPlaceholder) as string} {...params} />}
                getOptionLabel={(option: any) => option?.label ?? ''}
                options={regionOptions}
                onChange={(event, value) => handleValueChange('region', value)}
                value={curRegion}
                readOnly
                inputValue={'Region'}
              />
            </Suspense>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ pl: 1, mb: 1 }}>
            <Stack spacing={0.5}>
              <Stack spacing={1} direction="row" alignItems="center">
                <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                  <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary }} keyLang="Value" />
                </InputLabel>
              </Stack>
            </Stack>
            <Suspense fallback={<></>}>
              <Autocomplete
                id="asynchronous-language-value"
                renderInput={(params) => <TextField value={curLanguage} placeholder={t(languagePlaceholder) as string} {...params} />}
                getOptionLabel={(option: any) => option?.label ?? ''}
                options={languageOptions}
                onChange={(event, value) => handleValueChange('language', value)}
                value={curLanguage}
              />
              <Autocomplete
                sx={{ marginTop: '5px' }}
                id="asynchronous-region-value"
                renderInput={(params) => <TextField value={curRegion} placeholder={t(regionPlaceholder) as string} {...params} />}
                getOptionLabel={(option: any) => option?.label ?? ''}
                options={regionOptions}
                onChange={(event, value) => handleValueChange('region', value)}
                value={curRegion}
              />
            </Suspense>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Classification;
