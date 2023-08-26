import React, { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// base
import { PageLayoutData, PageLayoutSectionField } from '@base/types/pagelayout';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';

// opportunity
import * as keyNames from '@opportunity/config/keyNames';
import { queryKeys } from '@opportunity/config/queryKeys';
import { Opportunity } from '@opportunity/types/interfaces';
import { SET_TIMEOUT } from '@base/config/constant';
import { generateUUID } from '@base/utils/helpers';
import viewConfig from '@opportunity/config/view-field';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import PaintPoint from '../PaintPoint';

interface LeadInfoProps {
  menuCategory: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
  onRefetch: () => void;
}

const LeadInfo = (props: LeadInfoProps) => {
  const { menuCategory, column, layoutData, ignoreFields, readOnly, onRefetch } = props;
  const { menuSource, data, menuSourceId } = layoutData;

  const theme = useTheme();

  // add fields to basic fields
  const moreBasicFields: PageLayoutSectionField[] = [
    {
      children: [],
      dataType: 'custom',
      defaultViewInList: true,
      isViewing: true,
      hidden: false,
      id: generateUUID(),
      isDefault: true,
      keyName: keyNames.KEY_NAME_OPPORTUNITY_PREFERRED,
      languageKey: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_PREFERRED]?.languageKey || '',
      name: keyNames.KEY_NAME_OPPORTUNITY_PREFERRED,
      order: 0,
      orderInList: 8,
      orderInView: 8,
      orderInWrite: 8,
      showInList: true,
      showInView: true,
      showInWrite: true,
      title: keyNames.KEY_NAME_OPPORTUNITY_PREFERRED,
      userPermission: {
        isEdit: true,
        isShow: true,
        isSortable: false
      },
      options: undefined,
      attributes: [],
      data: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_PREFERRED]?.getValue?.(data) || null,
      config: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_PREFERRED]
    },
    {
      children: [],
      dataType: 'custom',
      defaultViewInList: true,
      isViewing: true,
      hidden: false,
      id: generateUUID(),
      isDefault: true,
      keyName: keyNames.KEY_NAME_OPPORTUNITY_EMAIL,
      languageKey: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_EMAIL]?.languageKey || '',
      name: keyNames.KEY_NAME_OPPORTUNITY_EMAIL,
      order: 0,
      orderInList: 8,
      orderInView: 8,
      orderInWrite: 8,
      showInList: true,
      showInView: true,
      showInWrite: true,
      title: keyNames.KEY_NAME_OPPORTUNITY_EMAIL,
      userPermission: {
        isEdit: true,
        isShow: true,
        isSortable: false
      },
      options: undefined,
      attributes: [],
      data: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_EMAIL]?.getValue?.(data) || null,
      config: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_EMAIL]
    },
    {
      children: [],
      dataType: 'custom',
      defaultViewInList: true,
      isViewing: true,
      hidden: false,
      id: generateUUID(),
      isDefault: true,
      keyName: keyNames.KEY_NAME_OPPORTUNITY_BULK_EMAIL,
      languageKey: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_BULK_EMAIL]?.languageKey || '',
      name: keyNames.KEY_NAME_OPPORTUNITY_BULK_EMAIL,
      order: 0,
      orderInList: 8,
      orderInView: 8,
      orderInWrite: 8,
      showInList: true,
      showInView: true,
      showInWrite: true,
      title: keyNames.KEY_NAME_OPPORTUNITY_BULK_EMAIL,
      userPermission: {
        isEdit: true,
        isShow: true,
        isSortable: false
      },
      options: undefined,
      attributes: [],
      data: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_BULK_EMAIL]?.getValue?.(data) || null,
      config: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_BULK_EMAIL]
    },
    {
      children: [],
      dataType: 'custom',
      defaultViewInList: true,
      isViewing: true,
      hidden: false,
      id: generateUUID(),
      isDefault: true,
      keyName: keyNames.KEY_NAME_OPPORTUNITY_PHONE,
      languageKey: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_PHONE]?.languageKey || '',
      name: keyNames.KEY_NAME_OPPORTUNITY_PHONE,
      order: 0,
      orderInList: 8,
      orderInView: 8,
      orderInWrite: 8,
      showInList: true,
      showInView: true,
      showInWrite: true,
      title: keyNames.KEY_NAME_OPPORTUNITY_PHONE,
      userPermission: {
        isEdit: true,
        isShow: true,
        isSortable: false
      },
      options: undefined,
      attributes: [],
      data: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_PHONE]?.getValue?.(data) || null,
      config: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_PHONE]
    },
    {
      children: [],
      dataType: 'custom',
      defaultViewInList: true,
      isViewing: true,
      hidden: false,
      id: generateUUID(),
      isDefault: true,
      keyName: keyNames.KEY_NAME_OPPORTUNITY_SMS,
      languageKey: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_SMS]?.languageKey || '',
      name: keyNames.KEY_NAME_OPPORTUNITY_SMS,
      order: 0,
      orderInList: 8,
      orderInView: 8,
      orderInWrite: 8,
      showInList: true,
      showInView: true,
      showInWrite: true,
      title: keyNames.KEY_NAME_OPPORTUNITY_SMS,
      userPermission: {
        isEdit: true,
        isShow: true,
        isSortable: false
      },
      options: undefined,
      attributes: [],
      data: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_SMS]?.getValue?.(data) || null,
      config: viewConfig?.[keyNames.KEY_NAME_OPPORTUNITY_SMS]
    }
  ];

  //get data view
  const queryClient = useQueryClient();
  //const customerData = queryClient.getQueryData([customerQueryKeys.customerGet, menuSourceId]) as Customer;

  //get fields
  let basicFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  const moreFields: any[] = layoutData?.layout?.data?.[1]?.children || [];

  //hidden fields
  let moreIgnoreFields: string[] = [];

  const collectionFields: string[] = [keyNames.KEY_NAME_OPPORTUNITY_COLLECTION_METHOD];

  const contactFields: string[] = [
    // keyNames.KEY_NAME_OPPORTUNITY_COLLECTION_METHOD,
    keyNames.KEY_NAME_OPPORTUNITY_PREFERRED,
    keyNames.KEY_NAME_OPPORTUNITY_EMAIL,
    keyNames.KEY_NAME_OPPORTUNITY_BULK_EMAIL,
    keyNames.KEY_NAME_OPPORTUNITY_PHONE,
    keyNames.KEY_NAME_OPPORTUNITY_SMS
  ];

  const handleOnClose = (keyName: string, value: any) => {
    //console.log('...Activity > View > handleOnClose ', keyName, value);
  };

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

  const collectionFieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={collectionFields
              .map((keyName: string) => basicFields.concat(moreBasicFields).find((v: any) => v.keyName === keyName))
              .filter((v: any) => v !== undefined)}
            ignoreFields={[]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            readOnly={readOnly}
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId, data, collectionFields]);

  const contactFieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={contactFields
              .map((keyName: string) => basicFields.concat(moreBasicFields).find((v: any) => v.keyName === keyName))
              .filter((v: any) => v !== undefined)}
            ignoreFields={[]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={2}
            readOnly={readOnly}
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId, data, contactFields]);

  return (
    <Box border={`1px solid ${theme.palette.divider}`}>
      <Box display="flex" alignItems="center" height={53} px={2} borderBottom={`1px solid ${theme.palette.divider}`}>
        <Typography fontWeight={500}>Lead Info</Typography>
      </Box>
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" height={53} px={2} borderBottom={`1px solid ${theme.palette.divider}`}>
          <Typography fontWeight={500}>Collection Method</Typography>
        </Box>
        {collectionFieldsMemo}
        <Box display="flex" alignItems="center" height={53} px={2} border={`1px solid ${theme.palette.divider}`}>
          <Typography fontWeight={500}>Contact Method</Typography>
        </Box>
        {contactFieldsMemo}
      </Stack>

      <PaintPoint layoutData={layoutData} onRefetch={onRefetch} />
    </Box>
  );
};

export default LeadInfo;
