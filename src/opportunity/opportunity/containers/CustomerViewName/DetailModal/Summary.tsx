import React, { useMemo } from 'react';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import * as keyNames from '@customer/config/keyNames';
import { generateUUID } from '@base/utils/helpers';
import { MENU_CUSTOMER } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/usePageLayout';
import { PageLayoutData, PageLayoutSectionField } from '@base/types/pagelayout';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';
import viewConfig from '@customer/config/view-field';
import { useCustomer } from '@customer/hooks/useCustomer';

interface SummaryProps {
  menuSourceId: string;
}

const Summary = (props: SummaryProps) => {
  const { menuSourceId } = props;
  //   layout
  const menuSource = MENU_CUSTOMER;
  const layoutMenu: string = [MENU_CUSTOMER, 'account'].join('_');
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: []
  });

  const { data, isLoading, refetch } = useCustomer(viewSchema, menuSourceId, {
    enabled: viewSchema.length > 0 && !!menuSourceId
  });

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  const orderBasicField = [
    keyNames.KEY_NAME_CUSTOMER_TYPE,
    keyNames.KEY_NAME_CUSTOMER_NAME,
    keyNames.KEY_NAME_CUSTOMER_INDUSTRIES,
    keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT,
    keyNames.KEY_NAME_CUSTOMER_WEBSITES,
    keyNames.KEY_NAME_CUSTOMER_EMAIL,
    keyNames.KEY_NAME_CUSTOMER_PHONES,
    keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES,
    keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES
  ];

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

  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={orderBasicField.map((keyName: string) => basicFields.concat(moreBasicFields).find((v: any) => v.keyName === keyName))}
            ignoreFields={[keyNames.KEY_NAME_CUSTOMER_PHOTO, keyNames.KEY_NAME_CUSTOMER_ACCOUNT]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            // onSave={handleOnSave}
            // onClose={handleOnClose}
            column={2}
            readOnly={true}
            // divider
          />
        ) : null}
      </>
    );
  }, [basicFields, menuSource, menuSourceId, data]);
  return <>{FieldsMemo}</>;
};

export default Summary;
