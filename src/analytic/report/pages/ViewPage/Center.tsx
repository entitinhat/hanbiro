import { useMemo } from 'react';
import { PageLayoutData } from '@base/types/pagelayout';
import { Box } from '@mui/material';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { REPORT_NAME } from '@analytic/report/config/keyNames';
import { KEY_NAME_CREATED_AT, KEY_NAME_UPDATED_AT, KEY_NAME_UPDATED_BY } from '@base/config/keyNames';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;
  const hiddenFields: string[] = [REPORT_NAME, KEY_NAME_UPDATED_AT, KEY_NAME_UPDATED_BY, KEY_NAME_CREATED_AT];
  const centerMemo = useMemo(() => {
    let newBasicFields = layoutData.layout?.data?.[0]?.children ?? [];
    newBasicFields = newBasicFields.filter((_field: any) => !hiddenFields.includes(_field.keyName));

    return (
      <Box sx={{ overflow: 'scroll', height: 'calc(-100px + 100vh)', scrollbarWidth: 'none', padding: 3 }}>
        <ViewFields
          fields={newBasicFields}
          ignoreFields={hiddenFields}
          column={2}
          menuSource={layoutData?.menuSource ?? ''}
          menuSourceId={layoutData?.menuSourceId ?? ''}
        />
      </Box>
    );
  }, [layoutData]);
  return <>{centerMemo}</>;
};

export default Center;
