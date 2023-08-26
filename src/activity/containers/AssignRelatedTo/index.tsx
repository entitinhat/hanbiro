import { useAssignedRelatedTos } from '@activity/hooks/useAssignedRelatedTos';
import useAssignRelatedToMutate from '@activity/hooks/useAssignRelatedToMutation';
import { RelatedTo } from '@activity/types/activity';
import RelatedToContainer from '@base/components/@hanbiro/RelatedTo';
import { Box } from '@mui/material';

interface AssignRelatedToProps {
  menuSource: string;
  menuSourceId: string;
}

function AssignRelatedTo(props: AssignRelatedToProps) {
  const { menuSourceId } = props;
  const { data } = useAssignedRelatedTos(menuSourceId);

  const { mAddRelatedTo, mDeleteRelatedTo } = useAssignRelatedToMutate();

  const onAdd = (relatedTo: RelatedTo) => {
    const params = {
      relatedTo: relatedTo,
      id: menuSourceId
    };
    mAddRelatedTo.mutate(params);
  };

  const onDelete = (id: string) => {
    const params = {
      id: menuSourceId,
      relatedId: id
    };
    mDeleteRelatedTo.mutate(params);
  };

  //render
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <RelatedToContainer value={data?.results ?? []} onAdd={onAdd} onDelete={onDelete} mode={'view'} />
      </Box>
    </>
  );
}

export default AssignRelatedTo;
