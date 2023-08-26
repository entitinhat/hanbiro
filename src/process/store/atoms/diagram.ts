import { atom } from 'recoil';

import { OptionValue } from '@base/types/common';
import { ClosedOpenValue, NodeEdges, Stage, StageOpenValue } from '@process/types/diagram';
import { Node, Edge } from 'reactflow';

export const diagramDetailAtom = atom({
  key: 'diagramDetailAtom',
  default: false
});

// export const showStepActionAtom = atom({
//   key: 'showStepActionAtom',
//   default: {
//     id: '',
//     show: false
//   }
// });

// export const stageOpenAtom = atom<StageOpenValue>({
//   key: 'stageOpenAtom',
//   default: {
//     open: false,
//     edit: false,
//     sourceId: '',
//     stage: null
//   }
// });

export const stageAtom = atom<Stage[]>({
  key: 'stageAtom',
  default: []
});

export const nextStepAtom = atom<OptionValue[]>({
  key: 'nextStepAtom',
  default: []
});

export const nodeEdgesAtom = atom<NodeEdges>({
  key: 'nodeEdgesAtom',
  default: { others: {}, closed: {} }
});

// export const closedOpenAtom = atom<ClosedOpenValue>({
//   key: 'closedOpenAtom',
//   default: {
//     open: false,
//     edit: false,
//     sourceId: ''
//   }
// });

export const stepSettingAtom = atom({
  key: 'stepSettingAtom',
  default: {
    method: 'ACTION_METHOD_MANUAL',
    email: true,
    auto: false,
    cta: false,
    due: true,
    assign: true,
    template: false
  }
});

export const stepDoAtom = atom({
  key: 'stepDoAtom',
  default: 'ACTION_CUSTOM'
});

// export const nodesAtom = atom<Node[]>({
//   key: 'nodesAtom',
//   default: []
// });

// export const edgesAtom = atom<Edge[]>({
//   key: 'edgesAtom',
//   default: []
// });
