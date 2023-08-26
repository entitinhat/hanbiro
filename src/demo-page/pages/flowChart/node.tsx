import { Close, ModeEdit } from '@mui/icons-material';
import { Position } from 'reactflow';
import IconButton from '@base/components/@extended/IconButton';

export interface NodeData {
  label: string;
  method?: string;
  shape?: string;
  source?: {
    id: string;
    position: Position;
  }[];
  target?: {
    id: string;
    position: Position;
  }[];
}

export const makeEdit = () => {
  return (
    <div className="diagram-item-actions">
      <IconButton size="small" color="secondary">
        <ModeEdit sx={{ fontSize: 18 }} />
      </IconButton>
      <IconButton size="small" color="secondary">
        <Close sx={{ fontSize: 18 }} />
      </IconButton>
    </div>
  );
};

export const initialNodes = [
  {
    id: 'horizontal-1',
    type: 'nodeAction',
    data: {
      label: 'New',
      method: 'ACTION_METHOD_MANUAL',
      source: [
        {
          id: 'horizontal-1-right',
          position: Position.Right
        }
      ]
    },
    position: { x: 0, y: 0 }
  },
  {
    id: 'horizontal-2',
    type: 'nodeAction',
    data: {
      label: 'Open',
      method: 'ACTION_METHOD_MANUAL',
      source: [
        {
          id: 'horizontal-2-right',
          position: Position.Right
        },
        {
          id: 'horizontal-2-bottom',
          position: Position.Bottom
        }
      ],
      target: [
        {
          id: 'horizontal-2-left',
          position: Position.Left
        }
      ]
    },
    position: { x: 550, y: 0 }
  },
  {
    id: 'horizontal-3',
    type: 'nodeAction',
    data: {
      label: 'Assignment Queue',
      method: 'ACTION_METHOD_AUTO',
      source: [
        {
          id: 'horizontal-3-right',
          position: Position.Right
        }
      ],
      target: [
        {
          id: 'horizontal-3-left',
          position: Position.Left
        }
      ]
    },
    position: { x: 180, y: 120 }
  },
  {
    id: 'horizontal-4',
    type: 'nodeAction',
    data: {
      label: 'Unassigned',
      method: 'ACTION_METHOD_MANUAL',
      source: [
        {
          id: 'horizontal-4-right',
          position: Position.Right
        }
      ],
      target: [
        {
          id: 'horizontal-4-left',
          position: Position.Left
        }
      ]
    },
    position: { x: 370, y: 200 }
  },
  {
    id: 'horizontal-5',
    type: 'nodeAction',
    data: {
      label: 'Forwarding to External',
      method: 'ACTION_METHOD_MANUAL',
      shape: 'SHAPE_BACKWARD',
      source: [
        {
          id: 'horizontal-5-left',
          position: Position.Left
        }
      ],
      target: [
        {
          id: 'horizontal-5-top',
          position: Position.Top
        }
      ]
    },
    position: { x: 550, y: 300 }
  },
  {
    id: 'horizontal-6',
    type: 'nodeSite',
    data: {
      label: 'Desk Site',
      method: 'ACTION_METHOD_MANUAL',
      shape: 'SHAPE_BACKWARD',
      source: [
        {
          id: 'horizontal-6-left',
          position: Position.Left
        }
      ],
      target: [
        {
          id: 'horizontal-6-right',
          position: Position.Right
        }
      ]
    },
    position: { x: 350, y: 300 }
  },
  {
    id: 'horizontal-7',
    type: 'nodeAction',
    data: {
      label: 'Request to Customer',
      shape: 'SHAPE_BACKWARD',
      method: 'ACTION_METHOD_MANUAL',
      source: [
        {
          id: 'horizontal-7-left',
          position: Position.Left
        }
      ],
      target: [
        {
          id: 'horizontal-7-top',
          position: Position.Top
        }
      ]
    },
    position: { x: 550, y: 400 }
  },
  {
    id: 'horizontal-8',
    type: 'nodeStatus',
    data: {
      label: 'Internal Task',
      shape: 'SHAPE_BACKWARD',
      source: [
        {
          id: 'horizontal-8-left',
          position: Position.Left
        }
      ],
      target: [
        {
          id: 'horizontal-8-top',
          position: Position.Top
        }
      ]
    },
    position: { x: 550, y: 500 }
  },
  {
    id: 'horizontal-9',
    type: 'nodeAction',
    data: {
      label: 'Send by Email',
      method: 'ACTION_METHOD_MANUAL',
      source: [
        {
          id: 'horizontal-9-right',
          position: Position.Right
        }
      ],
      target: [
        {
          id: 'horizontal-9-left',
          position: Position.Left
        }
      ]
    },
    position: { x: 750, y: 300 }
  },
  {
    id: 'horizontal-10',
    type: 'nodeSite',
    data: {
      label: 'Desk Site',
      method: 'ACTION_METHOD_MANUAL',
      source: [
        {
          id: 'horizontal-10-top',
          position: Position.Top
        },
        {
          id: 'horizontal-10-right',
          position: Position.Right
        },
        {
          id: 'horizontal-10-bottom',
          position: Position.Bottom
        }
      ],
      target: [
        {
          id: 'horizontal-10-left',
          position: Position.Left
        }
      ]
    },
    position: { x: 900, y: 300 }
  },
  {
    id: 'horizontal-11',
    type: 'nodeAction',
    // hidden: true,
    data: {
      label: 'Satification',
      method: 'ACTION_METHOD_MANUAL',
      shape: 'SHAPE_BACKWARD',
      target: [
        {
          id: 'horizontal-11-top',
          position: Position.Top
        }
      ]
    },
    position: { x: 900, y: 450 }
  },
  {
    id: 'horizontal-group',
    data: {
      label: '',
      target: [
        {
          id: 'horizontal-group-left',
          position: Position.Left
        }
      ]
    },
    position: { x: 1100, y: 0 },
    type: 'nodeClosed'
  },
  {
    id: 'horizontal-12',
    data: { label: 'Closed' },
    type: 'nodeStatus',
    parentNode: 'horizontal-group',
    position: { x: 8, y: 10 }
  },
  {
    id: 'horizontal-13',
    type: 'nodeStatus',
    data: { label: 'Canceled' },
    parentNode: 'horizontal-group',
    position: { x: 8, y: 60 }
  },
  {
    id: 'horizontal-14',
    type: 'nodeStatus',
    data: { label: 'Deleted' },
    parentNode: 'horizontal-group',
    position: { x: 8, y: 110 }
  },
  {
    id: 'horizontal-15',
    type: 'nodeStatus',
    data: { label: 'Merged' },
    parentNode: 'horizontal-group',
    position: { x: 8, y: 160 }
  },
  {
    id: 'horizontal-16',
    type: 'nodeStatus',
    data: { label: 'Denied' },
    parentNode: 'horizontal-group',
    position: { x: 8, y: 210 }
  }
];
