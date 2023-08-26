import { Edge, Node, ShapeType } from '@process/types/diagram';
import _ from 'lodash';

type EdgeWaitProps = {
  node: Node;
};

export default function EdgeWait(props: EdgeWaitProps) {
  const {
    node: { position, edges }
  } = props;

  return edges?.map((edge: Edge) => {
    let edgePosition = _.clone(position);
    let shape: ShapeType = 'SHAPE_NONE';
    if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
      edgePosition.x += 260;
      // 60 - half wait height
      edgePosition.y += 60;
      shape = 'SHAPE_FORWARD';
    } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
      // 120 : criteria height
      // 39 : bottom arrow height
      // 11 : arrow head height : 11px
      edgePosition.y += 120 + 50;
      shape = 'SHAPE_BACKWARD';
    }

    // // console.log('eges position', edgePosition);
    return { ...edge, ...{ shape: shape, position: edgePosition } };
  });
}
