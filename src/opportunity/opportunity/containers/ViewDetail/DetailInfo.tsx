import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Box } from '@mui/material';

// project
import { PageLayoutData } from '@base/types/pagelayout';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { SET_TIMEOUT } from '@base/config/constant';

// opportunity
import * as keyNames from '@opportunity/config/keyNames';
import { queryKeys } from '@opportunity/config/queryKeys';
import { Opportunity } from '@opportunity/types/interfaces';

interface DetailInfoProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
  onRefetch: () => void;
}

function DetailInfo(props: DetailInfoProps) {
  const { menuCategory, menuSourceId, ignoreFields = [], column = 2, layoutData, readOnly, onRefetch } = props;

  //get data view
  const queryClient = useQueryClient();
  //const customerData = queryClient.getQueryData([customerQueryKeys.customerGet, menuSourceId]) as Customer;

  //get fields
  let basicFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  const moreFields: any[] = layoutData?.layout?.data?.[1]?.children || [];

  //hidden fields
  let moreIgnoreFields: string[] = [];

  const viewDetailfields: string[] = [
    keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_REVENUE,
    keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_CLOSE_AT,
    keyNames.KEY_NAME_OPPORTUNITY_PROCESS,
    keyNames.KEY_NAME_OPPORTUNITY_QUOTE_PROCESS,
    keyNames.KEY_NAME_OPPORTUNITY_DESCRIPTION
  ];
  console.log(
    'details: ',
    viewDetailfields.map((keyName: string) => basicFields.find((v: any) => v.keyName === keyName)).filter((v: any) => v !== undefined)
  );

  //after save
  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    //console.log('...Activity > View > handleOnSave ', keyName, isSuccess, value);

    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([queryKeys.opportunityGet], (old: Opportunity | undefined) => {
        return { ...old, ...value };
      });
    }

    setTimeout(() => {
      onRefetch && onRefetch();
    }, SET_TIMEOUT);
  };

  return (
    <React.Suspense fallback={<></>}>
      <Box className="detail-view scroll-box" mt={1}>
        <ViewFields
          fields={viewDetailfields
            .map((keyName: string) => basicFields.find((v: any) => v.keyName === keyName))
            .filter((v: any) => v !== undefined)}
          column={2}
          ignoreFields={[...ignoreFields, ...moreIgnoreFields]}
          menuSource={layoutData?.menuSource ?? ''}
          menuSourceId={layoutData?.menuSourceId ?? ''}
          readOnly={readOnly}
          onSave={handleOnSave}
        />
      </Box>
    </React.Suspense>
  );
}

export default DetailInfo;
