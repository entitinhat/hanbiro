import classNames from 'classnames';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { GpsFixed } from '@mui/icons-material';
import { Box, ClickAwayListener, IconButton } from '@mui/material';
import EdgeAdd from '@process/components/Diagram/Edge/EdgeAdd';
import ProcessAdd from '@process/components/Diagram/Edge/ProcessAdd';
import NodeEdit from '@process/components/Diagram/Node/Edit';
import { diagramDetailAtom } from '@process/store/atoms/diagram';
import { Edge, Node } from '@process/types/diagram';

interface NodeActionProps {
  processId: string;
  node: Node;
  stepHelper: any;
}

function NodeAction(props: NodeActionProps) {
  const {
    node: {
      id: sourceId,
      data: { label, method },
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
            <div
              className={classNames('diagram-item diagram-action', className, {
                manual: method == 'ACTION_METHOD_MANUAL',
                automatic: method == 'ACTION_METHOD_AUTO'
              })}
            >
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
              if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_JUMP') {
                return <React.Fragment key={edge.id} />;
              } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
                styles = edge.height ? { height: `${edge.height}px` } : {};

                return (
                  <div
                    className={classNames('', {
                      'diagram-direction-forward': edge.multiple == 'MULTIPLE_NONE',
                      'diagram-direction-forward with-split-choice':
                        edge.multipleOrder &&
                        edge.multipleOrder == 1 &&
                        (edge.multiple == 'MULTIPLE_CHOICE' || edge.multiple == 'MULTIPLE_ANY'),
                      'diagram-direction-split-choice':
                        edge.multipleOrder &&
                        edge.multipleOrder > 1 &&
                        (edge.multiple == 'MULTIPLE_CHOICE' || edge.multiple == 'MULTIPLE_ANY'),
                      'diagram-direction-forward with-split-parallel': edge.multipleOrder == 1 && edge.multiple == 'MULTIPLE_PARALLEL',
                      'diagram-direction-split-parallel':
                        edge.multipleOrder && edge.multipleOrder > 1 && edge.multiple == 'MULTIPLE_PARALLEL',
                      'is-edit': showAction
                    })}
                    style={...styles}
                    key={edge.id}
                  >
                    {!showAction && !(edge.multipleOrder && edge.multipleOrder > 1 && edge.multiple == 'MULTIPLE_PARALLEL') && (
                      <div className="diagram-direction-text">{edge.label}</div>
                    )}
                    {showAction && (
                      <>
                        {!edge.target ? (
                          edge.multipleOrder && edge.multipleOrder > 1 ? (
                            <EdgeAdd
                              style={{
                                left: '100%',
                                top: '100%',
                                marginLeft: '15px',
                                marginTop: '-10px'
                              }}
                              className={'btn-split'}
                              processId={processId}
                              sourceId={sourceId}
                              sourceType={nodeType}
                              shape={shape}
                              edge={edge}
                              stepHelper={stepHelper}
                            />
                          ) : (
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
                          )
                        ) : (
                          <>
                            {(edge.multiple == 'MULTIPLE_JOIN' || edge.multiple == 'MULTIPLE_AND_JOIN') && (
                              <IconButton className="btn-multiple">
                                <GpsFixed />
                              </IconButton>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                );
              } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_MIDDLE') {
                return (
                  <React.Fragment key={edge.id}>
                    {showDetail && (
                      <div
                        className={classNames('diagram-direction-vertical diagram-direction-middle', {
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
                            className={'btn-down btn-middle'}
                            processId={processId}
                            sourceId={sourceId}
                            sourceType={nodeType}
                            shape={shape}
                            edge={edge}
                          />
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              } else if (
                edge.sourceDirection == 'DIRECTION_BACKWARD_OUTGOING_BOTTOM' ||
                edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM'
              ) {
                return (
                  <React.Fragment key={edge.id}>
                    {showDetail && (
                      <div
                        className={classNames('diagram-direction-vertical diagram-direction-backward', {
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
                          />
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              } else if (edge.sourceDirection == 'DIRECTION_BACKWARD_OUTGOING_RIGHT') {
                let edgeStyles: any = {
                  left: '50%',
                  top: '100%',
                  marginTop: '-25px',
                  marginLeft: '-90px'
                };
                if (edge.multipleOrder && edge.multipleOrder > 0) {
                  edgeStyles.marginTop = '-9px';
                  edgeStyles.marginLeft = '-58px';
                }
                let styles: any = edge.height ? { height: `${edge.height}px` } : {};

                return (
                  <React.Fragment key={edge.id}>
                    {showAction && (
                      <div
                        className={classNames('', {
                          'diagram-direction-back': edge.multipleOrder == 1,
                          'diagram-direction-back with-split': edge.multipleOrder && edge.multipleOrder > 1,
                          'is-edit': !edge.target && showAction,
                          'multiple-link': edge.multiple == 'MULTIPLE_LINK'
                        })}
                        style={...styles}
                      >
                        {!edge.target && (
                          <EdgeAdd
                            style={...edgeStyles}
                            className={'btn-backward'}
                            processId={processId}
                            sourceId={sourceId}
                            sourceType={nodeType}
                            shape={shape}
                            edge={edge}
                            addType={'more'}
                          />
                        )}
                        {edge.target && edge.multiple == 'MULTIPLE_LINK' && (
                          <IconButton className="btn-multiple">
                            <GpsFixed />
                          </IconButton>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_PROCESS') {
                let edgeStyles: any = {
                  left: '0',
                  top: '-40px',
                  marginLeft: '-16px'
                };
                return (
                  <React.Fragment key={edge.id}>
                    <div
                      className={classNames('diagram-direction-up diagram-direction-other-process', {
                        'is-edit': !edge.target && showAction
                      })}
                    >
                      {!edge.target && (
                        <ProcessAdd
                          style={...edgeStyles}
                          className={'btn-down btn-other-process'}
                          processId={processId}
                          sourceId={sourceId}
                          sourceType={nodeType}
                          shape={shape}
                          edge={edge}
                        />
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

export default React.memo(NodeAction);
