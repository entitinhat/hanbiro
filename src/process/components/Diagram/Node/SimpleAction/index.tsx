import classnames from 'classnames';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { Box, ClickAwayListener } from '@mui/material';
import EdgeAdd from '@process/components/Diagram/Edge/EdgeAdd';
import NodeEdit from '@process/components/Diagram/Node/Edit';
import { diagramDetailAtom } from '@process/store/atoms/diagram';
import { Edge, Node } from '@process/types/diagram';

interface NodeSimpleProps {
  processId: string;
  node: Node;
  stepHelper: any;
}

function NodeSimple(props: NodeSimpleProps) {
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
      {(shape == 'SHAPE_FORWARD' || ((shape == 'SHAPE_BACKWARD' || shape == 'SHAPE_MIDDLE') && showDetail)) && (
        <ClickAwayListener onClickAway={() => setShowAction(false)}>
          <Box className="diagram-item-wrap" sx={{ top: `${position.y}px`, left: `${position.x}px` }}>
            <div className={classnames('diagram-item diagram-simple', className)}>
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
              if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
                return (
                  <React.Fragment key={edge.id}>
                    <div
                      className={classnames('diagram-direction-forward', {
                        'for-simple-action': edge.height && edge.height > 0,
                        'is-edit': showAction
                      })}
                      // 61 : step height (40) + arrow height(11)
                      // 6 : forward line height
                      style={edge.height && edge.height > 0 ? { height: `${edge.height}px` } : {}}
                    >
                      {showAction && (
                        <>
                          {!edge.target && (
                            <EdgeAdd
                              style={{
                                left: '100%',
                                top: `${edge.height && edge.height > 0 ? 0 : 100}%`,
                                marginTop: '-15px',
                                marginLeft: '15px'
                              }}
                              className={'btn-forward'}
                              processId={processId}
                              sourceId={sourceId}
                              sourceType={nodeType}
                              edge={edge}
                              shape={shape}
                              stepHelper={stepHelper}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </React.Fragment>
                );
              } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
                return (
                  <React.Fragment key={edge.id}>
                    <div
                      className={classnames('diagram-direction-vertical diagram-direction-bottom', {
                        'is-edit': showAction
                      })}
                    >
                      {showAction && (
                        <>
                          {!edge.target && (
                            <EdgeAdd
                              style={{
                                left: '50%',
                                top: '100%',
                                marginTop: '16px',
                                marginLeft: '-13px'
                              }}
                              className={'btn-down btn-backward'}
                              processId={processId}
                              sourceId={sourceId}
                              sourceType={nodeType}
                              shape={shape}
                              edge={edge}
                              stepHelper={stepHelper}
                            />
                          )}
                        </>
                      )}
                    </div>
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

export default React.memo(NodeSimple);
