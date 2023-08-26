import React, { createContext, Ref, useState } from 'react';
import validators from '@base/utils/validation/fieldValidator';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
//material
import { Box, Grid, Step, StepLabel, Stepper, TextField, useTheme, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import * as baseComponents from '@base/config/write-field/components';
import LangSelect from '@base/components/@hanbiro/LangSelect';
import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import WriteField from '@base/containers/WriteField';
import {
  LANDING_PAGE_TYPE_OPTIONS,
  LANDING_PAGE_FORM_PUBLISH_TYPE_OPTIONS,
  LANDING_PAGE_PUBLISH_LATER
} from '@settings/digital/landing-page/config/constants';
import { TemplateGroup } from '@settings/template/types/template';
import { GrapesTS, ProductAutoComplete, TextArea } from '@settings/digital/landing-page/config/write-field/components';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';
import SiteTemplateSelect from '@settings/template/containers/SiteTemplateSelect';
import { GRAPEJS_TEMPLATE_TYPE_LANDING_PAGE } from '@base/components/@hanbiro/GrapeTS/config/constants';
import SelectBoxCustom from '@base/components/@hanbiro/SelectBoxCustom';
import LandingPageTemplateSelect from '../LandingPageTemplateSelect';
import WriteStepper from '@base/components/@hanbiro/WriteStepper';
interface HtmlContext {
  htmlSource: null | { [x: string]: string };
  changeHtmlSource: Function;
}
export const HTMLContext = createContext<HtmlContext>({ htmlSource: null, changeHtmlSource: Function });
interface WriteFieldsProps {
  fullScreen?: boolean;
  templateGroup?: TemplateGroup;
  watch: UseFormWatch<any>; //hook-form
  getValues: any;
  setValue: any;
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  activeStep: number;
  sequence: Ref<any>;
  steps: any[];
  templateSelectType?: any;
}
const WriteFields = (props: WriteFieldsProps) => {
  const { fullScreen = false, activeStep, control, errors, watch, sequence, steps, getValues, setValue, templateSelectType } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const publishTypeWatch = watch(keyNames.KEY_NAME_LANDING_PAGE_PUBLISH);
  const changeHtmlSource = (item: { [x: string]: string }) => {
    setHtmlContext((prev) => {
      return { htmlSource: { ...prev.htmlSource, ...item }, changeHtmlSource };
    });
  };

  const [htmlContext, setHtmlContext] = useState<HtmlContext>({
    htmlSource: null,
    changeHtmlSource
  });
  //======================== Debug ========================//
  // console.log('form values htmlContext', htmlContext); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  // console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  // let formHeight = 'calc(100vh - 280px)';
  // if (fullScreen) {
  //   formHeight = 'calc(100vh - 205px)';
  // }

  const FirstStepFields = () => {
    return (
      <>
        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_LANDING_PAGE_TYPE,
            Component: SelectBoxCustom,
            columns: 1,
            componentProps: {
              disableClearable: true,
              options: LANDING_PAGE_TYPE_OPTIONS.map((item) => {
                return {
                  ...item,
                  label: t(item.languageKey)
                };
              })
            },
            languageKey: t('ncrm_generalsetting_landing_page_field_basic_type'),
            section: 0,
            tooltipShow: false,
            validate: {
              required: validators.required
            }
          }}
          control={control}
          errors={errors}
        />

        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_LANDING_PAGE_NAME,
            Component: TextField,
            columns: 1,
            componentProps: {
              placeholder: ''
            },
            languageKey: t('ncrm_generalsetting_landing_page_field_basic_name'),
            section: 0,
            tooltipShow: false,
            validate: {
              required: validators.required
            }
          }}
          control={control}
          errors={errors}
        />

        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_LANDING_PAGE_LANGUAGE,
            Component: LangSelect,
            columns: 1,
            componentProps: {
              default: 'en'
            },
            getValue: (val: any) => {
              return val?.value;
            },
            languageKey: t('ncrm_generalsetting_landing_page_field_basic_language'),
            section: 0,
            tooltipShow: false,
            validate: {
              required: validators.required
            }
          }}
          control={control}
          errors={errors}
        />

        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_LANDING_PAGE_PRODUCT,
            Component: ProductAutoComplete,
            columns: 1,
            componentProps: {
              showAllOption: true
            },
            languageKey: t('ncrm_generalsetting_landing_page_field_basic_product'),
            section: 0,
            tooltipShow: false,
            validate: {}
          }}
          control={control}
          errors={errors}
        />

        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_LANDING_PAGE_DESCRIPTION,
            Component: TextArea,
            columns: 1,
            componentProps: {
              fullWidth: true,
              autoComplete: 'off',
              multiline: true,
              rows: 4
            },
            languageKey: t('ncrm_generalsetting_landing_page_field_basic_description'),
            section: 0,
            tooltipShow: false,
            validate: {}
          }}
          control={control}
          errors={errors}
        />

        {/* <WriteField
          item={{
            keyName: keyNames.KEY_NAME_LANDING_PAGE_ASSIGN_TO,
            Component: UserAutoComplete,
            columns: 1,
            componentProps: {},
            languageKey: t('ncrm_generalsetting_landing_page_field_basic_assignto'),
            section: 0,
            tooltipShow: false,
            validate: {}
          }}
          control={control}
          errors={errors}
        /> */}
      </>
    );
  };

  const SecondStepFields = () => {
    return (
      <>
        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_LANDING_PAGE_HTML,
            Component: LandingPageTemplateSelect,
            columns: 1,
            componentProps: {
              fullWidth: true,
              templateSelectType: templateSelectType
            },
            languageKey: '',
            section: 0,
            tooltipShow: false,
            validate: {}
          }}
          control={control}
          errors={errors}
        />
      </>
    );
  };

  const ThirdStepFields = () => {
    return (
      <>
        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_LANDING_PAGE_TITLE,
            Component: TextField,
            columns: 1,
            componentProps: {
              placeholder: t('ncrm_generalsetting_landing_page_field_title_placeholder')
            },
            languageKey: t('ncrm_generalsetting_landing_page_field_basic_title'),
            section: 0,
            tooltipShow: false,
            validate: {
              required: validators.required
            }
          }}
          control={control}
          errors={errors}
        />

        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_LANDING_PAGE_HTML,
            Component: GrapesTS,
            columns: 1,
            componentProps: {
              storageId: 'landing-page',
              isFullScreen: fullScreen,
              height: 'calc(100vh - 100px)',
              templateType: GRAPEJS_TEMPLATE_TYPE_LANDING_PAGE
            },
            languageKey: '',
            section: 0,
            tooltipShow: false
          }}
          control={control}
          errors={errors}
        />
      </>
    );
  };

  const LastStepFields = () => {
    return (
      <>
        <WriteField
          item={{
            keyName: keyNames.KEY_NAME_LANDING_PAGE_PUBLISH,
            Component: RadioGroup,
            componentProps: {
              value: LANDING_PAGE_FORM_PUBLISH_TYPE_OPTIONS[0].value,
              children: LANDING_PAGE_FORM_PUBLISH_TYPE_OPTIONS.map((_option: any) => (
                <FormControlLabel key={_option.value} value={_option.value} control={<Radio />} label={t(_option.languageKey)} />
              ))
            },
            languageKey: t('ncrm_generalsetting_landing_page_field_basic_publish_or_schedule')
          }}
          control={control}
          errors={errors}
        />

        {getValues(keyNames.KEY_NAME_LANDING_PAGE_PUBLISH) === LANDING_PAGE_PUBLISH_LATER && (
          <Box sx={{ width: '50%', mt: 2 }}>
            <WriteField
              item={{
                keyName: keyNames.KEY_NAME_LANDING_PAGE_PUBLISH_DATE,
                Component: baseComponents.DatePicker,
                componentProps: {
                  // minDate: initDate, // use minDate
                },
                languageKey: t('ncrm_generalsetting_landing_page_field_basic_publishdate'),
                validate: {
                  required: (value: Date | string) =>
                    dayjs(value).isAfter(new Date()) || (t('ncrm_generalsetting_landing_page_field_basic_publishdate_validate') as string) //Check the day for schedule can not be a day in past
                },
                defaultValue: dayjs(),
                parseParam: (v: Date) => (v ? v.toISOString() : null)
              }}
              control={control}
              errors={errors}
            />
          </Box>
        )}
      </>
    );
  };

  return (
    <HTMLContext.Provider value={htmlContext}>
      <Grid container>
        <Grid item xs={2} lg={2}></Grid>
        <Grid item xs={8} lg={8}>
          <WriteStepper activeStep={activeStep} steps={steps} />
        </Grid>
        <Grid item xs={2} lg={2}></Grid>
      </Grid>

      <Grid sx={{ p: 2, pt: 0 }} container rowSpacing={2} alignItems="center">
        {activeStep == 0 && FirstStepFields()}
        {activeStep == 1 && SecondStepFields()}
        {activeStep == 2 && ThirdStepFields()}
        {activeStep == 3 && LastStepFields()}
      </Grid>
    </HTMLContext.Provider>
  );
};

export default WriteFields;
