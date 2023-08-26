import classnames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';

import EdgeAdd from '@process/components/Diagram/Edge/EdgeAdd';
import NodeEdit from '@process/components/Diagram/Node/Edit';
import { diagramDetailAtom } from '@process/store/atoms/diagram';
import { Edge, Node } from '@process/types/diagram';
import { Checklist } from '@process/types/process';
import { useRecoilState } from 'recoil';
import HanPopper from '@base/components/@hanbiro/Popper';
import { Box, Checkbox, ClickAwayListener, FormControlLabel, FormGroup } from '@mui/material';

interface NodeChecklistProps {
  processId: string;
  node: Node;
  stepHelper: any;
}

function NodeChecklist(props: NodeChecklistProps) {
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

  const checklist = useMemo<Checklist[]>(() => {
    const edge = edges?.find((edge) => edge.property == 'PROPERTY_TODO_CLOSE');
    if (edge && edge.options) {
      return JSON.parse(edge.options);
    }
    return [];
  }, [edges]);

  return (
    <>
      {(shape == 'SHAPE_FORWARD' || (shape == 'SHAPE_BACKWARD' && showDetail)) && (
        <ClickAwayListener onClickAway={() => setShowAction(false)}>
          <Box className="diagram-item-wrap" sx={{ top: `${position.y}px`, left: `${position.x}px` }}>
            <div className={classnames('diagram-item diagram-checklist', className)}>
              <div className="diagram-item-name" onClick={onShowAction}>
                {label}
              </div>
              <div className="checklist-no">
                {checklist && (
                  <HanPopper sx={{ width: '250px', maxWidth: '300px' }} title={`Checklist:` + checklist.length} color={'yellow'}>
                    <FormGroup>
                      {checklist.map((ck) => (
                        <FormControlLabel
                          control={<Checkbox sx={{ '&:hover': { bgcolor: 'transparent' } }} />}
                          key={ck.id}
                          label={ck.name}
                        />
                      ))}
                    </FormGroup>
                  </HanPopper>
                )}
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
                // } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
                //   return (
                //     <React.Fragment key={edge.id}>
                //       {showDetail && (
                //         <div
                //           className={classNames(
                //             'diagram-direction-vertical diagram-direction-backward',
                //             {
                //               'is-edit': showAction,
                //             },
                //           )}
                //         >
                //           {!showAction && edge.label && (
                //             <div className="diagram-direction-text">{edge.label}</div>
                //           )}
                //           {showAction && !edge.target && (
                //             <EdgeAdd
                //               style={{
                //                 left: '50%',
                //                 top: '100%',
                //                 marginTop: '16px',
                //                 marginLeft: '-13px',
                //               }}
                //               className={'btn-backward'}
                //               sourceId={sourceId}
                //               sourceType={nodeType}
                //               shape={shape}
                //               edge={edge}
                //               stepHelper={stepHelper}
                //             />
                //           )}
                //         </div>
                //       )}
                //     </React.Fragment>
                //   );
              }
            })}
          </Box>
        </ClickAwayListener>
      )}
    </>
  );
}

export default NodeChecklist;
