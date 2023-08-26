import FinishingQA from '@project/containers/QA';
import Result from '@project/containers/Result';
import TimeEntry from '@project/containers/TimeEntry';

import Description from './Description';
import Instruction from './Instruction';

interface DetailProps {
  menuSource: string;
  menuSourceId: string;
}

const Detail = (props: DetailProps) => {
  const { menuSource, menuSourceId } = props;

  return (
    <>
      <Description />
      <Instruction />
      <FinishingQA value={[]} />
      <TimeEntry />
      <Result />
    </>
  );
};

export default Detail;
