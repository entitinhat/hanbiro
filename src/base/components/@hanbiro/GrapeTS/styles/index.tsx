import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import ClearIcon from '@mui/icons-material/Clear';
/* eslint-disable prettier/prettier */
export default (editor: any, config: any) => {
  const sm = editor.StyleManager;
  const csm = config.customStyleManager;

  sm.getSectors().reset(
    csm && csm.length
      ? csm
      : [
          {
            name: config.textGeneral,
            open: false,
            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
            // properties: [
            //   {
            //     property: 'float',
            //     label: 'Float',
            //     type: 'select',
            //     options: [
            //       { id: 'none', label: 'None' },
            //       { id: 'left', label: 'Left' },
            //       { id: 'right', label: 'Right' },
            //     ]
            //   },
            //   {
            //     property: 'position',
            //     label: 'Position',
            //     type: 'select',
            //     options: [
            //       { id: 'static', label: 'Static' },
            //       { id: 'relative', label: 'Relative' },
            //       { id: 'absolute', label: 'Absolute' },
            //       { id: 'fixed', label: 'Fixed' },
            //     ]
            //   },
            // ],
          },
          {
            name: config.textLayout,
            open: false,
            buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding']
          },
          {
            name: config.textTypography,
            open: false,
            buildProps: [
              // 'left',
              'font-family',
              'font-size',
              'font-weight',
              'letter-spacing',
              'color',
              // 'line-height',
              'text-decoration', //TODO
              'text-align'
              // 'text-shadow'
              // 'background-color'
            ],
            properties: [
              {
                property: 'text-align',
                label: 'Text align',
                type: 'select',
                defaults: 'left',
                options: [
                  { value: 'left', label: 'left', icon: FormatAlignLeftIcon },
                  { value: 'center', label: 'center', icon: FormatAlignCenterIcon },
                  { value: 'right', label: 'right', icon: FormatAlignRightIcon },
                  { value: 'justify', label: 'justify', icon: FormatAlignJustifyIcon }
                ]
              },
              {
                type: 'number',
                label: 'Font size',
                property: 'font-size',
                min: 0,
                units: ['px'],
                default: '0'
              },
              {
                property: 'letter-spacing',
                label: 'Text align',
                type: 'select',
                defaults: 'normal',
                options: [
                  { value: 'normal', label: 'normal', icon: FormatLineSpacingIcon },
                  { value: '1px', label: '1', icon: FormatLineSpacingIcon },
                  { value: ' 1.5px', label: '1.5', icon: FormatLineSpacingIcon },
                  { value: '2px', label: '2', icon: FormatLineSpacingIcon },
                  { value: '2.5px', label: '2.5', icon: FormatLineSpacingIcon },
                  { value: '3px', label: '3', icon: FormatLineSpacingIcon }
                ]
              },
              {
                property: 'text-decoration',
                type: 'radio',
                defaults: 'none',
                options: [
                  { value: 'none', label: 'None', icon: ClearIcon },
                  { value: 'underline', label: 'underline', icon: FormatUnderlinedIcon },
                  { value: 'line-through', label: 'Line-through', icon: StrikethroughSIcon }
                ]
              }
            ]
            // properties: [
            //   { name: 'Font', property: 'font-family' },
            //   { name: 'Font color', property: 'color' },
            //   {
            //     type: 'number',
            //     label: 'Font size',
            //     property: 'font-size',
            //     min: 0,
            //     units: ['px'],
            //     default: '0'
            //   },
            //   {
            //     property: 'text-align',
            //     label: 'Text align',
            //     type: 'radio',
            //     defaults: 'left',
            //     list: [
            //       { value: 'left', className: 'fa fa-align-left' },
            //       { value: 'center', className: 'fa fa-align-center' },
            //       { value: 'right', className: 'fa fa-align-right' },
            //       { value: 'justify', className: 'fa fa-align-justify' }
            //     ]
            //   },
            //   {
            //     property: 'text-decoration',
            //     type: 'radio',
            //     defaults: 'none',
            //     list: [
            //       { value: 'none', name: 'None', className: 'fa fa-times' },
            //       { value: 'underline', name: 'underline', className: 'fa fa-underline' },
            //       { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough' }
            //     ]
            //   },
            //   {
            //     property: 'font-style',
            //     type: 'radio',
            //     defaults: 'normal',
            //     list: [
            //       { value: 'normal', name: 'Normal', className: 'fa fa-font' },
            //       { value: 'italic', name: 'Italic', className: 'fa fa-italic' }
            //     ]
            //   },
            //   {
            //     property: 'vertical-align',
            //     type: 'select',
            //     defaults: 'baseline',
            //     list: [{ value: 'baseline' }, { value: 'top' }, { value: 'middle' }, { value: 'bottom' }]
            //   }
            // ]
          },
          {
            //'border-radius-c', 'border-radius','box-shadow', 'background', 'cursor'
            name: config.textDecorations,
            open: false,
            buildProps: ['border', 'border-radius-c', 'border-radius', 'box-shadow', 'background', 'cursor'],
            properties: [
              {
                type: 'composite',
                property: 'border',
                label: 'Border',
                // Additional props
                properties: [
                  {
                    type: 'select',
                    default: 'none',
                    property: 'border-style',
                    options: [
                      { value: 'none', label: 'None' },
                      { value: 'solid', label: 'solid' },
                      { value: 'dotted', label: 'dotted' },
                      { value: 'dashed', label: 'dashed' },
                      { value: 'double', label: 'double' },
                      { value: 'groove', label: 'groove' },
                      { value: 'ridge', label: 'ridge' },
                      { value: 'inset', label: 'inset' },
                      { value: 'outset', label: 'outset' }
                    ]
                  },
                  { type: 'number', default: '0', property: 'border-width' },
                  { type: 'color', default: '0', property: 'border-color' }
                ]
              }
            ]
          },
          {
            name: 'background',
            open: false,
            buildProps: ['background-color']
          },
          {
            name: config.textExtra,
            open: false,
            buildProps: ['opacity', 'transition', 'perspective', 'transform']
            // properties: [
            //   {
            //     property: 'transition',
            //     properties: [
            //       { name: 'Property', property: 'transition-property' },
            //       { name: 'Duration', property: 'transition-duration' },
            //       { name: 'Easing', property: 'transition-timing-function' }
            //     ],
            //   },
            //   {
            //     property: 'transform',
            //     properties: [
            //       { name: 'Rotate X', property: 'transform-rotate-x' },
            //       { name: 'Rotate Y', property: 'transform-rotate-y' },
            //       { name: 'Rotate Z', property: 'transform-rotate-z' },
            //       { name: 'Scale X', property: 'transform-scale-x' },
            //       { name: 'Scale Y', property: 'transform-scale-y' },
            //       { name: 'Scale Z', property: 'transform-scale-z' }
            //     ],
            //   }
            // ]
          },
          {
            name: config.textFlex,
            open: false,
            properties: [
              {
                label: 'Flex container',
                property: 'display',
                type: 'select',
                defaults: 'block',
                list: [
                  { value: 'block', name: 'Disable' },
                  { value: 'flex', name: 'Enable' }
                ]
              },
              {
                label: 'Flex wrap',
                property: 'flex-wrap',
                type: 'select',
                defaults: 'nowrap',
                list: [
                  { value: 'nowrap', name: 'No Wrap' },
                  { value: 'wrap', name: 'Wrap' },
                  { value: 'wrap-reverse', name: 'Wrap Reverse' },
                  { value: 'unset', name: 'Unset' }
                ]
              },
              // {
              //   label: 'Flex parent',
              //   property: 'label-parent-flex',
              //   type: 'integer',
              // },
              {
                label: 'Direction',
                property: 'flex-direction',
                type: 'radio',
                defaults: 'row',
                list: [
                  {
                    value: 'row',
                    name: 'Row',
                    className: 'icons-flex icon-dir-row',
                    title: 'Row'
                  },
                  {
                    value: 'row-reverse',
                    name: 'Row reverse',
                    className: 'icons-flex icon-dir-row-rev',
                    title: 'Row reverse'
                  },
                  {
                    value: 'column',
                    name: 'Column',
                    title: 'Column',
                    className: 'icons-flex icon-dir-col'
                  },
                  {
                    value: 'column-reverse',
                    name: 'Column reverse',
                    title: 'Column reverse',
                    className: 'icons-flex icon-dir-col-rev'
                  }
                ]
              },
              {
                name: 'Justify content',
                property: 'justify-content',
                type: 'radio',
                defaults: 'flex-start',
                list: [
                  {
                    value: 'flex-start',
                    className: 'icons-flex icon-just-start',
                    title: 'Start'
                  },
                  {
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-just-end'
                  },
                  {
                    value: 'space-between',
                    title: 'Space between',
                    className: 'icons-flex icon-just-sp-bet'
                  },
                  {
                    value: 'space-around',
                    title: 'Space around',
                    className: 'icons-flex icon-just-sp-ar'
                  },
                  {
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-just-sp-cent'
                  }
                ]
              },
              {
                name: 'Align items',
                property: 'align-items',
                type: 'radio',
                defaults: 'center',
                list: [
                  {
                    value: 'flex-start',
                    title: 'Start',
                    className: 'icons-flex icon-al-start'
                  },
                  {
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-al-end'
                  },
                  {
                    value: 'stretch',
                    title: 'Stretch',
                    className: 'icons-flex icon-al-str'
                  },
                  {
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-al-center'
                  }
                ]
              },
              // {
              //   name: 'Flex children',
              //   property: 'label-parent-flex',
              //   type: 'integer',
              // },
              // {
              //   name: 'Order',
              //   property: 'order',
              //   type: 'integer',
              //   defaults: 0,
              //   min: 0
              // },
              {
                name: 'Flex',
                property: 'flex',
                type: 'composite',
                properties: [
                  {
                    name: 'Grow',
                    property: 'flex-grow',
                    type: 'integer',
                    defaults: 0,
                    min: 0
                  },
                  {
                    name: 'Shrink',
                    property: 'flex-shrink',
                    type: 'integer',
                    defaults: 0,
                    min: 0
                  },
                  {
                    name: 'Basis',
                    property: 'flex-basis',
                    type: 'integer',
                    units: ['px', '%', ''],
                    unit: '',
                    defaults: 'auto'
                  }
                ]
              },
              {
                name: 'Align self',
                property: 'align-self',
                type: 'radio',
                defaults: 'auto',
                list: [
                  {
                    value: 'auto',
                    name: 'Auto'
                    //className: 'gjs-radio-name',
                  },
                  {
                    value: 'flex-start',
                    title: 'Start',
                    className: 'icons-flex icon-al-se-start'
                  },
                  {
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-al-se-end'
                  },
                  {
                    value: 'stretch',
                    title: 'Stretch',
                    className: 'icons-flex icon-al-se-str'
                  },
                  {
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-al-se-center'
                  }
                ]
              }
            ]
          }
        ]
  );
};
