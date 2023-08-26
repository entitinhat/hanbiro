import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import classNames from 'classnames';
import { ReactNode, useMemo, useState } from 'react';
import { FormIcon } from '../FormIcon';

import './main.scss';

interface DomEditorProps {
  className?: string;
  children?: ReactNode;
  onPreview?: (val: boolean) => void;
}

const DEVICE_OPTIONS = [
  { label: 'Desktop', value: 'desktop', icon: 'Monitor', height: 26, width: 26 },
  { label: 'Tablet', value: 'tablet', icon: 'Tablet', height: 26, width: 23 },
  { label: 'Mobile', value: 'mobile', icon: 'Smartphone', height: 26, width: 20 }
];

const DomEditor = (props: DomEditorProps) => {
  const { className = '', children, onPreview } = props;
  //state
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [activePreview, setActivePreview] = useState(false);

  const handlePreview = () => {
    setActivePreview(!activePreview);
    //callback
    onPreview && onPreview(!activePreview);
  };

  //toolbar buttons
  const Toolbar = useMemo(() => {
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
                className={classNames('pd-3 mg-3 han-tooltip--bottom', { 'dom-active': _item.value === activeDevice })}
                data-han-tooltip={_item.label}
                onClick={() => setActiveDevice(_item.value)}
              >
                <FormIcon icon={_item.icon} attrs={{ height: _item.height, width: _item.width }} />
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
        <Stack sx={{ marginLeft: '5px' }}>
          <IconButton
            className={classNames('pd-4 mg-3 han-tooltip--bottom', { 'dom-active': activePreview })}
            data-han-tooltip={'Preview'}
            onClick={handlePreview}
          >
            <FormIcon icon={'Eye'} attrs={{ height: 24, width: 24 }} />
          </IconButton>
        </Stack>
      </Stack>
    );
  }, [activeDevice, activePreview]);

  //render
  return (
    <Box sx={{ position: 'relative' }}>
      {!activePreview && Toolbar}
      <Box className="dom-content-wrap" style={{ minHeight: '500px' }}>
        {activePreview && (
          <Box sx={{ position: 'absolute', top: '5px', left: '5px', zIndex: '50' }} style={{ color: '#6c757d' }} onClick={handlePreview}>
            <FormIcon icon={'EyeOff'} attrs={{ height: 20, width: 20 }} className="tx-gray" />
          </Box>
        )}
        <Box
          className={classNames('dom-content-frame', {
            'dom-desktop-view': activeDevice === 'desktop',
            'dom-tablet-view': activeDevice === 'tablet',
            'dom-mobile-view': activeDevice === 'mobile'
          })}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DomEditor;
