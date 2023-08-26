import React, { useEffect, useState } from 'react';

import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { LAYOUT_PROJECT_PLANNING } from '@base/config/menus';
import { ViewFieldParse } from '@base/utils/helpers/noLayoutUtils';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import PlanningViewField from '@project/config/view-field/planning';
import { Planning } from '@project/types/planning';
import { useTranslation } from 'react-i18next';

interface SummaryProps {
  item: Planning;
}

function Summary({ item }: SummaryProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    if (item) {
      const fields = ViewFieldParse(item, PlanningViewField, true);
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
        <ViewFields fields={fields} ignoreFields={ignoreFields} menuSource={LAYOUT_PROJECT_PLANNING} menuSourceId={item.id} />
      </Box>
    </Box>
  );
}

export default React.memo(Summary);
