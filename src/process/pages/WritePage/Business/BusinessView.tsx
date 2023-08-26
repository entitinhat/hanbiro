import React, { useEffect, useState } from 'react';

import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { LAYOUT_PROCESS_BUSINESS } from '@base/config/menus';
import { ViewFieldParse } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import { queryKeys } from '@process/config/queryKeys';
import BusinessViewField from '@process/config/view-field/business';
import { BusinessProcess } from '@process/types/process';

type BusinessView = {
  data: BusinessProcess;
  onClose?: () => void;
};

const BusinessView = (props: BusinessView) => {
  const { data, onClose } = props;
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const fields = ViewFieldParse(data, BusinessViewField, true, [queryKeys.listProcess]);
      setFields(fields);
    }
  }, [data]);

  const ignoreFields: string[] = [];

  return (
    // <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden', height: `calc(100vh - 50px)` }}>
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {SidebarHeader({ title: 'View Process', onClose })}
      <Box sx={{ p: 2, m: 0, height: `calc(100vh - 45px)`, overflowY: 'auto' }}>
        <ViewFields fields={fields} ignoreFields={ignoreFields} menuSource={LAYOUT_PROCESS_BUSINESS} menuSourceId={data.id} />
      </Box>
    </Stack>
  );
};

export default React.memo(BusinessView);
