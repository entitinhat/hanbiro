import { useEffect, useMemo, useState } from 'react';
import { useResetRecoilState } from 'recoil';

import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { LAYOUT_PROCESS_DEFINED_ITEM } from '@base/config/menus';
import { ViewFieldParse } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import { queryKeys } from '@process/config/queryKeys';
import ActionViewField from '@process/config/view-field/action';
import CriteriaViewField from '@process/config/view-field/criteria';
import TriggerViewField from '@process/config/view-field/trigger';
import statusAtom from '@process/store/atoms/status';
import { DefinedItem, SettingType } from '@process/types/settings';

interface SettingViewProps {
  onClose: () => void;
  data: DefinedItem;
  selectedTab: SettingType;
}

function SettingView(props: SettingViewProps) {
  const { data, selectedTab, onClose } = props;
  const [fields, setFields] = useState<any[]>([]);
  const resetStatusesValue = useResetRecoilState(statusAtom);

  const viewParse = useMemo(() => {
    switch (selectedTab) {
      case 'action':
        return ActionViewField;
      case 'criteria':
        return CriteriaViewField;
      case 'trigger':
        return TriggerViewField;
      default:
        return ActionViewField;
    }
  }, [selectedTab]);

  const title = useMemo(() => {
    switch (selectedTab) {
      case 'action':
        return 'ncrm_process_view_action';
      case 'criteria':
        return 'ncrm_process_view_criteria';
      case 'trigger':
        return 'ncrm_process_view_trigger';
      default:
        return 'ncrm_process_view_action';
    }
  }, [selectedTab]);

  useEffect(() => {
    if (data) {
      const fields = ViewFieldParse(data, viewParse, true, [queryKeys.definedItems]);
      setFields(fields);
    }
  }, [data, viewParse]);

  useEffect(() => {
    resetStatusesValue();
  }, [selectedTab]);

  const ignoreFields: string[] = [];

  return (
    // <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden', height: `calc(100vh - 50px)` }}>
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {SidebarHeader({ title, onClose })}
      <Box sx={{ p: 2, m: 0, height: `calc(100vh - 45px)`, overflowY: 'auto' }}>
        <ViewFields fields={fields} ignoreFields={ignoreFields} menuSource={LAYOUT_PROCESS_DEFINED_ITEM} menuSourceId={data.id} />
      </Box>
    </Stack>
  );
}

export default SettingView;
