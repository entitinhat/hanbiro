import React, { useEffect, useMemo, useRef, useState } from 'react';
import validators from '@base/utils/validation/fieldValidator';
//material
import { Box, Button, Grid, Stack, Step, StepLabel, Stepper, TextField, useTheme } from '@mui/material';
import * as keyNames from '@settings/template/config/key-names';
//project
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ButtonOption } from '@base/types/extended';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import { useForm } from 'react-hook-form';

import { TEMPLATE_GROUP } from '@settings/template/config/constants';

import { useFormDefaultValues } from './utils';

import { parserSelectToIdName } from '@base/utils/helpers/configUtils';
import useMenuTemplateMutation from '@settings/template/hooks/useMenuTemplateMutation';
import { captureTheImage } from '@settings/template/utils/helper';

import { MainTemplate, TemplateGroup } from '@settings/template/types/template';

import { useMenuTemplateDetail } from '@settings/template/hooks/useMenuTemplateDetail';
import WriteFields from '@settings/template/containers/WriteFields';
import { ArrowBack } from '@mui/icons-material';
import { KEY_MENU_TEMPLATE_QUOTE } from '@settings/template/config/key-names';

interface WritePageProps {
  isOpen: boolean;
  fullScreen?: boolean;
  onReload?: () => void;
  onGoView?: (id: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
  title?: string;
  templateGroup: TemplateGroup;
  id?: string; //for edit
}

const steps = ['ncrm_setting_template_summary', 'ncrm_setting_template_select_a_template', 'ncrm_setting_template_design']; //['Summary', 'Select a Template', 'Design']
const WritePage = (props: WritePageProps) => {
  const {
    isOpen,
    fullScreen = false,
    onReload,
    onClose,
    onSuccess,
    onGoView,
    title,
    templateGroup,
    id = '' //for edit
  } = props;

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    //getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: useFormDefaultValues(templateGroup),
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  // state
  const [activeStep, setActiveStep] = useState<number>(0);
  //==============================Get Data from useForm ===========================
  const subType = watch(keyNames.KEY_MENU_TEMPLATE_SUB_TYPE);
  const isSequenceTask = subType?.value == 'SUB_TYPE_TASK_CHECK_LIST' || subType?.value == 'SUB_TYPE_TASK_SEQUENCE';

  //==============================================End=====================================
  const sequence = useRef(null);

  //get thumbnail base64
  async function getThumbnail(body: HTMLElement) {
    const thumbnailBase64 = await captureTheImage(body, 'desk_thumbnail');
    return thumbnailBase64;
  }

  const { mutationAdd, mutationUpdate, isSuccess, isLoading } = useMenuTemplateMutation();

  //========================init data for Edit mode =====================================
  const { data: postData, isLoading: isPostLoading } = useMenuTemplateDetail(id);
  useEffect(() => {
    if (id) {
      //// console.log('postData', postData);
      if (!isPostLoading && postData) {
        if (postData[keyNames.KEY_MENU_TEMPLATE_NAME]) {
          setValue(keyNames.KEY_MENU_TEMPLATE_NAME, postData[keyNames.KEY_MENU_TEMPLATE_NAME], {
            shouldValidate: true
          });
        }
        if (postData[keyNames.KEY_MENU_TEMPLATE_LANGUAGE]) {
          setValue(keyNames.KEY_MENU_TEMPLATE_LANGUAGE, postData[keyNames.KEY_MENU_TEMPLATE_LANGUAGE]);
        }
        if (postData[keyNames.KEY_MENU_TEMPLATE_PRODUCT]) {
          setValue(keyNames.KEY_MENU_TEMPLATE_PRODUCT, postData[keyNames.KEY_MENU_TEMPLATE_PRODUCT]);
        }
        if (postData[keyNames.KEY_MENU_TEMPLATE_OWNER]) {
          setValue(keyNames.KEY_MENU_TEMPLATE_OWNER, postData[keyNames.KEY_MENU_TEMPLATE_OWNER]);
        }
        if (postData[keyNames.KEY_MENU_TEMPLATE_DESCRIPTION]) {
          setValue(keyNames.KEY_MENU_TEMPLATE_DESCRIPTION, postData[keyNames.KEY_MENU_TEMPLATE_DESCRIPTION]);
        }
        if (postData[keyNames.KEY_MENU_TEMPLATE_SUBJECT]) {
          setValue(keyNames.KEY_MENU_TEMPLATE_SUBJECT, postData[keyNames.KEY_MENU_TEMPLATE_SUBJECT]);
        }
        if (postData.properties) {
          try {
            setValue(keyNames.KEY_MENU_TEMPLATE_DESIGN, JSON.parse(postData.properties));
          } catch (e) {}
        }
      }
    } else {
      reset();
    }
  }, [id, postData]);
  //========================================================================================

  useEffect(() => {
    //// console.log('<<< completed useEffect >>>', mutationAdd);
    if (isSuccess) {
      //refecth data
      onReload && onReload();
      onClose();
    }
  }, [isSuccess]);

  const getSubType = ({ group, formData }: any) => {
    let subType = 'SUB_TYPE_NONE';
    if (group == 'GROUP_TASK' || group == 'GROUP_SMS') {
      subType = formData[keyNames.KEY_MENU_TEMPLATE_SUB_TYPE].value;
    }
    return subType;
  };

  const getHtml = ({ group, formData }: any) => {
    let html;

    if (templateGroup === KEY_MENU_TEMPLATE_QUOTE) {
      const newItems = formData?.[keyNames.KEY_MENU_TEMPLATE_DESIGN] ?? [];
      /*const newItems = (formData?.[keyNames.KEY_MENU_TEMPLATE_DESIGN] ?? [])?.map((v: any) => {
        return {
          product: {
            id: v?.prod?.id,
            name: v?.prod?.name
          },
          productItem: {
            id: v?.id,
            name: v?.name
          },
          orderedQty: v?.orderedQty ?? 0
        };
      }) ?? [];*/
      return JSON.stringify(newItems);
    } else if (isSequenceTask) {
      html = JSON.stringify(formData[keyNames.KEY_MENU_TEMPLATE_DESIGN]);
    } else {
      html = JSON.stringify({
        html: formData[keyNames.KEY_MENU_TEMPLATE_DESIGN].html,
        css: formData[keyNames.KEY_MENU_TEMPLATE_DESIGN].css
      });
    }
    return html;
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // close
  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    handleSubmit((data) => onSubmit({ formData: data, isDraft: false }))();
  };

  //submit form
  const onSubmit = async ({ formData, isDraft }: any) => {
    let designThumbnailBase64: any = '';
    if ([KEY_MENU_TEMPLATE_QUOTE].includes(templateGroup) || isSequenceTask) {
      if (sequence.current) {
        designThumbnailBase64 = await getThumbnail(sequence.current);
      }
    } else {
      if (formData[keyNames.KEY_MENU_TEMPLATE_DESIGN].body) {
        const designBody = formData[keyNames.KEY_MENU_TEMPLATE_DESIGN].body;
        designThumbnailBase64 = await getThumbnail(designBody);
      }
    }

    //build add params and save
    let index = TEMPLATE_GROUP.findIndex((x) => x.key === templateGroup);
    let group = TEMPLATE_GROUP[index].value;

    const params: MainTemplate = {
      stage: isDraft === true ? 'STAGE_INACTIVE' : 'STAGE_ACTIVE',
      name: formData[keyNames.KEY_MENU_TEMPLATE_NAME],
      description: formData[keyNames.KEY_MENU_TEMPLATE_DESCRIPTION],
      group: group,
      type: formData[keyNames.KEY_MENU_TEMPLATE_TYPE].value,
      subType: getSubType({ group, formData }),
      products: parserSelectToIdName(formData[keyNames.KEY_MENU_TEMPLATE_PRODUCT]),
      // assignTo: parserSelectToIdNameObj(formData[keyNames.KEY_MENU_TEMPLATE_OWNER], 'user'),
      language: formData[keyNames.KEY_MENU_TEMPLATE_LANGUAGE].value,
      title: formData[keyNames.KEY_MENU_TEMPLATE_SUBJECT],
      html: getHtml({ group, formData })
    };
    if (designThumbnailBase64) {
      params.thumbnail = designThumbnailBase64;
    }
    if (id.length > 0) {
      params.id = id;
      mutationUpdate({ menuTemplate: params });
    } else {
      mutationAdd({ menuTemplate: params });
    }
    // console.log('params', designThumbnailBase64);
    // console.log('params', params);
    // console.log('params', formData[keyNames.KEY_MENU_TEMPLATE_DESIGN]);
  };

  // buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: activeStep <= steps.length - 2 ? 'ncrm_setting_template_next' : 'ncrm_setting_template_save', // 'Next' : 'Save'
        color: 'primary',
        onClick: activeStep <= steps.length - 2 ? handleNext : handleSave,
        disabled: !isValid || isLoading,
        isLoading: isLoading
      },
      {
        isMain: false,
        label: 'ncrm_setting_template_saved_as_draft', //'Saved as Draft.'
        color: 'secondary',
        onClick: () => {
          handleSubmit((data) => onSubmit({ formData: data, isDraft: true }))();
        },
        disabled: !isValid || isLoading || activeStep !== 2,
        isLoading: isLoading
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginRight: '10px' }}>
        <Grid item>
          <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
            <SpanLang keyLang={'ncrm_setting_template_skip'} />
          </Button>
        </Grid>
        <Grid item>
          <Stack
            sx={{
              '& .MuiPopperUnstyled-root': {
                zIndex: '15'
              }
            }}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            {activeStep > 0 && (
              <Button size="small" variant="contained" color="primary" startIcon={<ArrowBack />} onClick={handleBack}>
                <SpanLang keyLang={'ncrm_setting_template_back'} />
              </Button>
            )}
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [activeStep, isValid, isLoading]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={title ?? 'Create'} />}
      isOpen={isOpen}
      size="md"
      fullScreen={fullScreen}
      onClose={handleClose}
      footer={Footer}
    >
      <WriteFields
        control={control}
        watch={watch}
        errors={errors}
        activeStep={activeStep}
        steps={steps}
        sequence={sequence}
        fullScreen={fullScreen}
        templateGroup={templateGroup}
      />
    </MiModal>
  );
};

export default WritePage;
