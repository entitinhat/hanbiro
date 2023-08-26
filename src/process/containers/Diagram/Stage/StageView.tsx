import { useEffect, useState } from 'react';

import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { LAYOUT_PROCESS_STAGE } from '@base/config/menus';
import { ViewFieldParse } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import { queryKeys } from '@process/config/queryKeys';
import StageViewField from '@process/config/view-field/stage';
import { Stage } from '@process/types/diagram';

interface StageViewProps {
  processId: string;
  stage: Stage;
  onClose?: () => void;
}

function StageView({ processId, stage, onClose }: StageViewProps) {
  // console.log('stage View');
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    if (stage) {
      const fields = ViewFieldParse(stage, StageViewField, true, [queryKeys.getDiagram]);
      setFields(fields);
    }
  }, [stage]);

  const ignoreFields: string[] = [];

  return (
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', height: `calc(100vh - 50px)` }}>
      {SidebarHeader({ title: 'ncrm_process_view_stage', onClose: onClose })}
      <Box sx={{ p: 3 }}>
        <ViewFields fields={fields} ignoreFields={ignoreFields} menuSource={LAYOUT_PROCESS_STAGE} menuSourceId={processId} />
      </Box>
    </Stack>
  );
}

export default StageView;
