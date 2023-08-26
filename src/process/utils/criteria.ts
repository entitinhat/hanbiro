import { Edge, Node, ShapeType } from '@process/types/diagram';
import _ from 'lodash';

type EdgeCriteriaProps = {
  node: Node;
  stepHelper: any;
};

export default function EdgeCriteria(props: EdgeCriteriaProps) {
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

    if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
      // edgePosition.x += 260;
      // // 60 - half criteria height
      // edgePosition.y += 60;
      // shape = 'SHAPE_FORWARD';
      edgePosition.x += 260;
      edgePosition.y += 60;
      if (edge.multiple == 'MULTIPLE_CHOICE') {
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
    } else if (edge.sourceDirection == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
      // 120 : criteria height
      // 39 : bottom arrow height
      // 11 : arrow head height : 11px
      edgePosition.y += 120 + 50;
      shape = 'SHAPE_BACKWARD';
    }

    // // console.log('eges position', edgePosition);
    return {
      ...edge,
      ...{ shape: shape, position: edgePosition, height: height, multipleOrder: multipleOrder }
    };
  });
}
