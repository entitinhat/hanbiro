import { useCallback, useState } from 'react';
import { NodeProps } from 'reactflow';
import { makeEdge } from './edge';
import { makeEdit } from './node';

export const nodeStatus = (props: NodeProps) => {
  const [showAction, setShowAction] = useState(false);
  const onShowAction = useCallback(() => {
    setShowAction((old) => !old);
  }, []);

  return (
    <>
      <div className="diagram-item diagram-status">
        <div className="diagram-item-name" onClick={onShowAction}>
          {props.data.label}
        </div>
        {showAction && makeEdit()}
      </div>
      {makeEdge(props.data)}
    </>
  );
};
