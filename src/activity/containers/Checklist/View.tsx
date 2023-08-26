import { useChecklist } from '@activity/hooks/useChecklist';

import ChecklistContainer from '.';

interface ChecklistViewProps {
  menuSourceId: string;
}

const ChecklistView = (props: ChecklistViewProps) => {
  const { menuSourceId } = props;

  /** =================== handle View : Start =============== */
  const { data: results } = useChecklist({
    id: menuSourceId
  });

  return (
    <>
      <ChecklistContainer mode={'view'} sourceId={menuSourceId} value={results} />
    </>
  );
};

export default ChecklistView;
