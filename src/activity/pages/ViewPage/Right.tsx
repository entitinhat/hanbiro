import { useMemo } from 'react';

import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import Knowledgebases from '@activity/containers/Knowledgebases';
import Attachments from '@base/containers/Attachments';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import AssignCustomer from '@activity/containers/AssignCustomers';
import AssignRelatedTo from '@activity/containers/AssignRelatedTo';
import AssignProduct from '@activity/containers/AssignProducts';
import AssignTags from '@activity/containers/AssignTags';
import Timeline from '@base/containers/TimeLine';
import Notes from '@base/containers/Notes';
import AttachmentsRecent from '@base/containers/AttachmentsRecent';
import { PageLayoutData } from '@base/types/pagelayout';
interface RightProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}
const Right = (props: RightProps) => {
  const { menuSource, menuSourceId, layoutData } = props;
  const cards: CardProps[] = useMemo(() => {
    return [
      {
        title: 'ncrm_activity_customer',
        // component: <Customers menuSource={menuSource} menuSourceId={menuSourceId} />
        component: <AssignCustomer layoutData={layoutData} menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        title: 'ncrm_common_recent_timeline',
        // component: <Customers menuSource={menuSource} menuSourceId={menuSourceId} />
        component: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} isRecent />
      },
      {
        title: 'ncrm_common_recent_notes',
        component: <Notes menuSource={menuSource} menuSourceId={menuSourceId} isRecent />
      },
      {
        title: 'ncrm_common_recent_attachments',
        component: <AttachmentsRecent menuSource={menuSource} menuSourceId={menuSourceId} />
      }
    ];
  }, [menuSource, menuSourceId, layoutData]);
  return (
    <>
      <ViewAsideContainer>
        <ViewRight cards={cards} />
      </ViewAsideContainer>
    </>
  );
};

export default Right;
