import { useMemo } from 'react';

import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import ViewCard, { CardProps } from '@project/containers/ViewCard';

import TaskList from './TaskList';
import WorkTime from './WorkTime';
import { useTranslation } from 'react-i18next';

interface LeftProps {}

const Left = (props: LeftProps) => {
  const { t } = useTranslation();
  const cards: CardProps[] = useMemo(() => {
    return [
      {
        title: t('ncrm_project_work_time_per_developer'),
        component: <WorkTime />
      },
      {
        title: t('ncrm_project_dev_task_list'),
        component: <TaskList />
      }
    ];
  }, []);
  return (
    <>
      <ViewAsideContainer>
        <ViewCard cards={cards} />
      </ViewAsideContainer>
    </>
  );
};

export default Left;
