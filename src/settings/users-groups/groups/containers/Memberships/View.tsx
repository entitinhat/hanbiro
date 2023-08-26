// import { useSequence } from '@activity/hooks/useSequence';

import SequenceTaskContainer from '.';

interface SequenceViewProps {
  menuSourceId: string;
}

const SequenceView = (props: SequenceViewProps) => {
  const { menuSourceId } = props;

  /** =================== handle View : Start =============== */
  // const { data: results } = useSequence({
  //   id: menuSourceId
  // });

  return (
    <>
      <SequenceTaskContainer mode={'view'}  />
    </>
  );
};

export default SequenceView;
