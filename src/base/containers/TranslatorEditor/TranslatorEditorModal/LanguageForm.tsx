import MuiRadioGroup from '@base/components/@hanbiro/RadioGroup';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import { Box, Button, Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { defaultLangValues, menuData, keyNames } from '@base/containers/TranslatorEditor/TranslatorEditorModal/config';

/**
 */
const LanguageForm = (props: any) => {
  const { langValueError, control, errors, watch, setValue, reset, checkLangValueError, isCopy } = props;

  const theme = useTheme();

  const typeMenu = watch(keyNames.KEY_NAME_TRANSLATOR_EDITOR_MENU);
  const idTranslator = watch(keyNames.KEY_NAME_TRANSLATOR_EDITOR_ID);
  const langKeyField = watch(keyNames.KEY_NAME_TRANSLATOR_EDITOR_LANGKEY);

  useEffect(() => {
    if (idTranslator === '' && !isCopy) {
      setValue(keyNames.KEY_NAME_TRANSLATOR_EDITOR_LANGKEY, `ncrm_${typeMenu?.value}_`);
    }
  }, [typeMenu]);

  //main render
  return (
    <Box sx={{ mt: 3, px: '50px' }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ mr: 3, fontWeight: 500, color: theme.palette.grey[600] }}>Type</Typography>

          <WriteField
            item={{
              keyName: keyNames.KEY_NAME_TRANSLATOR_EDITOR_SYSTEM,
              Component: MuiRadioGroup,
              componentProps: {
                options: [
                  { value: 'all', label: 'All' },
                  { value: 'server', label: 'Server' },
                  { value: 'client', label: 'Client' }
                ]
              }
            }}
            control={control}
            errors={errors}
          />
        </Stack>

        <Button size="small" variant="contained" color="primary" onClick={() => reset()}>
          Reset New
        </Button>
      </Stack>

      {/* write field */}

      <Grid container spacing={2}>
        {defaultLangValues?.map((field: any, index: number) => {
          if (field.id === keyNames.KEY_NAME_TRANSLATOR_EDITOR_ID) {
            return null;
          }

          if (field.id === keyNames.KEY_NAME_TRANSLATOR_EDITOR_MENU) {
            const customMenu = menuData?.map((ele: any) => ({
              ...ele,
              keyName: ele.value,
              languageKey: ele.label
            }));
            return (
              <WriteField
                key={field.id}
                item={{
                  keyName: field.id,
                  languageKey: field.label,
                  Component: SelectBox,
                  componentProps: {
                    options: customMenu
                  }
                }}
                control={control}
                errors={errors}
              />
            );
          }

          return (
            <WriteField
              key={index}
              item={{
                keyName: field.id,
                languageKey: field.label,
                Component: TextField,
                componentProps: {},
                validate:
                  field.id === keyNames.KEY_NAME_TRANSLATOR_EDITOR_LANGKEY
                    ? {
                        // required: validators.required
                        required: (value: any) => {
                          let nValue: string = value;
                          if (nValue === `crm_${typeMenu?.value}_`) {
                            nValue = '';
                          }
                          return validators.required(nValue);
                        }
                      }
                    : {}
              }}
              control={control}
              errors={errors}
            />
          );
        })}
      </Grid>
      {langValueError && checkLangValueError && <Typography color="error">Language values are required at least ONE.</Typography>}
    </Box>
  );
};

export default LanguageForm;
