import _ from 'lodash';
import { useEffect, useState } from 'react';

import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { LAYOUT_PROCESS_AUTOMATION } from '@base/config/menus';
import { ViewFieldParse } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import { InstantValue } from '@process/components/Automation/Instant';
import { INSTANT_ACTION_TYPE } from '@process/config/constants';
import { queryKeys } from '@process/config/queryKeys';
import AutomationViewField from '@process/config/view-field/automation';
import { AutomationRule } from '@process/types/automation';
import { useTranslation } from 'react-i18next';

interface AutomationViewProps {
  onClose: () => void;
  data: AutomationRule;
}

function AutomationView(props: AutomationViewProps) {
  const { data, onClose } = props;
  const { t } = useTranslation();
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      let newInstants: { [index: string]: InstantValue[] } = {};
      data.instants?.forEach((instant) => {
        if (!(instant.criteria in newInstants)) {
          newInstants[instant.criteria] = [];
        }
        let newInstant: InstantValue = {
          id: instant.id,
          name: instant.name,
          type: { keyName: instant.type, languageKey: INSTANT_ACTION_TYPE[instant.type] },
          template: instant.template && {
            keyName: instant.template.id,
            languageKey: instant.template.name
          }
        };
        if (instant.type == 'ACTION_TYPE_TASK') {
          newInstant.targetUsers = instant.targets?.map((target) => ({
            id: target.id,
            name: target.name
          }));
        } else if (instant.type == 'ACTION_TYPE_EMAIL') {
          newInstant.targetCustomers = instant.targets?.map((target) => ({
            id: target.id,
            name: target.name
          }));
        } else if (instant.type == 'ACTION_TYPE_FIELD_UPDATE') {
          newInstant.field = {
            field: {
              keyName: instant.field?.name!!,
              languageKey: instant.field?.name!!,
              extra: instant.field?.type!!
            },
            value: instant.field?.value!!
          };
        } else if (instant.type == 'ACTION_TYPE_OUTBOUND_MESSAGE') {
          newInstant.message = instant.message;
        }
        newInstants[instant.criteria].push(newInstant);
      });

      const newData = {
        ...data,
        criteria: {
          criteria: {
            keyName: data.criteria?.id,
            languageKey: data.criteria?.name
          },
          instants: newInstants
        }
      };

      console.log('newData', newData);

      const fields = ViewFieldParse(newData, AutomationViewField, true, [queryKeys.listAutomation]);
      setFields(fields);
    }
  }, [data]);

  const ignoreFields: string[] = [];

  return (
    // <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden', height: `calc(100vh - 50px)` }}>
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {SidebarHeader({ title: t('ncrm_process_automation_rule_view_automation'), onClose })}
      <Box sx={{ p: 2, m: 0, height: `calc(100vh - 45px)`, overflowY: 'auto' }}>
        <ViewFields fields={fields} ignoreFields={ignoreFields} menuSource={LAYOUT_PROCESS_AUTOMATION} menuSourceId={data.id} />
      </Box>
    </Stack>
  );
}

export default AutomationView;
