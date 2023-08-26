import { Stack } from '@mui/material';
import { NodeProps } from 'reactflow';
import { MakeEdge } from './Util';

const NodeGroup = (props: NodeProps) => {
  return (
    <>
      <Stack className="nodrag"
        alignItems="center"
        sx={{
          border: 'none',
          backgroundColor: 'rgba(67, 165, 246, 0.15)',
          width: 136,
          height: 262,
          borderRadius: '0.5rem'
        }}
      >
      </Stack>
      {MakeEdge(props.data)}
    </>
  );
};

export default NodeGroup;