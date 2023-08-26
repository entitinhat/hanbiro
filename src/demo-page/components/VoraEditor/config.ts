import Header from '@editorjs/header';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import Embed from '@editorjs/embed';
import Warning from '@editorjs/warning';
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import Raw from '@editorjs/raw';
import Quote from '@editorjs/quote';
//import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import EditorjsColumns from '@calumk/editorjs-columns';
import Paragraph from '@editorjs/paragraph';
import EditorjsAlert from 'editorjs-alert';
//import Table from '@editorjs/table';

//tune tools
import AlignmentBlockTune from './tunes/AlignmentBlock';
//block tools
import Timeline from './blocks/Timeline';
import Table from './blocks/Table';
import ReactTable from './blocks/ReactTable';
import Columns from './blocks/Column';
import ReactColumns from './blocks/ReactColumn';
//inline tools
import Marker from './inlines/Marker';
import Color from './inlines/Color';

export const PLUGIN_TOOLS = {
  //tunes
  alignmentTune: {
    class: AlignmentBlockTune,
    config: { default: 'left' }
  },
  //blocks
  header: {
    class: Header,
    shortcut: 'CMD+SHIFT+H',
    inlineToolbar: true,
    tunes: ['alignmentTune']
  },
  list: {
    class: List,
    shortcut: 'CMD+SHIFT+L',
    inlineToolbar: true
  },
  code: Code, //InlineCode
  jstable: Table,
  table: ReactTable,
  embed: Embed,
  warning: Warning,
  linkTool: LinkTool,
  image: {
    //inlineToolbar: true,
    class: ImageTool, //SimpleImage
    config: {
      // endpoints: {
      //   byFile: 'https://desk.jiki.me:8443/v1/blockstorage/upload' // Your backend file uploader endpoint
      //   //byUrl: 'https://desk.jiki.me:8443/v1/blockstorage/download' // Your endpoint that provides uploading by Url
      // }
      uploader: {
        uploadByFile(file: File) {
          // your own uploading logic here
          //console.log('upload file', file);
          return {
            success: 1,
            file: {
              url: URL.createObjectURL(file) //'https://upload.wikimedia.org/wikipedia/commons/e/ee/Sample_abc.jpg'
              // any other image data you want to store, such as width, height, color, extension, etc
            }
          };
        }
      }
    }
  },
  raw: Raw,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  // jscolumns: {
  //   class: Columns,
  //   config: {
  //     tools: {
  //       header: {
  //         class: Header,
  //         //shortcut: 'CMD+SHIFT+H',
  //         inlineToolbar: true
  //         //tunes: ['alignmentTune'], //ERROR Cannot read properties of undefined (reading 'isInternal')
  //       },
  //       paragraph: {
  //         class: Paragraph,
  //         inlineToolbar: true
  //       },
  //       delimiter: Delimiter
  //     } // IMPORTANT! ref the column_tools
  //   }
  // },
  columns: {
    class: ReactColumns, //Columns,
    config: {
      tools: {
        header: {
          class: Header,
          //shortcut: 'CMD+SHIFT+H',
          inlineToolbar: true
          //tunes: ['alignmentTune'], //ERROR Cannot read properties of undefined (reading 'isInternal')
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },
        table: ReactTable,
        timeline: Timeline
      } // IMPORTANT! ref the column_tools
    }
  },
  timeline: Timeline,
  //inline tools
  marker: Marker,
  color: {
    class: Color, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections: [
        '#EC7878',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#0070FF',
        '#03A9F4',
        '#00BCD4',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFF'
      ],
      defaultColor: '#FF1300',
      type: 'text',
      customPicker: true // add a button to allow selecting any colour
    }
  }
};
