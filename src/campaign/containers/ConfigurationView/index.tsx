import React from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//material
import { Box } from '@mui/material';

//project
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@campaign/config/keyNames';
import { STEP_FIELDS } from '@campaign/config/constants';

interface ConfigurationViewProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
}

const ConfigurationView = (props: ConfigurationViewProps) => {
  const { menuCategory, menuSourceId, ignoreFields = [], column = 2, layoutData, readOnly } = props;

  //get data view
  const queryClient = useQueryClient();
  //const customerData = queryClient.getQueryData([customerQueryKeys.customerGet, menuSourceId]) as Customer;

  //get fields
  const allFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  //configuration fields
  const configureFields = allFields.filter((_field: any) => STEP_FIELDS[1].includes(_field.keyName));

  //hidden fields
  let moreIgnoreFields: string[] = [keyNames.KEY_CAMPAIGN_ATTACHMENT];

  return (
    <React.Suspense fallback={<></>}>
      <Box className="detail-view scroll-box">
        <ViewFields
          fields={configureFields}
          column={column}
          ignoreFields={[...ignoreFields, ...moreIgnoreFields]}
          menuSource={layoutData?.menuSource ?? ''}
          menuSourceId={layoutData?.menuSourceId ?? ''}
          readOnly={readOnly}
        />
      </Box>
    </React.Suspense>
  );
};

export default ConfigurationView;
