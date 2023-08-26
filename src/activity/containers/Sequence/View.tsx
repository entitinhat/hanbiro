import { useSequence } from '@activity/hooks/useSequence';

import SequenceContainer from '.';

interface SequenceViewProps {
  menuSourceId: string;
}

const SequenceView = (props: SequenceViewProps) => {
  const { menuSourceId } = props;

  /** =================== handle View : Start =============== */
  const { data: results } = useSequence({
    id: menuSourceId
  });

  return (
    <>
      <SequenceContainer mode={'view'} sourceId={menuSourceId} value={results} />
    </>
  );
};

export default SequenceView;
