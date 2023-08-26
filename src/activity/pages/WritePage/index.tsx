import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

//config
import {
  ACTIVITY_MENU_PROTO,
  ACTIVITY_MENU_TASK,
  ACTIVITY_TASK_TYPE_CHECKLIST,
  ACTIVITY_TASK_TYPE_SEQUENCE,
  ACTIVITY_TYPE_MAIL,
  ACTIVITY_TYPE_SMS
} from '@activity/config/constants';
import WriteFields from '@activity/containers/WriteFields';
import useActivityWrite from '@activity/hooks/useActivityWrite';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import withWriteForm from '@base/hooks/hocs/withWriteForm';
import { ListType } from '@base/types/app';
import { ButtonOption } from '@base/types/extended';
import { Button, Grid, Stack } from '@mui/material';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { Source } from '@activity/types/activity';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useMenuSetting, useMenuSettings } from '@settings/general/hooks/useMenuSetting';
import { useRecoilState } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';
import { User } from '@base/types/user';
import { TaskChecklist } from '@activity/types/task';
import { S3UploadedFile } from '@base/types/s3';

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
  source?: Source;
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose, menuApi, category, type, listType, onReload, defaultValues, fields, getParams, loading, source } = props;

  const { t } = useTranslation();
  //state
  const [isReset, setIsReset] = useState(false);
  const [startUpload, setStartUPload] = useState(false);
  const activityType = menuApi.split('_').length > 1 ? menuApi.split('_')[1] : ACTIVITY_MENU_TASK;
  const [submitData, setSubmitData] = useState<any>();
  //=======================================INIT User data for Email & SMS==================================================
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [auth] = useRecoilState(authAtom);
  //get data
  const params = {
    key: 'company_phones',
    menu: 'activity'
  };
  const { data: CompanyPhones, isSuccess } = useMenuSetting(params);

  useEffect(() => {
    if (isSuccess && auth && CompanyPhones) {
      const oldUser = auth.user;

      const companyPhoneValue = JSON.parse(CompanyPhones.value);
      const defaultCompanyPhone = companyPhoneValue.find((company: any) => company.isDefault == true);

      const nUser = {
        ...oldUser,
        name: oldUser?.displayName ?? '',
        id: oldUser?.id ?? '',
        companyPhone: defaultCompanyPhone.number,
        companyName: defaultCompanyPhone.description
      };
      setCurrentUser(nUser);
      console.log('nUser', nUser);
    }
  }, [isSuccess]);
  //======================================================================================================

  //react-hook
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

  //create mutation
  const { mutationAdd, isLoading } = useActivityWrite({ reset, onClose, isReset, listType, onReload });

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
      delete formData.showCc;

      let configParams: any = getParams(formData);
      configParams.type = ACTIVITY_MENU_PROTO[activityType];
      // add source

      //Format param for Task
      if (configParams.taskType == ACTIVITY_TASK_TYPE_CHECKLIST) {
        let newChecklist: any = [];
        configParams.taskChecklist.forEach((item: TaskChecklist) => {
          if (item?.title && item?.workers && item?.workers.length > 0)
            newChecklist.push({ ...item, done: configParams.status == 'STATUS_DONE' ? true : item.done });
        });
        configParams.taskChecklist = newChecklist;
      }
      if (configParams.taskType == ACTIVITY_TASK_TYPE_SEQUENCE) {
        let newSequences: any = [];
        configParams.taskSequences.forEach((item: TaskChecklist) => {
          if (item?.title && item?.workers && item?.workers.length > 0)
            newSequences.push({ ...item, done: configParams.status == 'STATUS_DONE' ? true : item.done });
        });

        configParams.taskSequences = newSequences;
      }

      //Format param for Email-From || TO
      if (configParams.type == ACTIVITY_TYPE_MAIL) {
        const oldTo = configParams?.to;
        const nUser = {
          email: currentUser.primaryEmail,
          id: currentUser.id,
          name: currentUser.displayName,
          phone: currentUser.primaryPhone,
          type: 'TYPE_USER'
        };
        if (oldTo) {
          let sendIndividual = oldTo[0].sendIndividual;
          configParams.to = oldTo.map((email: any) => {
            delete email.sendIndividual;
            return email;
          });
          configParams.sendIndividual = sendIndividual;
        }
        configParams.from = [nUser];
      }

      //Format param for SMS - From || To
      if (configParams.type == ACTIVITY_TYPE_SMS) {
        const nUser = {
          email: currentUser.primaryEmail,
          id: currentUser.id,
          name: currentUser.displayName,
          phone: currentUser.companyPhone,
          type: 'TYPE_USER'
        };
        configParams.from = [nUser];
      }
      if (!_.isUndefined(source) && !_.isEmpty(source)) {
        configParams.source = source;
      }
      console.log('configParams => ', configParams);
      if (configParams.type == ACTIVITY_TYPE_MAIL && configParams?.attachments) {
        setSubmitData(configParams);
        setStartUPload(true);
      } else {
        mutationAdd({ activity: configParams });
      }
    },
    [currentUser]
  );
  const onUploadCompleted = (files: S3UploadedFile[]) => {
    //upload files
    // console.log('formData==================>', formData);
    // const uploadFiles = submitData[keyNames.KEY_TICKET_REPLY_FILE];
    // console.log('S3UploadedFile', files);
    if (files) {
      let nSumitdata = { ...submitData };
      nSumitdata.attachments = files;
      mutationAdd({ activity: nSumitdata });
      setStartUPload(false);
    }
    // const params = finalizeParams(submitData, type, ticketId, ticketName, parentComment, files);
    // console.log('generated params:', params);
    // mutationAdd.mutate({ comment: params });
  };
  //buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: 'ncrm_activity_save',
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
        label: 'ncrm_activity_save_and_create_new',
        color: 'secondary',
        onClick: () => {
          setIsReset(true);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: isLoading || !isValid,
        isLoading: isLoading
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="error" onClick={handleClose}>
              {t('ncrm_activity_cancel')}
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isLoading, isValid]);

  //======================== Debug ========================//
  //console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={<SpanLang keyLang={`ncrm_activity_new_${type}`} />}
        isOpen={isOpen} //writeOption.isOpenWrite
        size="lg"
        fullScreen={false}
        onClose={handleClose}
        footer={Footer}
      >
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {loading && <LoadingCircular loading={loading} />}
            <WriteFields
              startUpload={startUpload}
              onUploadCompleted={onUploadCompleted}
              currentUser={currentUser}
              watch={watch}
              control={control}
              errors={errors}
              fields={fields}
              setValue={setValue}
              menuApi={menuApi}
            />
          </form>
        )}
      </MiModal>
    </Suspense>
  );
};

export default withWriteForm(WriteModal);
