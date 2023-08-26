import { cmdImport, cmdExport, cmdDeviceDesktop, cmdDeviceTablet, cmdDeviceMobile, cmdClear } from '../constants';

export default (editor: any, config: any) => {
  const pn = editor.Panels;
  const eConfig = editor.getConfig();
  const crc = 'create-comp';
  const mvc = 'move-comp';
  const swv = 'sw-visibility';
  const vicode = 'export-template';
  const expt = 'export-zip';
  const osm = 'open-sm'; //styles
  const otm = 'open-tm'; //traits
  const ola = 'open-layers'; //layers
  const obl = 'open-blocks'; //blocks - components
  const ful = 'fullscreen';
  const prv = 'preview';

  //new tooltip
  const tltAttr = 'data-tooltip';
  const tltPosAttr = 'data-tooltip-pos';
  let updateTooltip = (coll: any) => {
    coll.each((item: any) => {
      let attrs = item.get('attributes');
      attrs[tltPosAttr] = 'bottom';
      item.set('attributes', attrs);
    });
  };

  pn.getPanels().reset([
    {
      id: 'commands',
      buttons: [{}]
    },
    {
      id: 'options',
      buttons: [
        {
          id: swv, //view components
          command: swv,
          context: swv,
          className: 'fa fa-square-o',
          attributes: {
            [tltAttr]: config.panelOpts.cmdBtnViewComLabel || 'View components',
            [tltPosAttr]: 'bottom'
          },
          active: false //default: false
        },
        // {
        //   id: prv, //view preview
        //   context: prv,
        //   command: (e: any) => e.runCommand(prv),
        //   className: 'fa fa-eye',
        //   attributes: {
        //     [tltAttr]: config.panelOpts.cmdBtnPreviewLabel || 'Preview',
        //     [tltPosAttr]: 'bottom',
        //   },
        // },
        {
          id: ful, //view fullscreen
          command: ful,
          context: ful,
          className: 'fa fa-arrows-alt',
          attributes: {
            [tltAttr]: config.panelOpts.cmdBtnFullScreenLabel || 'Fullscreen',
            [tltPosAttr]: 'bottom'
          }
        },
        {
          id: cmdExport, //default: vicode
          className: 'fa fa-code',
          command: (e: any) => e.runCommand(cmdExport), //default: vicode
          attributes: {
            [tltAttr]: config.panelOpts.cmdBtnViewCodeLabel || 'View code',
            [tltPosAttr]: 'bottom'
          }
        },
        {
          id: 'undo',
          attributes: {
            [tltAttr]: config.panelOpts.cmdBtnUndoLabel || 'Undo',
            [tltPosAttr]: 'bottom'
          },
          className: 'fa fa-undo',
          command: (e: any) => e.runCommand('core:undo')
        },
        {
          id: 'redo',
          attributes: {
            [tltAttr]: config.panelOpts.cmdBtnRedoLabel || 'Redo',
            [tltPosAttr]: 'bottom'
          },
          className: 'fa fa-repeat',
          command: (e: any) => e.runCommand('core:redo')
        },
        {
          id: expt,
          attributes: {
            [tltAttr]: config.panelOpts.cmdBtnExportZipLabel || 'Export zip',
            [tltPosAttr]: 'bottom'
          },
          className: 'fa fa-download',
          command: (e: any) => e.runCommand(expt)
        },
        {
          id: cmdImport,
          attributes: {
            [tltAttr]: config.panelOpts.cmdBtnImportLabel || 'Import Template',
            [tltPosAttr]: 'bottom'
          },
          className: 'fa fa-upload',
          command: (e: any) => e.runCommand(cmdImport)
        },
        {
          id: cmdClear,
          attributes: {
            [tltAttr]: config.panelOpts.cmdBtnClearLabel || 'Clear content',
            [tltPosAttr]: 'bottom'
          },
          className: 'fa fa-trash-o',
          command: (e: any) => e.runCommand(cmdClear)
        },
        {
          id: 'preview',
          className: 'fa fa-eye',
          attributes: {
            [tltAttr]: 'Preview',
            [tltPosAttr]: 'bottom'
          },
          command: (e: any) => e.runCommand('click-action:open-preview-modal')
        }
      ]
    },
    {
      id: 'views',
      buttons: [
        {
          id: obl,
          // attributes: {
          //   [tltAttr]: config.panelOpts.cmdBtnElementLabel || 'Element Manager',
          //   [tltPosAttr]: 'bottom',
          //   ['title']: '',
          // },
          command: obl,
          className: 'fa fa-th-large',
          //className: 'gjs-pn-btn-label-toolbox',
          //label: 'Toolbox',
          togglable: false,
          active: true
        },
        {
          id: osm,
          command: osm,
          className: 'fa fa-paint-brush'
          //className: 'gjs-pn-btn-label-style',
          //label: 'Style',
          // attributes: {
          //   [tltAttr]: config.panelOpts.cmdBtnStyleLabel || 'Style Manager',
          //   [tltPosAttr]: 'bottom',
          // },
        },
        {
          id: otm,
          command: otm,
          className: 'fa fa-cog'
          //className: 'gjs-pn-btn-label-prop',
          //label: 'Property',
          // attributes: {
          //   [tltAttr]: config.panelOpts.cmdBtnSettingLabel || 'Setting Manager',
          //   [tltPosAttr]: 'bottom',
          // },
        },
        {
          id: ola,
          command: ola,
          className: 'fa fa-bars'
          //className: 'gjs-pn-btn-label-layer',
          //label: 'Layer',
          // attributes: {
          //   [tltAttr]: config.panelOpts.cmdBtnLayerLabel || 'Layer Manager',
          //   [tltPosAttr]: 'bottom',
          // },
        }
      ]
    }
  ]);

  // Add devices buttons
  eConfig.showDevices = 0;
  const panelDevices = pn.addPanel({ id: 'devices-c' });
  let deviceBtns = panelDevices.get('buttons');
  panelDevices.get('buttons').add([
    {
      id: cmdDeviceDesktop,
      command: cmdDeviceDesktop,
      className: 'fa fa-desktop',
      attributes: { [tltAttr]: config.panelOpts.cmdBtnDesktopLabel || 'Desktop' },
      active: 1
    },
    {
      id: cmdDeviceTablet,
      command: cmdDeviceTablet,
      attributes: { [tltAttr]: config.panelOpts.cmdBtnTabletLabel || 'Tablet' },
      className: 'fa fa-tablet'
    },
    {
      id: cmdDeviceMobile,
      command: cmdDeviceMobile,
      attributes: { [tltAttr]: config.panelOpts.cmdBtnMobileLabel || 'Mobile' },
      className: 'fa fa-mobile'
    }
  ]);
  updateTooltip(deviceBtns);

  //default block active
  const openBl = pn.getButton('views', obl);
  editor.on('load', () => openBl && openBl.set('active', 1));

  // On component change show the Style Manager
  config.showStylesOnChange &&
    editor.on('component:selected', () => {
      const openSmBtn = pn.getButton('views', osm);
      const openLayersBtn = pn.getButton('views', ola);

      // Don't switch when the Layer Manager is on or
      // there is no selected component
      if ((!openLayersBtn || !openLayersBtn.get('active')) && editor.getSelected()) {
        openSmBtn && openSmBtn.set('active', 1);
      }
    });
};
