import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

//config
import WriteFields from '@settings/assignment-rule/rule/containers/WriteFields';
import useAssignRuleWrite from '@settings/assignment-rule/rule/hooks/useAssignRuleWrite';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import withWriteForm from '@base/hooks/hocs/withWriteForm';
import { ListType } from '@base/types/app';
import { ButtonOption } from '@base/types/extended';
import { Button, Grid, Stack } from '@mui/material';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { finalizeParams } from './payload';
import { useTranslation } from 'react-i18next';
import { EAREntryAssignToMode, EAssignmentRuleModule } from '../../types/enums';
import { defaultRuleEntryValue } from '../../containers/RuleCriteriaSelect';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuApi: string;
  listType: ListType;
  category: string;
  type: string;
  onReload?: () => void;
  // defaultValues: any; //with write form
  fields: any[]; //with write form
  getParams: any; //with write form
  loading?: boolean; //with write form
}

export const assignmentRuleDefaultValues = {
  id: '',
  name: '',
  module: EAssignmentRuleModule.DESK,
  channel: '',
  description: '',
  rulesEntry: [defaultRuleEntryValue],
  assignUnassigned: { assignsTo: [], mode: EAREntryAssignToMode.USER }
};

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose, menuApi, category, type, listType, onReload, getParams, loading } = props;
  let { fields } = props;
  const { t } = useTranslation();
  // if (fields.length > 0) {
  //   fields = parseFieldsWrite(fields, menuApi);
  // }

  //state
  const [isReset, setIsReset] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [isValidOrder, setIsValidOrder] = useState<boolean>(true);
  const STEP_MAX = 1;
  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: assignmentRuleDefaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //create mutation
  const { mutationAdd, isLoading } = useAssignRuleWrite({ reset, onClose, isReset, onReload });

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    setFormStep(0);
    onClose();
  };
  //next
  const handleNext = () => {
    setFormStep(formStep + 1);
  };
  //back
  const handleBack = () => {
    setFormStep(formStep - 1);
  };
  //save
  const handleSave = () => {
    setIsReset(false);
    handleSubmit((data) => onSubmit(data), onError)();
  };
  //submit form
  const onSubmit = useCallback((formData: any) => {
    //upload files
    //console.log('uploadFiles', uploadedFiles);
    console.log('formData => ', formData);

    //let configParams: any = getParams(formData);
    const configParams: any = finalizeParams(formData);
    console.log('configParams => ', configParams);
    mutationAdd(configParams);
  }, []);

  //get OrderValid state
  const getOrderState = (state: boolean) => {
    setIsValidOrder(state);
  };
  //buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: formStep == 0 ? 'ncrm_common_btn_next' : 'ncrm_common_btn_save',
        color: 'primary',
        onClick: formStep == 0 ? handleNext : handleSave,
        disabled: isLoading || !isValid || !isValidOrder,
        isLoading: isLoading
      },
      {
        isMain: false,
        label: t('ncrm_common_btn_save_and_create_new'),
        color: 'secondary',
        onClick: () => {
          setIsReset(true);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: isLoading || !isValid || !isValidOrder,
        isLoading: isLoading
      }
    ];
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid, isLoading, formStep, isValidOrder]);

  //======================== Debug ========================//
  console.log('form values', watch()); //get form values when inputing
  console.log(`~~~~ isValidOrder`, isValidOrder);
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={<SpanLang keyLang={`ncrm_generalsetting_${type}_new_title`} />}
        isOpen={isOpen} //writeOption.isOpenWrite
        size="md"
        fullScreen={false}
        onClose={handleClose}
        footer={Footer}
      >
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {loading && <LoadingCircular loading={loading} />}
            <WriteFields
              watch={watch}
              control={control}
              errors={errors}
              fields={fields}
              activeStep={formStep}
              setValue={setValue}
              menuApi={menuApi}
              getOrderState={getOrderState}
            />
          </form>
        )}
      </MiModal>
    </Suspense>
  );
};

export default withWriteForm(WriteModal);
