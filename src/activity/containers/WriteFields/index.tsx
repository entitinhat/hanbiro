import React, { useMemo, useEffect, useState } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormWatch, UseFormSetValue } from 'react-hook-form';

// project imports
import WriteField from '@base/containers/WriteField';

//config
import * as keyNames from '@activity/config/keyNames';
import {
  ACTIVITY_CALL_TYPE_LOG,
  ACTIVITY_DIRECTION_IN,
  ACTIVITY_MENU_CALL,
  ACTIVITY_MENU_EMAIL,
  ACTIVITY_MENU_SMS,
  ACTIVITY_MENU_TASK,
  ACTIVITY_SEND_TYPE_NOW,
  ACTIVITY_SMS_TYPE_SMS,
  ACTIVITY_SMS_TYPE_LMS,
  ACTIVITY_TASK_TYPE_CHECKLIST,
  ACTIVITY_TASK_TYPE_SEQUENCE,
  ACTIVITY_TASK_TYPE_MANUAL,
  ACTIVITY_DIRECTION_OUT
} from '@activity/config/constants';
import { getItemWriteFields } from '@activity/config/write-field';
import { useRecoilState } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';
import { useMenuSettings } from '@settings/general/hooks/useMenuSetting';
import { User } from '@base/types/user';

interface WriteFieldsProps {
  menuApi: string;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  setValue?: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  //type currentUSer : User + companyPhone,companyName
  currentUser?: any | null;
  startUpload?: boolean;
  onUploadCompleted?: any;
}

const WriteFields = (props: WriteFieldsProps) => {
  const { menuApi, fields, watch, control, setValue, errors, currentUser, startUpload, onUploadCompleted } = props;

  //state
  const activityType = menuApi.split('_').length > 1 ? menuApi.split('_')[1] : ACTIVITY_MENU_TASK;

  //Reorder field
  const newFields = useMemo(() => {
    return getItemWriteFields(activityType, fields);
  }, [activityType, fields]);
  //watching
  const taskType = watch(keyNames.KEY_NAME_ACTIVITY_TASK_TYPE);
  const status = watch(keyNames.KEY_NAME_ACTIVITY_STATUS);
  const callType = watch(keyNames.KEY_NAME_ACTIVITY_CALL_TYPE);
  const direction = watch(keyNames.KEY_NAME_ACTIVITY_DIRECTION);
  const sendType = watch(keyNames.KEY_NAME_ACTIVITY_SEND_TYPE);
  const smsType = watch(keyNames.KEY_NAME_ACTIVITY_SMS_TYPE);
  const showMailCc = watch(keyNames.KEY_NAME_ACTIVITY_MAIL_SHOW_CC);
  const smsImageFiles = watch(keyNames.KEY_NAME_ACTIVITY_SMS_IMAGE);
  const tpl = watch(keyNames.KEY_NAME_ACTIVITY_TPL);

  // console.log('callType auth: ', auth, CompanyPhones);

  //main fields
  const MainFields = useMemo(() => {
    return (
      <>
        {newFields.map((_item, _index) => {
          if (activityType == ACTIVITY_MENU_TASK) {
            if (taskType?.value == ACTIVITY_TASK_TYPE_CHECKLIST) {
              if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_TPL) {
                return;
              }
              _item.componentProps = {
                ..._item.componentProps,
                allChecked: status.keyName == 'STATUS_DONE'
              };
              if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_CONTENT || _item.keyName == keyNames.KEY_NAME_ACTIVITY_TASK_SEQUENCE) {
                return;
              }
            } else if (taskType?.value == ACTIVITY_TASK_TYPE_SEQUENCE) {
              if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_TPL) {
                return;
              }
              _item.componentProps = {
                ..._item.componentProps,
                allChecked: status.keyName == 'STATUS_DONE'
              };
              if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_CONTENT || _item.keyName == keyNames.KEY_NAME_ACTIVITY_TASK_CHECKLIST) {
                return;
              }
            } else {
              if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_TASK_CHECKLIST || _item.keyName == keyNames.KEY_NAME_ACTIVITY_TASK_SEQUENCE) {
                return;
              }
            }
          } else if (activityType == ACTIVITY_MENU_CALL) {
            if (direction?.value == ACTIVITY_DIRECTION_IN) {
              if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_FROM) {
                const item = fields.find((field) => field.keyName == keyNames.KEY_NAME_ACTIVITY_TO);
                _item = {
                  ...item,
                  keyName: keyNames.KEY_NAME_ACTIVITY_FROM,
                  languageKey: _item.languageKey
                };
              } else if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_TO) {
                const item = fields.find((field) => field.keyName == keyNames.KEY_NAME_ACTIVITY_FROM);
                _item = {
                  ...item,
                  keyName: keyNames.KEY_NAME_ACTIVITY_TO,
                  languageKey: _item.languageKey
                };
              }
            }
            if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_REMINDER && callType?.value == ACTIVITY_CALL_TYPE_LOG) {
              return;
            }
            if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_FROM) {
              _item.componentProps = {
                ..._item.componentProps,
                mode: 'phone'
              };
            }
            if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_TAGS) {
              _item.columns = 2;
            }
            if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_DIRECTION) {
              _item.componentProps = {
                ..._item.componentProps,
                options: [
                  {
                    label: 'ncrm_activity_incoming',
                    value: ACTIVITY_DIRECTION_IN,
                    disabled: callType?.value == 'CALL_TYPE_SCHEDULE'
                  },
                  {
                    label: 'ncrm_activity_outgoing',
                    value: ACTIVITY_DIRECTION_OUT
                  }
                ]
              };
            }
            if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_TO) {
              _item.componentProps = {
                ..._item.componentProps,
                mode: 'phone'
              };
            }
          } else if (activityType == ACTIVITY_MENU_EMAIL || activityType == ACTIVITY_MENU_SMS) {
            if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_START_TIME && sendType?.value == ACTIVITY_SEND_TYPE_NOW) {
              return;
            }
            if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_START_TIME) {
              _item.componentProps = {
                ..._item.componentProps,
                sx: { width: '50%' }
              };
              _item.showFullRow = false;
              _item.columns = 1;
              _item.hideTitle = true;
            }
            if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_DIRECTION) {
              return;
            }

            if (activityType == ACTIVITY_MENU_EMAIL) {
              if (_item.keyname == keyNames.KEY_NAME_ACTIVITY_ATTACHMENTS) {
                _item.componentProps = {
                  ..._item.componentProps,
                  onUploadCompleted: onUploadCompleted,
                  startUpload: startUpload
                };
              }
              if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_FROM) {
                _item.componentProps = {
                  ..._item.componentProps,
                  mode: 'email',
                  isDisabled: true,
                  placeholder: `${currentUser?.displayName} <${currentUser?.primaryEmail}>`
                };
              }

              if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_TO) {
                _item.hideTitle = true;
                _item.componentProps = {
                  ..._item.componentProps,
                  mode: 'email'
                };
              }
            }
            if (activityType == ACTIVITY_MENU_SMS) {
              if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_FROM) {
                _item.componentProps = {
                  ..._item.componentProps,
                  mode: 'phone',
                  isDisabled: true,
                  placeholder: `${currentUser?.companyName} <${currentUser?.companyPhone}>`
                };
              }
              if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_TO) {
                _item.hideTitle = true;
                _item.componentProps = {
                  ..._item.componentProps,
                  mode: 'sms'
                };
              }
            }
          }

          if (_item.keyName == keyNames.KEY_NAME_ACTIVITY_TPL) {
            // email : { filter: { query: 'group=2 groupBy=all' } }
            // sms : { filter: { query: 'group=3 groupBy=all' } }
            // call : { filter: { query: 'group=5 groupBy=all' } }
            // task : { filter: { query: 'group=4 groupBy=all' } }
            let templateGroup = 0;
            let subTypeFilter = '';
            if (activityType == ACTIVITY_MENU_TASK) {
              templateGroup = 4;
              if (taskType?.value == ACTIVITY_TASK_TYPE_MANUAL) {
                subTypeFilter = 'subType=SUB_TYPE_TASK_MANUAL';
              } else if (taskType?.value == ACTIVITY_TASK_TYPE_CHECKLIST) {
                subTypeFilter = 'subType=SUB_TYPE_TASK_CHECK_LIST';
              } else if (taskType?.value == ACTIVITY_TASK_TYPE_SEQUENCE) {
                subTypeFilter = 'subType=SUB_TYPE_TASK_SEQUENCE';
              }
            } else if (activityType == ACTIVITY_MENU_EMAIL) {
              templateGroup = 2;
            } else if (activityType == ACTIVITY_MENU_CALL) {
              templateGroup = 5;
            } else if (activityType == ACTIVITY_MENU_SMS) {
              templateGroup = 3;
              if (smsType?.value == ACTIVITY_SMS_TYPE_SMS) {
                subTypeFilter = 'subType=SUB_TYPE_MESSAGE_SMS';
              } else if (smsType?.value == ACTIVITY_SMS_TYPE_LMS) {
                subTypeFilter = 'subType=SUB_TYPE_MESSAGE_MMS';
              }
            }
            _item.componentProps = {
              ..._item.componentProps,
              extraParams: {
                query: `group=${templateGroup} stage=STAGE_ACTIVE ${subTypeFilter}`
              }
            };
          }

          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fields, taskType, callType, direction, sendType, smsType, showMailCc, status, currentUser?.id, startUpload]);
  //tpl change, set template
  useEffect(() => {
    if (tpl) {
      if (activityType == ACTIVITY_MENU_TASK) {
        if (taskType?.value == ACTIVITY_TASK_TYPE_CHECKLIST) {
          setValue && setValue(keyNames.KEY_NAME_ACTIVITY_TASK_CHECKLIST, tpl.data);
        } else if (taskType?.value == ACTIVITY_TASK_TYPE_SEQUENCE) {
          setValue && setValue(keyNames.KEY_NAME_ACTIVITY_TASK_SEQUENCE, tpl.data);
        } else if (taskType?.value == ACTIVITY_TASK_TYPE_MANUAL) {
          setValue && setValue(keyNames.KEY_NAME_ACTIVITY_CONTENT, tpl?.data?.html);
        }
      } else if (activityType == ACTIVITY_MENU_SMS || activityType == ACTIVITY_MENU_CALL) {
        setValue && setValue(keyNames.KEY_NAME_ACTIVITY_DESCRIPTION, tpl?.data?.html);
      } else {
        //email
        setValue && setValue(keyNames.KEY_NAME_ACTIVITY_CONTENT, tpl?.data?.html);
      }
    }
  }, [tpl]);
  //render

  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2} alignItems="center">
        {MainFields}
      </Grid>
    </Box>
  );
};

export default WriteFields;
