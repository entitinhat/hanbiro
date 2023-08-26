import usePost from '@base/hooks/usePost';
import { queryKeys } from '@process/config/queryKeys';
import { GET_DIAGRAM } from '@process/services/process';
import { useCallback, useEffect, useRef, useState, DragEvent, MouseEvent } from 'react';
import { Node, Edge, Connection, updateEdge, OnNodesChange, applyNodeChanges, OnEdgesChange, applyEdgeChanges, addEdge } from 'reactflow';
import { useSetRecoilState } from 'recoil';
import { EdgeBasicProperty, getEdgeStyle, GetNodeType, NodeBasicProperty } from '../components/Diagram/Flow/Util';
import { stageAtom } from '../store/atoms/diagram';
import { DiagramData, EdgeData, NodeData, Position } from '../types/diagram';
import useStepMutation from './useStepMutation';
import { v4 as uuidv4 } from 'uuid';
import useStatusMutation from './useStatusMutation';

export const useGetDiagram = (params: any, opts?: any) => {
  const fallback = { stages: [], nodes: [], edges: [] };

  const { data: diagrams = fallback } = usePost<DiagramData>([queryKeys.getDiagram, params.id], GET_DIAGRAM, params, opts);

  return { diagrams };
};

export const useDiagramFlow = (processId: string, diagrams: DiagramData) => {
  const setStages = useSetRecoilState(stageAtom);
  const reactFlowWrapper = useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodeHidden, setNodeHidden] = useState(false);

  const deleteNode = (id: string) => {
    console.log('deleteNode', id);
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

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
          property: node.property,
          deleteNode
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

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    console.log('onEdgeUpdate', oldEdge, newConnection);
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      // console.log('onNodesChanges', changes);
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      console.log('onEdgesChange', changes);
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const {
    mUpdateStatus: { mutate: mutationUpdateStatus, isLoading: statusUpdateLoading },
    mAddStatus: { mutate: mutationAddStatus, isLoading: statusAddLoading }
  } = useStatusMutation(processId!!, undefined, false);

  const onConnect = useCallback(
    (connect: Connection) => {
      console.log('onConnect', connect);
      // find nextDirection
      const nodes = reactFlowInstance.getNodes();
      console.log('getnodes', nodes);
      const findSourceNode = nodes?.find((node: Node) => {
        if (node.id == connect.source) {
          return true;
        }
      });

      const findTargetNode = nodes?.find((node: Node) => {
        console.log('connect node', node, connect.target);
        if (node.id == connect.target) {
          return true;
        }
      });

      const findTargetEdge = findTargetNode?.data.targets?.find((target: Position) => {
        if (target.id == connect.targetHandle) {
          return true;
        }
      });

      // mutiple 처리 - 같은 방향으로 1개이상이 있을 경우
      // parallel, choice 선택 UI 표시
      const findSourceEdge = findSourceNode?.data.sources?.find((source: Position) => {
        if (source.id == connect.sourceHandle) {
          return true;
        }
      });

      const edges = reactFlowInstance.getEdges();
      console.log('get edges', edges);
      const findEdge = edges?.find((edge: Edge) => {
        if (edge.sourceHandle == connect.sourceHandle) {
          return true;
        }
      });

      console.log('findSourceEdge', findSourceEdge);
      let newLabel = findEdge?.data.label;
      if (findSourceEdge) {
        console.log('findEdge', findEdge);
        const addStatus = {
          id: processId,
          stepId: connect.source,
          status: {
            id: uuidv4(),
            name: 'New Label',
            button: 'New Button',
            event: 'EVENT_CLICK',
            view: 'VIEW_SINGLE',
            property: 'PROPERTY_NONE',
            multiple: findEdge?.data.multiple == 'MULTIPLE_NONE' ? 'MULTIPLE_CHOICE' : findEdge?.data.multiple,
            sequence: findEdge?.data.sequence,
            direction: findSourceEdge.direction,
            nextStep: {
              id: connect.target,
              name: findTargetNode?.data.label
            },
            nextDirection: findTargetEdge?.direction
          }
        };
        console.log('addStatus', addStatus);
        newLabel = addStatus.status.name;
        mutationAddStatus(addStatus);
      } else {
        const updateStatus = {
          id: processId,
          stepId: connect.source,
          status: {
            id: connect.sourceHandle,
            nextStep: {
              id: connect.target,
              name: findTargetNode?.data.label
            },
            nextDirection: findTargetEdge?.direction
          }
        };
        console.log('updateStatus', updateStatus);
        mutationUpdateStatus(updateStatus);
      }
      if (!statusUpdateLoading && !statusAddLoading) {
        let newConnect = {
          ...connect,
          ...getEdgeStyle({
            label: newLabel,
            property: findEdge?.data.property,
            multiple: findEdge?.data.multiple,
            direction: findSourceEdge.direction
          })
        };

        setEdges((eds) => addEdge(newConnect, eds));
      }
    },
    [reactFlowInstance, statusUpdateLoading, statusAddLoading]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const {
    mAddStep: { mutate: mutationAddStep, isLoading: addStepLoading },
    mUpdateStep: { mutate: mutationUpdateStep, isLoading: updateStepLoading }
  } = useStepMutation(processId!!, undefined, false);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });

      // node 유형별로 sources, targets 정의
      const newNodeProperty = NodeBasicProperty(type);
      const typeIndex = type.lastIndexOf('Back');
      let newNode = {
        id: uuidv4(),
        type: typeIndex == -1 ? type : type.substring(0, typeIndex),
        position,
        data: {
          label: newNodeProperty.name,
          method: newNodeProperty.setting ? newNodeProperty.setting.method : 'ACTION_METHOD_NONE',
          shape: newNodeProperty.shape,
          sources: [] as Position[],
          targets: [] as Position[],
          deleteNode
        }
      };

      if (newNode.data.shape == 'SHAPE_FORWARD') {
        newNode.data.sources = [
          {
            id: uuidv4(),
            direction: 'DIRECTION_FORWARD_OUTGOING_RIGHT'
          }
        ];
        newNode.data.targets = [
          {
            id: uuidv4(),
            direction: 'DIRECTION_FORWARD_INCOMING_LEFT'
          }
        ];
        if (newNodeProperty.type == 'TYPE_CRITERIA') {
          newNode.data.sources = [
            ...newNode.data.sources,
            {
              id: uuidv4(),
              direction: 'DIRECTION_FORWARD_OUTGOING_BOTTOM'
            }
          ];
        }
      } else {
        newNode.data.sources = [
          {
            id: uuidv4(),
            direction: 'DIRECTION_BACKWARD_OUTGOING_LEFT'
          }
        ];
        newNode.data.targets = [
          {
            id: uuidv4(),
            direction:
              newNodeProperty.type == 'TYPE_WAIT' ||
              newNodeProperty.type == 'TYPE_CHECKLIST' ||
              newNodeProperty.type == 'TYPE_SIMPLE_ACTION' ||
              newNodeProperty.type == 'TYPE_STATUS'
                ? 'DIRECTION_BACKWARD_INCOMING_RIGHT'
                : 'DIRECTION_BACKWARD_INCOMING_TOP'
          }
        ];
        if (newNodeProperty.type == 'TYPE_CRITERIA') {
          newNode.data.sources = [
            ...newNode.data.sources,
            {
              id: uuidv4(),
              direction: 'DIRECTION_BACKWARD_OUTGOING_BOTTOM'
            }
          ];
        }
      }
      console.log('newNode', newNode);

      const statuses = newNode.data.sources.concat(newNode.data.targets).map((source: Position) => {
        const newEdge = EdgeBasicProperty(type, source.direction);
        return {
          id: source.id,
          button: newEdge.button,
          name: newEdge.name,
          direction: source.direction,
          property: newEdge.property,
          view: newEdge.view,
          event: newEdge.event,
          multiple: newEdge.multiple,
          // primary: false,
          sequence: newEdge.sequence
        };
      });

      const addData = {
        id: processId,
        step: {
          id: newNode.id,
          name: newNode.data.label,
          description: newNode.data.label,
          meta: {
            axis: position
          },
          shape: newNode.data.shape,
          type: newNodeProperty.type,
          property: newNodeProperty.property,
          statuses: statuses
        }
      } as Record<string, any>;

      if (newNodeProperty.type == 'TYPE_ACTION') {
        addData.step.setting = newNodeProperty.setting;
        addData.step.action = {
          duration: {
            time: 1,
            unit: 'UNIT_DAY'
          },
          method: 'ACTION_METHOD_MANUAL',
          sendEmail: false
        };
      }

      const checkStage = diagrams.stages.find((stage) => stage.axisX > position.x);
      if (checkStage) {
        addData.step.stage = {
          id: checkStage.id,
          name: checkStage.name
        };
      }

      console.log('step addData', addData);
      mutationAddStep(addData);

      if (!addStepLoading) {
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, diagrams.stages, addStepLoading]
  );

  const onNodeDragStart = (event: MouseEvent, node: Node) => {
    event.preventDefault();
    console.log('drag start', node);
  };

  const onNodeDragStop = (event: MouseEvent, node: Node, nodes: Node[]) => {
    console.log('drag stop', node);
    event.preventDefault();
    if (node.data.position.x != node.position.x || node.data.position.y != node.position.y) {
      mutationUpdateStep({
        id: processId,
        step: {
          id: node.id,
          meta: {
            axis: node.position
          }
        }
      });
    }
  };

  return {
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
  };
};
