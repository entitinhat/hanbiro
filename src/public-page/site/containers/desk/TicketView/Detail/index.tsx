import React, { useMemo } from 'react';

//material
import { Box } from '@mui/material';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import { PageLayoutData } from '@base/types/pagelayout';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { getFieldLayoutDataByKeyName } from '@base/utils/helpers/pageLayoutUtils';

//menu
import { queryKeys } from '@public-page/site/config/queryKeys';
import { KEY_TICKET_CONTENT, KEY_TICKET_SUBJECT } from '@desk/ticket/config/keyNames';
import Feedback from './Feedback';

interface DetailsProps {
  token?: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
}

const Details = (props: DetailsProps) => {
  const { token, layoutData, ignoreFields, onRefetch } = props;
  const { menuSource, menuSourceId, data } = layoutData;
  const queryClient = useQueryClient();
  const contentField = getFieldLayoutDataByKeyName(layoutData, KEY_TICKET_CONTENT);
  const subjectField = getFieldLayoutDataByKeyName(layoutData, KEY_TICKET_SUBJECT);

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
      <Box sx={{ mb: 2 }}>
        {contentField && (
          <ViewFields
            column={1}
            fields={[{ ...contentField, config: { ...contentField.config, hideFieldLabel: true } }]}
            ignoreFields={[]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
          />
        )}
      </Box>
    );
  }, [layoutData]);

  return (
    <Box sx={{ p: 1.5 }}>
      {FieldsRender}
      <Feedback token={token as string} subject={subjectField?.data || ''} menuSourceId={menuSourceId as string} />
    </Box>
  );
};

export default Details;
