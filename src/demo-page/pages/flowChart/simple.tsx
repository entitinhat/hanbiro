import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { NodeProps } from 'reactflow';
import { makeEdge } from './edge';
import { makeEdit } from './node';

export const nodeSimple = (props: NodeProps) => {
  console.log('props', props);
  const [showAction, setShowAction] = useState(false);
  const onShowAction = useCallback(() => {
    setShowAction((old) => !old);
  }, []);

  return (
    <>
      <div className={classNames('diagram-item diagram-simple')}>
        <div className="diagram-item-name" onClick={onShowAction}>
          {props.data.label}
        </div>
        {showAction && makeEdit()}
      </div>
      {makeEdge(props.data)}
    </>
  );
};
