import React, { Ref } from 'react';
import validators from '@base/utils/validation/fieldValidator';
//material
import { Box, Grid, Step, StepLabel, Stepper, TextField, useTheme } from '@mui/material';
import * as keyNames from '@settings/template/config/key-names';

import WriteField from '@base/containers/WriteField';
import { TEMPLATE_MESSAGE_TYPE_OPTIONS, TEMPLATE_TASK_TYPE_OPTIONS, TEMPLATE_TYPE_OPTIONS } from '@settings/template/config/constants';

import { TemplateGroup } from '@settings/template/types/template';
import {
  DomEditor,
  GrapesTS,
  LanguageSelect,
  ProductAutoComplete,
  SelectBoxCustom,
  SequenceTaskContainer,
  SiteTemplateSelect,
  OnetimeTable
} from '@settings/template/config/write-fields/components';

import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface WriteFieldsProps {
  fullScreen?: boolean;
  templateGroup: TemplateGroup;
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  activeStep: number;
  sequence: Ref<any>;
  steps: string[];
}
const WriteFields = (props: WriteFieldsProps) => {
  const { fullScreen = false, templateGroup, activeStep, control, errors, watch, sequence, steps } = props;

  const theme = useTheme();
  const {t} = useTranslation();

  // ======================================Watch==========================================
  const subType = watch(keyNames.KEY_MENU_TEMPLATE_SUB_TYPE);
  const templateType = watch(keyNames.KEY_MENU_TEMPLATE_TYPE);
  const isSequenceTask = subType?.value == 'SUB_TYPE_TASK_CHECK_LIST' || subType?.value == 'SUB_TYPE_TASK_SEQUENCE';
  const isQuote = templateGroup === keyNames.KEY_MENU_TEMPLATE_QUOTE;

  //========================================End========================================

  const getGrapesType = (templateGroup: TemplateGroup) => {
    let grapesType = 'medium';
    if (templateGroup == keyNames.KEY_MENU_TEMPLATE_SMS || templateGroup == keyNames.KEY_MENU_TEMPLATE_TASK) {
      grapesType = subType?.value === 'SUB_TYPE_MESSAGE_MMS' ? 'simple' : 'basic';
    } else {
      grapesType = templateGroup === keyNames.KEY_MENU_TEMPLATE_CALL ? 'simple' : 'medium';
    }
    return templateGroup;
    //return grapesType;
  };

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//
  let formHeight = 'calc(100vh - 280px)';
  if (fullScreen) {
    formHeight = 'calc(100vh - 205px)';
  }
  const FirstStepFields = () => {
    return (
      <>
        <WriteField
          item={{
            keyName: keyNames.KEY_MENU_TEMPLATE_NAME,
            Component: TextField,
            columns: 1,
            componentProps: {
              placeholder: t('ncrm_setting_template_type_your_template_name')//Type your template name
            },
            languageKey: 'ncrm_setting_template_template_name',
            section: 0,
            tooltipShow: false,
            validate: {
              required: validators.required
            }
          }}
          control={control}
          errors={errors}
        />
        {templateGroup == keyNames.KEY_MENU_TEMPLATE_SMS ? (
          <WriteField
            item={{
              keyName: keyNames.KEY_MENU_TEMPLATE_SUB_TYPE,
              Component: SelectBoxCustom,
              columns: 1,
              componentProps: {
                options: TEMPLATE_MESSAGE_TYPE_OPTIONS
              },
              languageKey: 'ncrm_setting_template_message_type',
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required
              }
            }}
            control={control}
            errors={errors}
          />
        ) : (
          ''
        )}
        {templateGroup == keyNames.KEY_MENU_TEMPLATE_TASK ? (
          <WriteField
            item={{
              keyName: keyNames.KEY_MENU_TEMPLATE_SUB_TYPE,
              Component: SelectBoxCustom,
              columns: 1,
              componentProps: {
                options: TEMPLATE_TASK_TYPE_OPTIONS
              },
              languageKey: 'ncrm_setting_template_task_type',
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required
              }
            }}
            control={control}
            errors={errors}
          />
        ) : (
          ''
        )}
        {/* Template type */}
        <WriteField
          item={{
            keyName: keyNames.KEY_MENU_TEMPLATE_TYPE,
            Component: SelectBoxCustom,
            columns: 1,
            componentProps: {
              options: TEMPLATE_TYPE_OPTIONS
            },
            languageKey: 'ncrm_setting_template_template_type',
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
            keyName: keyNames.KEY_MENU_TEMPLATE_LANGUAGE,
            Component: LanguageSelect,
            columns: 1,
            componentProps: {},
            languageKey: 'ncrm_setting_template_language',
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
            keyName: keyNames.KEY_MENU_TEMPLATE_PRODUCT,
            Component: ProductAutoComplete,
            columns: 1,
            componentProps: {},
            languageKey: 'ncrm_setting_template_product',
            section: 0,
            tooltipShow: false,
            validate: {}
          }}
          control={control}
          errors={errors}
        />
        <WriteField
          item={{
            keyName: keyNames.KEY_MENU_TEMPLATE_DESCRIPTION,
            Component: TextField,
            columns: 1,
            componentProps: {
              fullWidth: true,
              autoComplete: 'off',
              multiline: true,
              rows: 4
            },
            languageKey: 'ncrm_setting_template_description',
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
  const SecondStepFields = () => {
    return (
      <React.Fragment>
        <WriteField
          item={{
            keyName: keyNames.KEY_MENU_TEMPLATE_DESIGN,
            Component: SiteTemplateSelect,
            columns: 1,
            componentProps: {
              fullWidth: true,
              templateGroup: templateGroup,
              templateType: templateType,
              subType: subType
            },
            languageKey: '',
            section: 0,
            tooltipShow: false,
            validate: {}
          }}
          control={control}
          errors={errors}
        />
      </React.Fragment>
    );
  };
  const LastStepFields = () => {
    return (
      <React.Fragment>
        <WriteField
          item={{
            keyName: keyNames.KEY_MENU_TEMPLATE_SUBJECT,
            Component: TextField,
            columns: 1,
            componentProps: {
              placeholder: t('ncrm_setting_template_type_your_subject_here')//Type your subject here
            },
            languageKey: 'ncrm_setting_template_subject',
            section: 0,
            tooltipShow: false,
            validate: {
              required: validators.required
            }
          }}
          control={control}
          errors={errors}
        />

        {isSequenceTask || isQuote ? (
          <Grid item xs={12}>
            <DomEditor>
              <Box ref={sequence} sx={{ position: 'absolute', padding: '10px', width: '100%' }}>
                <WriteField
                  item={{
                    keyName: keyNames.KEY_MENU_TEMPLATE_DESIGN,
                    Component: isSequenceTask ? SequenceTaskContainer : OnetimeTable,
                    columns: 1,
                    componentProps: {
                      mode: isSequenceTask ? 'write' : 'w'
                    },
                    languageKey: '',
                    section: 0,
                    tooltipShow: false,
                    validate: {}
                  }}
                  control={control}
                  errors={errors}
                />
              </Box>
            </DomEditor>
          </Grid>
        ) : (
          <WriteField
            item={{
              keyName: keyNames.KEY_MENU_TEMPLATE_DESIGN,
              Component: GrapesTS,
              columns: 1,
              componentProps: {
                isFullScreen: fullScreen,
                height: 'calc(100vh - 70px)',
                storageId: 'site-gts',
                templateType: getGrapesType(templateGroup),
                parentID: '#grapesJS'
              },
              languageKey: '',
              section: 0,
              tooltipShow: false
            }}
            control={control}
            errors={errors}
          />
        )}
      </React.Fragment>
    );
  };
  return (
    <>
      <Grid container>
        <Grid item xs={2} lg={2}></Grid>
        <Grid item xs={8} lg={8}>
          <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{t(label)}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item xs={2} lg={2}></Grid>
      </Grid>

      <Box
        id="grapesJS"
        className="scroll-box"
        sx={{
          height: formHeight,
          padding: '15px'
        }}
      >
        <Grid container rowSpacing={2} alignItems="center">
          {activeStep == 0 && FirstStepFields()}
          {activeStep == 1 && SecondStepFields()}
          {activeStep == 2 && LastStepFields()}
        </Grid>
      </Box>
    </>
  );
};

export default WriteFields;
