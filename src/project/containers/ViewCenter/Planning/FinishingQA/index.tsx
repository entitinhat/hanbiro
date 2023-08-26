import FinishingQA from '@project/containers/QA';
import { useGetPlanning } from '@project/hooks/usePlanning';

interface DetailProps {
  menuSource: string;
  menuSourceId: string;
}

const PlanningFinishingQA = (props: DetailProps) => {
  const { menuSource, menuSourceId } = props;

  const data = useGetPlanning('qa', menuSourceId);

  return (
    <>
      <FinishingQA value={data?.qa} />
    </>
  );
};

export default PlanningFinishingQA;
