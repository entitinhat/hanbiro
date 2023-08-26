import React, { useMemo, useState, Suspense } from 'react';

// mui import
import { useMediaQuery, useTheme } from '@mui/material';

// types
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon, ListType } from '@base/types/app';

// project import
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { DESK_MENUS } from '@base/config/routeMenus';
import { KEY_TICKET_SUBJECT } from '@desk/ticket/config/keyNames';
import Title from '@base/containers/ViewField/Title';
import WritePage from '../WritePage';
import { PageLayoutData } from '@base/types/pagelayout';
import { DeleteOutlineOutlined, PrintOutlined, TurnLeft, TurnRight } from '@mui/icons-material';
import { MENU_DESK_TICKET } from '@base/config/menus';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import WriteCommentForm from '@desk/ticket/containers/WriteCommentForm';
import WriteReplyForm from '@desk/ticket/containers/WriteReplyForm';
import { TICKET_COMMENT_KIND_FORWARD, TICKET_COMMENT_KIND_REPLY } from '@settings/assignment-rule/rule/config/constants';
import useTicketMutation from '@desk/ticket/hooks/useTicketMutations';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import PrintPreview from '@desk/ticket/containers/PrintPreview';
interface HeaderProps {
  menu: string;
  isSplitMode?: boolean;
  // menuSource: string;
  // menuSourceId: string;
  layoutData: PageLayoutData;
}

const Header = (props: HeaderProps) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { menu, isSplitMode, layoutData } = props;
  const { menuSource, menuSourceId, data } = layoutData;

  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [showReply, setShowReply] = useState(false);
  const [showForward, setShowForward] = useState(false);
  const [showPrint, setShowPrint] = useState<boolean>(false);

  const titleKey = KEY_TICKET_SUBJECT;
  const ticketID: string = menuSourceId ?? '';
  const keySubIndex = layoutData?.layout?.data[0]?.children?.findIndex((_ele: any) => _ele.keyName === KEY_TICKET_SUBJECT);
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);
  const pageTitle = keySubIndex > -1 ? layoutData.layout.data[0].children[keySubIndex].data : '';

  const { listQueryKey } = useListQueryKeys(MENU_DESK_TICKET);
  const { mDeleteTicket } = useTicketMutation(listQueryKey);

  const title = useMemo(() => {
    const userPermission = titleField?.config?.viewProps?.userPermission ?? titleField?.userPermission;
    return (
      <Title
        value={data?.[titleKey]}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        userPermission={{ ...userPermission, isEdit: data?.restore?.id ? false : userPermission?.isEdit ?? false, isShow: true }}
      />
    );
  }, [layoutData]);

  const moreActions: LabelValueIcon[] = [
    {
      label: 'ncrm_common_print', //Print
      value: 'print',
      icon: <PrintOutlined fontSize="small" />,
      onClick: () => setShowPrint(true)
    },
    {
      label: 'ncrm_desk_ticket_reply', //Reply
      value: 'reply',
      icon: <TurnLeft fontSize="small" />,
      onClick: () => setShowReply(true)
    },
    {
      label: 'ncrm_desk_ticket_forward', //Forward
      value: 'forward',
      icon: <TurnRight fontSize="small" />,
      onClick: () => setShowForward(true)
    },
    {
      label: 'ncrm_desk_ticket_comment', //Comment
      value: 'comment',
      icon: <ChatBubbleOutlineIcon fontSize="small" />,
      onClick: () => setShowComment(true)
    },
    {
      label: 'Divider',
      value: 'divider'
    },
    {
      label: 'ncrm_common_delete', //Delete
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        // onDelete();
        mDeleteTicket.mutate({ ids: [menuSourceId ?? ''] });
      }
    }
  ];

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: DESK_MENUS,
      menu,
      isSplitMode,
      title,
      moreActions,
      onNew: (mode?: string) => {
        setShowWrite(true);
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menu, isSplitMode, title, moreActions]);

  return (
    <Suspense fallback={<></>}>
      {HeaderMemo}
      {showWrite && (
        <WritePage
          isOpen={showWrite}
          onClose={() => setShowWrite(false)}
          category={menuSource}
          type={'view'}
          listType={ListType.LIST}
          menuApi={MENU_DESK_TICKET}
          // onReload={onRefresh}
        />
      )}
      {showComment && (
        <WriteCommentForm
          //ticketId
          title={'ncrm_desk_ticket_new_comment'} //New Comment
          menuSource={menuSource}
          isOpen={showComment}
          onClose={() => setShowComment(false)}
          //onReload={refetch}
          ticketId={ticketID}
          ticketName={pageTitle}
        />
      )}
      {/* Reply */}
      {showReply && (
        <WriteReplyForm
          title="ncrm_desk_ticket_new_reply" //New Reply
          type={TICKET_COMMENT_KIND_REPLY}
          ticketId={menuSourceId ?? ''}
          ticketName={pageTitle}
          menuSource={menuSource ?? ''}
          parentComment={null}
          isOpen={showReply}
          onOpen={() => setShowReply(true)}
          onClose={() => setShowReply(false)}
        />
      )}
      {/* Forward */}
      {showForward && (
        <WriteReplyForm
          title="ncrm_desk_ticket_new_forward" //New Forward
          type={TICKET_COMMENT_KIND_FORWARD}
          ticketId={menuSourceId ?? ''}
          ticketName={pageTitle}
          menuSource={menuSource ?? ''}
          parentComment={null}
          onOpen={() => setShowForward(true)}
          isOpen={showForward}
          onClose={() => setShowForward(false)}
        />
      )}
      {showPrint && <PrintPreview isOpen={showPrint} onClose={() => setShowPrint(false)} layoutData={layoutData} />}
    </Suspense>
  );
};

export default Header;
