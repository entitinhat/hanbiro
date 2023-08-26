import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { NodeProps } from 'reactflow';
import { makeEdit } from './node';
import { makeEdge } from './edge';

export const nodeAction = (props: NodeProps) => {
  console.log('props', props);
  const [showAction, setShowAction] = useState(false);
  const onShowAction = useCallback(() => {
    setShowAction((old) => !old);
  }, []);

  return (
    <>
      <div
        className={classNames('diagram-item diagram-action', {
          manual: props.data?.method == 'ACTION_METHOD_MANUAL',
          automatic: props.data?.method == 'ACTION_METHOD_AUTO'
        })}
      >
        <div className="diagram-item-name" onClick={onShowAction}>
          {props.data.label}
        </div>
        {showAction && makeEdit()}
      </div>
      {makeEdge(props.data)}
    </>
  );
};
