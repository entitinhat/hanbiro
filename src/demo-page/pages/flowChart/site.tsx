import { Link } from '@mui/icons-material';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { NodeProps } from 'reactflow';
import IconButton from '@base/components/@extended/IconButton';
import { makeEdit } from './node';
import { makeEdge } from './edge';

export const nodeSite = (props: NodeProps) => {
  console.log('props', props);
  const [showAction, setShowAction] = useState(false);
  const onShowAction = useCallback(() => {
    setShowAction((old) => !old);
  }, []);

  return (
    <>
      <div className={classNames('diagram-item diagram-site')}>
        <div className="diagram-item-name" onClick={onShowAction}>
          {props.data.label}
        </div>
        <IconButton className="site-link" color="primary" size="small">
          <Link fontSize="small" />
        </IconButton>
        {showAction && makeEdit()}
      </div>
      {makeEdge(props.data)}
    </>
  );
};
