import _ from 'lodash';
import { useEffect, useState } from 'react';

import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { LAYOUT_PROJECT_TASK_TEMPLATE } from '@base/config/menus';
import { ViewFieldParse } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import { queryKeys } from '@project/config/queryKeys';
import { TaskTemplateViewField } from '@project/config/view-field/template';
import { useTranslation } from 'react-i18next';
import { useGetTaskTemplate } from '@project/hooks/useTemplate';

interface TaskTemplateViewProps {
  onClose: () => void;
  id: string;
}

function TaskTemplateView(props: TaskTemplateViewProps) {
  const { id, onClose } = props;
  const [fields, setFields] = useState<any[]>([]);
  const { t } = useTranslation();

  const data = useGetTaskTemplate(id);
  console.log('data', data)
  useEffect(() => {
    if (data.id) {
      const newData = {
        ...data
      };
      const fields = ViewFieldParse(newData, TaskTemplateViewField, true, [queryKeys.listTaskTemplate]);
      setFields(fields);
    }
  }, [data]);

  const ignoreFields: string[] = [];

  return (
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {SidebarHeader({ title: t('project_update_task_template'), onClose })}
      <Box sx={{ p: 2, m: 0, height: `calc(100vh - 45px)`, overflowY: 'auto' }}>
        <ViewFields fields={fields} ignoreFields={ignoreFields} menuSource={LAYOUT_PROJECT_TASK_TEMPLATE} menuSourceId={id} />
      </Box>
    </Stack>
  );
}

export default TaskTemplateView;
