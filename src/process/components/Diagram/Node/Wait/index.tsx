import classnames from 'classnames';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { Box, ClickAwayListener } from '@mui/material';
import EdgeAdd from '@process/components/Diagram/Edge/EdgeAdd';
import NodeEdit from '@process/components/Diagram/Node/Edit';
import { diagramDetailAtom } from '@process/store/atoms/diagram';
import { Edge, Node } from '@process/types/diagram';

interface NodeWaitProps {
  processId: string;
  node: Node;
  stepHelper: any;
}

function NodeWait(props: NodeWaitProps) {
  const {
    node: {
      id: sourceId,
      data: { label },
      type: nodeType,
      position,
      className,
      property,
      shape,
      edges
    },
    processId,
    stepHelper
  } = props;

  const [showAction, setShowAction] = useState(false);
  const [showDetail, setShowDetail] = useRecoilState(diagramDetailAtom);

  const onShowAction = useCallback(() => {
    setShowAction((old) => !old);
  }, []);

  useEffect(() => {
    setShowDetail(showAction);
  }, [showAction]);

  return (
    <>
      {(shape == 'SHAPE_FORWARD' || (shape == 'SHAPE_BACKWARD' && showDetail)) && (
        <ClickAwayListener onClickAway={() => setShowAction(false)}>
          <Box className="diagram-item-wrap" sx={{ top: `${position.y}px`, left: `${position.x}px` }}>
            <div className={classnames('diagram-item diagram-wait', className)}>
              <div className="diagram-item-name" onClick={onShowAction}>
                {label}
              </div>
              {showAction && (
                <NodeEdit
                  processId={processId}
                  property={property}
                  sourceId={sourceId}
                  position={position}
                  sourceType={nodeType}
                  shape={shape}
                />
              )}
            </div>
            {edges?.map((edge: Edge) => {
              let styles: any = {};
              if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
                styles = edge.height ? { height: `${edge.height}px` } : {};

                return (
                  <div
                    className={classnames('diagram-direction-forward', {
                      'is-edit': showAction
                    })}
                    style={...styles}
                    key={edge.id}
                  >
                    {!showAction && edge.label && <div className="diagram-direction-text">{edge.label}</div>}{' '}
                    {showAction && !edge.target && (
                      <EdgeAdd
                        style={{
                          left: '100%',
                          top: '100%',
                          marginTop: '-15px',
                          marginLeft: '15px'
                        }}
                        className={'btn-forward'}
                        processId={processId}
                        sourceId={sourceId}
                        sourceType={nodeType}
                        shape={shape}
                        edge={edge}
                        stepHelper={stepHelper}
                      />
                    )}
                  </div>
                );
              } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
                return (
                  <React.Fragment key={edge.id}>
                    {showDetail && (
                      <div
                        className={classnames('diagram-direction-vertical diagram-direction-backward diagram-direction-wait', {
                          'is-edit': showAction
                        })}
                      >
                        {!showAction && edge.label && <div className="diagram-direction-text">{edge.label}</div>}
                        {showAction && !edge.target && (
                          <EdgeAdd
                            style={{
                              left: '50%',
                              top: '100%',
                              marginTop: '16px',
                              marginLeft: '-13px'
                            }}
                            className={'btn-backward'}
                            processId={processId}
                            sourceId={sourceId}
                            sourceType={nodeType}
                            shape={shape}
                            edge={edge}
                            stepHelper={stepHelper}
                          />
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              }
            })}
          </Box>
        </ClickAwayListener>
      )}
    </>
  );
}

export default NodeWait;
