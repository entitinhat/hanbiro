import { Link } from '@mui/icons-material';
import classNames from 'classnames';
import { NodeProps } from 'reactflow';
import IconButton from '@base/components/@extended/IconButton';
import { NodeEdit } from './Edit';
import { MakeEdge, useShowActionEvent } from './Util';
import { Axis } from '../../../types/diagram';

const NodeSite = (props: NodeProps) => {
  const { showAction, onShowAction, actionRef } = useShowActionEvent();

  return (
    <>
      <div
        className={classNames('diagram-item diagram-site', {
          'not-forward': props.data?.shape == 'SHAPE_BACKWARD'
        })}
      >
        <div ref={actionRef} className="diagram-item-name nodrag" onClick={onShowAction}>
          {props.data.label}
        </div>
        <IconButton className="site-link nodrag" color="primary" size="small">
          <Link fontSize="small" />
        </IconButton>
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

export default NodeSite;
