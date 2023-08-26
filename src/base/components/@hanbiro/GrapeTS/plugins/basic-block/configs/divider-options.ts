export default {
  // let defaults = {
  shapeDividerBlock: {},

  // Default style
  shapeDividerDefaultStyle: true,

  // Section class prefix
  shapeDividerSectionClsPfx: 'gjs',

  // Shp-divder label
  shapeDividerLabelShapeDvd: 'Shape Divider',

  //Label Svg
  shapeDividerLabelSvg: 'svg',

  //labelType
  shapeDividerLabelType: 'shape-divider',

  shapeDividerStyle: `
      .gjs-shape-divider{
        position:absolute;
        width:100%;
        height:100px;
        color:black;
        overflow:hidden;
      }
      .gjs-shape-divider > svg{
        height:100%;
        width:100%;
        transform:scaleY(-1);
      }
      .gjs-shape-divider--fl-v > svg{
        transform:scaleY(1);
      }
      .gjs-shape-divider--fl-h > svg{
        transform:scaleX(-1) scaleY(-1);
      }
      .gjs-shape-divider--fl-v-h > svg{
        transform:scaleY(1) scaleX(-1);
      }
      .gjs-shape-divider > svg > path{
        fill:currentColor;
      }
      .gjs-shape-divider-inv > path{
        transform:scale(-1, -1) translate(-100%, -100%);
      }
    `,
};
