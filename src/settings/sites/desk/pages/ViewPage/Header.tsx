import React, { useMemo, useState, Suspense } from 'react';

// mui import
import { useMediaQuery, useTheme } from '@mui/material';

// types
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon, ListType, LabelValueButton } from '@base/types/app';

// project import
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { DESK_MENUS } from '@base/config/routeMenus';
import { KEY_TICKET_SUBJECT } from '@desk/ticket/config/keyNames';
import Title from '@base/containers/ViewField/Title';

import { PageLayoutData } from '@base/types/pagelayout';
import { DeleteOutlineOutlined, PrintOutlined, TurnLeft, TurnRight, CancelOutlined, CancelSharp } from '@mui/icons-material';
import { MENU_DESK_TICKET } from '@base/config/menus';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import WriteCommentForm from '@desk/ticket/containers/WriteCommentForm';
import WriteReplyForm from '@desk/ticket/containers/WriteReplyForm';
import { TICKET_COMMENT_KIND_FORWARD, TICKET_COMMENT_KIND_REPLY } from '@settings/assignment-rule/rule/config/constants';
import useTicketMutation from '@desk/ticket/hooks/useTicketMutations';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import PrintPreview from '@desk/ticket/containers/PrintPreview';
import { useTranslation } from 'react-i18next';
interface HeaderProps {
  menu: string;
  isSplitMode?: boolean;
  // menuSource: string;
  // menuSourceId: string;
  layoutData: PageLayoutData;
}

const Header = (props: HeaderProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { menu, isSplitMode, layoutData } = props;
  const { menuSource, menuSourceId, data } = layoutData;

  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [showReply, setShowReply] = useState(false);
  const [showForward, setShowForward] = useState(false);
  const [showPrint, setShowPrint] = useState<boolean>(false);

  const titleKey = 'name';
  const ticketID: string = menuSourceId ?? '';
  const keySubIndex = layoutData?.layout?.data[0]?.children?.findIndex((_ele: any) => _ele.keyName === titleKey);

  const pageTitle = keySubIndex > -1 ? layoutData.layout.data[0].children[keySubIndex].data : '';

  const { listQueryKey } = useListQueryKeys(MENU_DESK_TICKET);
  const { mDeleteTicket } = useTicketMutation(listQueryKey);

  const title = useMemo(() => {
    return (
      <Title
        value={t(data?.[titleKey])}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        userPermission={{ isEdit: true, isShow: true }}
      />
    );
  }, [layoutData]);

  const onMore: LabelValueButton[] = [
    {
      label: 'ncrm_generalsetting_site_btn_survey',
      value: 'survey',
      color: 'warning',
      icon: <CancelSharp fontSize="small" />,
      onClick: () => setShowPrint(true)
    },
    {
      label: 'ncrm_generalsetting_site_btn_close_ticket',
      value: 'close_ticket',
      color: 'info',
      icon: <PrintOutlined fontSize="small" />,
      onClick: () => setShowPrint(true)
    }
  ];
  const moreActions: LabelValueIcon[] = [
    {
      label: 'ncrm_generalsetting_site_btn_cancel_ticket',
      value: 'cancel',
      icon: <CancelSharp fontSize="small" />,
      onClick: () => setShowPrint(true)
    },
    {
      label: 'ncrm_common_print',
      value: 'print',
      icon: <PrintOutlined fontSize="small" />,
      onClick: () => setShowPrint(true)
    }
    /*{
      label: 'Reply',
      value: 'reply',
      icon: <TurnLeft fontSize="small" />,
      onClick: () => setShowReply(true)
    },
    {
      label: 'Forward',
      value: 'forward',
      icon: <TurnRight fontSize="small" />,
      onClick: () => setShowForward(true)
    },
    {
      label: 'Comment',
      value: 'comment',
      icon: <ChatBubbleOutlineIcon fontSize="small" />,
      onClick: () => setShowComment(true)
    },
    {
      label: 'Divider',
      value: 'divider'
    },
    {
      label: 'Delete',
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        // onDelete();
        mDeleteTicket.mutate({ ids: [menuSourceId ?? ''] });
      }
    }*/
  ];

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: [
        {
          value: 'desk',
          label: 'ncrm_generalsetting_site_menu_desk',
          path: `/settings/sites/desk`
        }
      ],
      menu,
      isSplitMode,
      title,
      moreActions,
      onMore,
      onNew: (mode?: string) => {
        setShowWrite(true);
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menu, isSplitMode, title, moreActions]);

  return <Suspense fallback={<></>}>{HeaderMemo}</Suspense>;
};

export default Header;
