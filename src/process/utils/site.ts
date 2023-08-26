import { CtaType, CtaProperty, Edge, Node, ShapeType } from '@process/types/diagram';
import _ from 'lodash';
import * as cheerio from 'cheerio';

interface EdgeSiteProps {
  node: Node;
  stepHelper: any;
}

function EdgeSite(props: EdgeSiteProps) {
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
      edgePosition.x += 260;
      edgePosition.y += 40;
      if (edge.multiple == 'MULTIPLE_PARALLEL' || edge.multiple == 'MULTIPLE_ANY') {
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
      edgePosition.y += 80 + 70;
      shape = 'SHAPE_BACKWARD';
    }

    // // console.log('eges position', edgePosition);
    return {
      ...edge,
      ...{ shape: shape, position: edgePosition, height: height, multipleOrder: multipleOrder }
    };
  });
}

export function getCtaFromHTML(html: string) {
  const $ = cheerio.load(html);
  let buttons: CtaProperty[] = [];
  $('form').each((idx, fel) => {
    const formName = $(fel).attr('name');
    $(fel)
      .find('button[type="submit"]')
      .each((idx, el) => {
        buttons.push({
          id: $(el).attr('id') ?? '',
          title: formName ?? '',
          button: $(el).text(),
          type: 'submit'
        });
      });
  });
  // $('.cta-button').each((idx, el) => {
  //   buttons.push({
  //     id: $(el).attr('id') ?? '',
  //     title: $(el).attr('title') ?? '',
  //     button: $(el).text(),
  //     type: 'cta',
  //     page: [],
  //   });
  // });

  $('a').each((idx, el) => {
    // @@CTA.PAGE=xxxxxxxxxxx@@
    const href = $(el).attr('href');
    const re = /@@([A-Z.]+)=([a-z0-9-]+)@@/;
    const matched = href?.match(re);
    buttons.push({
      id: matched ? matched[2] : '',
      title: $(el).attr('title') ?? '',
      button: $(el).text(),
      type: ($(el).attr('action') as CtaType) ?? 'click'
    });
  });

  // $('.cta-download').each((idx, el) => {
  //   buttons.push({
  //     id: $(el).attr('id') ?? '',
  //     title: $(el).attr('title') ?? '',
  //     button: $(el).text(),
  //     type: 'download',
  //   });
  // });
  return buttons;
}

export default EdgeSite;
