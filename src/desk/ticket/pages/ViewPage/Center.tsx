import { useMemo } from 'react';

import ViewDetails from '@desk/ticket/containers/ViewDetails';
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import Timeline from '@base/containers/TimeLine';
import Notes from '@base/containers/Notes';
import Attachments from '@base/containers/Attachments';
import { PageLayoutData } from '@base/types/pagelayout';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // showTabs: number;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;
  console.log('menuSource center', menuSource);
  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'ncrm_desk_ticket_details', //Content
        path: 'details',
        order: 0,
        tabComponent: (
          <ViewDetails menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={ignoreFields} />
        )
      },
      {
        default: false,
        label: 'ncrm_desk_ticket_time_line', //Timeline
        path: 'timeline',
        order: 1,
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: 'ncrm_desk_ticket_attachments', //Attachments
        path: 'attachments',
        order: 1,
        tabComponent: <Attachments menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: 'ncrm_desk_ticket_notes', //Notes
        path: 'note',
        order: 2,
        tabComponent: <Notes menuSource={menuSource} menuSourceId={menuSourceId} />
      }
    ];
  }, [layoutData]);
  const viewTabsProps = { menuSource, menuSourceId, tabs };
  const centerMemo = useMemo(() => {
    return layoutData.layout?.keyNames.length === 0 ? '' : <ViewTabs {...viewTabsProps} />;
  }, [layoutData]);
  return <>{centerMemo}</>;
};

export default Center;
