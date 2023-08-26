import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';

//material
import { Button, Grid, Stack } from '@mui/material';

//project
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ButtonOption } from '@base/types/extended';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import WriteFields from '@product/unit/containers/WriteFields';
import { KEY_UNIT_NAME, KEY_UNIT_VALUES } from '@product/unit/config/keyNames';
import { useBaseUnitMutation } from '@product/unit/hooks/useBaseUnitMutation';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { MENU_PRODUCT_UNIT } from '@base/config/menus';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import { queryClient } from '@base/config/queryClient';
import { queryKeys } from '@product/unit/config/queryKeys';

interface WritePageProps {
  isOpen: boolean;
  fullScreen?: boolean;
  showCanvas?: boolean;
  onReload?: () => void;
  onGoView?: (id: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}

const WritePage = (props: WritePageProps) => {
  const { isOpen, fullScreen, showCanvas, onReload, onClose, onSuccess, onGoView } = props;
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: MENU_PRODUCT_UNIT });

  // state
  const [isReset, setIsReset] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_UNIT);
  const { mCreate } = useBaseUnitMutation(listQueryKey);

  // react-hook
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const baseUnit = watch(KEY_UNIT_NAME);
  const unitValues = watch(KEY_UNIT_VALUES);

  useEffect(() => {
    if (_.isArray(unitValues)) {
      const newUnitValues = _.cloneDeep(unitValues);
      newUnitValues[0][KEY_UNIT_NAME] = baseUnit;
      setValue(KEY_UNIT_VALUES, newUnitValues);
    }
  }, [baseUnit]);

  // when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  // close
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (mCreate.isSuccess) {
      if (isReset) {
        reset && reset();
        setIsSaving(false);
      } else {
        handleClose();
        setIsSaving(false);
      }
      queryClient.refetchQueries({ queryKey: [queryKeys.listBaseUnits] }); // update data UnitAutoComplete
    }
  }, [mCreate.isSuccess]);

  // submit form
  const onSubmit = useCallback(
    (formData: any) => {
      let configParams: any = getParams(formData);

      setIsSaving(true);
      mCreate.mutate(
        { unit: configParams },
        {
          onMutate() {
            setIsSaving(true);
          },
          onError(error: any, variables: any, context: any) {
            setIsSaving(false);
          }
        }
      );
    },
    [isReset]
  );

  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: 'ncrm_common_btn_save',
        color: 'primary',
        onClick: () => {
          setIsReset(false);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: isSaving || !isValid,
        isLoading: isSaving
      },
      {
        isMain: false,
        label: 'ncrm_common_btn_save_and_create_new',
        color: 'secondary',
        onClick: () => {
          setIsReset(true);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: isSaving || !isValid,
        isLoading: isSaving
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              <SpanLang keyLang="ncrm_common_btn_cancel" textOnly />
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid, isSaving]);

  console.log('[Unit]form values', watch());
  return (
    <MiModal
      title={<SpanLang keyLang={`ncrm_product_create_unit`} />}
      isOpen={isOpen}
      size={'sm'}
      fullScreen={false}
      onClose={handleClose}
      footer={Footer}
    >
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {loading && <LoadingCircular loading={loading} />}
          <WriteFields watch={watch} control={control} errors={errors} fields={fields} setValue={setValue} />
        </form>
      )}
    </MiModal>
  );
};

export default WritePage;
