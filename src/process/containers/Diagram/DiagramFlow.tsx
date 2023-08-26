import React, { useEffect } from 'react';
import ReactFlow, {
  Background,
  ReactFlowProvider,
} from 'reactflow';
import {
  NodeAction,
  NodeStatus,
  NodeChecklist,
  NodeCriteria,
  NodeProcess,
  NodeSimple,
  NodeSite,
  NodeWait,
  NodeGroup
} from '@process/components/Diagram/Flow';
import { Stack } from '@mui/material';
import DiagramSidebar from './DiagramSidebar';
import { useSetRecoilState } from 'recoil';
import DiagramStage from './Stage/DiagramStage';
import { useDiagramFlow, useGetDiagram } from '../../hooks/useDiagram';
import NodeClose from '../../components/Diagram/Flow/Close';
import SidebarStep from './SidebarStep';
import { useParams } from 'react-router-dom';
import { DiagramData } from '../../types/diagram';
import { nextStepAtom } from '../../store/atoms/diagram';
import { useNextSteps } from '../../hooks/useStep';
import { OptionValue } from '../../../base/types/common';

import 'reactflow/dist/style.css';
import '@process/pages/MainPage/diagram-new.scss';

const nodeTypes = {
  nodeAction: NodeAction,
  nodeChecklist: NodeChecklist,
  nodeCriteria: NodeCriteria,
  nodeProcess: NodeProcess,
  nodeSimple: NodeSimple,
  nodeSite: NodeSite,
  nodeWait: NodeWait,
  nodeStatus: NodeStatus,
  nodeGroup: NodeGroup,
  nodeClose: NodeClose
};

const defaultViewport = { x: 10, y: 100, zoom: 1 };
const proOptions = { hideAttribution: true };
// const connectionLineStyle = { stroke: 'white' };
const panOnDrag = [1, 2];
// const defaultEdgeOptions = { animated: true, style: { stroke: 'white' } };
// // const fitViewOptions: FitViewOptions = {
//   padding: 0.2
// };

const DiagramFlow = () => {
  const { id: processId } = useParams();
  const setNextSteps = useSetRecoilState(nextStepAtom);

  const { diagrams } = useGetDiagram({ id: processId });
  const { nextSteps } = useNextSteps({ id: processId });

  useEffect(() => {
    let stepOptions: OptionValue[] = [
      {
        keyName: '',
        languageKey: 'None'
      }
    ];
    if (nextSteps && nextSteps.steps) {
      for (const step of nextSteps.steps) {
        stepOptions.push({ keyName: step.id, languageKey: step.name });
      }
    }
    setNextSteps(stepOptions);
  }, [nextSteps]);

  const {
    nodes,
    edges,
    reactFlowWrapper,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onEdgeUpdate,
    setReactFlowInstance,
    onDrop,
    onDragOver,
    onNodeDragStart,
    onNodeDragStop,
    nodeHidden,
    setNodeHidden
  } = useDiagramFlow(processId!!, diagrams as DiagramData);

  return (
    <Stack direction="row" spacing={1.5} sx={{ height: '100%' }}>
      <SidebarStep />
      <Stack spacing={1.5}>
        <DiagramStage processId={processId!!} />
        <div className="dndflow">
          <ReactFlowProvider>
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeUpdate={onEdgeUpdate}
                onNodeDragStart={onNodeDragStart}
                onNodeDragStop={onNodeDragStop}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                snapToGrid
                // fitView
                defaultViewport={defaultViewport}
                proOptions={proOptions}
                minZoom={1} // 0.7
                maxZoom={1} // 3
                panOnDrag={panOnDrag}
                // style={{
                //   backgroundColor: '#D3D2E5',
                // }}
                // connectionLineStyle={connectionLineStyle}
                // defaultEdgeOptions={defaultEdgeOptions}
                // fitViewOptions={fitViewOptions}
              >
                <div className="updatenode__controls">
                  <div className="updatenode__checkboxwrapper">
                    <label>Backward Hidden:</label>
                    <input type="checkbox" checked={nodeHidden} onChange={(evt) => setNodeHidden(evt.target.checked)} />
                  </div>
                </div>
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </div>
      </Stack>
      <DiagramSidebar processId={processId} />
    </Stack>
  );
};

export default DiagramFlow;
