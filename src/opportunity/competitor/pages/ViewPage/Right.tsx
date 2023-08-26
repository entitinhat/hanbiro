import { useMemo } from 'react';

//project
import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@competitor/config/keyNames';
import Timeline from '@base/containers/TimeLine'; //TODO
import AttachmentsRecent from '@base/containers/AttachmentsRecent';

interface RightProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}

const Right = (props: RightProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData } = props;
  const { data } = layoutData;

  //items
  const cards: CardProps[] = [];
  cards.push({
    title: 'Timeline',
    component: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} isRecent />
  });
  cards.push({
    title: 'Attachment',
    component: <AttachmentsRecent menuSource={menuSource} menuSourceId={menuSourceId} />
  });

  //render
  return (
    <ViewAsideContainer>
      <ViewRight cards={cards} />
    </ViewAsideContainer>
  );
};

export default Right;
