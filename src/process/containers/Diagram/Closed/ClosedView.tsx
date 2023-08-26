import React, { useEffect, useState } from 'react';

import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { LAYOUT_PROCESS_STEP } from '@base/config/menus';
import { ViewFieldParse } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import { queryKeys } from '@process/config/queryKeys';
import { ClosedViewField } from '@process/config/view-field/closed';
import { useStep } from '@process/hooks/useStep';

type closedView = {
  processId: string;
  stepId?: string;
  onClose?: () => void;
};

const ClosedView = (props: closedView) => {
  const { processId, stepId, onClose } = props;
  const { step } = useStep({
    id: processId,
    stepId: stepId
  });

  console.log('closed step', step);

  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    if (step.id) {
      const newStep = {
        id: step.id,
        name: step.name,
        description: step.description,
        property: step.close?.property,
        view: step.close?.view,
        jump: step.close?.jump
      };
      const fields = ViewFieldParse(newStep, ClosedViewField, true, [queryKeys.getDiagram]);
      setFields(fields);
    }
  }, [step]);

  const ignoreFields: string[] = [];

  return (
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', height: `calc(100vh - 50px)` }}>
      {SidebarHeader({ title: 'ncrm_process_view_closed', onClose: onClose })}
      <Box sx={{ p: 3 }}>
        <ViewFields fields={fields} ignoreFields={ignoreFields} menuSource={LAYOUT_PROCESS_STEP} menuSourceId={processId} />
      </Box>
    </Stack>
  );
};

export default ClosedView;
