import classNames from 'classnames';
import { useRef } from 'react';
import { NodeProps } from 'reactflow';
import { Axis } from '../../../types/diagram';
import { NodeEdit } from './Edit';
import { MakeEdge, useShowActionEvent } from './Util';

export const NodeAction = (props: NodeProps) => {
  const { showAction, onShowAction, actionRef } = useShowActionEvent();

  // console.log('props data', props.data);

  return (
    <>
      <div
        className={classNames('diagram-item diagram-action', {
          'not-forward': props.data?.shape == 'SHAPE_BACKWARD',
          manual: props.data?.method == 'ACTION_METHOD_MANUAL',
          automatic: props.data?.method == 'ACTION_METHOD_AUTO'
        })}
      >
        {/* <div className="diagram-item-name" onClick={onShowAction} onMouseDownCapture={(e) => e.stopPropagation()}> */}
        <div ref={actionRef} className="diagram-item-name nodrag" onClick={onShowAction}>
          {props.data.label}
        </div>
        {showAction && (
          <NodeEdit
            processId={props.data.processId}
            sourceId={props.id}
            position={props.data.position as Axis}
            sourceType={props.data.type}
            shape={props.data.shape}
            property={props.data.property}
            deleteNode={props.data.deleteNode}
          />
        )}
      </div>
      {MakeEdge(props.data)}
    </>
  );
};

export default NodeAction;
