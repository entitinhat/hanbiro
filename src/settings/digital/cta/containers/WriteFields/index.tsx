import React, { useEffect, useMemo } from 'react';

// material-ui
import { Box, Button, Divider, Grid, InputAdornment, Slider, Stack, TextField, Typography, useTheme } from '@mui/material';

// third-party
import { Control, FieldErrorsImpl, UseFormSetValue, UseFormWatch } from 'react-hook-form';

// project imports
import WriteField from '@base/containers/WriteField';

//config
import { Customer } from '@customer/types/interface';
import CtaPreview from '@settings/digital/cta/components/CtaPreview';
import * as constants from '@settings/digital/cta/config/constants';
import * as keyNames from '@settings/digital/cta/config/keyNames';
import * as components from '@settings/digital/cta/config/write-field/components';
import { t } from 'i18next';
import { FilterInput } from '@base/types/common';
import { SITE_GROUP_OPTION_NUMBER } from '@settings/site/config/constants';

interface CtaWriteFieldsProps {
  menuApi: string;
  type?: any; //customer type
  account?: Customer;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: CtaWriteFieldsProps) => {
  const { fields, watch, control, errors, setValue } = props;
  console.log('🚀 ~ file: index.tsx:34 ~ WriteFields ~ fields', fields);
  const theme = useTheme();
  //state

  //watching
  const ctaType = watch(keyNames.KEY_SETTING_CTA_TYPE);
  const linkType = watch(keyNames.KEY_SETTING_CTA_LINK_TYPE);
  const imageData = watch(keyNames.KEY_SETTING_CTA_IMAGE_URL);
  const imageSize = watch(keyNames.KEY_SETTING_CTA_IMAGE_SIZE);
  const altText = watch(keyNames.KEY_SETTING_CTA_IMAGE_ALT);

  const txtValue = watch(keyNames.KEY_SETTING_CTA_TEXT_VALUE);
  const bgColor = watch(keyNames.KEY_SETTING_CTA_TEXT_BG_COLOR);
  const textColor = watch(keyNames.KEY_SETTING_CTA_TEXT_TEXT_COLOR);
  const fontSize = Number(watch(keyNames.KEY_SETTING_CTA_TEXT_FONT_SIZE));
  const fontWeight = watch(keyNames.KEY_SETTING_CTA_TEXT_FONT_WEIGHT);
  const bdRounded = watch(keyNames.KEY_SETTING_CTA_TEXT_ROUNDED);

  const contentType = watch(keyNames.KEY_SETTING_CTA_CONTENT_TYPE);
  const landingPage = watch(keyNames.KEY_SETTING_CTA_LANDINGPAGE);
  const site = watch(keyNames.KEY_SETTING_CTA_SITE);
  const survey = watch(keyNames.KEY_SETTING_CTA_SURVEY);
  const landingPageType = watch(keyNames.KEY_SETTING_CTA_LANDINGPAGE_TYPE);
  const siteType = watch(keyNames.KEY_SETTING_CTA_SITE_TYPE);
  const surveyType = watch(keyNames.KEY_SETTING_CTA_SURVEY_TYPE);

  useEffect(() => {
    setValue(keyNames.KEY_SETTING_CTA_LANDINGPAGE_TITLE, landingPage?.title);
  }, [landingPage]);

  useEffect(() => {
    setValue(keyNames.KEY_SETTING_CTA_SITE_TITLE, site?.name);
  }, [site]);

  useEffect(() => {
    setValue(keyNames.KEY_SETTING_CTA_SURVEY_TITLE, survey?.title);
  }, [survey]);

  //top fields
  const TopFields = useMemo(() => {
    const typeField: any = fields.find((item) => item.keyName === keyNames.KEY_SETTING_CTA_TYPE);
    // image fields
    const imageUploadField: any = fields.find((item) => item.keyName === keyNames.KEY_SETTING_CTA_IMAGE_URL);
    const imageSizeField: any = fields.find((item) => item.keyName === keyNames.KEY_SETTING_CTA_IMAGE_SIZE);
    const imageAltField: any = fields.find((item) => item.keyName === keyNames.KEY_SETTING_CTA_IMAGE_ALT);

    // text fields
    const getItemTextField: any = (type: string, keyName: any, languageKey: string) => {
      return {
        Component: TextField,
        componentProps: {
          type,
          sx: {
            width: type === 'text' ? '100%' : '100px'
          }
        },
        columns: type === 'text' ? 1 : 3,
        keyName,
        languageKey: t(languageKey)
      };
    };

    return (
      <>
        <WriteField key={typeField?.keyName} item={typeField} control={control} errors={errors} />
        {(ctaType?.keyName === constants.SETTING_CTA_TYPE_IMAGE || ctaType?.keyName === constants.SETTING_CTA_TYPE_TEXT) && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {ctaType?.keyName === constants.SETTING_CTA_TYPE_IMAGE && (
                <>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                      <WriteField
                        key={imageUploadField?.keyName}
                        item={{ ...imageUploadField, columns: 1, componentProps: { ...imageUploadField.componentProps, imageData } }}
                        control={control}
                        errors={errors}
                      />
                      <WriteField
                        key={imageSizeField?.keyName}
                        item={{ ...imageSizeField, columns: 1 }}
                        control={control}
                        errors={errors}
                      />
                      <WriteField key={imageAltField?.keyName} item={{ ...imageAltField, columns: 1 }} control={control} errors={errors} />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CtaPreview image={imageData} imageSize={imageSize} altText={altText} />
                  </Grid>
                </>
              )}

              {ctaType?.keyName === constants.SETTING_CTA_TYPE_TEXT && (
                <>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2} flexDirection="column">
                      <WriteField
                        key={keyNames.KEY_SETTING_CTA_TEXT_VALUE}
                        item={{ ...getItemTextField('text', keyNames.KEY_SETTING_CTA_TEXT_VALUE, 'ncrm_generalsetting_cta_txt_value') }}
                        control={control}
                        errors={errors}
                      />
                      <WriteField
                        key={keyNames.KEY_SETTING_CTA_TEXT_BG_COLOR}
                        item={{
                          ...getItemTextField('color', keyNames.KEY_SETTING_CTA_TEXT_BG_COLOR, 'ncrm_generalsetting_cta_txt_bg_color')
                        }}
                        control={control}
                        errors={errors}
                      />
                      <WriteField
                        key={keyNames.KEY_SETTING_CTA_TEXT_TEXT_COLOR}
                        item={{
                          ...getItemTextField('color', keyNames.KEY_SETTING_CTA_TEXT_TEXT_COLOR, 'ncrm_generalsetting_cta_txt_text_color')
                        }}
                        control={control}
                        errors={errors}
                      />
                      <WriteField
                        key={keyNames.KEY_SETTING_CTA_TEXT_FONT_SIZE}
                        item={{
                          Component: TextField,
                          componentProps: {
                            type: 'number',
                            InputProps: {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Stack direction="row" alignItems="center">
                                    <Divider orientation="vertical" flexItem />
                                    <Typography color="secondary" sx={{ pl: '14px' }}>
                                      px
                                    </Typography>
                                  </Stack>
                                </InputAdornment>
                              )
                            }
                          },
                          columns: 2,
                          keyName: keyNames.KEY_SETTING_CTA_TEXT_FONT_SIZE,
                          languageKey: t('ncrm_generalsetting_cta_txt_font_size')
                        }}
                        control={control}
                        errors={errors}
                      />

                      <WriteField
                        key={keyNames.KEY_SETTING_CTA_TEXT_FONT_WEIGHT}
                        item={{
                          Component: components.SelectBox,
                          componentProps: {
                            options: constants.SETTING_CTA_TEXT_FONT_WEIGHT_OPTIONS
                          },
                          columns: 2,
                          keyName: keyNames.KEY_SETTING_CTA_TEXT_FONT_WEIGHT,
                          languageKey: t('ncrm_generalsetting_cta_txt_font_weight')
                        }}
                        control={control}
                        errors={errors}
                      />
                      <WriteField
                        key={keyNames.KEY_SETTING_CTA_TEXT_ROUNDED}
                        item={{
                          Component: Slider,
                          componentProps: {
                            valueLabelDisplay: 'auto',
                            step: 1
                          },
                          columns: 2,
                          keyName: keyNames.KEY_SETTING_CTA_TEXT_ROUNDED,
                          languageKey: t('ncrm_generalsetting_cta_txt_rounded')
                        }}
                        control={control}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Stack direction="column" sx={{ height: '100%' }}>
                      <Typography>{t('ncrm_generalsetting_cta_preview')}</Typography>
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        flexGrow={1}
                        sx={{
                          mt: '5px',
                          height: '100%',
                          bgcolor: theme.palette.grey[100],
                          borderRadius: 1
                        }}
                      >
                        <Box
                          sx={{
                            '& button': {
                              padding: '10px 20px',
                              backgroundColor: bgColor ?? '',
                              color: textColor ?? '',
                              borderRadius: bdRounded == 0 ? 0 : `${bdRounded}px`
                            },
                            '& button:hover': {
                              backgroundColor: bgColor ?? '',
                              opacity: 0.9
                            },
                            '& button:active': {
                              boxShadow: `0 0 2px 2px ${bgColor}`
                            },
                            '& button::after': {
                              boxShadow: `none`
                            }
                          }}
                        >
                          <Button size="small">
                            <Typography
                              sx={{
                                color: textColor ?? '',
                                fontSize: fontSize ?? 11,
                                fontWeight: fontWeight?.value ?? 'normal'
                              }}
                            >
                              {txtValue ?? ''}
                            </Typography>
                          </Button>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        )}
      </>
    );
  }, [fields]);

  //main fields
  const MainFields = useMemo(() => {
    const LANDINGPAGE_FIELDS: string[] = [
      keyNames.KEY_SETTING_CTA_LANDINGPAGE_TYPE,
      keyNames.KEY_SETTING_CTA_LANDINGPAGE,
      keyNames.KEY_SETTING_CTA_LANDINGPAGE_TITLE
    ];

    const SITE_FIELDS: string[] = [keyNames.KEY_SETTING_CTA_SITE_TYPE, keyNames.KEY_SETTING_CTA_SITE, keyNames.KEY_SETTING_CTA_SITE_TITLE];

    const SURVEY_FIELDS: string[] = [
      keyNames.KEY_SETTING_CTA_SURVEY_TYPE,
      keyNames.KEY_SETTING_CTA_SURVEY,
      keyNames.KEY_SETTING_CTA_SURVEY_TITLE
    ];

    const INTERNAL_FIELDS: string[] = [keyNames.KEY_SETTING_CTA_CONTENT_TYPE, ...LANDINGPAGE_FIELDS, ...SITE_FIELDS, ...SURVEY_FIELDS];

    const EXTERNAL_FIELDS: string[] = [keyNames.KEY_SETTING_CTA_EXT_SITE_NAME, keyNames.KEY_SETTING_CTA_LINK_URL];

    const MAIN_FIELDS: string[] = [
      keyNames.KEY_SETTING_CTA_NAME,
      keyNames.KEY_SETTING_CTA_LANGUAGE,
      keyNames.KEY_SETTING_CTA_LINK_TYPE,
      ...EXTERNAL_FIELDS,
      ...INTERNAL_FIELDS,
      keyNames.KEY_SETTING_CTA_DESCRIPTION
    ];
    return (
      <>
        {fields?.map((field: any, index: number) => {
          if (MAIN_FIELDS.indexOf(field.keyName) >= 0) {
            if (linkType?.value == constants.SETTING_CTA_LINK_TYPE_EXTERNAL && INTERNAL_FIELDS.includes(field.keyName)) {
              return null;
            }

            if (linkType?.value == constants.SETTING_CTA_LINK_TYPE_INTERNAL && EXTERNAL_FIELDS.includes(field.keyName)) {
              return null;
            }

            if (
              contentType?.value == constants.SETTING_CTA_CONTENT_TYPE_LANDING_PAGE &&
              (SITE_FIELDS.includes(field.keyName) || SURVEY_FIELDS.includes(field.keyName))
            ) {
              return null;
            }

            if (
              contentType?.value == constants.SETTING_CTA_CONTENT_TYPE_SITE &&
              (LANDINGPAGE_FIELDS.includes(field.keyName) || SURVEY_FIELDS.includes(field.keyName))
            ) {
              return null;
            }

            if (
              contentType?.value == constants.SETTING_CTA_CONTENT_TYPE_SURVEY &&
              (SITE_FIELDS.includes(field.keyName) || LANDINGPAGE_FIELDS.includes(field.keyName))
            ) {
              return null;
            }

            // filter landing-page with type
            if (field.keyName == keyNames.KEY_SETTING_CTA_LANDINGPAGE && landingPageType?.value != '') {
              const newComponentProps = {
                ...field.componentProps,
                filter: { query: `type="${landingPageType?.value}"` } as FilterInput
              };
              field.componentProps = newComponentProps;
            }

            if (field.keyName == keyNames.KEY_SETTING_CTA_SITE && siteType?.value != '') {
              const newComponentProps = {
                ...field.componentProps,
                filter: { query: `siteGroup=${SITE_GROUP_OPTION_NUMBER[siteType?.value]}` } as FilterInput
              };
              field.componentProps = newComponentProps;
            }

            if (field.keyName == keyNames.KEY_SETTING_CTA_SURVEY && surveyType?.value != '') {
              const newComponentProps = {
                ...field.componentProps,
                filter: { query: `type="${surveyType?.value}"` } as FilterInput
              };
              field.componentProps = newComponentProps;
            }

            return <WriteField key={field.keyName} item={field} control={control} errors={errors} />;
          }
        })}
      </>
    );
  }, [fields, linkType, contentType, landingPageType, siteType, surveyType]);

  //render
  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2}>
        {TopFields}
        {MainFields}
      </Grid>
    </Box>
  );
};

export default WriteFields;
