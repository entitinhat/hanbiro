import { Handle, MarkerType, Position } from 'reactflow';
import { Direction, MultipleType, NodeData, NodeType } from '@process/types/diagram';
import { PropertyType } from '../../../types/process';
import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

export const MakeEdge = (data: NodeData) => {
  return (
    <>
      {data?.sources &&
        data.sources.map((e: any) => {
          let styles: Record<string, any> = {};
          if (e.direction == 'DIRECTION_FORWARD_OUTGOING_MIDDLE' || e.direction == 'DIRECTION_BACKWARD_OUTGOING_MIDDLE') {
            styles.left = 118;
          }
          return (
            <Handle key={e.id} type={'source'} id={e.id} position={GetNodePosition(e.direction)} style={styles} className="outgoing" />
          );
        })}

      {data?.targets &&
        data.targets.map((e: any) => {
          let styles: Record<string, any> = {};
          if (data.type == 'TYPE_GROUP') {
            styles.top = 40;
          }
          return (
            <Handle key={e.id} type={'target'} id={e.id} position={GetNodePosition(e.direction)} style={styles} className="incoming" />
          );
        })}
    </>
  );
};

export const GetNodeType = (type: NodeType): string => {
  switch (type) {
    case 'TYPE_ACTION':
      return 'nodeAction';
    case 'TYPE_SIMPLE_ACTION':
      return 'nodeSimple';
    case 'TYPE_CRITERIA':
      return 'nodeCriteria';
    case 'TYPE_WAIT':
      return 'nodeWait';
    case 'TYPE_SITE':
      return 'nodeSite';
    case 'TYPE_CHECKLIST':
      return 'nodeChecklist';
    case 'TYPE_STATUS':
      return 'nodeStatus';
    case 'TYPE_GROUP':
      return 'nodeGroup';
    case 'TYPE_PROCESS':
      return 'nodeProcess';
    case 'TYPE_CLOSE':
      return 'nodeClose';
    default:
      return 'nodeAction';
  }
};

export const GetNodePosition = (direction: Direction): Position => {
  switch (direction) {
    case 'DIRECTION_FORWARD_OUTGOING_PROCESS':
      return Position.Top;
    case 'DIRECTION_FORWARD_OUTGOING_JUMP':
      return Position.Top;
    case 'DIRECTION_FORWARD_INCOMING_LEFT':
      return Position.Left;
    case 'DIRECTION_FORWARD_OUTGOING_RIGHT':
      return Position.Right;
    case 'DIRECTION_FORWARD_OUTGOING_MIDDLE':
      return Position.Bottom;
    case 'DIRECTION_BACKWARD_OUTGOING_MIDDLE':
      return Position.Bottom;
    case 'DIRECTION_FORWARD_OUTGOING_BOTTOM':
      return Position.Bottom;
    case 'DIRECTION_FORWARD_OUTGOING_TOP':
      return Position.Top;
    case 'DIRECTION_BACKWARD_INCOMING_LEFT':
      return Position.Left;
    case 'DIRECTION_BACKWARD_INCOMING_RIGHT':
      return Position.Right;
    case 'DIRECTION_BACKWARD_OUTGOING_BOTTOM':
      return Position.Bottom;
    case 'DIRECTION_BACKWARD_INCOMING_TOP':
      return Position.Top;
    case 'DIRECTION_BACKWARD_OUTGOING_LEFT':
      return Position.Left;
    case 'DIRECTION_BACKWARD_OUTGOING_RIGHT':
      return Position.Right;
    default:
      return Position.Left;
  }
};

export const CheckAnimated = (direction: Direction): boolean => {
  switch (direction) {
    case 'DIRECTION_FORWARD_OUTGOING_PROCESS':
      return false;
    case 'DIRECTION_FORWARD_OUTGOING_JUMP':
      return false;
    case 'DIRECTION_FORWARD_OUTGOING_RIGHT':
      return false;
    case 'DIRECTION_FORWARD_OUTGOING_MIDDLE':
      return true;
    case 'DIRECTION_FORWARD_OUTGOING_BOTTOM':
      return true;
    case 'DIRECTION_FORWARD_OUTGOING_TOP':
      return false;
    case 'DIRECTION_BACKWARD_OUTGOING_BOTTOM':
      return true;
    case 'DIRECTION_BACKWARD_OUTGOING_MIDDLE':
      return true;
    case 'DIRECTION_BACKWARD_OUTGOING_LEFT':
      return true;
    case 'DIRECTION_BACKWARD_OUTGOING_RIGHT':
      return true;
    default:
      return false;
  }
};

export const CheckArrowType = (property?: PropertyType) => {
  if (property) {
    if (
      property == 'PROPERTY_COMPLETED' ||
      property == 'PROPERTY_CANCELED' ||
      property == 'PROPERTY_CLOSED' ||
      property == 'PROPERTY_DELETED' ||
      property == 'PROPERTY_MERGED' ||
      property == 'PROPERTY_DENIED' ||
      property == 'PROPERTY_LOST' ||
      property == 'PROPERTY_WON'
    ) {
      return MarkerType.ArrowClosed;
    }
  }
  return MarkerType.Arrow;
};

export const useShowActionEvent = () => {
  const actionRef = useRef<any>(null);
  const [showAction, setShowAction] = useState(false);
  const onShowAction = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setShowAction((old) => !old);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    e.preventDefault();
    // console.log('clicked outside', event.target);
    if (actionRef && !actionRef?.current?.contains(event?.target)) {
      setShowAction(false);
    }
  };

  useOnClickOutside(actionRef, handleClickOutside);

  return {
    showAction,
    onShowAction,
    actionRef
  };
};

type NodeBasicProperty = {
  shape: string;
  property: string;
  name: string;
  type: string;
  setting?: {
    method: string;
    email: boolean;
    template: boolean;
    assign: boolean;
    due: boolean;
  };
};

export const NodeBasicProperty = (nodeType: string): NodeBasicProperty => {
  const commonFields = {
    shape: nodeType.indexOf('Back') == -1 ? 'SHAPE_FORWARD' : 'SHAPE_BACKWARD',
    property: 'PROPERTY_LINK'
  };
  switch (nodeType) {
    case 'nodeActionBack':
    case 'nodeAction':
      return {
        ...commonFields,
        name: 'New Action',
        type: 'TYPE_ACTION',
        setting: {
          method: 'ACTION_METHOD_MANUAL',
          email: true,
          template: true,
          assign: true,
          due: true
        }
      };
    case 'nodeCriteriaBack':
    case 'nodeCriteria':
      return {
        ...commonFields,
        name: 'New Criteria',
        type: 'TYPE_CRITERIA'
      };
    case 'nodeWaitBack':
    case 'nodeWait':
      return {
        ...commonFields,
        name: 'New Wait',
        type: 'TYPE_WAIT'
      };
    case 'nodeChecklistBack':
    case 'nodeChecklist':
      return {
        ...commonFields,
        name: 'New Checklist',
        type: 'TYPE_CHECKLIST'
      };
    case 'nodeStatusBack':
    case 'nodeStatus':
      return {
        ...commonFields,
        name: 'New Status',
        type: 'TYPE_STATUS'
      };
    case 'nodeSimpleBack':
    case 'nodeSimple':
      return {
        ...commonFields,
        name: 'New Simple Action',
        type: 'TYPE_SIMPLE_ACTION'
      };
    case 'nodeSiteBack':
    case 'nodeSite':
      return {
        ...commonFields,
        name: 'New Site',
        type: 'TYPE_Site'
      };
    case 'nodeProcess':
      return {
        ...commonFields,
        name: 'New Other Process',
        type: 'TYPE_PROCESS'
      };
    case 'nodeClose':
      return {
        ...commonFields,
        name: 'New Close',
        type: 'TYPE_CLOSE'
      };
    default:
      return {
        ...commonFields,
        name: 'New Action',
        type: 'TYPE_ACTION',
        setting: {
          method: 'ACTION_METHOD_MANUAL',
          email: true,
          template: true,
          assign: true,
          due: true
        }
      };
  }
};

export const EdgeBasicProperty = (nodeType: string, direction: string) => {
  if (
    direction == 'DIRECTION_FORWARD_INCOMING_LEFT' ||
    direction == 'DIRECTION_BACKWARD_INCOMING_TOP' ||
    direction == 'DIRECTION_BACKWARD_INCOMING_LEFT'
  ) {
    return {
      name: '-',
      button: '-',
      property: 'PROPERTY_TODO',
      event: 'EVENT_DISABLE',
      view: 'VIEW_DISABLE',
      multiple: 'MULTIPLE_NONE',
      sequence: [0]
    };
  } else if (direction == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
    return {
      name: 'New Label2',
      button: 'New Button2',
      property: 'PROPERTY_NONE',
      event: 'EVENT_CLICK',
      view: 'VIEW_SINGLE',
      multiple: 'MULTIPLE_NONE',
      sequence: [1]
    };
  } else {
    // DIRECTION_FORWARD_OUTGOING_RIIGHT
    return {
      name: 'New Label',
      button: 'New Button',
      property: 'PROPERTY_DISABLE',
      event: 'EVENT_CLICK',
      view: 'VIEW_SINGLE',
      multiple: 'MULTIPLE_NONE',
      sequence: [1]
    };
  }
};

type EdgeStyleProps = {
  direction?: Direction;
  label?: string;
  multiple?: MultipleType;
  property?: PropertyType;
};

export const getEdgeStyle = (props: EdgeStyleProps) => {
  const { direction, label, multiple, property } = props;
  const animated = direction ? CheckAnimated(direction) : false;
  const edgeStyle = {
    animated,
    style: { strokeWidth: 2, stroke: animated ? '#f6ab6c' : '#b1b1b7' },
    markerEnd: {
      type: CheckArrowType(property),
      color: animated ? '#f6ab6c' : '#b1b1b7'
    }
  } as Record<string, any>;

  if (label && label != '-') {
    edgeStyle.label = label;
    edgeStyle.labelStyle = { fontSize: '12px' };
    edgeStyle.labelBgBorderRadius = 4;
    edgeStyle.labelBgStyle = { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 };
    edgeStyle.labelBgPadding = [8, 4] as [number, number];
  }

  if (multiple) {
    if (multiple == 'MULTIPLE_PARALLEL') {
      edgeStyle.style = { ...edgeStyle.style, stroke: '#ff0072' };
    }
  }
  return edgeStyle;
};
