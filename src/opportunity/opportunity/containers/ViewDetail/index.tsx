import React from 'react';

//project
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@opportunity/config/keyNames';

//material
import DetailInfo from './DetailInfo';
import LeadInfo from './LeadInfo';
import CloseOpportunity from './CloseOpportunity';
import { CLOSE_TYPE_NONE } from '@opportunity/config/constants';

interface ViewDetailProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
  onRefetch: () => void;
}

const ViewDetail = (props: ViewDetailProps) => {
  const { menuCategory, menuSourceId, ignoreFields = [], column = 2, layoutData, readOnly, onRefetch } = props;
  let basicFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  const closedTypeField = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_NAME_OPPORTUNITY_CLOSE_TYPE);

  return (
    <>
      <DetailInfo {...props} />
      <LeadInfo {...props} />
      {!!closedTypeField?.data && closedTypeField?.data !== CLOSE_TYPE_NONE && <CloseOpportunity {...props} />}
    </>
  );
};

export default ViewDetail;
