import { useMemo, lazy, useState } from 'react';

import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import AttachmentsRecent from '@base/containers/AttachmentsRecent';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import { useTheme } from '@mui/material';
import TicketTodo from '@desk/ticket/containers/RelatedActivity';
import TicketKnowledgebases from '@desk/ticket/containers/TicketKnowledgebases';
import { PageLayoutData } from '@base/types/pagelayout';
import { getFieldLayoutDataByKeyName } from '@base/utils/helpers/pageLayoutUtils';
import { KEY_TICKET_CUSTOMER } from '@desk/ticket/config/keyNames';
import TicketTimeline from '@desk/ticket/containers/Timeline';
import ResolutionInfo from '@desk/ticket/containers/ResolutionInfo';
import Timeline from '@base/containers/TimeLine';
import Activities from '@base/containers/Activities';
import { useNotesNew } from '@base/hooks/notes/useNotes';
import { queryKeys } from '@base/config/queryKeys';
import { DESC, NOTE_PAGE_SIZE } from '@base/config/constant';
import { MENU_SOURCE } from '@base/config/menus';
import { id } from 'date-fns/locale';
import { useParams } from 'react-router-dom';
import Note from '@base/containers/Notes';
interface RightProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}
const Right = (props: RightProps) => {
  const { menuSource, menuSourceId, layoutData } = props;
  const { data } = layoutData;
  const theme = useTheme();
  const customerField = getFieldLayoutDataByKeyName(layoutData, KEY_TICKET_CUSTOMER);
  const noteParams = {
    source: {
      menu: MENU_SOURCE[menuSource] ?? 'MENU_NONE',
      id: menuSourceId
    },
    filter: {
      query: `content:\"${''}\"`,
      sort: {
        field: 'order',
        orderBy: DESC
      },
      // limit: 3,
      paging: 1
    }
  };
  // console.log('menuSourceId right: ', menuSourceId)
  const listNote = useNotesNew([queryKeys.notes, menuSourceId], noteParams);
  let notes: any;
  if (listNote.data?.pages[0]?.data !== undefined && listNote.data?.pages[0]?.data !== null) {
    notes = listNote.data?.pages[0]?.data.slice(0, 3);
  } else {
    notes = listNote.data?.pages[0]?.data;
  }
  const contact =
    customerField?.data?.customer?.category === 'CATEGORY_ACCOUNT' ? customerField?.data?.contact : customerField?.data?.customer;
  const cards1: CardProps[] = useMemo(() => {
    return [
      {
        title: 'ncrm_desk_ticket_resolution_info', //Resolution info
        component: <ResolutionInfo menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} />
        // (
        //   <TicketContactInfo
        //     menuSource={menuSource}
        //     menuSourceId={menuSourceId}
        //     contact={contact}
        //     account={account}
        //     readOnly={data?.restore?.id ? true : false}
        //   />
        // )
      }
    ];
  }, [menuSource, menuSourceId, layoutData]);
  const cards2 = useMemo(() => {
    return [
      {
        title: 'ncrm_desk_ticket_knowledgebase', //Knowledgebase
        component: <TicketKnowledgebases menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      // {
      //   title: 'ncrm_desk_ticket_related_activities',
      //   component: <Activities menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
      //   isExpandable: true
      // },
      // {
      //   title: 'ncrm_desk_ticket_related_activities',
      //   component: <Activities menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
      //   isExpandable: true
      // },
      {
        title: 'ncrm_common_recent_timeline',
        component: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
        isExpandable: true
      },
      {
        title: 'ncrm_desk_ticket_recent_attachments', //Attachments
        component: <AttachmentsRecent menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        title: 'ncrm_desk_ticket_recent_notes', //Recent Notes
        // component: <RecentNotes itemList={[notes]} />
        component: <Note menuSource={menuSource} menuSourceId={menuSourceId} hideWriteForm={true} isRecent={true} />
      }
    ];
  }, [menuSource, menuSourceId, listNote]);
  const cards = [...cards1, ...cards2];
  return (
    <>
      <ViewAsideContainer theme={theme}>
        <ViewRight cards={cards} />
      </ViewAsideContainer>
    </>
  );
};

export default Right;
