import React from 'react';
import { Box } from '@mui/material';

import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';
import * as baseKeyNames from "@base/config/keyNames";

import * as keyNames from '@analytic/sus-log/config/keyNames';

interface ViewDetailProps {
  menuSource?: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
}

const ViewDetail = (props: ViewDetailProps) => {
  const {
    menuSource,
    menuSourceId,
    ignoreFields = [],
    column = 2,
    layoutData
  } = props;

  const detailKeys = [
    keyNames.SUS_LOG_CAMPAIGN,
    keyNames.SUS_LOG_CUSTOMER,
    keyNames.SUS_LOG_ACTIVITY,
    keyNames.SUS_LOG_PROCESS,
    keyNames.SUS_LOG_DOCUMENT,
    keyNames.SUS_LOG_EMAIL,
    keyNames.SUS_LOG_MOBILE,
    baseKeyNames.KEY_NAME_CREATED_AT,
    baseKeyNames.KEY_NAME_CREATED_BY,
    baseKeyNames.KEY_NAME_UPDATED_AT,
    baseKeyNames.KEY_NAME_UPDATED_BY
  ];

  const basicFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  const moreFields: any[] = layoutData?.layout?.data?.[1]?.children || [];

  const detailFields = basicFields.filter((_ele: any) => detailKeys.includes(_ele.keyName));
  const detailMoreFields = moreFields.filter((_ele: any) => detailKeys.includes(_ele.keyName));

  const moreIgnoreFields: string[] = [];

  const viewFields = [...detailFields, ...detailMoreFields].map((_ele: any) => ({
    ..._ele,
    userPermission: { ..._ele.userPermission, isEdit: false }
  }));

  return (
    <React.Suspense fallback={<></>}>
      <Box className="detail-view scroll-box">
        <ViewFields
          fields={viewFields}
          column={column}
          ignoreFields={[...ignoreFields, ...moreIgnoreFields]}
          menuSource={menuSource}
          menuSourceId={menuSourceId}
        />
      </Box>
    </React.Suspense>
  );
};

export default ViewDetail;
