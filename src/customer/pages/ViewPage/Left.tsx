import React, { useMemo } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

// types import
import { PageLayoutData, PageLayoutSectionField } from '@base/types/pagelayout';

// mui import
import { Accordion, AccordionDetails, AccordionSummary, Divider, Stack, Typography } from '@mui/material';

// project import
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import PhotoViewField from '@base/containers/ViewField/Photo';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

//menu
import { customerQueryKeys } from '@customer/config/queryKeys';
import * as keyNames from '@customer/config/keyNames';
import { Customer } from '@customer/types/interface';
import { MENU_CUSTOMER } from '@base/config/menus';
import { useTranslation } from 'react-i18next';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import { generateUUID } from '@base/utils/helpers';
import { default as viewConfig } from '@customer/config/view-field';
import { SET_TIMEOUT } from '@base/config/constant';

interface LeftProps {
  layoutData: PageLayoutData;
  menuCategory: string;
  ignoreFields?: string[];
  onRefetch?: () => void;
}

const Left = (props: LeftProps) => {
  const { menuCategory, layoutData, ignoreFields = [], onRefetch } = props;
  const { menuSource, menuSourceId, data } = layoutData;

  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  const moreBasicFields: PageLayoutSectionField[] = [
    {
      children: [],
      dataType: 'custom',
      defaultViewInList: true,
      isViewing: true,
      hidden: false,
      id: generateUUID(),
      isDefault: true,
      keyName: keyNames.KEY_NAME_CUSTOMER_ADDRESSES,
      languageKey: viewConfig?.[keyNames.KEY_NAME_CUSTOMER_ADDRESSES]?.languageKey || '',
      name: keyNames.KEY_NAME_CUSTOMER_ADDRESSES,
      order: 0,
      orderInList: 8,
      orderInView: 8,
      orderInWrite: 8,
      showInList: true,
      showInView: true,
      showInWrite: true,
      title: keyNames.KEY_NAME_CUSTOMER_ADDRESSES,
      userPermission: {
        isEdit: true,
        isShow: true,
        isSortable: false
      },
      options: undefined,
      attributes: [],
      data: viewConfig?.[keyNames.KEY_NAME_CUSTOMER_ADDRESSES]?.getValue?.(data) || null,
      config: viewConfig?.[keyNames.KEY_NAME_CUSTOMER_ADDRESSES]
    }
  ];

  //photo
  const photoField = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_NAME_CUSTOMER_PHOTO);

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

  //close
  const handleOnClose = (keyName: string, value: any) => {
    //console.log('...Activity > View > handleOnClose ', keyName, value);
  };

  let orderBasicField: string[] = [];

  const contactTypeField = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE);
  let isEmployee = menuCategory === CUSTOMER_CATEGORY_CONTACT && contactTypeField?.data === 'CONTACT_TYPE_EMPLOYEE' ? true : false;

  if (menuCategory === CUSTOMER_CATEGORY_ACCOUNT) {
    orderBasicField = [
      keyNames.KEY_NAME_CUSTOMER_NAME,
      keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO,
      keyNames.KEY_NAME_CUSTOMER_CODE,
      keyNames.KEY_NAME_CUSTOMER_TYPE,
      keyNames.KEY_NAME_CUSTOMER_RATING,
      keyNames.KEY_NAME_CUSTOMER_INDUSTRIES,
      keyNames.KEY_NAME_CUSTOMER_EMAIL,
      keyNames.KEY_NAME_CUSTOMER_PHONES,
      keyNames.KEY_NAME_CUSTOMER_ADDRESSES,
      keyNames.KEY_NAME_CUSTOMER_DESCRIPTION
    ];
  } else if (menuCategory === CUSTOMER_CATEGORY_CONTACT) {
    if (isEmployee) {
      orderBasicField = [
        keyNames.KEY_NAME_CUSTOMER_NAME,
        keyNames.KEY_NAME_CUSTOMER_CODE,
        keyNames.KEY_NAME_CUSTOMER_TYPE,
        keyNames.KEY_NAME_CUSTOMER_EMAIL,
        keyNames.KEY_NAME_CUSTOMER_MOBILE,
        keyNames.KEY_NAME_CUSTOMER_PHONES,
        keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE,
        keyNames.KEY_NAME_CUSTOMER_DEPARTMENT,
        keyNames.KEY_NAME_CUSTOMER_JOB,
        keyNames.KEY_NAME_CUSTOMER_DESCRIPTION
      ];
    } else {
      orderBasicField = [
        keyNames.KEY_NAME_CUSTOMER_NAME,
        keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO,
        keyNames.KEY_NAME_CUSTOMER_CODE,
        keyNames.KEY_NAME_CUSTOMER_TYPE,
        keyNames.KEY_NAME_CUSTOMER_RATING,
        keyNames.KEY_NAME_CUSTOMER_EMAIL,
        keyNames.KEY_NAME_CUSTOMER_MOBILE,
        keyNames.KEY_NAME_CUSTOMER_PHONES,
        keyNames.KEY_NAME_CUSTOMER_ADDRESSES,
        keyNames.KEY_NAME_CUSTOMER_DESCRIPTION
      ];
    }
  }

  //view fields render
  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={orderBasicField.map((keyName: string) => basicFields.concat(moreBasicFields).find((v: any) => v.keyName === keyName))}
            ignoreFields={[...ignoreFields, keyNames.KEY_NAME_CUSTOMER_PHOTO, keyNames.KEY_NAME_CUSTOMER_ACCOUNT]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            readOnly={data?.restore?.id ? true : false}
            divider
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId, data]);

  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_common_summary'),
      sections: [
        {
          component: photoField && (
            <Stack alignItems="center" justifyContent={'center'} sx={{ p: 2, pt: 0, pb: 1 }} width={170}>
              <PhotoViewField
                menuSource={MENU_CUSTOMER}
                menuSourceId={menuSourceId || ''}
                value={photoField?.data || ''}
                onRefetch={onRefetch}
              />
            </Stack>
          )
        },
        {
          component: FieldsMemo
        }
      ]
    }
  ];

  return <ViewLeft items={leftItems} />;
};

export default Left;
