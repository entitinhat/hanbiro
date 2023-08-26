import './gantt.css';

import { Gantt, Task, ViewMode } from '@third-party/gantt-task-react';
import React, { useCallback, useMemo } from 'react';

import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';

import { getStartEndDateForProject, initTasks } from './Helper';
import { TaskListHeaderDefault } from './TaskListHeader';
import { TaskListTableDefault } from './TaskListTable';
import SelectBox from '../../../../../base/components/@hanbiro/SelectBox';
import { OptionValue } from '../../../../../base/types/common';
import IconButton from '../../../../../base/components/@extended/IconButton';
import { FormIcon } from '../../../../../base/components/@hanbiro/FormIcon';

// Init
const GanttContainer = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task: Task) => {
    console.log('On date change Id:' + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (project.start.getTime() !== start.getTime() || project.end.getTime() !== end.getTime()) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) => (t.id === task.project ? changedProject : t));
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm('Are you sure about ' + task.name + ' ?');
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log('On progress change Id:' + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert('On Double Click event Id:' + task.id);
  };

  const handleClick = (task: Task) => {
    console.log('On Click event Id:' + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + ' has ' + (isSelected ? 'selected' : 'unselected'));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log('On expander click Id:' + task.id);
  };

  console.log('width', window.innerWidth);
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const gridWidth = window.innerWidth / 12;

  const options = [
    { keyName: ViewMode.Day, languageKey: 'Day' },
    { keyName: ViewMode.Week, languageKey: 'Week' },
    { keyName: ViewMode.Month, languageKey: 'Month' }
  ];

  const viewOption = useMemo(() => {
    return options.find((v) => v.keyName == view)!!;
  }, [view]);

  const onChangeView = useCallback((v: OptionValue) => {
    setView(v.keyName as ViewMode);
  }, []);

  return (
    <Box sx={{ width: matchDownMd ? window.innerWidth - 8 : gridWidth * 9 - 8 }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end" sx={{ mb: 1 }}>
        <SelectBox sx={{ width: 100 }} size="small" value={viewOption} options={options} onChange={onChangeView} />
        <IconButton sx={{ ml: 0.5 }} color="secondary">
          <FormIcon icon="column_settings" iconType="icon" css={{ lineHeight: 1 }} />
        </IconButton>
      </Stack>
      {/* <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? '155px' : ''}
        ganttHeight={200}
        rowHeight={25}
        fontSize={'12'}
        columnWidth={columnWidth}
        TaskListHeader={TaskListHeaderDefault}
        TaskListTable={TaskListTableDefault}
      /> */}
    </Box>
  );
};

export default GanttContainer;
