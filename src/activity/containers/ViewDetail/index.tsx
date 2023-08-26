import _ from 'lodash';
import React, { useCallback } from 'react';

import {
  ACTIVITY_DIRECTION_OUT,
  ACTIVITY_TASK_TYPE_CHECKLIST,
  ACTIVITY_TASK_TYPE_MANUAL,
  ACTIVITY_TASK_TYPE_SEQUENCE,
  ACTIVITY_TYPE_CALL,
  ACTIVITY_TYPE_MAIL,
  ACTIVITY_TYPE_SMS,
  ACTIVITY_TYPE_TASK
} from '@activity/config/constants';
import {
  KEY_NAME_ACTIVITY_CONTENT,
  KEY_NAME_ACTIVITY_STATUS,
  KEY_NAME_ACTIVITY_TASK_CHECKLIST,
  KEY_NAME_ACTIVITY_TASK_SEQUENCE
} from '@activity/config/keyNames';
import { queryKeys } from '@activity/config/queryKeys';
import CallBody from '@activity/containers/CallBody';
import MailBody from '@activity/containers/MailBody';
import SmsBody from '@activity/containers/SmsBody';
import StatusBar from '@activity/containers/StatusBar';
import { Activity } from '@activity/types/activity';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Divider } from '@mui/material';

interface ViewDetailProps {
  menuSource: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
}

const ViewDetail = (props: ViewDetailProps) => {
  const { menuSource, ignoreFields = [], column = 2, menuSourceId, layoutData } = props;
  const queryClient = useQueryClient();
  const activityData = queryClient.getQueryData([queryKeys.viewActivity, menuSourceId]) as Activity;
  // const viewData = useRecoilValue(viewDataByMenuAtom(menuSource));
  // const activityData = useRecoilValue(activityDataAtom);
  const basicFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  const moreFields: any[] = layoutData?.layout?.data?.[1]?.children || [];
  _.remove(ignoreFields, (n) => n == KEY_NAME_ACTIVITY_STATUS);
  // const activityData = null;
  const checkTaskType = useCallback(
    (v: string) => {
      let match = false;
      if (activityData?.type !== ACTIVITY_TYPE_TASK && v == KEY_NAME_ACTIVITY_CONTENT) match = true;
      if (activityData?.taskType == ACTIVITY_TASK_TYPE_CHECKLIST && v == KEY_NAME_ACTIVITY_TASK_CHECKLIST) {
        match = true;
      }

      if (activityData?.taskType == ACTIVITY_TASK_TYPE_SEQUENCE && v == KEY_NAME_ACTIVITY_TASK_SEQUENCE) {
        match = true;
      }

      if (activityData?.taskType == ACTIVITY_TASK_TYPE_MANUAL && v == KEY_NAME_ACTIVITY_CONTENT) {
        match = true;
      }
      return match;
    },
    [activityData]
  );
  // sms: content, call: content, email : mail form, task : content
  const newBasicFields: any[] = [];
  const newMoreFields: any[] = [];

  // if (activityData?.direction == ACTIVITY_DIRECTION_OUT) {
  //   newBasicFields.push({
  //     keyName: 'status',
  //     config: {
  //       component: StatusBar,
  //       hideTitle: true,
  //       viewProps: {
  //         userPermission: { isEdit: false, isShow: true }
  //       },
  //       showFullRow: true
  //     },
  //     data: activityData?.status
  //   });
  // }

  if (activityData?.type === ACTIVITY_TYPE_TASK) {
    // extract content/checklist/sequence
    for (const k in basicFields) {
      const v = basicFields[k];
      if (checkTaskType(v.keyName)) {
        newBasicFields.push(v);
        _.remove(ignoreFields, (n) => n == v.keyName);
      }
    }

    for (const k in moreFields) {
      const v = moreFields[k];
      newMoreFields.push(v);
      if (checkTaskType(v.keyName)) {
        _.remove(ignoreFields, (n) => n == v.keyName);
      }
    }
  } else if (activityData?.type === ACTIVITY_TYPE_CALL) {
    // extract content/checklist/sequence
    for (const k in basicFields) {
      const v = basicFields[k];
      if (checkTaskType(v.keyName)) {
        newBasicFields.push(v);
        _.remove(ignoreFields, (n) => n == v.keyName);
      }
    }

    for (const k in moreFields) {
      const v = moreFields[k];
      newMoreFields.push(v);
      if (checkTaskType(v.keyName)) {
        _.remove(ignoreFields, (n) => n == v.keyName);
      }
    }
  } else if (activityData?.type == ACTIVITY_TYPE_MAIL) {
    // extract content/checklist/sequence
    for (const k in basicFields) {
      const v = basicFields[k];
      if (checkTaskType(v.keyName)) {
        newBasicFields.push(v);
        _.remove(ignoreFields, (n) => n == v.keyName);
      }
    }

    for (const k in moreFields) {
      const v = moreFields[k];
      newMoreFields.push(v);
      if (checkTaskType(v.keyName)) {
        _.remove(ignoreFields, (n) => n == v.keyName);
      }
    }
  } else if (activityData?.type == ACTIVITY_TYPE_SMS) {
    // extract content/checklist/sequence
    for (const k in basicFields) {
      const v = basicFields[k];
      if (checkTaskType(v.keyName)) {
        newBasicFields.push(v);
        _.remove(ignoreFields, (n) => n == v.keyName);
      }
    }

    for (const k in moreFields) {
      const v = moreFields[k];
      newMoreFields.push(v);
      if (checkTaskType(v.keyName)) {
        _.remove(ignoreFields, (n) => n == v.keyName);
      }
    }
  }
  const fields = newBasicFields;
  // _.union(newBasicFields, newMoreFields);
  console.log(`~~~~ViewDetail fields`, fields, ignoreFields);
  return (
    <React.Suspense fallback={<></>}>
      {![ACTIVITY_TYPE_SMS, ACTIVITY_TYPE_MAIL].includes(activityData?.type) && (
        <StatusBar value={activityData?.status} menuSourceId={menuSourceId} menuSource={menuSource} />
      )}
      <Divider sx={{ my: 2, mx: -2 }} />
      <Box className="detail-view scroll-box">
        <ViewFields
          fields={fields}
          column={column}
          ignoreFields={ignoreFields}
          menuSource={layoutData?.menuSource ?? ''}
          menuSourceId={layoutData?.menuSourceId ?? ''}
        />
      </Box>
    </React.Suspense>
  );
};

export default ViewDetail;
