import React, { useRef } from 'react';
import { useEffect, useMemo, useState } from 'react';
import validators from '@base/utils/validation/fieldValidator';
//material
import { Box, Button, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';

//third-party
import { useForm } from 'react-hook-form';

//project
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import WriteField from '@base/containers/WriteField';
import LoadingButton from '@base/components/@extended/LoadingButton';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { TICKET_FORM_LINK_TYPES } from '@settings/digital/ticket-form/config/constants';
import { nanoid } from '@base/utils/helpers';

//menu
import { useTicketFormCreate } from '@settings/digital/ticket-form/hooks/useTicketFormMutation';
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import * as constants from '@settings/digital/ticket-form/config/constants';
import * as components from '@settings/digital/ticket-form/config/write-field/components';
import { finalizeParams } from './payload';

//Template
import FormTemplateSelect from '@settings/digital/ticket-form/containers/FormTemplateSelect';

//design step 3
import FormSubmissionSetting from '@settings/digital/ticket-form/components/FormSubmissionSetting';
// Binary File upload
import { useStorageUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import { toast } from 'react-toastify';
import { TICKET_FORM_STAGE_BUILD } from '@settings/digital/ticket-form/config/constants';
import { GRAPEJS_TEMPLATE_TYPE_FORM } from '@base/components/@hanbiro/GrapeTS/config/constants';
import WriteStepper from '@base/components/@hanbiro/WriteStepper';

// const STEPS: any[] = [
//   <SpanLang keyLang="ncrm_generalsetting_ticket_form_basic_info" />,
//   <SpanLang keyLang="ncrm_generalsetting_ticket_form_select_a_template" />,
//   <SpanLang keyLang="ncrm_generalsetting_ticket_form_design" />,
//   <SpanLang keyLang="ncrm_generalsetting_ticket_form_submission_setting" />
// ];
const STEPS: string[] = [
  'ncrm_generalsetting_ticket_form_basic_info',
  'ncrm_generalsetting_ticket_form_select_a_template',
  'ncrm_generalsetting_ticket_form_design',
  'ncrm_generalsetting_ticket_form_submission_setting'
];

const STEP_KEYS = [
  [
    keyNames.KEY_TICKET_FORM_NAME,
    keyNames.KEY_TICKET_FORM_LANGUAGE,
    keyNames.KEY_TICKET_FORM_PRODUCTS,
    keyNames.KEY_TICKET_FORM_DESCRIPTION
  ],
  [
    //template
    keyNames.KEY_TICKET_FORM_TEMPLATE
  ],
  [
    //design template
  ],
  [
    //defined in FormSubmissionSetting
  ]
];

interface WriteModalProps {
  isOpen: boolean;
  menuApi: string;
  onReload?: () => void;
  onGoView?: (id: string, category: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
  title?: string;
  templateGroup?: 'my' | 'default';
  id?: string; //for edit
}

const WriteForm = (props: WriteModalProps) => {
  const {
    isOpen,
    menuApi,
    onReload,
    onClose,
    onSuccess,
    onGoView,
    title,
    templateGroup,
    id = '' //for edit
  } = props;

  //state
  const [formStep, setFormStep] = useState(0);

  //hooks
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: menuApi });

  const moreDefaultValue = {
    //step 3
    [keyNames.KEY_TICKET_FORM_TITLE]: '',
    //step 4
    [keyNames.KEY_TICKET_FORM_DISPLAY_MESSAGE]: '',
    [keyNames.KEY_TICKET_FORM_LINK_TO_PAGE]: '',
    [keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]: null,
    [keyNames.KEY_TICKET_FORM_LINK_TO_TYPE]: TICKET_FORM_LINK_TYPES[0].value,
    [keyNames.KEY_TICKET_FORM_CREATE_TICKET]: false,
    [keyNames.KEY_TICKET_FORM_TICKET_NAME]: '',
    [keyNames.KEY_TICKET_FORM_STAGE]: constants.TICKET_FORM_STAGE_BUILD,
    [keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY]: constants.TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE,
    [keyNames.KEY_TICKET_FORM_TEMPLATE]: null
  };

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      ...defaultValues,
      ...moreDefaultValue
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //--------------------------------------Template + Design (Step 2, 3) -------------------------------------
  // const subType = watch(TemplateKeyNames.KEY_MENU_TEMPLATE_SUB_TYPE);
  // const templateSelectType = watch(keyNames.KEY_TICKET_FORM_TEMPLATE_TYPE);

  //get html
  const getHtml = ({ formData }: any) => {
    let html;

    html = JSON.stringify({
      html: formData[keyNames.KEY_TICKET_FORM_HTML].html,
      css: formData[keyNames.KEY_TICKET_FORM_HTML].css
    });

    return html;
  };
  //==============================================End=====================================
  // create Mutation
  const mutationAdd = useTicketFormCreate();

  const mStorageUpload: any = useStorageUploadMutation<BaseMutationResponse>({
    onError: (error: any, variables: any, context: any) => {
      toast.success('There is an error during uploading: ' + JSON.parse(error).message);
    }
  });

  // check success
  useEffect(() => {
    if (mutationAdd.isSuccess) {
      reset();
      onReload && onReload();
      onClose();
      setFormStep(0);
    }
  }, [mutationAdd.isSuccess]);

  // upload success
  useEffect(() => {
    if (mStorageUpload.isSuccess) {
      if (mStorageUpload.data?.error != '') {
        toast.error(mStorageUpload.data?.error);
      } else {
        //save data
        const formData = getValues();

        const configParams = getParams(formData);
        let defaultParams: any = finalizeParams(configParams);
        defaultParams.ticketForm.stage = TICKET_FORM_STAGE_BUILD;

        //html upload id
        defaultParams.ticketForm[keyNames.KEY_TICKET_FORM_HTML] = mStorageUpload.data?.data ? mStorageUpload.data?.data[0] : '';

        mutationAdd.mutate(defaultParams);
      }
    }
  }, [mStorageUpload.isSuccess]);

  //watching
  const templateData = watch(keyNames.KEY_TICKET_FORM_TEMPLATE);

  useEffect(() => {
    if (templateData) {
      setValue(keyNames.KEY_TICKET_FORM_HTML, templateData);
    }
  }, [templateData]);

  //submit form
  const onSubmit = async (formData: any) => {
    //=============config submit data===========
    formData = {
      ...formData,
      [keyNames.KEY_TICKET_FORM_HTML]: getHtml({ formData })
    };

    //============submit upload=========
    const fileData = JSON.stringify({
      html: JSON.parse(formData[keyNames.KEY_TICKET_FORM_HTML]).html,
      css: JSON.parse(formData[keyNames.KEY_TICKET_FORM_HTML]).css
    });

    const blob = new Blob([fileData], { type: 'application/json' });
    const fileName = formData?.[keyNames.KEY_TICKET_FORM_NAME].replace(/\s+/g, '') + nanoid() + '.json';
    const uploadFile = new File([blob], fileName);

    //Storage
    const fileFormData = new FormData();
    fileFormData.append('files', uploadFile);
    fileFormData.append('module', 'ticketform');

    mStorageUpload.mutate(fileFormData);
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    // console.log('error', errors, e);
  };

  // handleSave
  const handleSave = () => {
    handleSubmit((data) => onSubmit(data), onError)();
  };

  // handlNext
  const handleNext = () => setFormStep((cur) => cur + 1);
  // ========================Form View====================

  const firstStep = () => {
    return (
      <React.Suspense fallback={<></>}>
        {fields.map((_item: any) => {
          const isBelongsTo = STEP_KEYS[formStep].includes(_item.keyName);
          if (isBelongsTo) {
            let newComponentProps = { ..._item?.componentProps };
            let newItem = { ..._item };
            if (_item.keyName === keyNames.KEY_TICKET_FORM_TEMPLATE) {
              newItem.hideTitle = true;
            }
            newItem.componentProps = newComponentProps;
            return <WriteField key={_item.keyName} item={newItem} control={control} errors={errors} />;
          }
        })}
      </React.Suspense>
    );
  };

  const secondaryStep = () => {
    return (
      <React.Suspense fallback={<></>}>
        <WriteField
          item={{
            keyName: keyNames.KEY_TICKET_FORM_HTML,
            Component: FormTemplateSelect,
            componentProps: {
              initialHtml: {
                html: '<body><form style="min-height:100vh;padding:10px 10px"></form></body>',
                css: ''
              }
            },
            columns: 1,
            hideTitle: true,
            languageKey: 'ncrm_generalsetting_ticket_form_select_a_template',
            section: 0,
            tooltipShow: false,
            validate: {
              required: validators.required
            }
          }}
          control={control}
          errors={errors}
        />
      </React.Suspense>
    );
  };

  const thridStep = () => {
    return (
      <React.Suspense fallback={<></>}>
        <WriteField
          item={{
            keyName: keyNames.KEY_TICKET_FORM_HTML,
            Component: components.GrapesTS,
            columns: 1,
            componentProps: {
              storageId: 'ticket-form',
              height: 'calc(100vh - 100px)',
              templateType: GRAPEJS_TEMPLATE_TYPE_FORM
            },
            // hideTitle: true,
            languageKey: '',
            section: 0,
            tooltipShow: false
          }}
          control={control}
          errors={errors}
        />
      </React.Suspense>
    );
  };

  const settingStep = () => {
    return <FormSubmissionSetting watch={watch} setValue={setValue} getValues={getValues} errors={errors} control={control} />;
  };

  //render footer
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {formStep > 0 && (
            <Button size="small" color="secondary" onClick={() => setFormStep((cur) => cur - 1)}>
              <SpanLang keyLang={'ncrm_common_btn_back'} />
            </Button>
          )}
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={onClose}>
              <SpanLang keyLang={'ncrm_common_btn_cancel'} />
            </Button>
            <LoadingButton
              loading={mutationAdd.isLoading}
              variant="contained"
              loadingPosition="start"
              startIcon={<></>}
              onClick={formStep >= 3 ? handleSave : handleNext}
              disabled={!isValid}
            >
              {formStep >= 3 ? <SpanLang keyLang={'ncrm_common_btn_save'} /> : <SpanLang keyLang={'ncrm_common_btn_next'} />}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [formStep, mutationAdd.isLoading, isValid]);

  //get form values when inputing
  // console.log('form values', watch());

  return (
    <MiModal
      title={<SpanLang keyLang={title ?? `ncrm_generalsetting_new_form`} />}
      isOpen={isOpen}
      size="md"
      footer={Footer}
      onClose={() => {
        reset();
        setFormStep(0);
        onClose && onClose();
      }}
    >
      {isOpen && (
        <React.Suspense fallback={<></>}>
          {/* <form onSubmit={handleSubmit(onSubmit, onError)}> */}
          <Grid container>
            <Grid item xs={2} lg={2}></Grid>
            <Grid item xs={8} lg={8}>
              <WriteStepper activeStep={formStep} steps={STEPS} />
            </Grid>
            <Grid item xs={2} lg={2}></Grid>
          </Grid>
          <Grid sx={{ p: 2, pt: 0 }} container spacing={2} alignItems="center">
            {formStep == 0 && firstStep()}
            {formStep == 1 && secondaryStep()}
            {formStep == 2 && thridStep()}
            {formStep == 3 && settingStep()}
          </Grid>
          {/* </form> */}
        </React.Suspense>
      )}
    </MiModal>
  );
};

export default WriteForm;
