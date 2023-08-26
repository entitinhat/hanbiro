import React, { useEffect, useMemo, useState } from 'react';
import * as keyNames from '@desk/ticket/config/keyNames';
import { Typography, useTheme } from '@mui/material';
import { PageLayoutData } from '@base/types/pagelayout';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@public-page/site/config/queryKeys';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { Box } from '@mui/material';

interface SummaryProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
}

//hide fields
const hiddenFields: string[] = [
  keyNames.KEY_TICKET_SUBJECT,
  keyNames.KEY_TICKET_PRODUCT,
  keyNames.KEY_TICKET_CUSTOMER,
  keyNames.KEY_TICKET_CONTACT,
  keyNames.KEY_TICKET_CONTENT,
  keyNames.KEY_TICKET_ASSIGN_GROUP,
  keyNames.KEY_TICKET_ASSIGN_USER,
  keyNames.KEY_TICKET_CC_USERS,
  keyNames.KEY_TICKET_CHANNEL,
  keyNames.KEY_TICKET_PROCESS,
  keyNames.KEY_TICKET_CREATED_AT,
  keyNames.KEY_TICKET_UPDATED_AT,
  keyNames.KEY_TICKET_CREATED_BY,
  keyNames.KEY_TICKET_UPDATED_BY
];

const Summary: React.FC<SummaryProps> = (props: SummaryProps) => {
  const { layoutData, ignoreFields, onRefetch } = props;
  const { menuSource, menuSourceId, data } = layoutData;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];
  const showingBasicFields = basicFields.filter((_field: any) => !hiddenFields.includes(_field.keyName));

  //after save
  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    //console.log('...Activity > View > handleOnSave ', keyName, isSuccess, value);

    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([queryKeys.siteTicketGet], (old: any) => {
        return { ...old, ...value };
      });
    }

    onRefetch && onRefetch();
  };

  //close
  const handleOnClose = (keyName: string, value: any) => {
    //console.log('...Activity > View > handleOnClose ', keyName, value);
  };

  //view fields render
  const FieldsRender = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            column={1}
            fields={showingBasicFields}
            ignoreFields={[]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
          />
        ) : null}
      </>
    );
  }, [showingBasicFields, ignoreFields, menuSource, menuSourceId, data]);

  return (
    <Box sx={{ p: 1.5, borderRight: `1px solid ${theme.palette.divider}` }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">Summary</Typography>
      </Box>
      {FieldsRender}
    </Box>
  );
};

export default Summary;
