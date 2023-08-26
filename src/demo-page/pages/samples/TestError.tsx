import { useActivityList } from '@activity/hooks/useActivityList';
import { Suspense, useState } from 'react';
import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';
import BasicSkeleton from '@base/components/Skeletons/Basic';

interface TestErrorProps {}

const ActivityList = () => {
  const schema = `
    subject
  `;
  const activities = useActivityList(schema, {});
  console.log(activities);
  return <>화면 출력</>;
};

// skeleton : https://mui.com/material-ui/react-skeleton/
function TestError({}: TestErrorProps) {
  // useState type : Dispatch<SetStateAction<string>>;
  const [filter, setFilter] = useState('all');
  return (
    <RetryErrorBoundary>
      <Suspense fallback={<BasicSkeleton />}>
        <ActivityList />
      </Suspense>
    </RetryErrorBoundary>
  );
}

export default TestError;
