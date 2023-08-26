import React, { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import IconButton from '@base/components/@extended/IconButton';
import { sideBarSizeAtom } from '@base/store/atoms';
import { Close, ModeEdit } from '@mui/icons-material';
import { getModalSize } from '@process/containers/Diagram/Step';
import useStepMutation from '@process/hooks/useStepMutation';
import { stepOpenAtom } from '@process/store/atoms/step';
import { Axis, NodeProperty, NodeType, ShapeType } from '@process/types/diagram';

interface NodeEditProps {
  processId: string;
  sourceId: string;
  property: NodeProperty;
  position: Axis;
  sourceType: NodeType;
  shape: ShapeType;
}

function NodeEdit(props: NodeEditProps) {
  const { sourceId, processId, property, position, sourceType, shape } = props;
  const [stepWrite, setStepWrite] = useRecoilState(stepOpenAtom);
  const setSidebarSize = useSetRecoilState(sideBarSizeAtom);

  const onStepView = useCallback(
    (open: boolean) => {
      setSidebarSize(property == 'PROPERTY_CLOSE' ? 400 : getModalSize(sourceType));
      setStepWrite({
        open: open,
        edit: true,
        type: property == 'PROPERTY_CLOSE' ? 'closed' : 'step',
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
    mDeleteStep: { mutate: mutationDelete }
  } = useStepMutation(processId);

  const onDelete = useCallback(() => {
    if (confirm('Are you sure to delete step => ' + sourceId)) {
      mutationDelete({ id: processId, stepId: sourceId });
    }
  }, []);

  return (
    <>
      <div className="diagram-item-actions">
        <IconButton size="small" color="secondary" onClick={() => onStepView(!stepWrite.open)}>
          <ModeEdit sx={{ fontSize: 18 }} />
        </IconButton>
        {property !== 'PROPERTY_START' && (
          <IconButton size="small" color="secondary" onClick={onDelete}>
            <Close sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </div>
    </>
  );
}

export default React.memo(NodeEdit);
