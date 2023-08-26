import { useMemo, lazy, useState } from 'react';

import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import RecentTimeline from '@product/unit/containers/RecentTimeline'; //TODO
import Timeline from '@base/containers/TimeLine';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import { PageLayoutData } from '@base/types/pagelayout';
import useDevice from '@base/hooks/useDevice';
import { WriteOption } from '@base/types/common';
import { ACTIVITY_ADD_OPTIONS } from '@activity/pages/ListPage/Toolbar';
import { keys } from 'lodash';
import WritePage from '@activity/pages/WritePage';
import { ListType } from '@base/types/app';
import { MENU_ACTIVITY } from '@base/config/menus';
import { useTheme } from '@mui/material';

interface RightProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}
const Right = (props: RightProps) => {
  const { menuSource, menuSourceId, layoutData } = props;
  const { data } = layoutData;
  console.log('Right layoutdata', data);
  //states
  const [activityWrite, setActivityWrite] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const [noteWrite, setNoteWrite] = useState<boolean>(false);

  //hooks
  const theme = useTheme();
  const { isMobile } = useDevice();

  //Activity add items

  const cards = useMemo(() => {
    return [
      {
        title: 'Recent Timeline',
        component: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} isRecent />
      }
    ];
  }, [menuSource, menuSourceId, data]);

  return (
    <>
      <ViewAsideContainer theme={theme}>
        <ViewRight cards={cards} />
      </ViewAsideContainer>
    </>
  );
};

export default Right;
