import React, { Suspense, useCallback, useMemo, useState, useEffect } from 'react';

//project
import useAssignRuleEntryWrite from '@settings/assignment-rule/rule/hooks/useAssignRuleEntryWrite';
import useAssignRuleEntryUpdate from '@settings/assignment-rule/rule/hooks/useAssignRuleEntryUpdate';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import withWriteForm from '@base/hooks/hocs/withWriteForm';
import { ListType } from '@base/types/app';
import { ButtonOption } from '@base/types/extended';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import WriteField from '@base/containers/WriteField';
import { EAREntryAssignToMode, EAREntryCriteriaType, EAssignmentRuleModule } from '../../types/enums';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';

//material-ui
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';

//third-party
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ChannelType } from '@settings/preferences/types/desk/common';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuApi: string;
  listType: ListType;
  category: string;
  type: string;
  onReload?: () => void;
  defaultValues: any; //with write form
  fields: any[]; //with write form
  getParams: any; //with write form
  loading?: boolean; //with write form
  menuSourceId: string;
  dataInit: any;
  curTab?: number;
  module?: EAssignmentRuleModule;
  channelType?: ChannelType;
  listOrder?: number[];
}
const WriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose, curTab, onReload, loading, menuSourceId, module, listOrder = [], defaultValues, type, channelType } = props;
  const { t } = useTranslation();
  let { fields } = props;
  // if (fields.length > 0) {
  //   fields = parseFieldsWrite(fields, 'assignment_rule_entry');
  // }

  //state
  const [isReset, setIsReset] = useState(false);
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [validOrder, setValidOrder] = useState<boolean>(!listOrder.includes(sortOrder));

  var nOrder = 1;
  while (listOrder.includes(nOrder)) {
    nOrder++;
  }
  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      rulesEntry:
        defaultValues.length > 0
          ? defaultValues
          : [
              {
                id: '',
                order: nOrder,
                criteria: [],
                criteriaType: EAREntryCriteriaType.CUSTOMER,
                assignTo: {
                  assignsTo: [],
                  mode: EAREntryAssignToMode.USER
                }
              }
            ]
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  //watch
  const formEntry = watch(keyNames.KEY_NAME_ASSIGNMENT_RULE_ENTRIES);

  //create mutation
  const { mutationAdd, isLoading } = useAssignRuleEntryWrite({ reset, onClose, isReset, onReload });
  const mUpdate = useAssignRuleEntryUpdate();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    onClose();
  };

  //submit form
  const onSubmit = useCallback(
    (formData: any) => {
      //upload files
      //console.log('uploadFiles', uploadedFiles);
      console.log('formData => ', formData);
      // formData = { ...formData, assignRuleId: menuSourceId };
      // if (dataInit?.id) {
      //   formData.id = dataInit.id;
      // }
      var Params = {
        arEntry: {
          ...formData.rulesEntry[0],
          criteria: formData.rulesEntry[0].criteria.map((item: { key: string; condition: any }) => ({
            key: item.key,
            condition: JSON.stringify(item.condition)
          })),
          assignRuleId: menuSourceId
        }
      };
      //let configParams: any = getParams(formData);
      console.log('configParams => ', Params);
      console.log('>> SortOrder', sortOrder, '>> valid order', validOrder);

      type === 'create' ? mutationAdd(Params) : mUpdate.mutate(Params);
    },
    [sortOrder, menuSourceId]
  );
  useEffect(() => {
    if (mUpdate.isSuccess) onClose && onClose();
  }, [mUpdate.isSuccess]);
  //buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: t('ncrm_common_btn_save'),
        color: 'primary',
        onClick: () => {
          setIsReset(false);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: isLoading || !isValid,
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
        disabled: isLoading || !isValid || !validOrder,
        isLoading: isLoading
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isLoading, isValid]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  // console.log('>> SortOrder', sortOrder, '>> valid order', validOrder);
  //======================== End Debug ========================//
  const SecondStepFields = (index: number) => {
    return (
      <>
        {fields?.map((_item, _index) => {
          let componentProps = {
            ..._item.componentProps,
            curTab: curTab,
            module: module,
            channelType: channelType,
            isDuplicateOrder:
              type == 'update'
                ? formEntry[index]?.order !== defaultValues[0]?.order && listOrder.includes(formEntry[index]?.order)
                : listOrder.includes(formEntry[index]?.order)
          };
          if (_item.section == 1)
            return <WriteField key={_item.keyName} item={{ ..._item, componentProps }} control={control} errors={errors} />;
        })}
      </>
    );
  };
  //fields = parseFieldsData(fields);
  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={<SpanLang keyLang={type == 'create' ? `ncrm_new_assignment_rule_entry` : 'ncrm_assignment_rule_edit_entry'} />}
        isOpen={isOpen} //writeOption.isOpenWrite
        size={false}
        fullScreen={false}
        onClose={handleClose}
        footer={Footer}
        anchor={'right'}
      >
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {loading && <LoadingCircular loading={loading} />}
            <Box sx={{ p: 2.5, width: '100%' }}>
              <Typography fontWeight={500}>{t('ncrm_generalsetting_assignment_rule_entry_the_rule_entry')}</Typography>

              {formEntry.map((entry: any, index: number) => (
                <Grid container alignItems="center" sx={{ width: '700px' }}>
                  {SecondStepFields(index)}
                </Grid>
              ))}
            </Box>
          </form>
        )}
      </MiModal>
    </Suspense>
  );
};

export default withWriteForm(WriteModal);
