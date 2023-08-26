import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useTicketClassificationsSetting } from '@settings/preferences/hooks/desk/useTicketClassification';
import { useEffect, useState, Suspense } from 'react';

import { Autocomplete, TextField, Grid, Stack, InputLabel, useTheme, Box, Button, SelectChangeEvent } from '@mui/material';
import { ClassifficationValue } from '@desk/ticket/types/classification';
import { TicketClassification } from '@settings/preferences/types/desk/ticketClassification';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import _ from 'lodash';

interface ClassificationProps {
  column?: number;
  value?: ClassifficationValue[];
  isPublic?: boolean;
  token?: string;
  onChange?: (val: ClassifficationValue[]) => void;
  // filterToolbarAction?: boolean; // Check if is filter toolbar checked action
}

const Classification = (props: ClassificationProps) => {
  const { column = 2, isPublic = false, token = '', value, onChange } = props;
  const { t } = useTranslation();

  // const defaultRow: any = {
  //   classification: {
  //     id: 'ee73b307-9239-4f28-b2dc-d6ea49c9cb7c',
  //     name: 'Classifications'
  //   },
  //   label: 'Department',
  //   value: 'Department'
  // };
  const isMultiple = false;
  //state
  const [regionOptions, setRegionOptions] = useState<ClassifficationValue[]>([]);
  const [languageOptions, setLanguageOptions] = useState<ClassifficationValue[]>([]);
  const [classificationOptions, setClassificationOptions] = useState<ClassifficationValue[]>([]);
  const [valueOptions, setValueOptions] = useState<ClassifficationValue[]>([]);

  const [curRegion, setCurRegion] = useState<ClassifficationValue | null>(null);
  const [curLanguage, setCurLanguage] = useState<ClassifficationValue | null>(null);
  //add row state
  const [rows, setRows] = useState<any[]>([]);
  const [countryPhones, setCountryPhones] = useState<any[]>([]);
  // ===== languague translate ======
  const regionPlaceholder = 'ncrm_common_region_placeholder_select';
  const languagePlaceholder = 'ncrm_common_language_placeholder_select';
  const classificationPlaceholder = 'Type or click to select';
  const valuePlaceholder = 'Type or click to select';

  const theme = useTheme();
  //init data
  // useEffect(() => {
  //   if (value && value.length > 0) {
  //     const region = value.find((_item) => _item.classification.name === 'Region');
  //     const language = value.find((_item) => _item.classification.name === 'Language');
  //     if (region) {
  //       setCurRegion(region);
  //     }
  //     if (language) {
  //       setCurLanguage(language);
  //     }
  //   } else {
  //     setCurRegion(null);
  //     setCurLanguage(null);
  //   }
  // }, [value]);

  //HOOK get options
  const { data, isLoading } = useTicketClassificationsSetting(isPublic, token);
  console.log('🚀 ~ file: index.tsx:66 ~ Classification ~ data:', data);

  //init options
  useEffect(() => {
    if (!isLoading && data?.results) {
      let newClassificationOptions = data?.results.map((_item) => ({
        classification: {
          id: _item.id,
          name: 'Classifications'
        },
        value: _item.name,
        label: _item.name
      }));
      setClassificationOptions(newClassificationOptions);
      setRows(newClassificationOptions);
      console.log('🚀 ~ file: index.tsx:81 ~ newClassificationOptions ~ newClassificationOptions:', newClassificationOptions);
      // let newValue: any[] = data?.results.map((item) => item.values);
      // console.log('🚀 ~ file: index.tsx:74 ~ useEffect ~ newValue:', newValue); // [['123,'321'],'english',['north','south']]
      // let newValueOptions = newClassificationOptions.map((_item:any) => {

      //   _item.label: [
      //     {
      //       classification: {
      //         id: _item.id,
      //         name: 'Values'
      //       },
      //       value: _item.name,
      //       label: _item.name
      //     },
      //     {
      //       classification: {
      //         id: _item.id,
      //         name: 'Values'
      //       },
      //       value: _item.name,
      //       label: _item.name
      //     },
      //   ]

      //   })

      //   newValueOptionss = {Department: [],Language: [],Region: []}

      // const regionResult = data.results.find((_ele: TicketClassification) => _ele.name === 'Region');
      // let newValueOptions = regionResult?.values.map((_item) => ({
      //   classification: {
      //     id: regionResult.id,
      //     name: regionResult.name
      //   },
      //   value: _item,
      //   label: _item
      // }));
      //console.log('🚀 ~ file: index.tsx:101 ~ newValueOptions ~ newValueOptions:', newValueOptions);
      // setClassificationOptions(newClassificationOptions);
    }
    // setRows(data?.results);
    //}
  }, [data]);

  useEffect(() => {
    if (!isLoading && data?.results) {
      let newRegionOptions: ClassifficationValue[] = [];
      let newLangOptions: ClassifficationValue[] = [];
      const regionResult = data.results.find((_ele: TicketClassification) => _ele.name === 'Region');
      console.log('🚀 ~ file: index.tsx:86 ~ useEffect ~ regionResult:', regionResult);
      if (regionResult) {
        newRegionOptions = regionResult?.values?.map((_ele: string) => ({
          classification: {
            id: regionResult.id,
            name: regionResult.name
          },
          value: _ele,
          label: _ele
        }));
        console.log('🚀 ~ file: index.tsx:88 ~ newRegionOptions=regionResult?.values?.map ~ newRegionOptions:', newRegionOptions);
        setRegionOptions(newRegionOptions);
      }
      const languageResult = data.results.find((_ele: TicketClassification) => _ele.name === 'Language');
      if (languageResult) {
        newLangOptions = languageResult?.values?.map((_ele: string) => ({
          classification: {
            id: languageResult.id,
            name: languageResult.name
          },
          value: _ele,
          label: _ele
        }));
        setLanguageOptions(newLangOptions);
      }
      const departmentResult = data.results.find((_ele: TicketClassification) => _ele.name === 'Department');
      if (departmentResult) {
        newLangOptions = departmentResult?.values?.map((_ele: string) => ({
          classification: {
            id: departmentResult.id,
            name: departmentResult.name
          },
          value: _ele,
          label: _ele
        }));
        console.log('🚀 ~ file: index.tsx:113 ~ newLangOptions=departmentResult?.values?.map ~ newLangOptions:', newLangOptions);
        setLanguageOptions(newLangOptions);
      }
      // const elseResult = data.results.find((_ele: TicketClassification) => _ele.name !== 'Language' && _ele.name !== 'Region');
      // if (elseResult) {
      //   newLangOptions = elseResult?.values?.map((_ele: string) => ({
      //     classification: {
      //       id: elseResult.id,
      //       name: elseResult.name
      //     },
      //     value: _ele,
      //     label: _ele
      //   }));
      //   setLanguageOptions(newLangOptions);
      // }
    }
  }, [data]);

  useEffect(() => {
    if (countryPhones.length > 0) {
      const defaultPhone = countryPhones.find((_ele: any) => _ele.isDefault);
      if (defaultPhone) {
        // fix customer update view mobiles
        const newRows = rows?.map((_ele: any) => ({ ..._ele, country: defaultPhone.phoneCode }));
        setRows(newRows);
        onChange && onChange(isMultiple ? newRows : newRows[0]);
      }
    }
  }, [countryPhones]);

  //value change
  const handleValueChange = (index: number, keyName: string, keyValue: any) => {
    const newRows = [...rows];
    // newRows[index].label.keyName = keyValue;
    newRows[index] = keyValue;
    setRows(newRows);
    console.log('🚀 ~ file: index.tsx:141 ~ handleValueChange ~ newRows:', newRows);
  };

  const handleAddMore = () => {
    // const defaultPhone = countryPhones.find((_ele: any) => _ele.isDefault);
    // const newDefaultRow = {value={row.labelValue}
    //   // ...defaultRow,
    //   label: {
    //     languageKey: t(`ncrm_common_label_personal`),
    //     label: 'test'
    //   },
    // };
    // let newRows = [...rows, newDefaultRow];
    const newRows = [...rows];
    newRows.push({});
    setRows(newRows);

    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  console.log('🚀 ~ file: index.tsx:171 ~ Classification ~ rows:', rows);
  console.log('🚀 ~ file: index.tsx:37 ~ Classification ~ classificationOptions:', classificationOptions);

  return (
    <>
      <Stack spacing={0.5}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1} direction="row" alignItems="center">
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                <SpanLang
                  sx={{ fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary }}
                  keyLang="Classification"
                />
              </InputLabel>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1} direction="row" alignItems="center">
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary }} keyLang="Value" />
              </InputLabel>
            </Stack>
          </Grid>
        </Grid>

        {rows?.map((row, index) => (
          <>
            <Stack spacing={2} direction="row">
              <Grid item xs={12} lg={6}>
                <Autocomplete
                  freeSolo
                  id="asynchronous-classification-name"
                  renderInput={(params) => <TextField placeholder={t(classificationPlaceholder) as string} {...params} />}
                  getOptionLabel={(option: any) => option?.label ?? ''}
                  options={classificationOptions}
                  onChange={(event, value) => {
                    handleValueChange(index, '', value);
                  }}
                  //readOnly
                  defaultValue={classificationOptions[index]}
                  //value={row?.name}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Autocomplete
                  freeSolo
                  id="asynchronous-classification-value"
                  renderInput={(params) => <TextField placeholder={t(valuePlaceholder) as string} {...params} />}
                  getOptionLabel={(option: any) => option?.label ?? ''}
                  options={valueOptions}
                  onChange={(event, value) => {
                    handleValueChange(index, '', value);
                  }}
                  //value={row?.value}
                  value={''}
                />
              </Grid>
            </Stack>
          </>
        ))}

        <Box
          sx={{
            pt: 2,
            borderRadius: '4px',
            borderTop: '2px',
            backgroundColor: `${theme.palette.background.paper}`
          }}
        >
          <Button variant="contained" size="small" color="primary" onClick={handleAddMore}>
            <AddIcon fontSize="small" sx={{ mr: 1 }} />
            {t('Add another line')}
          </Button>
        </Box>
      </Stack>
      {/* <Grid container>
        <Grid item xs={12} lg={6} sx={{ pr: 1, mb: 1 }}>
          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                <SpanLang
                  sx={{ fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary }}
                  keyLang="Classifications"
                />
              </InputLabel>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ pl: 1, mb: 1 }}>
          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary }} keyLang="Value" />
              </InputLabel>
            </Stack>
          </Stack>
        </Grid>
        {rows.map((row, indx) => {
          return (
            <Grid item xs={12} lg={6} sx={{ pl: 1, mb: 1 }}>
              <Suspense fallback={<></>}>
                <Autocomplete
                  id="asynchronous-language-value"
                  renderInput={(params) => <TextField value={curLanguage} placeholder={t(languagePlaceholder) as string} {...params} />}
                  getOptionLabel={(option: any) => option?.label ?? ''}
                  options={languageOptions}
                  onChange={(event, value) => handleValueChange('language', value)}
                  value={curLanguage}
                />
              </Suspense>
            </Grid>
          );
        })}
        <Grid
          item
          xs={12}
          sx={{
            padding: '15px 20px',
            borderBottomRightRadius: '4px',
            borderBottomLeftRadius: '4px',
            borderTop: '2px',
            backgroundColor: `${theme.palette.background.paper}`
          }}
        >
          <Button variant="contained" size="small" color="primary" onClick={handleAddMore}>
            <AddIcon fontSize="small" sx={{ mr: 1 }} />
            {t('ncrm_common_btn_add')}
          </Button>
        </Grid>
      </Grid> */}
    </>
  );
};

export default Classification;
