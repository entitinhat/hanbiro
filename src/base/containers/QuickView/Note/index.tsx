import React from 'react';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import { Box, ListItemText } from '@mui/material';
import DraggableModal from '@base/components/@hanbiro/DraggableModal';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import MiModal from '@base/components/@hanbiro/MiModal';
import { useTranslation } from 'react-i18next';
interface NoteQuickViewProps {
  title: string;
  content: string;
  isOpen: boolean;
  handleClose: () => void;
}

const NoteQuickView = (props: NoteQuickViewProps) => {
  const { title, content, isOpen, handleClose } = props;
  const { t } = useTranslation();
  return (
    <MiModal anchor="right" size="md" title={title} isOpen={isOpen} onClose={handleClose}>
      <ListItemText
        sx={{ display: 'flex', padding: ' 20px' }}
        primary={<RawHTML>{content || ''}</RawHTML>}
        primaryTypographyProps={{ sx: { textOverflow: 'clip', maxWidth: '100%' } }}
      />
    </MiModal>
  );
};
export default NoteQuickView;
