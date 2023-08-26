import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Connection, Background, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import '@process/pages/MainPage/diagram-new.scss';
import { initialNodes } from './node';
import { initialEdges } from './edge';
import { nodeAction } from './action';
import { nodeStatus } from './status';
import { nodeChecklist } from './checklist';
import { nodeCriteria } from './criteria';
import { nodeProcess } from './process';
import { nodeSimple } from './simple';
import { nodeSite } from './site';
import { nodeWait } from './wait';
import { nodeClosed } from './closed';

const nodeTypes = {
  nodeAction: nodeAction,
  nodeChecklist: nodeChecklist,
  nodeCriteria: nodeCriteria,
  nodeProcess: nodeProcess,
  nodeSimple: nodeSimple,
  nodeSite: nodeSite,
  nodeWait: nodeWait,
  nodeStatus: nodeStatus,
  nodeClosed: nodeClosed
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const HorizontalFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeHidden, setNodeHidden] = useState(false);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  const onConnect = useCallback((connect: Connection) => setEdges((eds) => addEdge(connect, eds)), []);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data?.shape === 'SHAPE_BACKWARD') {
          node.hidden = nodeHidden;
        }

        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.animated) {
          edge.hidden = nodeHidden;
        }

        return edge;
      })
    );
  }, [nodeHidden, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      defaultViewport={defaultViewport}
      minZoom={0.7}
      maxZoom={3}
      attributionPosition="bottom-left"
    >
      <div className="updatenode__controls">
        <div className="updatenode__checkboxwrapper">
          <label>Backward Hidden:</label>
          <input type="checkbox" checked={nodeHidden} onChange={(evt) => setNodeHidden(evt.target.checked)} />
        </div>
      </div>
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default HorizontalFlow;
