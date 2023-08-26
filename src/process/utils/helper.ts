import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Edge, Node, NodeEdge, NodeType, Direction, NewStep, SourceStep, Axis } from '@process/types/diagram';
import { StatusForm, BusinessStatus } from '@process/types/process';
import {
  PROCESS_STATUS_DIRECTIONS_SORT,
  PROCESS_STATUS_DIRECTIONS_VIEW,
  PROCESS_STATUS_EVENTS_VIEW,
  PROCESS_STATUS_PROPERTIES_VIEW,
  PROCESS_STATUS_VIEWS_VIEW
} from '../config/constants';

export const getAxisStep = (nodeEdges: NodeEdge, sourceStep: SourceStep, stepType: NodeType) => {
  let axis: Axis = _.clone(sourceStep.position);

  // if (
  //   sourceStep.direction == 'DIRECTION_FORWARD_OUTGOING_RIGHT' &&
  //   sourceStep.type == 'TYPE_SIMPLE_ACTION'
  // ) {
  //   const simpleSteps = checkStep(nodeEdges).backwardStep(
  //     sourceStep.id,
  //     sourceStep.type,
  //     'DIRECTION_FORWARD_OUTGOING_BOTTOM',
  //     false,
  //   );
  //   // // console.log('simpleSteps', simpleSteps);
  //   const lastOne = simpleSteps[simpleSteps.length - 1];
  //   // console.log('lastone', lastOne);
  //   if (lastOne) {
  //     if (lastOne.type == 'TYPE_ACTION') {
  //       axis.y = lastOne.position.y + 40;
  //     } else if (lastOne.type == 'TYPE_SIMPLE_ACTION') {
  //       axis.y = lastOne.position.y + 15;
  //     }
  //   }
  // }
  if (sourceStep.direction == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
    if (sourceStep.multiple != 'MULTIPLE_NONE' && !sourceStep.primary) {
      if (stepType == 'TYPE_SIMPLE_ACTION') {
        axis.y -= 18;
      } else if (stepType == 'TYPE_CRITERIA' || stepType == 'TYPE_WAIT') {
        axis.y -= 63;
      } else if (stepType == 'TYPE_SITE' || stepType == 'TYPE_CHECKLIST') {
        axis.y -= 40;
      } else {
        if (sourceStep.shape == 'SHAPE_FORWARD') {
          axis.y -= 43;
        } else {
          axis.y -= 18;
        }
      }
    } else {
      if (stepType == 'TYPE_SIMPLE_ACTION') {
        axis.y -= 15;
      } else if (stepType == 'TYPE_CRITERIA' || stepType == 'TYPE_WAIT') {
        axis.y -= 59;
      } else if (stepType == 'TYPE_SITE' || stepType == 'TYPE_CHECKLIST') {
        axis.y -= 39;
      } else {
        if (sourceStep.shape == 'SHAPE_FORWARD') {
          axis.y -= 39;
        } else {
          axis.y -= 16;
        }
      }
    }
  } else if (sourceStep.direction == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
  }

  return axis;
};

export const getSaveStep = (nodeEdges: NodeEdge, sourceStep: SourceStep, stepType: NodeType) => {
  // source : position x/y
  let step: NewStep = {
    meta: {
      axis: _.clone(sourceStep.position)
    },
    shape: _.clone(sourceStep.shape)
  };

  if (sourceStep.direction == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
    step.shape = 'SHAPE_BACKWARD';
  } else if (sourceStep.direction == 'DIRECTION_FORWARD_OUTGOING_MIDDLE') {
    step.shape = 'SHAPE_MIDDLE';
  } else if (sourceStep.direction == 'DIRECTION_FORWARD_OUTGOING_JUMP') {
  } else if (sourceStep.direction == 'DIRECTION_FORWARD_OUTGOING_PROCESS') {
  } else if (sourceStep.direction == 'DIRECTION_BACKWARD_OUTGOING_BOTTOM') {
    if (stepType != 'TYPE_SIMPLE_ACTION') {
      step.shape = 'SHAPE_BACKWARD';
    }
  } else if (sourceStep.direction == 'DIRECTION_BACKWARD_OUTGOING_RIGHT') {
    step.shape = 'SHAPE_BACKWARD';
  } else {
    // DIRECTION_FORWARD_OUTGOING_RIGHT
    if (sourceStep.type == 'TYPE_ACTION') {
      if (stepType == 'TYPE_SIMPLE_ACTION') {
        step.meta.axis.y += 25;
      } else if (stepType == 'TYPE_CRITERIA') {
        step.meta.axis.y -= 20;
      } else if (stepType == 'TYPE_WAIT') {
      } else if (stepType == 'TYPE_SITE') {
      } else if (stepType == 'TYPE_CHECKLIST') {
      } else if (stepType == 'TYPE_ACTION' && sourceStep.multiple != 'MULTIPLE_NONE' && !sourceStep.primary) {
        step.meta.axis.y -= 3;
      }
    } else if (sourceStep.type == 'TYPE_SIMPLE_ACTION') {
      const simpleSteps = checkStep(nodeEdges).backwardStep(sourceStep.id, sourceStep.type, 'DIRECTION_FORWARD_OUTGOING_BOTTOM', false);
      // // console.log('simpleSteps', simpleSteps);
      const lastOne = simpleSteps[simpleSteps.length - 1];
      if (lastOne) {
        step.shape = lastOne.shape;
        // step.meta.axis.x += 185;
        // console.log('lastone', lastOne);
        // console.log('stepType', stepType);
        if (lastOne.type == 'TYPE_ACTION') {
          if (stepType == 'TYPE_ACTION') {
            step.meta.axis.y = lastOne.position.y;
          } else if (stepType == 'TYPE_SITE') {
          } else if (stepType == 'TYPE_WAIT') {
          } else if (stepType == 'TYPE_CHECKLIST') {
          } else if (stepType == 'TYPE_CRITERIA') {
          } else {
          }
        } else if (lastOne.type == 'TYPE_SITE') {
          if (stepType == 'TYPE_ACTION') {
          } else if (stepType == 'TYPE_SITE') {
          } else if (stepType == 'TYPE_WAIT') {
          } else if (stepType == 'TYPE_CHECKLIST') {
          } else if (stepType == 'TYPE_CRITERIA') {
          } else {
          }
        } else if (lastOne.type == 'TYPE_WAIT') {
          if (stepType == 'TYPE_ACTION') {
          } else if (stepType == 'TYPE_SITE') {
          } else if (stepType == 'TYPE_WAIT') {
          } else if (stepType == 'TYPE_CHECKLIST') {
          } else if (stepType == 'TYPE_CRITERIA') {
          } else {
          }
        } else if (lastOne.type == 'TYPE_CHECKLIST') {
          if (stepType == 'TYPE_ACTION') {
          } else if (stepType == 'TYPE_SITE') {
          } else if (stepType == 'TYPE_WAIT') {
          } else if (stepType == 'TYPE_CHECKLIST') {
          } else if (stepType == 'TYPE_CRITERIA') {
          } else {
          }
        } else if (lastOne.type == 'TYPE_CRITERIA') {
          if (stepType == 'TYPE_ACTION') {
          } else if (stepType == 'TYPE_SITE') {
          } else if (stepType == 'TYPE_WAIT') {
          } else if (stepType == 'TYPE_CHECKLIST') {
          } else if (stepType == 'TYPE_CRITERIA') {
          } else {
          }
        } else {
          // TYPE_SIMPLE_ACTION
          if (stepType == 'TYPE_ACTION') {
            step.meta.axis.y = lastOne.position.y - 25;
          } else if (stepType == 'TYPE_SITE') {
          } else if (stepType == 'TYPE_WAIT') {
          } else if (stepType == 'TYPE_CHECKLIST') {
          } else if (stepType == 'TYPE_CRITERIA') {
          } else {
          }
        }
      } else {
        if (stepType == 'TYPE_SIMPLE_ACTION') {
        }
      }
    } else if (sourceStep.type == 'TYPE_CHECKLIST') {
      if (stepType == 'TYPE_ACTION') {
      } else if (stepType == 'TYPE_SITE') {
      } else if (stepType == 'TYPE_SIMPLE_ACTION') {
        step.meta.axis.y += 25;
      } else if (stepType == 'TYPE_CRITERIA') {
        step.meta.axis.y -= 20;
      } else if (stepType == 'TYPE_WAIT') {
        step.meta.axis.y -= 20;
      }
    } else if (sourceStep.type == 'TYPE_WAIT') {
      if (stepType == 'TYPE_ACTION') {
        step.meta.axis.y += 20;
      } else if (stepType == 'TYPE_CHECKLIST') {
        step.meta.axis.y += 20;
      } else if (stepType == 'TYPE_SIMPLE_ACTION') {
        step.meta.axis.y += 45;
      } else if (stepType == 'TYPE_CRITERIA') {
      } else if (stepType == 'TYPE_SITE') {
        step.meta.axis.y += 20;
      }
    } else if (sourceStep.type == 'TYPE_SITE') {
      if (stepType == 'TYPE_ACTION') {
      } else if (stepType == 'TYPE_CHECKLIST') {
      } else if (stepType == 'TYPE_SIMPLE_ACTION') {
        step.meta.axis.y += 25;
      } else if (stepType == 'TYPE_CRITERIA') {
        step.meta.axis.y -= 20;
      } else if (stepType == 'TYPE_WAIT') {
        step.meta.axis.y -= 20;
      }
    } else if (sourceStep.type == 'TYPE_CRITERIA') {
      if (stepType == 'TYPE_ACTION') {
        step.meta.axis.y += 20;
      } else if (stepType == 'TYPE_CHECKLIST') {
        step.meta.axis.y += 20;
      } else if (stepType == 'TYPE_SIMPLE_ACTION') {
        step.meta.axis.y += 45;
      } else if (stepType == 'TYPE_SITE') {
        step.meta.axis.y += 20;
      } else if (stepType == 'TYPE_WAIT') {
      }
    }
  }

  return step;
};

export const makeEdges = (nodes: NodeEdge) => {
  let edges: Edge[] = [];
  for (const [key, value] of Object.entries(nodes)) {
    if (value.edges) {
      edges = [...edges, ...value.edges];
    }
  }
  return edges;
};

export const checkStep = (nodeEdges: NodeEdge) => {
  const edgesValue = makeEdges(nodeEdges);

  return {
    backwardMultiple,
    forwardMultiple,
    backwardStep,
    forwardStep,
    steps,
    forwardDepthMultiple,
    findPrimary
  };

  function findPrimary(node: Node) {
    return node.edges.find((el) => el.primary);
  }

  function backwardMultiple(sourceId: string): Node[] {
    let nodes: Node[] = [];
    for (const edge of edgesValue) {
      if (edge.target == sourceId) {
        if (!edge.primary) {
          nodes.push(nodeEdges[edge.source]);
        }
        if (!(edge.multiple == 'MULTIPLE_CHOICE' || edge.multiple == 'MULTIPLE_PARALLEL' || edge.multiple == 'MULTIPLE_ANY')) {
          nodes = [...nodes, ...backwardMultiple(edge.source)];
        }
      }
    }
    return nodes;
  }

  function forwardMultiple(targetId: string): Node[] {
    let nodes: Node[] = [];
    for (const edge of edgesValue) {
      if (
        edge.source == targetId &&
        (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT' || edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM')
      ) {
        // console.log('nodes edge', nodeEdges[edge.source]);
        nodes.push(nodeEdges[edge.source]);
        // console.log('multiple edge', edge);
        if (edge.target && edge.multiple == 'MULTIPLE_NONE') {
          nodes = [...nodes, ...forwardMultiple(edge.target)];
        }
      }
    }
    return nodes;
  }

  // can split : action step and forward direction
  function steps(sourceId: string): Node[] {
    let nodes: Node[] = [];
    const position = nodeEdges[sourceId].position;
    for (const edge of edgesValue) {
      if (edge.multiple == 'MULTIPLE_CHOICE' || edge.multiple == 'MULTIPLE_PARALLEL' || edge.multiple == 'MULTIPLE_ANY') {
        const sourceNode = nodeEdges[edge.source];
        // // console.log('sourceNode', sourceNode);
        if (edge.target && sourceNode.position.y >= position.y) {
          const targetNode = nodeEdges[edge.target];
          // // console.log('edges', edge);
          // // console.log('targetNode', targetNode);
          if (targetNode.position.y > position.y && targetNode.type != 'TYPE_SIMPLE_ACTION') {
            nodes.push(targetNode);
            nodes = [...nodes, ...forwardMultiple(targetNode.id)];
          }
        }
      }
    }
    return nodes;
  }

  function edges(sourceId: string) {
    let yAxis = 0;
    const sourceNode = nodeEdges[sourceId];
    for (const edge of sourceNode.edges) {
      if (
        edge.target &&
        (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT' || edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM')
      ) {
        const targetNode = nodeEdges[edge.target];
        yAxis = targetNode.position.y;
        const targetY = edges(targetNode.id);
        if (targetY > yAxis) {
          yAxis = targetY;
        }
      }
    }
    return yAxis;
  }

  // function edges(sourceId: string, edgeId: string) {
  //   let splitCount = 0;
  //   const sourceNode = nodeEdges[sourceId];
  //   let yAxis = sourceNode.position.y + 40;
  //   for (const edge of sourceNode.edges) {
  //     if (
  //       edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT' ||
  //       edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM'
  //     ) {
  //       if (edge.target) {
  //         const targetNode = nodeEdges[edge.target];
  //         if (targetNode) {
  //           yAxis = targetNode.position.y;
  //           const targetY = edges(targetNode.id, edge.id);
  //           if (targetY > yAxis) {
  //             yAxis = targetY;
  //           }
  //         }
  //       }
  //       // } else {
  //       //   if (edgeId != edge.id) {
  //       //     if (edge.split == 'MULTIPLE_CHOICE' || edge.split == 'MULTIPLE_PARALLEL') {
  //       //       yAxis += splitCount * 210;
  //       //       splitCount += 1;
  //       //     }
  //       //   }
  //       // }
  //     }
  //   }
  //   return yAxis;
  // }

  function forwardDepthMultiple(sourceId: string) {
    let splitCount = 0;
    let yAxis = 0;
    const sourceNode = nodeEdges[sourceId];
    // // console.log('sourceNode', sourceNode);
    if (sourceNode && sourceNode.edges) {
      for (const edge of sourceNode.edges) {
        if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT' || edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
          if (edge.multiple == 'MULTIPLE_CHOICE' || edge.multiple == 'MULTIPLE_PARALLEL' || edge.multiple == 'MULTIPLE_ANY') {
            // // console.log('splitedges', edge);
            // // console.log('splitcount', splitCount);
            yAxis += splitCount > 0 ? 250 : 0;
            splitCount += 1;
            // // console.log('Yaxis', yAxis);
          }

          if (edge.target) {
            const targetNode = nodeEdges[edge.target];
            if (targetNode) {
              const targetY = forwardDepthMultiple(targetNode.id);
              yAxis += targetY;
            }
          }
        }
      }
    }
    return yAxis;
  }

  function backwardStep(sourceId: string, type: NodeType, direction?: Direction, includeLast = true): Node[] {
    let nodes: Node[] = [];
    for (const edge of edgesValue) {
      if (edge.target == sourceId) {
        const node = nodeEdges[edge.source];
        if (direction && edge.sourceDirection !== direction) {
          if (includeLast) {
            nodes.push(node);
          }
          continue;
        }
        if (includeLast) {
          nodes.push(node);
        }
        if (node.type == type) {
          if (!includeLast) {
            nodes.push(node);
          }
          nodes = [...nodes, ...backwardStep(edge.source, type, direction, includeLast)];
        }
      }
    }
    return nodes;
  }

  function forwardStep(targetId: string, type: NodeType): Node[] {
    let nodes: Node[] = [];
    for (const edge of edgesValue) {
      const node = nodeEdges[edge.source];
      if (edge.source == targetId && node.type == type) {
        nodes.push(node);
        if (edge.target) {
          nodes = [...nodes, ...forwardStep(edge.target, type)];
        }
      }
    }

    return nodes;
  }
};

export const parallelCount = (statuses: StatusForm[]) => {
  let count = 0;
  for (const status of statuses) {
    if (status.direction.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT' && status.multiple == 'MULTIPLE_PARALLEL') {
      count++;
    }
  }
  return count;
};

export const checkSequence = (data: string[]) => {
  if (data.length == 0) return false;
  let start = Number(data[0]);
  for (let i = 0; i < data.length; i++) {
    const val = Number(data[i]);
    if (i == 0) {
      if (start != val) {
        return false;
      }
    } else {
      const second = Number(start) + 0.5;
      const first = Number(start) + 1;
      if (val != first && val != second) {
        return false;
      }
    }
    start = val;
  }
  return true;
};

export const getCriteriaBlock = (str: string) => {
  let token: string[] = [];
  const first = str.indexOf('(');
  const last = str.indexOf(')');
  // console.log(str, first, last);
  const block = str.substring(first + 1, last);
  const next = str.substring(last + 1);
  // console.log('next', next);
  if (block) {
    token.push(block.trim());
    const first2 = next.indexOf('(');
    const separator = next.substring(0, first2);
    // console.log('separator', separator);
    if (separator) {
      token.push(separator.trim());
    }
    if (next) {
      token = [...token, ...getCriteriaBlock(next)];
    }
  } else {
    token.push(str.trim());
  }
  return token;
};

// function getCriteriaBlock(str: string) {
//   let token: string[] = [];
//   const first = str.indexOf('(');
//   const last = str.lastIndexOf(')');
//   // console.log(str, first, last);
//   const next = str.substring(first + 1, last);
//   if (next) {
//     const nextFirst = next.indexOf('(');
//     const nextLast = next.lastIndexOf(')');
//     if (nextFirst != -1) {
//       if (nextFirst > 0) {
//         token.push(next.substring(0, nextFirst).trim());
//       }
//       const toss = next.substring(nextFirst - 1, nextLast + 1);
//       token = [...token, ...getCriteriaBlock(toss)];
//       if (nextLast < last) {
//         token.push(next.substring(nextLast + 1, last).trim());
//       }
//     } else {
//       token.push(next.trim());
//     }
//   }
//   return token;
// }

export const getStepStatuses = (stepType: NodeType, statuses?: BusinessStatus[]) => {
  let statusForms: StatusForm[] = [];
  if (statuses) {
    for (const status of statuses) {
      let form: StatusForm = {
        id: status.id ?? uuidv4(),
        button: status.button,
        name: status.name,
        view: {
          keyName: status.view,
          languageKey: PROCESS_STATUS_VIEWS_VIEW[status.view]
        },
        event: {
          keyName: status.event,
          languageKey: PROCESS_STATUS_EVENTS_VIEW[status.event]
        },
        property: {
          keyName: status.property,
          languageKey: PROCESS_STATUS_PROPERTIES_VIEW[status.property]
        },
        direction: {
          keyName: status.direction,
          languageKey: PROCESS_STATUS_DIRECTIONS_VIEW[status.direction]
        },
        nextStep: { keyName: '', languageKey: '' },
        sequence: status.sequence ? status.sequence : ['0'],
        new: false,
        reset: false,
        definedId: status.definedId,
        order: PROCESS_STATUS_DIRECTIONS_SORT[status.direction],
        multiple: status.multiple,
        // primary: status.primary,
        ctaId: status.ctaId ?? '',
        flag: status.flag ?? 'FLAG_NONE'
      };

      if (status.options != '') {
        if (stepType == 'TYPE_CRITERIA') {
          form.criteria = JSON.parse(status.options!!);
        }
      }
      statusForms.push(form);
    }
  }
  return statusForms;
};

export const checkParallel = (status: StatusForm) =>
  status.direction.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT' && status.multiple == 'MULTIPLE_PARALLEL';
