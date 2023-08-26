import { useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
//material
import { Button, Grid, Stack } from '@mui/material';
import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import {
  LANDING_PAGE_PUBLISH_BUILD,
  LANDING_PAGE_PUBLISH_PUBLISHED,
  LANDING_PAGE_PUBLISH_SCHEDULED,
  LANDING_PAGE_PUBLISH_UNPUBLISH,
  LANDING_PAGE_PUBLISH_LATER,
  LANDING_PAGE_STAGE_BUILD,
  LANDING_PAGE_STAGE_PUBLISHED,
  LANDING_PAGE_STAGE_SCHEDULED,
  LANDING_PAGE_STAGE_UNPUBLISH,
  LANDING_PAGE_STAGE_ARCHIVED
} from '@settings/digital/landing-page/config/constants';
//project
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useForm } from 'react-hook-form';
import { useFormDefaultValues } from './utils';
import { useStorageUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import useSnackBar from '@base/hooks/useSnackBar';
import { t } from 'i18next';
import { TemplateGroup } from '@settings/digital/landing-page/type/template';
import { useLandingPageCreate } from '../../hooks/useLandingPageMutations';
import WriteFields from '@settings/digital/landing-page/containers/WriteFields';
import { ButtonOption } from '@base/types/extended';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';

interface WritePageProps {
  isOpen: boolean;
  fullScreen?: boolean;
  onReload?: () => void;
  onGoView?: (id: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
  title?: string;
  // templateGroup?: TemplateGroup;
}

// const steps: any[] = [
//   <SpanLang keyLang="ncrm_generalsetting_landing_page_basic_info" />,
//   <SpanLang keyLang="ncrm_generalsetting_landing_page_select_a_template" />,
//   <SpanLang keyLang="ncrm_generalsetting_landing_page_design" />,
//   <SpanLang keyLang="ncrm_generalsetting_landing_page_setting" />
// ];
const steps: string[] = [
  'ncrm_generalsetting_landing_page_basic_info',
  'ncrm_generalsetting_landing_page_select_a_template',
  'ncrm_generalsetting_landing_page_design',
  'ncrm_generalsetting_landing_page_setting'
];

const WritePage = (props: WritePageProps) => {
  const {
    isOpen,
    fullScreen = false,
    onReload,
    onClose,
    onSuccess,
    onGoView,
    title
    // templateGroup,
  } = props;

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    trigger,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: useFormDefaultValues(),
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  // state
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isFinish, setIsFinish] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //==============================Get Data from useForm ===========================
  // const subType = watch(keyNames.KEY_MENU_TEMPLATE_SUB_TYPE);
  // const isSequenceTask = subType?.value == 'SUB_TYPE_TASK_CHECK_LIST' || subType?.value == 'SUB_TYPE_TASK_SEQUENCE';
  // const isSequenceTask = true;
  //==============================================End=====================================
  const sequence = useRef(null);
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const mCreate = useLandingPageCreate();

  // handle button on Footer
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    trigger();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    trigger();
  };

  // close
  const handleClose = () => {
    reset();
    onClose();
    setIsLoading(false);
    setActiveStep(0);
  };

  // watch
  const templateSelectType = watch(keyNames.KEY_NAME_LANDING_PAGE_TYPE);

  // set params
  let landingPage: any = {};
  const handleSave = () => {
    setIsLoading(true);
    const html = watch(keyNames.KEY_NAME_LANDING_PAGE_HTML);
    const name = watch(keyNames.KEY_NAME_LANDING_PAGE_NAME);

    const fileData = JSON.stringify({
      html: html?.html,
      css: html?.css
    });
    const blob = new Blob([fileData], { type: 'application/json' });
    const fileName = name.replace(/\s+/g, '') + nanoid() + '.json';
    const uploadFile = new File([blob], fileName);

    //Storage
    const fileFormData = new FormData();
    fileFormData.append('files', uploadFile);
    fileFormData.append('module', 'landingpage');
    mStorageUpLoad.mutate(fileFormData);
  };

  // Upload HTML
  const mStorageUpLoad: any = useStorageUploadMutation<BaseMutationResponse>({
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Save Template failed: ' + JSON.parse(error).message);
      if (context.previous) {
        // queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSuccess: () => {}
  });

  useEffect(() => {
    if (mStorageUpLoad.isSuccess) {
      if (mStorageUpLoad.data?.error != '') {
        enqueueErrorBar(mStorageUpLoad.data?.error);
      } else {
        handleSubmit((data) => {
          let publishSchedule = data?.[keyNames.KEY_NAME_LANDING_PAGE_PUBLISH];

          // set stagePublish value Equal to Publish Option
          let stagePublish = '';
          if (publishSchedule === LANDING_PAGE_PUBLISH_UNPUBLISH) {
            stagePublish = LANDING_PAGE_STAGE_UNPUBLISH;
          } else if (publishSchedule === LANDING_PAGE_PUBLISH_PUBLISHED) {
            stagePublish = LANDING_PAGE_STAGE_PUBLISHED;
          } else if (publishSchedule === LANDING_PAGE_PUBLISH_LATER) {
            stagePublish = LANDING_PAGE_STAGE_SCHEDULED;
          }

          if (isFinish) {
            data.isFinish = true;
          }
          if (isArchived) {
            stagePublish = LANDING_PAGE_STAGE_ARCHIVED;
          }

          landingPage = {
            ...data,
            language: data.language?.value ?? data.language,
            products: data.products?.map((pr: any) => {
              const { id, name, ...rest } = pr;
              return { id, name };
            }),
            assignTo: data.assignTo?.map((pr: any) => {
              const { id, name, ...rest } = pr;
              return { user: { id, name }, group: {} };
            }),
            stage: stagePublish,
            publishDate:
              data.publish == LANDING_PAGE_PUBLISH_PUBLISHED
                ? new Date().toISOString()
                : data.publishDate?.$d && new Date(data.publishDate.$d).toISOString(),
            html: mStorageUpLoad.data?.data[0],
            type: data?.type?.value
          };
          delete landingPage.templateType;
          delete landingPage.type?.keyNames;
          {
            data.publish === LANDING_PAGE_PUBLISH_UNPUBLISH && delete landingPage.publishDate;
          }

          console.log('data', data);
          const params = { landingPage };
          console.log('data', params);
          mCreate.mutate(params);
        })();
      }
    }
  }, [mStorageUpLoad.isSuccess]);

  useEffect(() => {
    if (mCreate.isSuccess) {
      reset();
      setIsLoading(false);
      onReload && onReload();
      onClose();
      setActiveStep(0);
    }
  }, [mCreate.isSuccess]);

  // buttons
  const Footer = useMemo(() => {
    // console.log('!isValid || isLoading || activeStep !== 3', !isValid || activeStep !== 3 )
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: t('ncrm_common_btn_save'),
        color: 'primary',
        onClick: () => {
          setIsFinish(false);
          setIsArchived(false);
          handleSave();
        },
        disabled: !isValid || isLoading,
        isLoading: isLoading
      },
      {
        isMain: false,
        label: t('ncrm_generalsetting_landing_page_btn_finish'),
        color: 'secondary',
        onClick: () => {
          setIsFinish(true);
          setIsArchived(false);
          handleSave();
        },
        disabled: !isValid || isLoading,
        isLoading: isLoading
      },
      {
        isMain: false,
        label: t('ncrm_generalsetting_landing_page_btn_archived'),
        color: 'secondary',
        onClick: () => {
          setIsFinish(false);
          setIsArchived(true);
          handleSave();
        },
        disabled: !isValid || isLoading,
        isLoading: isLoading
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {activeStep > 0 && (
            <Button size="small" color="secondary" onClick={handleBack}>
              {t('ncrm_common_btn_back')}
            </Button>
          )}
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext} disabled={!isValid || isLoading}>
                {t('ncrm_common_btn_next')}
              </Button>
            ) : (
              <ButtonSplit buttons={options} />
            )}
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
      title={<SpanLang keyLang={title ?? 'ncrm_generalsetting_new_landing_page'} />}
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
        // templateGroup={templateGroup}
        getValues={getValues}
        setValue={setValue}
        templateSelectType={templateSelectType}
      />
    </MiModal>
  );
};

export default WritePage;
