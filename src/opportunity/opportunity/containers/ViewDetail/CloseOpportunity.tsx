import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Box } from '@mui/material';

// base
import { PageLayoutData } from '@base/types/pagelayout';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { SET_TIMEOUT } from '@base/config/constant';

// opportunity
import * as keyNames from '@opportunity/config/keyNames';
import { queryKeys } from '@opportunity/config/queryKeys';
import { Opportunity } from '@opportunity/types/interfaces';
import MainCard from '@base/components/App/MainCard';
import { useTranslation } from 'react-i18next';

interface CloseOpportunityProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
  onRefetch: () => void;
}

const CloseOpportunity = (props: CloseOpportunityProps) => {
  const { menuSource, menuCategory, menuSourceId, column, layoutData, ignoreFields, readOnly, onRefetch } = props;
  const { t } = useTranslation();
  //get data view
  const queryClient = useQueryClient();
  //const customerData = queryClient.getQueryData([customerQueryKeys.customerGet, menuSourceId]) as Customer;

  //get fields
  let basicFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  const moreFields: any[] = layoutData?.layout?.data?.[1]?.children || [];

  //hidden fields
  let moreIgnoreFields: string[] = [];

  const viewDetailfields: string[] = [
    keyNames.KEY_NAME_OPPORTUNITY_CLOSE_TYPE,
    keyNames.KEY_NAME_OPPORTUNITY_ACTUAL_REVENUE,
    keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE,
    keyNames.KEY_NAME_OPPORTUNITY_CLOSE_COMPETITOR,
    keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DESC
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
    <MainCard
      contentSX={{ p: 0, pb: '0px !important' }}
      border={false}
      headerSX={{ p: '8px 16px', height: '50px' }}
      title={t('Close Opportunity')}
    >
      <React.Suspense fallback={<></>}>
        <Box className="detail-view scroll-box" mt={1}>
          <ViewFields
            fields={viewDetailfields
              .map((keyName: string) => basicFields.find((v: any) => v.keyName === keyName))
              .filter((v: any) => v !== undefined)}
            column={2}
            ignoreFields={[]}
            menuSource={layoutData?.menuSource ?? ''}
            menuSourceId={layoutData?.menuSourceId ?? ''}
            readOnly={readOnly}
            onSave={handleOnSave}
          />
        </Box>
      </React.Suspense>
    </MainCard>
  );
};

export default CloseOpportunity;
