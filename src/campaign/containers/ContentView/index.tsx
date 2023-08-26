import React, { useState } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//material
import { Box, InputLabel } from '@mui/material';

//project
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@campaign/config/keyNames';
import { CAMPAIGN_CATEGORY_EMAIL, STEP_FIELDS } from '@campaign/config/constants';
import ContentEditor from '@campaign/components/ContentEditor';
import LoadingButton from '@base/components/@extended/LoadingButton';
import useCampaignUpdate from '@campaign/hooks/useCampaignUpdate';

interface ContentViewProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
}

const ContentView = (props: ContentViewProps) => {
  const { menuCategory, menuSourceId, ignoreFields = [], layoutData, readOnly } = props;
  const [contentData, setContentData] = useState<any>(null);
  //get data view
  //const queryClient = useQueryClient();
  const mUpdate = useCampaignUpdate({ refreshList: undefined });

  //get fields
  const allFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  //configuration fields
  const configureFields = allFields.filter((_field: any) => _field.keyName === keyNames.KEY_CAMPAIGN_SUBJECT); //STEP_FIELDS[2].includes(_field.keyName)
  const contentField = allFields.find((_field) => _field.keyName === keyNames.KEY_CAMPAIGN_CONTENT);
  const templateData = layoutData.data[keyNames.KEY_CAMPAIGN_EMAIL_TEMPALTE];
  //console.log('content field', contentField);
  //console.log('layoutData.data', layoutData.data);

  //hidden fields
  let moreIgnoreFields: string[] = [];

  //save content
  const handleSaveContent = () => {
    const params = {
      id: menuSourceId,
      [keyNames.KEY_CAMPAIGN_EMAIL_TEMPALTE]: contentData.tpl,
      [keyNames.KEY_CAMPAIGN_CONTENT]: JSON.stringify(contentData.content)
    };
    mUpdate.mutate({ campaign: params });
  };

  return (
    <React.Suspense fallback={<></>}>
      <Box className="detail-view scroll-box">
        <ViewFields
          fields={configureFields}
          column={1}
          ignoreFields={[...ignoreFields, ...moreIgnoreFields]}
          menuSource={layoutData?.menuSource ?? ''}
          menuSourceId={layoutData?.menuSourceId ?? ''}
          readOnly={readOnly}
        />
        <Box sx={{ p: 1 }}>
          <InputLabel sx={{ mb: 1 }}>Content</InputLabel>
          <ContentEditor
            templateType={menuCategory === CAMPAIGN_CATEGORY_EMAIL ? 'medium' : 'simple'}
            value={{ tpl: templateData, content: contentField.data }}
            onChange={(data) => setContentData(data)}
          />
          <LoadingButton sx={{ mt: 0.5 }} variant="contained" color="primary" loading={mUpdate.isLoading} onClick={handleSaveContent}>
            Save
          </LoadingButton>
        </Box>
      </Box>
    </React.Suspense>
  );
};

export default ContentView;
