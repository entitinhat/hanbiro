import React from 'react';

import { Box } from '@mui/material';

import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';

import { DomEditor, GrapesTS, SequenceTaskContainer } from '@settings/template/config/write-fields/components';
import { GrapesTSViewField } from '@settings/template/config/view-fields/components';

interface PreviewTemplateProps {
  handleClose: () => void;
  isOpen: boolean;
  value: any;
  size: string;
  title: string;
  mode?: 'write' | 'view';
  isSequenceTask?: boolean;
  handleChange?: (value: any) => void;
}

const ModalPreview: React.FC<PreviewTemplateProps> = (props: PreviewTemplateProps) => {
  const { value, size, title, isOpen, handleClose, mode = 'view', handleChange, isSequenceTask = false } = props;

  return (
    <MiModal title={<SpanLang keyLang={title ?? 'Create'} />} isOpen={isOpen} size="md" fullScreen={false} onClose={handleClose}>
      {mode === 'view' ? (
        <DomEditor>
          <Box sx={{ width: '100%', padding: '10px' }}>
            {isSequenceTask ? (
              <SequenceTaskContainer mode="view" value={value} />
            ) : (
              <GrapesTSViewField keyName="html" showTools={true} value={value} menuSourceId={''} menuSource={''} />
            )}
          </Box>
        </DomEditor>
      ) : (
        <>
          {isSequenceTask ? (
            <DomEditor>
              <Box sx={{ width: '100%', padding: '10px' }}>
                <SequenceTaskContainer onChange={handleChange} mode="write" value={value} />
              </Box>
            </DomEditor>
          ) : (
            <GrapesTS
              isFullScreen={false}
              height={'calc(100vh - 290px)'}
              storageId={'grapes-ts-view-gts'}
              value={value}
              onChange={handleChange}
            />
          )}
        </>
      )}
    </MiModal>
  );
};

// ModalPreview.defaultProps = {
//   size: 'xl',
//   title: 'Preview Template'
// };

export default ModalPreview;
