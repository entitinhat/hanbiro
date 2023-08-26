import { useState } from 'react';
import { default as customerViewConfig } from '@customer/config/view-field';
import ContactName from '@desk/ticket/containers/ViewFields/ContactName';
import * as keyNames from '@customer/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { MENU_CUSTOMER, MENU_CUSTOMER_CONTACT } from '@base/config/menus';
import { PlusOneOutlined } from '@mui/icons-material';
import WriteModal from '@customer/pages/WritePage';
import { Customer } from '@customer/types/interface';
import MainCard from '@base/components/App/MainCard';
import { Box, Button } from '@mui/material';
import { PageLayoutData, PageLayoutSectionField } from '@base/types/pagelayout';

import { getFieldLayoutDataByKeyNames } from '@base/utils/helpers/pageLayoutUtils';
interface TicketContactInfoProps {
  menuSource: string;
  menuSourceId: string;
  account?: Customer | null;
  readOnly?: boolean;
  layoutData: PageLayoutData;
}
const ResolutionInfo = (props: TicketContactInfoProps) => {
  const { account, readOnly, layoutData, menuSource, menuSourceId } = props;
  // console.log('🚀 ~ file: index.tsx:22 ~ ResolutionInfo ~ layoutData:', layoutData);
  //state
  const [showAdd, setShowAdd] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  //build fields by config
  const buildFieldConfig = (data: any, keyName: string, languageKey: string) => {
    return {
      config: customerViewConfig[keyName],
      data,
      keyName,
      languageKey,
      userPermission: { isEdit: true, isShow: true }
    };
  };
  const reportKeyNames = ['firstRespondDue', 'resolutionDue', 'createdAt', 'closedAt', 'realDuration'];

  const SampleFields = getFieldLayoutDataByKeyNames(layoutData, reportKeyNames);
  // console.log('🚀 ~ file: index.tsx:42 ~  ResolutionInfo ~ SampleFields:', SampleFields);
  return (
    <>
      <Box sx={{ marginBotton: 10 }}>
        {SampleFields != null ? (
          <ViewFields
            fields={SampleFields}
            ignoreFields={[]}
            menuSource={menuSource} //data?.category === 'CATEGORY_ACCOUNT' ? 'customer_account' : 'customer_contact'
            menuSourceId={menuSourceId}
            readOnly={readOnly}
            column={1}
            direction="row"
            sxGridItem={{ pb: 0 }}
          />
        ) : null}
      </Box>
    </>
  );
};

export default ResolutionInfo;
