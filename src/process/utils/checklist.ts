import { Edge, Node, ShapeType } from '@process/types/diagram';
import _ from 'lodash';

type EdgeChecklistProps = {
  node: Node;
  stepHelper: any;
};

export default function EdgeChecklist(props: EdgeChecklistProps) {
  const {
    node: { shape: nodeShape, position, edges }
  } = props;

  return edges?.map((edge: Edge) => {
    let edgePosition = _.clone(position);
    let shape: ShapeType = 'SHAPE_NONE';
    if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
      edgePosition.x += 260;
      // 40 - half checklist height
      edgePosition.y += 40;
      if (nodeShape == 'SHAPE_BACKWARD') {
        shape = 'SHAPE_BACKWARD';
      } else {
        shape = 'SHAPE_FORWARD';
      }
      // } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
      //   // 80 - checklist height
      //   // 11 - arrow head height
      //   // 59 - arrow height
      //   edgePosition.y += 80 + 70;
      //   shape = 'SHAPE_BACKWARD';
    }

    // // console.log('eges position', edgePosition);
    return { ...edge, ...{ shape: shape, position: edgePosition } };
  });
}
