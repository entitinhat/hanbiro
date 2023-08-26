import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { NodeProps } from 'reactflow';
import { makeEdge } from './edge';
import { makeEdit } from './node';

export const nodeCriteria = (props: NodeProps) => {
  console.log('props', props);
  const [showAction, setShowAction] = useState(false);
  const onShowAction = useCallback(() => {
    setShowAction((old) => !old);
  }, []);

  return (
    <>
      <div className={classNames('diagram-item diagram-criteria')}>
        <div className="criteria-shape"></div>
        <div className="diagram-item-name" onClick={onShowAction}>
          {props.data.label}
        </div>
        {showAction && makeEdit()}
      </div>
      {makeEdge(props.data)}
    </>
  );
};
