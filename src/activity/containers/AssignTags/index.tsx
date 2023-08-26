import useAssignTagsMutate from '@activity/hooks/useAssignTagMutation';
import { useAssignedTags } from '@activity/hooks/useTags';
import TagInput from '@base/components/@hanbiro/TagInput';
import { Box } from '@mui/material';

interface AssignTagsProps {
  menuSource: string;
  menuSourceId: string;
}

function AssignTags(props: AssignTagsProps) {
  const { menuSourceId } = props;
  const { data } = useAssignedTags(menuSourceId);

  const { mAddTags, mDeleteTags } = useAssignTagsMutate();

  const onAdd = (tag: string) => {
    const params = {
      tag: tag,
      id: menuSourceId
    };
    mAddTags.mutate(params);
  };

  const onDelete = (tag: string) => {
    const params = {
      id: menuSourceId,
      tag: tag
    };
    mDeleteTags.mutate(params);
  };

  //render
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <TagInput value={data?.results ?? []} onAdd={onAdd} onDelete={onDelete} mode={'view'} />
      </Box>
    </>
  );
}

export default AssignTags;
