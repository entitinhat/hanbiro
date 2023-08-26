import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';

import Activity from './Activity';
import Note from './Note';
import TimelineContainer from './Timeline';

interface RightProps {
  menuSource: string;
  menuSourceId: string;
}

const Right = (props: RightProps) => {
  const { menuSource, menuSourceId } = props;

  return (
    <>
      <ViewAsideContainer>
        <TimelineContainer menuSource={menuSource} menuSourceId={menuSourceId} />
        <Activity />
        <Note />
      </ViewAsideContainer>
    </>
  );
};

export default Right;
