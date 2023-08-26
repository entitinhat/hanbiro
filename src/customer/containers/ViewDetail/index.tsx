import React from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
//import { customerQueryKeys } from '@customer/config/queryKeys';
//import { Customer } from '@customer/types/interface';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import * as keyNames from '@customer/config/keyNames';

//material
import { Box } from '@mui/material';
import { generateUUID } from '@base/utils/helpers';
import { SET_TIMEOUT } from '@base/config/constant';
import { customerQueryKeys } from '@customer/config/queryKeys';
import { Customer } from '@customer/types/interface';

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

  //get data view
  const queryClient = useQueryClient();
  //const customerData = queryClient.getQueryData([customerQueryKeys.customerGet, menuSourceId]) as Customer;

  //get fields
  let basicFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  const moreFields: any[] = layoutData?.layout?.data?.[1]?.children || [];

  // change Anniversary to Birthday language key
  basicFields = basicFields?.map((v: any) => {
    if (v.keyName === keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES) {
      return {
        ...v,
        languageKey: 'customer_contact_field_basic_birthday'
      };
    }
    return v;
  });

  //hidden fields
  let moreIgnoreFields: string[] = [];
  if (menuCategory === CUSTOMER_CATEGORY_ACCOUNT) {
    moreIgnoreFields = [
      keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO,
      keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
      keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
      keyNames.KEY_NAME_CUSTOMER_UPDATED_BY,
      keyNames.KEY_NAME_CUSTOMER_UPDATED_AT
    ];
  }
  if (menuCategory === CUSTOMER_CATEGORY_CONTACT) {
    const contactTypeField = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE);
    if (contactTypeField?.data?.keyName === 'CONTACT_TYPE_EMPLOYEE') {
      const showFields = [
        keyNames.KEY_NAME_CUSTOMER_GENDER,
        keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES,
        keyNames.KEY_NAME_CUSTOMER_DESCRIPTION
      ];
      moreIgnoreFields = moreFields.filter((_field: any) => !showFields.includes(_field.keyName)).map((_ele: any) => _ele.keyName);
    } else {
      moreIgnoreFields = [
        keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO,
        keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
        keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
        keyNames.KEY_NAME_CUSTOMER_UPDATED_BY,
        keyNames.KEY_NAME_CUSTOMER_UPDATED_AT
      ];
    }
  }

  moreIgnoreFields = [];

  const contactTypeField = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE);
  let isEmployee = menuCategory === CUSTOMER_CATEGORY_CONTACT && contactTypeField?.data === 'CONTACT_TYPE_EMPLOYEE' ? true : false;
  let viewDetailfields: string[] = [];

  if (menuCategory === CUSTOMER_CATEGORY_ACCOUNT) {
    viewDetailfields = [
      keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT,
      keyNames.KEY_NAME_CUSTOMER_WEBSITES,
      keyNames.KEY_NAME_CUSTOMER_FAX,
      keyNames.KEY_NAME_CUSTOMER_PARENT_ACCOUNT,
      keyNames.KEY_NAME_CUSTOMER_MAIN_PRODUCT,
      keyNames.KEY_NAME_CUSTOMER_ANNUAL_REVENUE,
      keyNames.KEY_NAME_CUSTOMER_EMPLOYEES_NUMBER,
      keyNames.KEY_NAME_CUSTOMER_CRN,
      keyNames.KEY_NAME_CUSTOMER_SLA,
      keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
      keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
      keyNames.KEY_NAME_CUSTOMER_UPDATED_AT
    ];
  } else if (menuCategory === CUSTOMER_CATEGORY_CONTACT) {
    if (isEmployee) {
      viewDetailfields = [
        keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT,
        keyNames.KEY_NAME_CUSTOMER_GENDER,
        keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES,
        keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
        keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
        keyNames.KEY_NAME_CUSTOMER_UPDATED_AT
      ];
    } else {
      viewDetailfields = [
        keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT,
        keyNames.KEY_NAME_CUSTOMER_GENDER,
        keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES,
        keyNames.KEY_NAME_CUSTOMER_SLA,
        keyNames.KEY_NAME_CUSTOMER_OWNER,
        keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
        keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
        keyNames.KEY_NAME_CUSTOMER_CREATED_BY
      ];
    }
  }

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
      queryClient.setQueryData([customerQueryKeys.customerGet], (old: Customer | undefined) => {
        return { ...old, ...value };
      });
    }

    setTimeout(() => {
      onRefetch && onRefetch();
    }, SET_TIMEOUT);
  };

  return (
    <React.Suspense fallback={<></>}>
      <Box className="detail-view scroll-box" mt={4}>
        <ViewFields
          fields={viewDetailfields
            .map((keyName: string) => basicFields.find((v: any) => v.keyName === keyName))
            .filter((v: any) => v !== undefined)}
          column={column}
          ignoreFields={[...ignoreFields, ...moreIgnoreFields]}
          menuSource={layoutData?.menuSource ?? ''}
          menuSourceId={layoutData?.menuSourceId ?? ''}
          readOnly={readOnly}
          onSave={handleOnSave}
        />
      </Box>
    </React.Suspense>
  );
};

export default ViewDetail;
