import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import MiModal from '@base/components/@hanbiro/MiModal';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import { useStorageDownloadMutation } from '@base/hooks/forms/useFileUploadMutation';
import useRenderBlockContent from '@base/hooks/grapes-js/useRenderBlockContent';
import useDevice from '@base/hooks/useDevice';
import { BaseMutationResponse } from '@base/types/response';
import { Box, CircularProgress } from '@mui/material';
import useRenderFormContent from '@public-page/landingpage/hooks/useRenderFormContent';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ctaType, formModule, formType, personalizeType, surveyType } from '../../constants';

interface GrapesPreviewModalProps {
  isOpen: boolean;
  editor: any;
  onClose: () => void;
}
const GrapesPreviewModal = (props: GrapesPreviewModalProps) => {
  const { isOpen, editor, onClose } = props;
  const [HTML, setHTMl] = useState<string>();
  const [CSS, setCSS] = useState<string>();
  const [formDownloadIds, setFormDownloadIds] = useState<string[] | null>([]);
  const [blocksRender, setBlocksRender] = useState<Element[] | null>([]);
  //hooks
  const { isMobile } = useDevice();
  const containerRef = useRef<HTMLElement>();
  const isLoading = useRenderBlockContent(blocksRender, containerRef.current);
  console.log(`~~~~formDownloadIds`, formDownloadIds);
  const { isFinished } = useRenderFormContent(formDownloadIds, containerRef.current, { readonly: true });
  useEffect(() => {
    const nHTML = editor.getHtml();
    const nCss = editor.getCss();
    setHTMl(nHTML);
    setCSS(nCss);
  }, [editor]);
  useEffect(() => {
    const node = containerRef.current;
    if (node) {
      const formNode = [...node.getElementsByClassName(formType)];
      const blocks = [
        ...node.getElementsByClassName(personalizeType),
        ...node.getElementsByClassName(surveyType),
        ...node.getElementsByClassName(ctaType)
      ];
      let newformIds: string[] = [];
      var formArr = Array.from(formNode ?? []);

      formArr.map((node: Element) => {
        const source = node.getAttribute('source') ?? '';
        const fileId = node.getAttribute('source')?.split(':')[1];
        const modules = source.substring(source.indexOf('@') + 1, source.indexOf(':'));
        if (modules == formModule && fileId) {
          newformIds.push(fileId);
        }
      });
      setBlocksRender(blocks);
      setFormDownloadIds([...newformIds]);
    }
  }, [HTML]);

  return (
    <MiModal
      title={'Preview'}
      isOpen={isOpen} //writeOption.isOpenWrite
      size="md"
      fullScreen={false}
      onClose={onClose}
    >
      <LoadingCircular loading={!isFinished} />
      <Box
        className="scroll-box"
        ref={containerRef}
        sx={{ minHeight: '500px', visibility: !isFinished ? 'hidden' : 'visible' }}
        onClick={(ev) => {
          ev.stopPropagation();
          ev.preventDefault();
        }}
      >
        <RawHTML nl2br={false}>
          {`<!DOCTYPE html>
          <html>
            <head><style>${CSS}</style></head>
            <body>
          
              ${HTML}
       
          </body>
          </html>
        `}
        </RawHTML>
      </Box>
    </MiModal>
  );
};
export default GrapesPreviewModal;
