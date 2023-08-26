import React, { useEffect, useState } from 'react';

import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { LAYOUT_PROJECT_PROJECT } from '@base/config/menus';
import { ViewFieldParse } from '@base/utils/helpers/noLayoutUtils';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { queryKeys } from '@project/config/queryKeys';
import ProjectViewField from '@project/config/view-field/project';
import { Project } from '@project/types/project';
import { useTranslation } from 'react-i18next';

interface SummaryProps {
  item: Project;
}

function Summary({ item }: SummaryProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    if (item) {
      // const fields = ViewFieldParse(item, ProjectViewField, true, [queryKeys.getProject]);
      const fields = ViewFieldParse(item, ProjectViewField, true);
      setFields(fields);
    }
  }, [item]);

  const ignoreFields: string[] = [];

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {t('ncrm_project_field_basic')}
        </Typography>
      </Stack>
      <Divider />
      <Box sx={{ py: 1 }}>
        <ViewFields fields={fields} ignoreFields={ignoreFields} menuSource={LAYOUT_PROJECT_PROJECT} menuSourceId={item.id} />
      </Box>
    </Box>
  );
}

export default React.memo(Summary);
