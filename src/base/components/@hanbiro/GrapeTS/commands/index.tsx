/* eslint-disable no-empty-function */
import openImport from './open-import';
// import openExport from './open-export';
import clearCanvasConfirm from './canvas-clear-confirm';
import {
  cmdImport,
  cmdExport,
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear,
} from './../constants';
import openExport from './open-export';

export default (editor: any, config: any) => {
  const cm = editor.Commands;
  const txtConfirm = config.textCleanCanvas;

  cm.add(cmdImport, openImport(editor, config));
  cm.add(cmdExport, openExport(editor, config));
  cm.add(cmdDeviceDesktop, {
    run(e: any) {
      e.setDevice('Desktop');
    },
    stop() {
      //// console.log('Stop select device');
    },
  });
  cm.add(cmdDeviceTablet, {
    run(e: any) {
      e.setDevice('Tablet');
    },
    stop() {
      //// console.log('Stop select device');
    },
  });
  cm.add(cmdDeviceMobile, {
    run(e: any) {
      e.setDevice('Mobile portrait');
    },
    stop() {
      //// console.log('Stop select device');
    },
  });
  //cm.add(cmdClear, (editor: any) => confirm(txtConfirm) && editor.runCommand('core:canvas-clear'));
  cm.add(cmdClear, clearCanvasConfirm(editor, config));
};
