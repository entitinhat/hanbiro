import React, { useEffect, useRef, useState } from 'react';

//third-party
import EditorJS, { LogLevels } from '@editorjs/editorjs';

//project
import { FormIcon } from '@base/components/@hanbiro/FormIcon';

//material
import { Box, IconButton, Stack, Theme, Tooltip, useTheme } from '@mui/material';
//import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

//local
import { PLUGIN_TOOLS } from './config';
import DragDrop from './plugins/DragDrop';
import Undo from './plugins/Undo';

//import './index.scss';

//styles
const useStyles = makeStyles((theme: Theme) => ({
  active: {
    color: '#0168fa',
    borderRadius: '3px',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    boxShadow: '0 0 3px rgb(0 0 0 / 25%) inset'
  },
  fullWidth: {
    width: '100%'
  },
  contentWrapper: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    bottom: 0,
    overflow: 'hidden'
  },
  containerView: {
    display: 'flex',
    justifyContent: 'center',
    //width: '100%',
    //margin: '3px',
    boxSizing: 'border-box',
    border: '1px dashed darkgray',
    backgroundColor: 'white'
  },
  desktopView: {
    width: '100%',
    transition: 'all 0.3s',
    visibility: 'visible',
    transform: 'scale(1, 1)',
    pointerEvents: 'all'
  },
  tabletView: {
    width: '992px', //'48%',
    transition: 'all 0.3s',
    visibility: 'visible',
    transform: 'scale(1, 1)',
    pointerEvents: 'all'
  },
  mobileView: {
    width: '600px', ///'32%',
    transition: 'all 0.3s',
    visibility: 'visible',
    transform: 'scale(1, 1)',
    pointerEvents: 'all'
  }
}));

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: 'header',
        data: {
          text: 'This is my awesome editor!',
          level: 1
        }
      },
      // {
      //   type: 'table',
      //   data: {
      //     withHeadings: true,
      //     content: []
      //   }
      // },
      {
        type: 'columns',
        data: {
          cols: [],
          numberOfColumns: 2
        }
      }
    ]
    //tunes
  };
};

const DEVICE_OPTIONS = [
  { label: 'Desktop', value: 'desktop', icon: 'Monitor', height: 26, width: 26 },
  { label: 'Tablet', value: 'tablet', icon: 'Tablet', height: 26, width: 23 },
  { label: 'Mobile', value: 'mobile', icon: 'Smartphone', height: 26, width: 20 }
];

const EDITTOR_HOLDER_ID = 'vora-editor';

interface VoraEditorProps {}

const VoraEditor = (props: VoraEditorProps) => {
  const veInstance = useRef<any>(null);
  const [editorData, setEditorData] = useState<any>(DEFAULT_INITIAL_DATA);
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [activePreview, setActivePreview] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  // This will run only once
  useEffect(() => {
    if (!veInstance.current) {
      initEditor();
    }
    return () => {
      veInstance.current.destroy();
      veInstance.current = null;
    };
  }, []);

  // refresh editor
  // useEffect(() => {
  //   if (veInstance.current) {
  //     veInstance.current.destroy();
  //     veInstance.current = null;
  //     //re-init
  //     initEditor();
  //   }
  // }, [activeDevice]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: LogLevels?.ERROR,
      data: editorData,
      onReady: () => {
        veInstance.current = editor;
        new Undo({ editor });
        new DragDrop(editor);
      },
      onChange: async (api, event) => {
        let content = await api.saver.save(); //await this.editorjs.saver.save();
        //console.log('editorData content', content);
        // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      autofocus: true,
      readOnly: false,
      tools: extendTools
    });
  };

  const handlePreview = () => {
    setActivePreview(!activePreview);
    //editor apply
    if (veInstance.current) {
      veInstance.current.readOnly.toggle();
    }
  };

  //toolbar buttons
  const renderToolbar = () => {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%', color: '#6c757d', backgroundColor: '#fcfdff', boxShadow: '0 0 5px rgb(0 0 0 / 20%)' }}
      >
        <Stack direction="row" sx={{ marginLeft: '5px' }}>
          {DEVICE_OPTIONS.map((_item: any, index: number) => (
            <Tooltip key={_item.value} title={_item.value}>
              <IconButton
                sx={{ padding: '3px', margin: '3px' }}
                key={index}
                className={`${_item.value === activeDevice ? classes.active : ''}`}
                onClick={() => setActiveDevice(_item.value)}
              >
                <FormIcon icon={_item.icon} attrs={{ height: _item.height, width: _item.width }} />
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
        <Stack sx={{ marginRight: '5px' }}>
          <Tooltip title={'Preview'}>
            <IconButton className={`${activePreview ? classes.active : ''}`} onClick={handlePreview}>
              <FormIcon icon={'Eye'} attrs={{ height: 24, width: 24 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    );
  };

  const getDeviceStyles = () => {
    switch (activeDevice) {
      case 'desktop':
        return classes.desktopView;
      case 'tablet':
        return classes.tabletView;
      case 'mobile':
        return classes.mobileView;
    }
  };

  const extendTools = {
    ...PLUGIN_TOOLS
  };

  return (
    <React.Fragment>
      <Box sx={{ position: 'relative' }}>
        {!activePreview && renderToolbar()}
        <Box className={classes.contentWrapper}>
          {activePreview && (
            <Box sx={{ position: 'absolute', top: '5px', left: '5px', zIndex: 5, color: theme.palette.grey[300] }} onClick={handlePreview}>
              <FormIcon icon={'EyeOff'} attrs={{ height: 20, width: 20 }} />
            </Box>
          )}
          <Box className={`${classes.containerView} ${getDeviceStyles()}`}>
            <Box sx={{ width: '100%', height: 'calc(100vh - 238px)' }} className={`scroll-box`}>
              <Box component={'div'} id={EDITTOR_HOLDER_ID}></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default VoraEditor;
