import { StageView, StageWrite } from '@process/containers/Diagram/Stage';
import { StepWrite } from '@process/containers/Diagram/Step';
import { ClosedView, ClosedWrite } from './Closed';
import StepView from './Step/StepView';
import SideBar from '@base/components/@hanbiro/Sidebar';
import { useMediaQuery, useTheme } from '@mui/material';
import { sideBarSizeAtom } from '@base/store/atoms/app';
import { stepOpenAtom } from '@process/store/atoms/step';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { stepWithClose } from '@process/store/selectors';
import { useCallback } from 'react';

export type DiagramType = 'step' | 'stage' | 'closed';

interface DiagramWriteProps {
  type: DiagramType;
  processId: string;
  sourceId: string;
  onClose: () => void;
}

export function DiagramWrite(props: DiagramWriteProps) {
  const { type, processId, sourceId, onClose } = props;
  switch (type) {
    case 'step':
      return <StepWrite processId={processId} onClose={onClose} />;
    case 'stage':
      return <StageWrite processId={processId} sourceId={sourceId} onClose={onClose} />;
    case 'closed':
      return <ClosedWrite processId={processId} onClose={onClose} />;
    default:
      return <></>;
  }
}

interface DiagramViewProps extends DiagramWriteProps {
  data?: any;
}

export function DiagramView(props: DiagramViewProps) {
  const { type, processId, onClose, data, sourceId } = props;
  switch (type) {
    case 'step':
      return <StepView processId={processId} stepId={sourceId!!} onClose={onClose} />;
    case 'stage':
      return <StageView processId={processId} stage={data} onClose={onClose} />;
    case 'closed':
      return <ClosedView processId={processId} stepId={sourceId} onClose={onClose} />;
    default:
      return <></>;
  }
}

interface DiagramSidebarProps {
  processId?: string;
}

const DiagramSidebar = ({ processId }: DiagramSidebarProps) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const sidebarSize = useRecoilValue(sideBarSizeAtom);
  const stepOpen = useRecoilValue(stepOpenAtom);
  const resetStepClose = useResetRecoilState(stepWithClose);
  const onStepClose = useCallback(() => {
    resetStepClose();
  }, []);

  return (
    <SideBar anchor="right" width={matchDownSM ? '100%' : sidebarSize} overlay={1} variant="permanent" open={stepOpen.open}>
      {stepOpen.edit ? (
        <DiagramView type={stepOpen.type} sourceId={stepOpen.sourceId} processId={processId!!} data={stepOpen.data} onClose={onStepClose} />
      ) : (
        <DiagramWrite type={stepOpen.type} sourceId={stepOpen.sourceId} processId={processId!!} onClose={onStepClose} />
      )}
    </SideBar>
  );
};

export default DiagramSidebar;
