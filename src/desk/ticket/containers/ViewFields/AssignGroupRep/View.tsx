import React from 'react';
import { KEY_TICKET_ASSIGN_GROUP, KEY_TICKET_ASSIGN_USER } from '@desk/ticket/config/keyNames';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { TextView } from '@base/config/view-field/components';
import { Box, Stack, Typography } from '@mui/material';
//import { t } from 'i18next';
//import { SpanLang } from '@base/components';

const View: React.FC = (props: any) => {
  const { value } = props; // value = { [KEY_TICKET_ASSIGN_GROUP]: null, [KEY_TICKET_ASSIGN_USER]: null }
  return (
    <Stack direction="column">
      <Box sx={{ paddingTop: 1 }}>
        <TextView value={value?.[KEY_TICKET_ASSIGN_GROUP]?.name ?? ''} menuSource={''} menuSourceId={''} keyName={''} />
      </Box>
      <Box sx={{ paddingTop: 1, ml: -3 }}>
        <Typography sx={{ color: '#8392a5', display: 'block', mb: '0', py: '0.4375rem', px: '0.875rem' }}>
          <SpanLang sx={{ padding: 0 }} keyLang={'ncrm_desk_ticket_assigned_rep'} tag="span" />
        </Typography>
        <Box sx={{ paddingTop: 1, pl: 3 }}>
          <TextView value={value?.[KEY_TICKET_ASSIGN_USER]?.name ?? ''} menuSource={''} menuSourceId={''} keyName={''} />
        </Box>
      </Box>
    </Stack>
  );
};

export default View;
