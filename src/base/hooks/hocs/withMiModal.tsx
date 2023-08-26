import React from 'react';

import Portal from '@base/components/@hanbiro/Portal'; //TODO
import MiModal from '@base/components/@hanbiro/MiModal';
import { Breakpoint } from '@mui/material';
//import Canvas from '@base/components/canvas'; //TODO

interface WithMiModalProps {
  title: string;
  isOpen: boolean;
  size: Breakpoint;
  fullScreen?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  isCanvas?: boolean;
  onClose: () => void;
  onChange?: (params: any) => void;
}

const withMiModal = (WrappedComponent: any) => (props: WithMiModalProps) => {
  if (props?.isCanvas) {
    return (
      <Portal>
        {/* <Canvas
          isVisible={props?.isOpen}
          onCloseSideBar={props?.onClose}
          className={classNames('wd-100p', props?.className)}
          customStyles={{ zIndex: '1052' }}
          backdropStyles={{ zIndex: '1051' }}
        >
          <Canvas.Header title={props?.title || 'Write New'} />
          <Canvas.Body className="h-100 pd-0-f">
            <WrappedComponent {...props} />
          </Canvas.Body>
        </Canvas> */}
      </Portal>
    );
  }
  return (
    <MiModal {...props}>
      <WrappedComponent {...props} />
    </MiModal>
  );
};

export default withMiModal;
