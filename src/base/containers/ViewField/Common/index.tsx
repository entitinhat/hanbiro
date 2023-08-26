import _, { isDate, isObject } from 'lodash';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { EditFilled } from '@ant-design/icons';
import HanButtonGroup from '@base/components/@hanbiro/HanButtonGroup';
import { COMMON_VIEW_FIELD_READ_ONLY, SET_TIMEOUT } from '@base/config/constant';
import VIEW_FIELD_API_CONFIG from '@base/config/viewFieldApi';
import VIEW_FIELD_API_CONFIG_PUBLIC from '@base/config/viewFieldApiPublic';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { getUpdateCommonViewField } from '@base/services/graphql/pagelayout';
import { Box, ClickAwayListener, Grid, Theme, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQueryClient } from '@tanstack/react-query';

import { CommonEditProps, CommonViewFieldProps, CommonViewProps } from './interface';

export const HoverEditContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  // marginLeft: '-8px !important',
  width: '100%',
  ' .component-edit': {
    minHeight: '37px',
    padding: '5px',
    border: `1px dashed ${theme.palette.secondary.main}`
  },
  '.is-lock': {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    borderRadius: '4px !important'
  },
  '.component-view-lock': {
    borderRadius: '5px',
    '.icon-edit': {
      lineHeight: '0px',
      display: 'none'
    },
    '&:hover': {
      border: '1px dashed transparent !important',
      '.icon-edit': {
        display: 'none !important'
      }
    }
  }
}));

export const ViewContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  // minHeight: '1.4375em',
  minHeight: '40px',
  padding: '8px',
  paddingLeft: 0,
  display: 'flex',
  alignItems: 'center',
  border: '1px dashed transparent',
  position: 'relative',
  '.img-fit-cover': {
    objectFit: 'contain',
    width: 'auto'
  },
  '.icon-edit': {
    lineHeight: '0px',
    display: 'none',
    position: 'absolute',
    transition: 'all 0.3s'
  },
  '&:hover': {
    border: `1px dashed ${theme.palette.secondary.main}`,
    borderRadius: '5px',
    '.icon-edit': {
      display: 'initial',
      right: '10px'
    }
  }
}));

const CommonViewField = (props: CommonViewFieldProps) => {
  const {
    componentView: ComponentView,
    componentEdit: ComponentEdit,
    userPermission,
    onSave,
    onSubmitHandler,
    onClose,
    value: initialValue,
    config,
    keyName,
    isHorizontal = false,
    menuSourceId,
    menuSource,
    viewData,
    clickIconToEdit = false,
    setQueryData,
    metadata,
    checkEqual = true,
    isPublic = false, //public site
    isIAMComponent = false,
    isDefaultEdit = false
  } = props;

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      [keyName]: config?.getValueEdit ? config.getValueEdit(initialValue) : initialValue
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const viewProps: any = config?.viewProps;
  const editProps: any = config?.componentProps;

  const formValue = watch(keyName);

  const [isEdit, setIsEdit] = useState<boolean>(isDefaultEdit);
  const [fieldValue, setFieldValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const anchorRef = useRef<any>(null);

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if ((anchorRef.current && anchorRef.current.contains(event.target)) || event.target instanceof HTMLBodyElement) {
      return;
    }
    handleOnClose(true);
  };

  const handleOnClose = (flag: boolean = false) => {
    setIsEdit((cur) => !cur);
    if (flag) {
      // setValue(keyName, config?.getValueEdit ? config?.getValueEdit(fieldValue) : fieldValue);
    }
    console.log('formValue', formValue);
    onClose && onClose(keyName, formValue);
  };

  const canEdit = () => {
    return userPermission?.isEdit && COMMON_VIEW_FIELD_READ_ONLY?.indexOf(keyName) === -1;
  };

  /** check public site - get config */
  const viewFieldAPI = isPublic ? VIEW_FIELD_API_CONFIG_PUBLIC[menuSource] : VIEW_FIELD_API_CONFIG[menuSource];
  const mutationKey = viewFieldAPI?.mutationKey;
  const variableKey = viewFieldAPI?.variableKey;
  const mutationString = getUpdateCommonViewField(mutationKey, variableKey, config?.sectionId != menuSourceId ? config?.sectionId : '');

  const mUpdate = useMutationPost(mutationString, mutationKey, {
    useErrorBoundary: false,
    onMutate: async (variables: any) => {
      setIsSaving(true);

      if (config?.optimisticQueryKey) {
        await queryClient.cancelQueries(config.optimisticQueryKey);

        const previous = queryClient.getQueryData(config?.optimisticQueryKey);
        const optimistic = variables[variableKey];
        queryClient.setQueryData(config.optimisticQueryKey, (old: any) => {
          return { ...old, ...optimistic };
        });

        return { previous };
      }
    },
    onSuccess: (data: any, variables: any, context: any) => {
      // const changedFormValue = config?.getChangedValue ? config.getChangedValue(formValue) : formValue;
      // setFieldValue(changedFormValue);
      const defaultFormValue = config?.getDefaultValue ? config.getDefaultValue(formValue) : formValue;
      setFieldValue(defaultFormValue);

      if (config?.refetchQueryKey) {
        const refetchQuery = config.refetchQueryKey;
        setTimeout(() => {
          if (_.isArray(refetchQuery[0])) {
            // multiple query
            for (const queryKey of refetchQuery as string[][]) {
              queryClient.invalidateQueries(queryKey);
            }
          } else {
            queryClient.invalidateQueries(config.refetchQueryKey);
          }
        }, SET_TIMEOUT);
      }

      // update cache for view query
      if (setQueryData) {
        queryClient.setQueryData(setQueryData, (old: any) => {
          return { ...old, ...variables[variableKey] };
        });
      }

      onSave && onSave(keyName, true, variables[variableKey]);
      enqueueSuccessBar('Updated successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      if (config?.optimisticQueryKey && context?.previous) {
        queryClient.setQueryData(config.optimisticQueryKey, context.previous);
      }
      onSave && onSave(keyName, false, null);
      enqueueErrorBar('Updated failed');
    },
    onSettled: (data: any, error: any, variables: any, context: any) => {
      if (config?.optimisticQueryKey) {
        queryClient.invalidateQueries({ queryKey: config.optimisticQueryKey, refetchType: 'none' });
      }

      // refetch cache for view query
      if (setQueryData) {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: setQueryData });
        }, SET_TIMEOUT);
      }

      setIsSaving(false);
      handleOnClose(true);
    }
  });

  const onSubmit = (formData: any) => {
    if (isIAMComponent) {
      onSave && onSave(keyName, true, formData);
      setIsEdit((cur) => !cur);
      return;
    }
    console.log('fieldValue', fieldValue);
    console.log('formData', formData);
    console.log('formValue', formValue);
    const newValue = config?.getDefaultValue ? config.getDefaultValue(formValue) : formValue;
    console.log('newValue', newValue);
    if (checkEqual && _.isEqual(newValue, fieldValue)) {
      handleOnClose();
      return;
    }

    if (onSubmitHandler) {
      onSubmitHandler(formValue);
      handleOnClose();
      return;
    }

    // Checking: it has custom updated value for modified api or not.
    const mutationValue = config?.getMutationValue ? config.getMutationValue(formValue, viewData) : { [keyName]: formValue };
    let updateData: any = {};
    // add extra field : because some field have to update with another field together.
    let extraMutationParams = config?.getExtraMutationParam ? config.getExtraMutationParam(viewData, formValue) : {};
    if (isObject(mutationValue) && !isDate(mutationValue)) {
      updateData[variableKey] = {
        ...mutationValue,
        ...extraMutationParams
      };
    } else {
      updateData[variableKey] = {
        [keyName]: mutationValue,
        ...extraMutationParams
      };
    }
    // section id that included in menu.
    if (config?.sectionId && config.sectionId != menuSourceId) {
      updateData[variableKey].id = config.sectionId;
      updateData.id = menuSourceId;
    } else {
      updateData[variableKey].id = menuSourceId;
    }

    console.log('Common EDIT >>> updateData', updateData);
    // Custom for filed call save api to other menu
    if (config?.onSave) {
      config.onSave(updateData?.[variableKey]);
    } else {
      mUpdate.mutate(updateData);
    }
  };

  // init formValue, fieldValue
  // watch initialValue and set defaultValue to useFrom
  // listening the initialValue and update new value for fieldValue
  useEffect(() => {
    // console.log('initvalue', initialValue, fieldValue);
    if (fieldValue != initialValue) {
      setFieldValue(initialValue);
      const newValue = config?.getValueEdit ? config?.getValueEdit(initialValue) : initialValue;
      setValue(keyName, newValue);
    }
  }, [initialValue]);

  const viewValue = (config?.getValueView ? config?.getValueView(fieldValue) : fieldValue) ?? '';
  const commonViewProps: CommonViewProps = {
    keyName: keyName,
    value: viewValue,
    componentProps: viewProps,
    metadata
  };

  return (
    <HoverEditContainer ref={anchorRef}>
      {isEdit && ComponentEdit && COMMON_VIEW_FIELD_READ_ONLY?.indexOf(keyName) === -1 ? (
        <ClickAwayListener onClickAway={handleClose}>
          <form onSubmit={handleSubmit(onSubmit)} className={'view-field-form-common'}>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: isHorizontal ? 'row' : 'column',
                width: '100%',
                alignItems: isHorizontal ? 'center' : 'flex-start'
              }}
            >
              <Controller
                name={keyName}
                control={control}
                rules={{
                  validate: config?.validate
                }}
                render={({ field: { value, onChange } }: any) => {
                  console.log('render value', value);
                  const commonEditProps: CommonEditProps = {
                    keyName: keyName,
                    value: value, // hook form
                    onChange: onChange, // hook form
                    componentProps: editProps,
                    metadata: metadata
                  };
                  return (
                    <React.Suspense fallback={<></>}>
                      <Grid container>
                        <Grid item xs={12}>
                          <ComponentEdit {...commonEditProps} />
                        </Grid>
                      </Grid>
                    </React.Suspense>
                  );
                }}
              />
              {Object.keys(errors).length > 0 && errors?.[keyName] && (
                <Typography variant="caption" color={'error'}>
                  {errors?.[keyName]?.message?.toString()}
                </Typography>
              )}
              <Box
                sx={{
                  // width: '100%', // fix for View > Title
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                {editProps?.hideSave ? (
                  <HanButtonGroup onClose={handleOnClose} isHorizontal={isHorizontal} />
                ) : (
                  <HanButtonGroup
                    onSave={() => {
                      handleSubmit((data) =>
                        setTimeout(function () {
                          onSubmit(data);
                        }, 50)
                      )();
                    }}
                    disabled={!isValid}
                    onClose={handleOnClose}
                    isSaving={isSaving}
                    isHorizontal={isHorizontal}
                  />
                )}
              </Box>
            </Box>
          </form>
        </ClickAwayListener>
      ) : (
        <ViewContainer
          className={!canEdit() ? 'component-view-lock' : ''}
          sx={{ pl: 1, cursor: canEdit() ? 'pointer' : 'text' }}
          onClick={() => {
            !clickIconToEdit && canEdit() && setIsEdit(true);
          }}
        >
          {ComponentView ? <ComponentView {...commonViewProps} /> : <Typography variant="h6">{JSON.stringify(viewValue)}</Typography>}
          {canEdit() && (
            <EditFilled
              className="icon-edit"
              color="secondary"
              onClick={() => {
                canEdit() && setIsEdit(true);
              }}
            />
          )}
        </ViewContainer>
      )}
    </HoverEditContainer>
  );
};

export default memo(CommonViewField);