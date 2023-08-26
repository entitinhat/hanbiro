import { AssignmentGroup, AssignmentRep } from '@settings/preferences/types/desk/assignment';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Stack, Switch, TextField, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';

// project
import SpanLang from '@base/components/@hanbiro/SpanLang';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { generateUUID } from '@base/utils/helpers';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import validators from '@base/utils/validation/fieldValidator';
import WriteField from '@base/containers/WriteField';
import MiModal from '@base/components/@hanbiro/MiModal';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';

// menu
import useAssignmentGroupMutate from '@settings/preferences/hooks/desk/useAssignmentGroupsMutation';
import * as keyNames from '@settings/preferences/config/desk/keyNames';

interface INewGroupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: AssignmentGroup, mode: string) => void;
}
const NewGroup: React.FC<INewGroupProps> = (props: INewGroupProps) => {
  const { isOpen, onClose, onSave } = props;
  const { t } = useTranslation();

  //====UseForm

  const defaultValues: any = {
    [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_NAME]: '',
    [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_DESCRIPTION]: '',
    [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_REPS]: []
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
    defaultValues: defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [reps, setReps] = useState<AssignmentRep[]>([
    {
      id: generateUUID(),
      user: null,
      capacity: 0
    }
  ]);

  console.log('isValid:', isValid);

  const { mAdd, mUpdate } = useAssignmentGroupMutate();

  const onAddRep = () => {
    const prev = getValues(keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_REPS);
    const curReps = prev;
    const newEmptyRep = {
      isEmptyRow: true,
      rowIndex: prev.length,
      active: true
    };
    const newReps = [...curReps, newEmptyRep];
    const newItems = [...newReps].map((v: any, i: number) => ({ ...v, rowIndex: i }));
    setValue && setValue(keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_REPS, newItems);
  };

  //when submit error, call this
  const onSubmit = (formData: any) => {
    const params = {
      group: {
        name: formData?.[keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_NAME],
        active: true,
        description: formData?.[keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_DESCRIPTION],
        // reps: items?.filter((v: any) => !!v?.user).map((v: any) => ({id: v?.id, name: v?.name}))
        reps: formData?.[keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_REPS]
          ?.map((v: any) => ({ user: { id: v?.user?.id, name: v?.user?.name }, active: !!v?.active }))
          .filter((v: any) => !!(v?.user?.name && v?.user?.id))
      }
    };
    mAdd.mutate(params, {
      onSuccess: () => {
        onClose && onClose();
      }
    });
  };

  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const handleClose = () => {
    onClose && onClose();
  };

  const onChange = (nVal: any, rowIndex: number, field: string) => {
    const prev = getValues(keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_REPS);
    const tempItems: any[] = [...prev];
    tempItems[rowIndex] = {
      ...tempItems[rowIndex],
      isEmptyRow: field === 'user' ? false : !!tempItems[rowIndex]?.isEmptyRow,
      [field]: nVal
    };
    const newItems = [...tempItems].map((v: any, i: number) => ({ ...v, rowIndex: i }));
    setValue && setValue(keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_REPS, newItems);
  };

  // ========== make table=========
  const getMapColumns = () => {
    return {
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_NAME](col: string, data: any, extra: any) {
        if (data?.isEmptyRow) {
          return (
            <UserAutoComplete single value={data?.user || undefined} onChange={(nVal: any) => onChange(nVal, data?.rowIndex, 'user')} />
          );
        } else {
          return <Typography>{data?.user?.name || ''}</Typography>;
        }
      },
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_ACTIVE](col: string, data: any, extra: any) {
        return (
          <Switch
            checked={data?.[col] || false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e?.target?.checked, data?.rowIndex, 'active')}
          />
        );
      }
    };
  };
  const fields = useMemo(() => {
    return [
      {
        languageKey: t('ncrm_generalsetting_preferences_group_name'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_NAME,
        enableSorting: false,
        width: 'auto'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_active'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_ACTIVE,
        enableSorting: false,
        width: '60px'
      }
    ];
  }, []);
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: getValues(keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_REPS) || [],
      columns: columns,
      sx: { p: 0, mb: 0, width: '100%' }
      //   setRowHover: setRowHover
    };
    return <ListTable {...listTableProps} />;
  }, [watch()?.[keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_REPS], columns]);
  // ========== End make table=========

  //========Render
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
                reset();
              }}
            >
              {t('ncrm_common_btn_save')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [mAdd.isLoading, isValid]);

  const renderFields = () => {
    return (
      <Grid container spacing={1} alignItems="center" width={'100%'}>
        <WriteField
          item={{
            keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_NAME,
            itemValue: '',
            Component: TextField,
            columns: 1,
            componentProps: {},
            languageKey: 'ncrm_generalsetting_preferences_group_name',
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
            keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_DESCRIPTION,
            Component: TextField,
            columns: 1,
            componentProps: {},
            languageKey: 'ncrm_generalsetting_preferences_description',
            section: 0,
            tooltipShow: false
          }}
          control={control}
          errors={errors}
        />

        <Grid item xs={12}>
          {TableMemo}
          <Button
            size="small"
            sx={{ marginTop: '5px', marginLeft: '10px' }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              onAddRep();
            }}
          >
            {t('ncrm_generalsetting_preferences_desk_add_line')}
          </Button>
        </Grid>
      </Grid>
    );
  };
  return (
    <MiModal
      anchor="right"
      isOpen={isOpen}
      onClose={onClose}
      title={<SpanLang keyLang="Create Assignment Group" />}
      footer={Footer}
      size={'xs'}
    >
      {isOpen && (
        <Suspense fallback={<></>}>
          <Stack
            sx={{
              height: 'calc(100vh - 150px)',
              padding: '15px',
              width: '740px'
            }}
          >
            {renderFields()}
          </Stack>
        </Suspense>
      )}
    </MiModal>
  );
};

export default NewGroup;
