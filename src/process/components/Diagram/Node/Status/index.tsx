import classnames from 'classnames';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';

import { Box, ClickAwayListener } from '@mui/material';
import NodeEdit from '@process/components/Diagram/Node/Edit';
import { Node } from '@process/types/diagram';

interface NodeStatusProps {
  processId: string;
  node: Node;
}

function NodeStatus(props: NodeStatusProps) {
  const {
    id: sourceId,
    data: { label },
    className,
    position,
    type: nodeType,
    shape
  } = props.node;

  const [showAction, setShowAction] = useState(false);

  const onShowAction = useCallback(() => {
    setShowAction((old) => !old);
  }, []);

  return (
    <>
      <ClickAwayListener onClickAway={() => setShowAction(false)}>
        <Box className="diagram-item-wrap" onClick={onShowAction}>
          <div className={classnames('diagram-item diagram-status', className)}>
            <div className="diagram-item-name">{label}</div>
            {showAction && (
              <NodeEdit
                processId={props.processId}
                sourceId={sourceId}
                property={'PROPERTY_CLOSE'}
                position={position}
                sourceType={nodeType}
                shape={shape}
              />
            )}
          </div>
        </Box>
      </ClickAwayListener>
    </>
  );
}

export default NodeStatus;
