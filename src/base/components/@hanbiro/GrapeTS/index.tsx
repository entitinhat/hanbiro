import React, { useEffect, useMemo, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
// import gjsForms from 'grapesjs-plugin-forms';
// import gjsBlocksBootstrap4 from 'grapesjs-blocks-bootstrap4';

import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs/dist/grapes.min.js';

// import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
// import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';
// import 'grapesjs-plugin-forms/dist/grapesjs-plugin-forms.min.js';

import './assets/scss/main.scss';
import './assets/scss/tooltip.scss';

import './storage/indexeddb';
import './plugins';

//sample
// Lets say, for instance, you start with your already defined HTML template and you'd like to
// import it on fly for the user
import LandingPage from './assets/sample';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ClickAwayListener,
  Grid,
  IconButton,
  Typography,
  useTheme
} from '@mui/material';
import StyleManager from './styles/custom';
import { notAllowedComponents, selectStyle } from './constants';
import CustomGrapeModal from './containers/CustomGrapeModal';
import PreviewModal from './containers/PreviewModal';
import * as keyNames from './config/keyNames';
import { getTemplateConfig } from './config/templateTypeConfig';
import { GetDataForm } from './plugins/basic-block/components/form/hooks/GetDataForm';
import SearchBlock from './plugins/SearchBlock';
interface GrapesTSProps {
  isFullScreen?: boolean;
  value?: any; //{html: '', css: ''}
  height?: string;
  width?: string;
  storageId?: string; //indexedb name
  templateType?: 'full' | 'form' | 'landingpage'; //'advance'
  children?: any;
  onChange?: any;

  //using mode select to trigger refresh editor when you change value from select box
  mode?: string; // 'seclect'

  // When the editor is placed in a scrollable container (eg. modals) this might
  // cause elements inside the canvas (eg. floating toolbars) to be misaligned.
  // To avoid that, you can specify an array of DOM elements on which their scroll will
  // trigger the canvas update.
  parentID?: string; // ex:"#grapeJS" //view center have id="view-grapes"

  //turn on if you want to customize style-manager of editor
  isCustomStyleManager?: boolean; //
}

const GrapesTS: React.FC<GrapesTSProps> = (props: GrapesTSProps) => {
  const {
    templateType = 'full',
    isFullScreen = false,
    value,
    height,
    width,
    storageId,
    children,
    onChange,
    mode,
    parentID = '#view-grapes',
    isCustomStyleManager = false
  } = props;
  const theme = useTheme();
  const [editor, setEditor] = useState<any>(null);
  const [curComponent, setCurComponent] = useState<any>(null);
  const [isOpenCustomModal, setIsOpenCustomModal] = useState<boolean>(false);
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);
  const [updateIds, setUpdateIds] = useState<string[]>([]);
  const [grapesData, setGrapesData] = useState<string | null>(null);
  const [ctaGroupBy, setCtaGroupBy] = useState<string>('all');
  //// console.log('grapes value', value);

  //set width of blocks for screen size
  function setBlockWidth() {
    if (isFullScreen) {
      const classElements: any = document.getElementsByClassName('gjs-block');
      //// console.log('classElements', classElements[0]);
      for (let i = 0; i < classElements.length; i++) {
        classElements[i].style.width = '43%';
      }
    } else {
      const classElements: any = document.getElementsByClassName('gjs-block');
      //// console.log('classElements', classElements[0]);
      for (let i = 0; i < classElements.length; i++) {
        classElements[i].style.width = '43%';
      }
    }
  }

  useEffect(() => {
    //init
    if (!editor) {
      const gEditor = grapesjs.init({
        container: `#gts-${storageId}`, //'#gts',
        showOffsets: 1,
        noticeOnUnload: 0,

        // Get the content for the canvas directly from the element
        // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
        fromElement: false,

        //https://github.com/artf/grapesjs/issues/3063
        // When the editor is placed in a scrollable container (eg. modals) this might
        // cause elements inside the canvas (eg. floating toolbars) to be misaligned.
        // To avoid that, you can specify an array of DOM elements on which their scroll will
        // trigger the canvas update.
        // Be default, if the array is empty, the first parent element will be appended.
        // listenToEl: [document.querySelector('#scrollable-el')],
        listenToEl: parentID ? [document.querySelector(parentID)] : [],

        //init template - LandingPage: TEST DATA --> using value.html and value.css
        components: value?.html || '', //LandingPage.html,
        style: value?.css || '', //LandingPage.css,

        // Size of the editor
        height: height ? height : '100%',
        width: width ? width : 'auto',
        // Disable the storage manager for the moment
        storageManager: {
          id: storageId ? storageId : 'gts-store',
          type: 'indexeddb'
          //autosave: false,
          //autoload: false,
        },
        //Can style manager always generate IDs instead of using already defined element's class ?
        //problem: https://github.com/GrapesJS/grapesjs/issues/3401
        selectorManager: {
          componentFirst: true
        },
        styleManager: {
          sectors: [],
          custom: isCustomStyleManager
        },
        //Custom modal
        // modal: { custom: true },
        // Avoid any default panel
        panels: { defaults: [] },
        // plugins: [
        //   (editor: any) =>
        //     gjsBlocksBootstrap4(editor, {
        //       /* options */
        //     }),
        // ],
        plugins: ['gts-form-webpage', 'grapests-indexeddb'], //'gts-form-webpage', 'gjs-blocks-basic', 'gjs-preset-webpage', 'grapesjs-plugin-forms'
        pluginsOpts: {
          'gts-form-webpage': {
            //isFullScreen: isFullScreen
            templateType: templateType,
            config: getTemplateConfig(templateType)
          }
        },
        //commands
        commands: {
          defaults: [
            {
              // id and run are mandatory in this case
              id: 'refresh-data',
              run(editor: any, sender: any, opts: any) {
                console.log('sender:', sender, 'opts:', opts);
                const { component, groupBy } = opts;
                if (component !== '' && component !== null) setIsOpenCustomModal(true);
                console.log('component', component);
                setUpdateIds((prev) => [...prev, component]);
                setCtaGroupBy(groupBy);
              }
            }
          ]
        },

        domComponents: {
          styleable: false
        },
        //Problem: https://github.com/GrapesJS/grapesjs/issues/1533#issuecomment-432146597
        //This will fit problem wrong position of color picker
        colorPicker: {
          appendTo: 'parent',
          offset: { top: 26, left: -166 }
        }
        //import third js/css
        // canvas: {
        //   scripts: [
        //     'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
        //     'https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.min.js',
        //     'https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.min.js',
        //     'https://uicdn.toast.com/tui-calendar/latest/tui-calendar.js',
        //   ],
        //   styles: [
        //     'https://uicdn.toast.com/tui-calendar/latest/tui-calendar.css',
        //     'https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css',
        //     'https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.css',
        //   ],
        // },
        //more
        //...options,
      });
      //set custom style
      gEditor.StyleManager.addProperty('extra', 'filter');
      gEditor.StyleManager.addProperty('extra', { extend: 'filter', property: 'backdrop-filter' });

      //local state
      setEditor(gEditor);
    }

    //clean up
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  //track full screen
  useEffect(() => {
    //// console.log('isFullScreen', isFullScreen);
    if (editor) {
      setBlockWidth();
    }
  }, [isFullScreen]);
  useEffect(() => {
    //set theme
    if (theme.palette.mode === 'dark') {
      document.documentElement.style.setProperty('--grapes-primaryColor', theme.palette.background.default);
      document.documentElement.style.setProperty('--grapes-secondaryColor', theme.palette.secondary.main);
      document.documentElement.style.setProperty('--grapes-tertiaryColor', theme.palette.primary.main);
      document.documentElement.style.setProperty('--grapes-quaternaryColor', theme.palette.primary.main);
      document.documentElement.style.setProperty('--grapes-fifthnaryColor', theme.palette.secondary.lighter);
    } else {
      document.documentElement.style.setProperty('--grapes-primaryColor', theme.palette.background.default);
      document.documentElement.style.setProperty('--grapes-secondaryColor', theme.palette.secondary.main);
      document.documentElement.style.setProperty('--grapes-tertiaryColor', theme.palette.primary.main);
      document.documentElement.style.setProperty('--grapes-quaternaryColor', theme.palette.primary.main);
      document.documentElement.style.setProperty('--grapes-fifthnaryColor', theme.palette.secondary.lighter);
    }
  }, [theme.palette.mode]);
  //Refresh html and css when value changes, i use this to update html when selecting template
  useEffect(() => {
    if (mode === 'select') {
      if (editor && value) {
        console.log('value.css', value.css);
        console.log('value?.html', value.html);
        editor.setComponents(value?.html);
        editor.setStyle(value?.css);
      }
    }
  }, [JSON.stringify(value)]);

  //init - track changes
  if (editor) {
    // editor.on('update', () => {
    //   // console.log('getHtml', editor.getHtml());
    //   //// console.log('getCss', editor.getCss());
    //   console.log('gethtml');
    //   const newHtml = editor.getHtml();
    //   const newCss = editor.getCss();
    //   const newBody = editor.Canvas.getBody();
    //   //// console.log('newBody', newBody);
    //   //callback
    //   onChange && onChange({ html: newHtml, css: newCss, body: newBody });
    // });

    editor.on('load', () => {
      setBlockWidth();
      const newHtml = editor.getHtml();
      const newCss = editor.getCss();
      const newBody = editor.Canvas.getBody();

      //callback
      const templateTypeConfig = getTemplateConfig(templateType);
      if (templateTypeConfig) {
        editor.BlockManager.getCategories().each((ctg: any) => {
          console.log('isOpen template category', ctg);
          if (!templateTypeConfig?.defaultOpen?.includes(ctg.attributes.id)) ctg.set('open', false);
        });
      }
      //add commands
      const commands = editor.Commands;
      commands.add('click-action:open-custom-modal', {
        run(editor: any, sender: any, opts: any) {
          const { component } = opts;
          console.log('command component', component);
          setCurComponent(component);
          setIsOpenCustomModal(true);
        }
      });
      commands.add('click-action:open-preview-modal', {
        run(editor: any, sender: any, opts: any) {
          const { component } = opts;
          setIsOpenPreview(true);
        }
      });

      onChange && onChange({ html: newHtml, css: newCss, body: newBody });
    });

    //Custom Modal
    editor.on('block:drag:stop', (block: any) => {
      // console.log('current Block', block);
      if (['personalize', 'click-action', 'survey-url', 'form'].includes(block?.attributes?.type)) {
        setIsOpenCustomModal(true);
        setUpdateIds([block.ccid]);
      }
      //Disable rich text editor when drag text component to canvas
      if (block?.attributes?.type == 'heading' || block?.attributes?.type == 'text') {
        const rte = editor.RichTextEditor;
        const selectedComponent = editor.getSelected();
        rte.disable(selectedComponent.view);
      }
    });

    //https://openbase.com/js/grapesjs/versions
    //Added component:select:before, component:hover:before events. These could be used to prevent some components from being selected/hovered.
    editor.on('component:select:before component:hover:before', (cmp: any, opts: any) => {
      if (notAllowedComponents.indexOf(cmp.get('tagName')) >= 0) {
        opts.abort = true;
      }
    });
  }

  //=================DEBUG==========
  // console.log('curComponent', curComponent);
  // console.log('isOpenCustomModal', isOpenCustomModal);
  // console.log('templateType GrapesJS', templateType);
  // console.log('updateIds', updateIds);
  // console.log('check render------------------------------------------------');
  //================================
  const handleUpdateComponent = (selectedComponent: any) => {
    const oldHtmlComponent = selectedComponent.getInnerHTML();
    const newHtmlComponent = selectedComponent.getEl().innerHTML;
    const textTypes = ['text', 'heading', 'label'];
    if (oldHtmlComponent !== newHtmlComponent && textTypes.includes(selectedComponent.get('type'))) {
      // console.log('update component', oldHtmlComponent, newHtmlComponent);
      //Problem: a text component that t create new components every time I press "Enter" key to create new paragraphs
      //Solution: new components is <div><br></div> which replace by <br>.
      //https://github.com/GrapesJS/grapesjs/issues/761
      const removeSpaceHTML = newHtmlComponent.replaceAll('<div><br></div>', '<br>');
      let removeDivElement = removeSpaceHTML.replaceAll('<div>', '<br>');
      removeDivElement = removeDivElement.replaceAll('</div>', '');
      // console.log('Listen component updated inner-----------------------', removeSpaceHTML);
      //Set new collection if components are provided, otherwise the current collection is returned
      selectedComponent.components(removeDivElement);
    }
  };
  const handleSavingData = (event: any) => {
    const selectedComponent = editor.getSelected();
    if (selectedComponent) {
      handleUpdateComponent(selectedComponent);
    }

    const newHtml = editor.getHtml();
    const newCss = editor.getCss();
    const newBody = editor.Canvas.getBody();
    const newData = newHtml + newCss;
    const oldData = grapesData;
    if (newData !== oldData) {
      onChange && onChange({ html: newHtml, css: newCss, body: newBody });
    }
  };

  // console.log('check render.........................');
  return (
    <>
      <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleSavingData}>
        <Box id={`gts-${storageId}`}></Box>
      </ClickAwayListener>
      {/* This is custom style Maner if isCustom = true */}

      {isOpenCustomModal && (
        <CustomGrapeModal
          editor={editor}
          curComponent={curComponent}
          isOpen={isOpenCustomModal}
          updateIds={updateIds}
          setUpdateIds={(val: string[]) => {
            setUpdateIds([...val]);
          }}
          ctaGroupBy={ctaGroupBy}
        />
      )}
      <SearchBlock grapesId={`gts-${storageId}`} editor={editor} />
      <StyleManager grapesId={`gts-${storageId}`} editor={editor} isCustomStyleManager={isCustomStyleManager} />
      {isOpenPreview && (
        <PreviewModal
          editor={editor}
          isOpen={isOpenPreview}
          onClose={() => {
            setIsOpenPreview(false);
          }}
        />
      )}
    </>
  );
};

export default GrapesTS;
