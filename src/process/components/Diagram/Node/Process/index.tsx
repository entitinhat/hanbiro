import classnames from 'classnames';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';

import { Box, ClickAwayListener } from '@mui/material';
import NodeEdit from '@process/components/Diagram/Node/Edit';
import { Node } from '@process/types/diagram';

interface NodeProcessProps {
  processId: string;
  node: Node;
}

function NodeProcess(props: NodeProcessProps) {
  const {
    id: sourceId,
    data: { label },
    className,
    position,
    property,
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
        <Box className="diagram-item-wrap" sx={{ top: `${position.y}px`, left: `${position.x}px` }}>
          <div className={classnames('diagram-item diagram-other-process', className)}>
            <div className="diagram-item-name" onClick={onShowAction}>
              {label}
            </div>
            {showAction && (
              <NodeEdit
                processId={props.processId}
                sourceId={sourceId}
                property={property}
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

export default NodeProcess;
