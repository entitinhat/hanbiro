import { Edge, Node, ShapeType } from '@process/types/diagram';
import _ from 'lodash';

type EdgeActionProps = {
  node: Node;
  stepHelper: any;
};

export default function EdgeAction(props: EdgeActionProps) {
  const {
    stepHelper,
    node: { shape: nodeShape, position, edges }
  } = props;
  let parallelId: string | undefined = '';
  let multipleCount = 0;
  let height = 0;

  return edges?.map((edge: Edge) => {
    let edgePosition = _.clone(position);
    let shape: ShapeType = 'SHAPE_NONE';
    let multipleOrder = 0;

    if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_JUMP') {
      return edge;
    } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
      edgePosition.x += 260;
      edgePosition.y += 40;
      if (edge.multiple == 'MULTIPLE_CHOICE' || edge.multiple == 'MULTIPLE_PARALLEL' || edge.multiple == 'MULTIPLE_ANY') {
        if (multipleCount > 0) {
          if (parallelId) {
            // yMaxAxis is 0 : There is no split in that way
            // 250 : split height
            const yMaxAxis = stepHelper.forwardDepthMultiple(parallelId);
            height += yMaxAxis + 250;
          } else {
            height += 250;
          }
          edgePosition.y += height;
        }
        parallelId = edge.target;
        multipleCount += 1;
        multipleOrder = multipleCount;
      }
      if (nodeShape == 'SHAPE_BACKWARD') {
        shape = 'SHAPE_BACKWARD';
      } else {
        shape = 'SHAPE_FORWARD';
      }
    } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_MIDDLE') {
      // 80 : backward step width
      // 15 : spare width
      edgePosition.x += 95;
      // 28 : arrow height
      // 80 : step height
      edgePosition.y += 80 + 28;
      shape = 'SHAPE_MIDDLE';
    } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
      // 70 : arrow height
      // 80 : step height
      edgePosition.y += 80 + 70;
      shape = 'SHAPE_BACKWARD';
    } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_PROCESS') {
      // 60 : half width of action step
      // 50 : arrow width
      // 11 : arrow head width
      edgePosition.x += 60 + 50 + 11;
      // 40 : distance from edge to arrow
      // 15 : half height process step
      // 3 : half of arrow height
      edgePosition.y += -40 - 15 + 3;
      shape = 'SHAPE_FORWARD';
    } else {
      return edge;
    }
    return {
      ...edge,
      ...{ shape: shape, position: edgePosition, height: height, multipleOrder: multipleOrder }
    };
  });
}
