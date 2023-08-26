import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useTheme } from '@mui/material';
import { PaperClipOutlined } from '@ant-design/icons';

import Activities from '@base/containers/Activities';
import Timeline from '@base/containers/TimeLine';
import Notes from '@base/containers/Notes';
import CustomerTicket from '@customer/containers/CustomerTicket';

import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import AttachmentsRecent from '@base/containers/AttachmentsRecent';

import { queryKeys } from '@product/product/config/queryKeys';
import { Product } from '@product/product/types/product';
interface RightProps {
  menuSource: string;
  menuSourceId: string;
}

const Right = (props: RightProps) => {
  const { menuSource, menuSourceId } = props;

  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<Product>([queryKeys.viewProduct, menuSourceId]);

  const theme = useTheme();

  const cards: CardProps[] = useMemo(() => {
    const rightCards: CardProps[] = [
      {
        title: 'ncrm_common_recent_timeline',
        component: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} isRecent />
      },
      {
        title: 'ncrm_common_recent_activities',
        component: <Activities menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
        cardContentSx: { p: '0px !important' },
        isExpandable: true
      },
      {
        title: 'ncrm_common_recent_tickets', //Attachments
        component: <CustomerTicket menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
        cardContentSx: { p: '0px !important' },
        isExpandable: true
      },
      {
        title: 'ncrm_common_recent_notes', //Attachments
        component: <Notes menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
        cardContentSx: { p: '0px !important' },
        isExpandable: true
      },
      {
        title: 'ncrm_common_recent_attachments',
        component: <AttachmentsRecent menuSource={menuSource} menuSourceId={menuSourceId} />,
        cardContentSx: { p: 2 },
        isExpandable: true
      }
    ];
    return rightCards;
  }, [menuSource, menuSourceId, data]);

  return (
    <ViewAsideContainer theme={theme}>
      <ViewRight cards={cards} />
    </ViewAsideContainer>
  );
};

export default Right;
