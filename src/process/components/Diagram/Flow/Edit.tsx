import { Close, ModeEdit } from '@mui/icons-material';
import IconButton from '@base/components/@extended/IconButton';
import { Axis, NodeProperty, NodeType, ShapeType } from '../../../types/diagram';
import { useRecoilState } from 'recoil';
import { stepOpenAtom } from '../../../store/atoms/step';
import { useCallback } from 'react';
import useStepMutation from '../../../hooks/useStepMutation';

interface NodeEditProps {
  processId: string;
  sourceId: string;
  position: Axis;
  sourceType: NodeType;
  shape: ShapeType;
  property: NodeProperty;
  deleteNode?: (id: string) => void;
}

export const NodeEdit = (props: NodeEditProps) => {
  const { sourceId, processId, position, sourceType, shape, property, deleteNode } = props;
  const [stepWrite, setStepWrite] = useRecoilState(stepOpenAtom);

  const onStepView = useCallback(
    (open: boolean) => {
      setStepWrite({
        open: open,
        edit: true,
        type: sourceType == 'TYPE_CLOSE' ? 'closed' : 'step',
        sourceId: sourceId,
        position: position,
        direction: 'DIRECTION_NONE',
        sourceType: sourceType,
        shape: shape
      });
    },
    [sourceId]
  );

  const {
    mDeleteStep: { mutate: mutationDelete, isLoading }
  } = useStepMutation(processId, undefined, false);

  const onDelete = useCallback(() => {
    if (confirm('Are you sure to delete step => ' + sourceId)) {
      mutationDelete({ id: processId, stepId: sourceId });
      if (!isLoading) {
        deleteNode && deleteNode(sourceId);
      }
    }
  }, []);

  return (
    // <div className="diagram-item-actions">
    <div className="diagram-item-actions nodrag">
      {/* <IconButton size="small" color="secondary" onClick={(e:React.SyntheticEvent) => {
        e.preventDefault();
        onStepView(!stepWrite.open)
      }} onMouseDownCapture={event => event.stopPropagation()}> */}
      <IconButton size="small" color="secondary" onClick={() => onStepView(!stepWrite.open)}>
        <ModeEdit sx={{ fontSize: 18 }} />
      </IconButton>
      {property != 'PROPERTY_START' && (
        // <IconButton size="small" color="secondary" onClick={onDelete} onMouseDownCapture={event => event.stopPropagation()}>
        <IconButton size="small" color="secondary" onClick={onDelete}>
          <Close sx={{ fontSize: 18 }} />
        </IconButton>
      )}
    </div>
  );
};
