import { DiagramType } from '@process/containers/Diagram/DiagramSidebar';

import { ModuleType, PropertyType } from './process';

export type NodeType =
  | 'TYPE_NONE'
  | 'TYPE_SIMPLE_ACTION'
  | 'TYPE_ACTION'
  | 'TYPE_CRITERIA'
  | 'TYPE_WAIT'
  | 'TYPE_SITE'
  | 'TYPE_CHECKLIST'
  | 'TYPE_CLOSE'
  | 'TYPE_STATUS'
  | 'TYPE_GROUP'
  | 'TYPE_PROCESS';

export type Direction =
  | 'DIRECTION_NONE'
  | 'DIRECTION_STAYING'
  | 'DIRECTION_ACTION_STAYING'
  | 'DIRECTION_ACTION_INCOMING'
  | 'DIRECTION_GROUP_INCOMING'
  | 'DIRECTION_FORWARD_INCOMING_LEFT'
  | 'DIRECTION_FORWARD_OUTGOING_RIGHT'
  | 'DIRECTION_FORWARD_OUTGOING_BOTTOM'
  | 'DIRECTION_FORWARD_OUTGOING_TOP'
  | 'DIRECTION_FORWARD_OUTGOING_PROCESS'
  | 'DIRECTION_FORWARD_OUTGOING_JUMP'
  | 'DIRECTION_FORWARD_OUTGOING_MIDDLE'
  | 'DIRECTION_BACKWARD_INCOMING_LEFT'
  | 'DIRECTION_BACKWARD_INCOMING_RIGHT'
  | 'DIRECTION_BACKWARD_INCOMING_TOP'
  | 'DIRECTION_BACKWARD_OUTGOING_BOTTOM'
  | 'DIRECTION_BACKWARD_OUTGOING_LEFT'
  | 'DIRECTION_BACKWARD_OUTGOING_MIDDLE'
  | 'DIRECTION_BACKWARD_OUTGOING_RIGHT';

export type ShapeType = 'SHAPE_NONE' | 'SHAPE_FORWARD' | 'SHAPE_BACKWARD' | 'SHAPE_MIDDLE' | 'SHAPE_AUTO';

export type MethodType = 'ACTION_METHOD_MANUAL' | 'ACTION_METHOD_AUTO' | 'ACTION_METHOD_BOTH' | 'ACTION_METHOD_NONE';

export type MultipleType =
  | 'MULTIPLE_NONE'
  | 'MULTIPLE_CHOICE'
  | 'MULTIPLE_PARALLEL'
  | 'MULTIPLE_JOIN'
  | 'MULTIPLE_AND_JOIN'
  | 'MULTIPLE_ANY'
  | 'MULTIPLE_LINK';

export type TriggerType =
  | 'TRIGGER_TYPE_NONE'
  | 'TRIGGER_TYPE_RECORD_CREATED'
  | 'TRIGGER_TYPE_RECORD_UPDATED'
  | 'TRIGGER_TYPE_RECORD_CREATED_UPDATED'
  | 'TRIGGER_TYPE_RECORD_DELETED'
  | 'TRIGGER_TYPE_FIELD_UPDATED'
  | 'TRIGGER_TYPE_PROCESS_PROPERTY_UPDATED'
  | 'TRIGGER_TYPE_SCHEDULED_DATE_TIME';

export type NodeProperty = 'PROPERTY_START' | 'PROPERTY_LINK' | 'PROPERTY_CLOSE';
export type StageProperty = 'PROPERTY_NEW' | 'PROPERTY_LINK' | 'PROPERTY_CLOSE';
export type CriteriaValueType = 'VALUE_TYPE_NONE' | 'VALUE_TYPE_SELECT' | 'VALUE_TYPE_ENTER';

export type CriteriaOperator =
  | 'CRITERIA_OPERATOR_NONE'
  | 'CRITERIA_OPERATOR_EQUAL'
  | 'CRITERIA_OPERATOR_NOT_EQUAL'
  | 'CRITERIA_OPERATOR_LESS_THAN'
  | 'CRITERIA_OPERATOR_NOT_LESS_THAN'
  | 'CRITERIA_OPERATOR_LESS_THAN_EQUAL'
  | 'CRITERIA_OPERATOR_GREATER_THAN'
  | 'CRITERIA_OPERATOR_NOT_GREATER_THAN'
  | 'CRITERIA_OPERATOR_GREATER_THAN_EQUAL'
  | 'CRITERIA_OPERATOR_IS_EMPTY'
  | 'CRITERIA_OPERATOR_IS_NOT_EMPTY'
  | 'CRITERIA_OPERATOR_CONTAIN'
  | 'CRITERIA_OPERATOR_NOT_CONTAIN'
  | 'CRITERIA_OPERATOR_ON'
  | 'CRITERIA_OPERATOR_NOT_ON'
  | 'CRITERIA_OPERATOR_AFTER'
  | 'CRITERIA_OPERATOR_BEFORE'
  | 'CRITERIA_OPERATOR_BETWEEN'
  | 'CRITERIA_OPERATOR_THIS_ID'
  | 'CRITERIA_OPERATOR_RELATED_ID'
  | 'CRITERIA_OPERATOR_PROPERTY';

export type FieldType =
  | 'FIELD_TYPE_NONE'
  | 'FIELD_TYPE_NUMBER'
  | 'FIELD_TYPE_TEXT'
  | 'FIELD_TYPE_DATE'
  | 'FIELD_TYPE_SELECT'
  | 'FIELD_TYPE_PROCESS';

export type Axis = {
  x: number;
  y: number;
};

export interface NewStep {
  meta: {
    axis: Axis;
  };
  shape: ShapeType;
}

export interface Node {
  id: string;
  type: NodeType;
  data: {
    title?: string;
    tooltip?: string;
    label: string;
    method?: MethodType;
  };
  shape: ShapeType;
  className?: string;
  sourceDirection?: Direction[];
  targetDirection?: Direction[];
  position: Axis;
  property: NodeProperty;
  edges: Edge[];
}

export interface NodeEdge {
  [index: string]: Node;
}

export interface NodeEdges {
  others: NodeEdge;
  closed: NodeEdge;
}

export interface EdgeBase {
  id: string;
  label?: string;
  source: string;
  target: string;
  multiple?: MultipleType;
  primary: boolean;
  property?: PropertyType;
  sequence: string[];
  options?: string;
}

export interface Edge extends EdgeBase {
  sourceDirection: Direction;
  targetDirection: Direction;
  multipleOrder?: number;
  position: Axis;
  height?: number;
  shape: ShapeType;
}

export interface Stage {
  id: string;
  name: string;
  order: number;
  property: StageProperty | string;
  width: number;
  description: string;
  axisX: number;
}

export interface StageBar {
  id: string;
  name: string;
  steps:
    | {
        step: string;
        status: string;
      }[]
    | undefined;
  property: StageProperty;
}

export interface SourceStep {
  id: string;
  type: NodeType;
  direction: Direction;
  multiple: MultipleType;
  primary: boolean;
  position: Axis;
  shape: ShapeType;
}

// export interface ResultNode {
//   id: string;
//   type: NodeType;
//   label: string;
//   method: MethodType;
//   shape: ShapeType;
//   source: string[];
//   target: string[];
//   positionX: number;
//   positionY: number;
//   property: NodeProperty;
// }

export interface Position {
  id: string;
  direction: Direction;
}

export interface NodeData {
  id: string;
  type: NodeType;
  label: string;
  method?: MethodType;
  shape?: ShapeType;
  sources: Position[];
  targets: Position[];
  property: NodeProperty;
  axis: {
    x: number;
    y: number;
  };
  parent?: string;
}

export interface EdgeData extends EdgeBase {
  sourceDirection: Position;
  targetDirection: Position;
}

// export interface ResultEdge extends EdgeBase {
//   directionS: Direction;
//   directionT: Direction;
// }

// export interface ResultDiagram {
//   name: string;
//   stages: Stage[];
//   nodes: ResultNode[];
//   edges: ResultEdge[];
// }

export interface DiagramData {
  name: string;
  stages: Stage[];
  nodes: NodeData[];
  edges: EdgeData[];
}

export interface CriteriaModule {
  module: ModuleType;
  field: string;
  type: FieldType;
}

export interface CriteriaCondition {
  aSide: CriteriaModule;
  operator: CriteriaOperator;
  vType: CriteriaValueType;
  value?: string;
  bSide?: CriteriaModule;
}

export interface CriteriaBlock {
  conditions: CriteriaCondition[];
  pattern: string[]; // [and,or]
}

export interface CriteriaOption {
  blocks: CriteriaBlock[];
  pattern: string[]; // [and,or]
}
export interface StatusFormProperty {
  id?: string;
  button?: string;
  name?: string;
  view?: string;
  event?: string;
  property?: string;
  direction?: string;
  sequence?: string[];
  definedId?: string;
  newFlag?: boolean;
  resetFlag?: boolean;
  ctaId?: string;
  pageName?: string;
  multiple?: MultipleType;
}

export type CtaType = 'submit' | 'click' | 'download';

export interface CtaProperty {
  id: string;
  type: CtaType;
  button: string;
  title: string;
  page?: CtaProperty[];
}

export interface StepAddValue {
  open: boolean;
  edit: boolean;
  type: DiagramType;
  sourceId: string;
  data?: any;
  directionId?: string;
  multiple?: MultipleType;
  primary?: boolean;
  direction?: Direction;
  sourceType?: NodeType;
  position?: Axis;
  shape?: ShapeType;
}

export type StageOpenValue = {
  open: boolean;
  edit: boolean;
  sourceId: string;
  stage: Stage | null;
};

export type ClosedOpenValue = {
  open: boolean;
  edit: boolean;
  sourceId: string | null;
};
