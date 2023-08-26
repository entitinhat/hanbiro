import { useSetRecoilState } from 'recoil';

import IconButton from '@base/components/@extended/IconButton';
import { sideBarSizeAtom } from '@base/store/atoms';
import { Add } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { stepOpenAtom } from '@process/store/atoms/step';
import { NodeEdge } from '@process/types/diagram';

import NodeStatus from '../Status';

interface NodeClosedProps {
  closedX: number;
  edges: NodeEdge;
  processId: string;
}

function NodeClosed(props: NodeClosedProps) {
  const { closedX, edges, processId } = props;
  const setStepOpen = useSetRecoilState(stepOpenAtom);
  const setSidebarSize = useSetRecoilState(sideBarSizeAtom);

  const onStepOpen = () => {
    setStepOpen({
      open: true,
      edit: false,
      type: 'closed',
      sourceId: '',
      data: null
    });
    setSidebarSize(400);
  };

  return (
    <Stack alignItems="center" className="close-status-wrap" sx={{ top: '130px', left: `${closedX - 200}px` }}>
      {Object.entries(edges).map(([key, node]) => {
        return <NodeStatus key={key} processId={processId} node={node} />;
      })}
      <IconButton sx={{ mt: 2 }} size="small" variant="outlined" color="primary" onClick={onStepOpen}>
        <Add sx={{ fontSize: 18 }} />
      </IconButton>
    </Stack>
  );
}

export default NodeClosed;
