import { useEffect, useState } from 'react';

import MainCard from '@base/components/App/MainCard';
import { LIST_STALE_TIME } from '@base/config/constant';
import { Box, Grid } from '@mui/material';
import CostType from '@project/containers/Setting/CostType';
import { useSetting } from '@project/hooks/useSetting';
import { GET_SETTINGS } from '@project/services/setting';
import { Setting } from '@project/types/setting';

import SectionLayout from './SectionLayout';
import TaskResult from './TaskResult';
import { useTranslation } from 'react-i18next';

const PreferenceProject = () => {
  const [settingData, setSettingData] = useState<Record<string, Setting[]>>({});
  const { t } = useTranslation();

  const { results: data } = useSetting(
    GET_SETTINGS,
    {},
    {
      staleTime: LIST_STALE_TIME
    }
  );

  useEffect(() => {
    if (data) {
      const settingIndex: Record<string, Setting[]> = {};
      for (const setting of data.results) {
        if (!settingIndex[setting.type]) {
          settingIndex[setting.type] = [];
        }
        settingIndex[setting.type].push(setting);
      }
      setSettingData(settingIndex);
    }
  }, [data]);

  return (
    <MainCard
      sx={{
        p: 1,
        border: 'none'
      }}
    >
      <Box sx={{ pb: 2, maxHeight: 'calc(100vh - 128px)' }} className="scroll-box">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <SectionLayout title={t('ncrm_common_project_type')} type="TYPE_PROJECT" items={settingData['TYPE_PROJECT']} />
            <SectionLayout title={t('ncrm_common_note_category')} type="TYPE_NOTE_CATEGORY" items={settingData['TYPE_NOTE_CATEGORY']} />
            <SectionLayout title={t('ncrm_common_dev_source')} type="TYPE_DEV_SOURCE" items={settingData['TYPE_DEV_SOURCE']} />
            <TaskResult items={settingData['TYPE_TASK_RESULT']} />
            <SectionLayout title={t('ncrm_common_field_of_menber')} type="TYPE_MEMBER_FIELD" items={settingData['TYPE_MEMBER_FIELD']} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CostType items={settingData['TYPE_COST']} />
            <SectionLayout title={t('ncrm_common_page_type')} type="TYPE_PAGE" items={settingData['TYPE_PAGE']} />
            <SectionLayout title={t('ncrm_common_dev_type')} type="TYPE_DEV" items={settingData['TYPE_DEV']} />
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default PreferenceProject;
