import { Handle, MarkerType } from 'reactflow';
import { NodeData } from './node';

export const makeEdge = (data: NodeData) => {
  return (
    <>
      {data?.source &&
        data.source.map((e: any) => {
          return <Handle key={e.id} type={'source'} id={e.id} position={e.position} />;
        })}

      {data?.target &&
        data.target.map((e: any) => {
          return <Handle key={e.id} type={'target'} id={e.id} position={e.position} />;
        })}
    </>
  );
};

export const initialEdges = [
  {
    id: 'horizontal-e1-2',
    source: 'horizontal-1',
    sourceHandle: 'horizontal-1-right',
    type: 'smoothstep',
    target: 'horizontal-2',
    targetHandle: 'horizontal-2-left',
    label: 'Assigned',
    style: { strokeWidth: 2 },
    labelStyle: { fontSize: '12px' },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    labelBgPadding: [8, 4] as [number, number],
    markerEnd: {
      type: MarkerType.Arrow
    }
  },
  {
    id: 'horizontal-e1-3',
    source: 'horizontal-1',
    sourceHandle: 'horizontal-1-right',
    type: 'smoothstep',
    target: 'horizontal-3',
    targetHandle: 'horizontal-3-left',
    style: { stroke: '#ff0072', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.Arrow
    }
  },
  {
    id: 'horizontal-e1-4',
    source: 'horizontal-3',
    sourceHandle: 'horizontal-3-right',
    type: 'smoothstep',
    target: 'horizontal-4',
    targetHandle: 'horizontal-4-left',
    style: { strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.Arrow
    }
  },
  {
    id: 'horizontal-e1-15',
    source: 'horizontal-3',
    sourceHandle: 'horizontal-3-right',
    type: 'smoothstep',
    target: 'horizontal-2',
    targetHandle: 'horizontal-2-left',
    style: { strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.Arrow
    }
  },
  {
    id: 'horizontal-e1-5',
    source: 'horizontal-4',
    sourceHandle: 'horizontal-4-right',
    type: 'smoothstep',
    target: 'horizontal-2',
    targetHandle: 'horizontal-2-left',
    style: { strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.Arrow
    }
  },
  {
    id: 'horizontal-e1-6',
    source: 'horizontal-2',
    sourceHandle: 'horizontal-2-bottom',
    type: 'smoothstep',
    target: 'horizontal-5',
    targetHandle: 'horizontal-5-top',
    markerEnd: {
      type: MarkerType.Arrow,
      color: '#f6ab6c',
    },
    style: { stroke: '#f6ab6c', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'horizontal-e1-18',
    source: 'horizontal-2',
    sourceHandle: 'horizontal-2-bottom',
    type: 'smoothstep',
    target: 'horizontal-4',
    targetHandle: 'horizontal-5-left',
    markerEnd: {
      type: MarkerType.Arrow,
      color: '#f6ab6c',
    },
    style: { stroke: '#f6ab6c', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'horizontal-e1-19',
    source: 'horizontal-2',
    sourceHandle: 'horizontal-2-bottom',
    type: 'smoothstep',
    target: 'horizontal-7',
    targetHandle: 'horizontal-7-top',
    markerEnd: {
      type: MarkerType.Arrow,
      color: '#f6ab6c',
    },
    style: { stroke: '#f6ab6c', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'horizontal-e1-20',
    source: 'horizontal-2',
    sourceHandle: 'horizontal-2-bottom',
    type: 'smoothstep',
    target: 'horizontal-8',
    targetHandle: 'horizontal-8-top',
    markerEnd: {
      type: MarkerType.Arrow,
      color: '#f6ab6c',
    },
    style: { stroke: '#f6ab6c', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'horizontal-e1-7',
    source: 'horizontal-5',
    sourceHandle: 'horizontal-5-left',
    type: 'smoothstep',
    target: 'horizontal-6',
    targetHandle: 'horizontal-6-right',
    markerEnd: {
      type: MarkerType.Arrow,
      color: '#f6ab6c',
    },
    style: { stroke: '#f6ab6c', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'horizontal-e1-8',
    source: 'horizontal-6',
    sourceHandle: 'horizontal-6-left',
    type: 'smoothstep',
    target: 'horizontal-2',
    targetHandle: 'horizontal-2-left',
    markerEnd: {
      type: MarkerType.Arrow,
      color: '#f6ab6c',
    },
    style: { stroke: '#f6ab6c', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'horizontal-e1-9',
    source: 'horizontal-7',
    sourceHandle: 'horizontal-7-left',
    type: 'smoothstep',
    target: 'horizontal-6',
    targetHandle: 'horizontal-6-right',
    markerEnd: {
      type: MarkerType.Arrow,
      color: '#f6ab6c',
    },
    style: { stroke: '#f6ab6c', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'horizontal-e1-10',
    source: 'horizontal-8',
    sourceHandle: 'horizontal-8-left',
    type: 'smoothstep',
    target: 'horizontal-2',
    targetHandle: 'horizontal-2-left',
    markerEnd: {
      type: MarkerType.Arrow,
      color: '#f6ab6c',
    },
    style: { stroke: '#f6ab6c', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'horizontal-e1-11',
    source: 'horizontal-2',
    sourceHandle: 'horizontal-2-right',
    type: 'smoothstep',
    label: 'Resolved',
    style: { strokeWidth: 2 },
    labelStyle: { fontSize: '12px' },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    labelBgPadding: [8, 4] as [number, number],
    markerEnd: {
      type: MarkerType.Arrow
    },
    target: 'horizontal-9',
    targetHandle: 'horizontal-9-left'
  },
  {
    id: 'horizontal-e1-16',
    source: 'horizontal-9',
    sourceHandle: 'horizontal-9-right',
    type: 'smoothstep',
    style: { strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.Arrow
    },
    target: 'horizontal-10',
    targetHandle: 'horizontal-10-left'
  },
  {
    id: 'horizontal-e1-12',
    source: 'horizontal-10',
    sourceHandle: 'horizontal-10-top',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.Arrow
    },
    target: 'horizontal-2',
    targetHandle: 'horizontal-2-left',
    style: { strokeWidth: 2 }
  },
  {
    id: 'horizontal-e1-13',
    source: 'horizontal-10',
    sourceHandle: 'horizontal-10-bottom',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.Arrow,
      color: '#f6ab6c',
    },
    label: 'Survey Submit',
    target: 'horizontal-11',
    targetHandle: 'horizontal-11-top',
    style: { stroke: '#f6ab6c', strokeWidth: 2 },
    labelStyle: { fontSize: '12px' },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    labelBgPadding: [8, 4] as [number, number],
    animated: true
  },
  {
    id: 'horizontal-e1-14',
    source: 'horizontal-2',
    sourceHandle: 'horizontal-2-right',
    style: { strokeWidth: 2 },
    labelStyle: { fontSize: '12px' },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    labelBgPadding: [8, 4] as [number, number],
    markerEnd: {
      type: MarkerType.ArrowClosed
    },
    type: 'smoothstep',
    target: 'horizontal-group',
    targetHandle: 'horizontal-group-left',
    label: 'Closed'
  },
  {
    id: 'horizontal-e1-23',
    source: 'horizontal-10',
    sourceHandle: 'horizontal-10-right',
    style: { strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed
    },
    type: 'smoothstep',
    target: 'horizontal-group',
    targetHandle: 'horizontal-group-left'
  }
];
