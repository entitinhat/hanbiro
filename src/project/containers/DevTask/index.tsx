import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LIST_STALE_TIME } from '@base/config/constant';
import { AccountTreeRounded, TaskAltRounded, TimelapseRounded } from '@mui/icons-material';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DevGantt from '@project/containers/DevGantt';
import { useGetProject } from '@project/hooks/useProject';
import { useGetTasks } from '@project/hooks/useTask';
import { GET_PROJECT } from '@project/services/project';
import { GET_TASKS } from '@project/services/task';
import { TaskType } from '@project/types/task';

import TimeSheetUser from '../TimeSheet/User';
import DevTaskList from './List';
import DevTaskTimesheet from './Timesheet';

interface DevTaskProps {
  type: TaskType;
  projectId: string;
  planningId?: string;
}

function DevTask(props: DevTaskProps) {
  const { type = 'PROJECT', projectId, planningId } = props;
  const [view, setView] = useState('gantt');
  const { t } = useTranslation();

  console.log('devtask props', props);

  // get tasks
  const { results: data } = useGetTasks(
    GET_TASKS,
    type == 'PLANNING'
      ? {
          projectId: projectId,
          planningId: planningId
        }
      : {
          projectId: projectId
        },
    {
      staleTime: LIST_STALE_TIME,
      enabled: !!projectId
    }
  );

  const projectData = useGetProject(
    GET_PROJECT,
    { id: projectId, type: 'member' },
    {
      staleTime: LIST_STALE_TIME,
      enabled: !!projectId
    }
  );

  const handleView = useCallback((event: React.MouseEvent<HTMLElement>, value: any) => {
    setView(value);
  }, []);

  return (
    <Stack spacing={2} sx={{ p: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="flex-start">
        <ToggleButtonGroup value={view} exclusive onChange={handleView}>
          <ToggleButton size="small" value="list" aria-label="list">
            <TaskAltRounded sx={{ mr: 1, fontSize: 18 }} /> {t('ncrm_project_task_list')}
          </ToggleButton>
          <ToggleButton size="small" value="gantt" aria-label="list">
            <AccountTreeRounded sx={{ mr: 1, fontSize: 18 }} /> {t('ncrm_project_gantt')}
          </ToggleButton>
          <ToggleButton size="small" value="timesheet" aria-label="timesheet">
            <TimelapseRounded sx={{ mr: 1, fontSize: 18 }} /> {t('ncrm_project_timesheet')}
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {view == 'timesheet' && (
        <>
          <TimeSheetUser data={data.results} members={projectData?.members} />
          <DevTaskTimesheet data={data.results} />
        </>
      )}
      {view == 'gantt' && type == 'PROJECT' && <DevGantt data={data?.results} />}
      {view == 'gantt' && type == 'PLANNING' && <DevGantt data={data?.results} />}
      {view == 'list' && <DevTaskList data={data?.results} />}
    </Stack>
  );
}

export default DevTask;
