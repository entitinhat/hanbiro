import { Edge, Node, ShapeType } from '@process/types/diagram';
import _ from 'lodash';

type EdgeSimpleProps = {
  node: Node;
  stepHelper: any;
};

export default function EdgeSimple(props: EdgeSimpleProps) {
  const {
    stepHelper,
    node: { id: nodeId, shape: nodeShape, position, edges }
  } = props;

  const backwardSteps = stepHelper.backwardStep(nodeId, 'TYPE_SIMPLE_ACTION', 'DIRECTION_FORWARD_OUTGOING_BOTTOM', false);

  return edges?.map((edge: Edge) => {
    let edgePosition = _.clone(position);
    let shape: ShapeType = 'SHAPE_NONE';
    let height = 0;
    if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
      const count = backwardSteps.length;
      edgePosition.x += 260;
      // 30 : simple action height
      // 16 : bottom arrow height
      // 6 : forward arrow height
      height = count > 0 ? count * 46 + 6 : 0;
      // 15 : half of simple action height
      // 6 : arrow height
      if (count > 0) {
        edgePosition.y -= height - 15 - 6;
      } else {
        edgePosition.y += 15;
      }
      if (nodeShape == 'SHAPE_BACKWARD') {
        shape = 'SHAPE_BACKWARD';
      } else {
        shape = 'SHAPE_FORWARD';
      }
    } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
      // 30 : simple action height
      // 5 : arrow line
      // 11 : arrow head height
      edgePosition.y += 46;
      shape = 'SHAPE_FORWARD';
    } else {
      return edge;
    }

    return { ...edge, ...{ shape: shape, position: edgePosition, height: height } };
  });
}
