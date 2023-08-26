import classNames from 'classnames';
import { NodeProps } from 'reactflow';
import { Axis } from '../../../types/diagram';
import { NodeEdit } from './Edit';
import { MakeEdge, useShowActionEvent } from './Util';

const NodeSimpleAction = (props: NodeProps) => {
  const { showAction, onShowAction, actionRef } = useShowActionEvent();

  return (
    <>
      <div
        className={classNames('diagram-item diagram-simple', {
          'not-forward': props.data?.shape == 'SHAPE_BACKWARD'
        })}
      >
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

export default NodeSimpleAction;
