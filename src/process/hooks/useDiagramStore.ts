import { create } from 'zustand';
import { useCallback, useEffect, useRef, useState, DragEvent, MouseEvent, DragEventHandler } from 'react';
import {
  Node,
  Edge,
  Connection,
  updateEdge,
  OnNodesChange,
  applyNodeChanges,
  OnEdgesChange,
  applyEdgeChanges,
  addEdge,
  OnConnect,
  NodeChange,
  EdgeChange,
  NodeDragHandler,
  OnEdgeUpdateFunc
} from 'reactflow';
import { useSetRecoilState } from 'recoil';
import { EdgeBasicProperty, getEdgeStyle, getNodeType, GetNodeType, NodeBasicProperty } from '../components/Diagram/Flow/Util';
import { stageAtom } from '../store/atoms/diagram';
import { DiagramData, EdgeData, NodeData, Position } from '../types/diagram';
import useStepMutation from './useStepMutation';
import { v4 as uuidv4 } from 'uuid';
import useStatusMutation from './useStatusMutation';

export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodeDragStart: NodeDragHandler;
  onNodeDragStop: NodeDragHandler;
  onEdgeUpdate: OnEdgeUpdateFunc;
  onDragOver: DragEventHandler;
};

export const useDiagramStore = (processId: string, diagrams: DiagramData) => {
  const setStages = useSetRecoilState(stageAtom);
  const reactFlowWrapper = useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodeHidden, setNodeHidden] = useState(false);

  const {
    mUpdateStatus: { mutate: mutationUpdateStatus, isLoading: statusUpdateLoading },
    mAddStatus: { mutate: mutationAddStatus, isLoading: statusAddLoading }
  } = useStatusMutation(processId!!, undefined, false);

  const onNodeDragStart = (event: MouseEvent, node: Node) => {
    event.preventDefault();
    console.log('drag start', node);
  };

  const onNodeDragStop = (event: MouseEvent, node: Node, nodes: Node[]) => {
    console.log('drag stop', node);
    event.preventDefault();
    // mutationUpdateStep({
    //   id: processId,
    //   step: {
    //     id: node.id,
    //     meta: {
    //       axis: node.position
    //     }
    //   }
    // });
  };

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const useStore = create<RFState>((set, get) => ({
    nodes: nodes,
    edges: edges,
    onNodesChange: (changes: NodeChange[]) => {
      console.log('onNodesChanges', changes);
      set({
        nodes: applyNodeChanges(changes, get().nodes)
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges)
      });
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge(connection, get().edges)
      });
    },
    onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => {
      set({
        edges: updateEdge(oldEdge, newConnection, get().edges)
      });
    },
    onNodeDragStart: onNodeDragStart,
    onNodeDragStop: onNodeDragStop,
    onDragOver: onDragOver,
  }));

  useEffect(() => {
    const initialNodes: Node[] = diagrams.nodes?.map((node: NodeData) => {
      let nodeData: Node = {
        id: node.id,
        type: GetNodeType(node.type),
        data: {
          label: node.label,
          processId: processId,
          type: node.type,
          shape: node.shape,
          position: node.axis,
          property: node.property
        },
        position: node.axis
      };

      if (node.parent) {
        nodeData.parentNode = node.parent;
      }

      if (node.method) {
        nodeData.data.method = node.method;
      }

      if (node.shape) {
        nodeData.data.shape = node.shape;
      }

      if (node.sources) {
        nodeData.data.sources = node.sources.map((source: Position) => {
          return {
            id: source.id,
            direction: source.direction
          };
        });
      }

      if (node.targets) {
        nodeData.data.targets = node.targets.map((target: Position) => {
          return {
            id: target.id,
            direction: target.direction
          };
        });
      }
      return nodeData;
    });

    const initialEdges: Edge[] = diagrams.edges?.map((edge: EdgeData) => {
      const edgeData: Edge = {
        id: edge.id,
        type: 'smoothstep',
        source: edge.source,
        sourceHandle: edge.sourceDirection?.id,
        target: edge.target,
        targetHandle: edge.targetDirection?.id,
        data: {
          sequence: edge.sequence,
          multiple: edge.multiple
        },
        ...getEdgeStyle({
          label: edge.label,
          property: edge.property,
          multiple: edge.multiple,
          direction: edge.sourceDirection?.direction
        })
      };

      return edgeData;
    });

    let stageX = 0;
    const initialStages = diagrams.stages?.map((stage) => {
      stageX += stage.width;
      return { ...stage, ...{ axisX: stageX } };
    });

    setStages(initialStages);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [diagrams]);

  return {
    reactFlowWrapper,
    setReactFlowInstance,
    nodeHidden,
    setNodeHidden,
    useStore
  };
};
