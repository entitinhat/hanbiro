import { useMemo } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

//menu
import * as keyNames from '@quote/config/keyNames';
import { queryKeys } from '@quote/config/queryKeys';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
}

const Left = (props: LeftProps) => {
  const { layoutData, ignoreFields = [], onRefetch } = props;
  const { menuSource, menuSourceId, data } = layoutData;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  //hide fields
  const hiddenFields: string[] = [
    keyNames.KEY_NAME_QUOTE_STATUS,
    keyNames.KEY_NAME_QUOTE_SUBJECT,
    // keyNames.KEY_NAME_QUOTE_SALES_REP,
    keyNames.KEY_NAME_QUOTE_ACCOUNT,
    keyNames.KEY_NAME_QUOTE_CONTACT,
    // keyNames.KEY_NAME_QUOTE_DESCRIPTION,
    keyNames.KEY_NAME_QUOTE_BILL_TO,
    keyNames.KEY_NAME_QUOTE_SHIP_TO,
    keyNames.KEY_NAME_QUOTE_ITEMS,

    keyNames.KEY_NAME_QUOTE_CREATE_INVOICE,
    keyNames.KEY_NAME_QUOTE_PRICE_LIST,
    keyNames.KEY_NAME_QUOTE_PRODUCT_DETAIL
  ];

  //not allow edit fields
  const readOnlyFields: string[] = [keyNames.KEY_NAME_QUOTE_CODE, keyNames.KEY_NAME_QUOTE_PROCESS];

  const viewBasicFields = basicFields.map((_ele: any) => ({
    ..._ele,
    userPermission: { ..._ele.userPermission, isEdit: !readOnlyFields.includes(_ele.keyName) }
  }));

  //after save
  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    //console.log('...Activity > View > handleOnSave ', keyName, isSuccess, value);

    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([queryKeys.viewQuote], (old: any) => {
        return { ...old, ...value };
      });
    }

    onRefetch && onRefetch();
  };

  //close
  const handleOnClose = (keyName: string, value: any) => {
    //console.log('...Activity > View > handleOnClose ', keyName, value);
  };

  const basicFieldsOrder = [
    keyNames.KEY_NAME_QUOTE_CODE,
    keyNames.KEY_NAME_QUOTE_CUSTOMER,
    keyNames.KEY_NAME_QUOTE_OPPORTUNITY,
    keyNames.KEY_NAME_QUOTE_DATE,
    keyNames.KEY_NAME_QUOTE_EXPIRY_DATE,
    keyNames.KEY_NAME_QUOTE_EXPECTED_SHIPMENT_DATE,
    keyNames.KEY_NAME_QUOTE_PROCESS,
    keyNames.KEY_NAME_QUOTE_SALES_REP,
    keyNames.KEY_NAME_QUOTE_DESCRIPTION,
    keyNames.KEY_NAME_QUOTE_TEMPLATE,
    keyNames.KEY_NAME_QUOTE_EMAI_TEMPLATE
  ];

  //view fields render
  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFieldsOrder.map((keyName: string) => viewBasicFields.find((v: any) => v.keyName === keyName))}
            ignoreFields={[...ignoreFields, ...hiddenFields]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
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
          component: FieldsMemo
        },
      ]
    }
  ];

  return (<ViewLeft items={leftItems} />);
};

export default Left;
