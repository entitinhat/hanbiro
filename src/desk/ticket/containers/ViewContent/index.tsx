import { PageLayoutData } from '@base/types/pagelayout';
import { alpha, Box, Button, Grid, IconButton, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { TurnLeft, TurnRight } from '@mui/icons-material';
import WriteReplyForm from '../WriteReplyForm';
import { useRecoilValue } from 'recoil';
import { viewDataByMenuAtom } from '@base/store/atoms';
import { getFieldLayoutDataByKeyName } from '@base/utils/helpers/pageLayoutUtils';
import { KEY_TICKET_CONTENT, KEY_TICKET_SUBJECT } from '@desk/ticket/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { TICKET_COMMENT_KIND_FORWARD, TICKET_COMMENT_KIND_REPLY } from '@desk/ticket/config/constants';
import TicketReply from '../TicketReply';
import WriteCommentForm from '../WriteCommentForm';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import { PaperClipOutlined, PictureOutlined, SmileOutlined } from '@ant-design/icons';
import { TicketComment } from '@desk/ticket/types/comment';
import { useTicketComments } from '@desk/ticket/hooks/useTicketComments';
import MainCard from '@base/components/App/MainCard';
import { useTranslation } from 'react-i18next';
interface ViewContentProps {
  menuSource: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
}
const ViewContent = (props: ViewContentProps) => {
  //props
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;

  //========================Get menuSourceName==================================
  const keySubIndex = layoutData?.layout?.data[0]?.children?.findIndex((_ele: any) => _ele.keyName === KEY_TICKET_SUBJECT);
  const pageTitle = keySubIndex > -1 ? layoutData.layout.data[0].children[keySubIndex].data : '';
  // console.log('layoutData---------------------------------->', layoutData);
  //==========================================================================================================
  //state
  const [isOpenReply, setIsOpenReply] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [isOpenForward, setIsOpenForward] = useState(false);
  const [activeParent, setActiveParent] = useState<TicketComment | null>(null);
  const [items, setItems] = useState<TicketComment[]>([]);
  const [curPaging, setCurPaging] = useState({ page: 1, size: 10, totalPage: 1 });
  //fields data
  const contentField = getFieldLayoutDataByKeyName(layoutData, KEY_TICKET_CONTENT);
  const theme = useTheme();
  const {t} = useTranslation();

  //get list
  const { data: postsData, isFetching, refetch } = useTicketComments({ ticketId: menuSourceId, paging: curPaging });
  // console.log('postsData', postsData);

  //update paging
  useEffect(() => {
    if (postsData?.data) {
      if (postsData?.paging?.currentPage !== curPaging.page) {
        setItems((curItems: any) => [...curItems, ...postsData.data]);
      } else {
        setItems(postsData.data);
      }
    }
    if (postsData?.paging) {
      if (postsData.paging.currentPage !== curPaging.page || postsData.paging.totalPage !== curPaging.totalPage) {
        const newPaging = {
          ...curPaging,
          page: postsData.paging.currentPage,
          totalPage: postsData.paging.totalPage
        };
        setCurPaging(newPaging);
      }
    }
  }, [postsData]);

  //open reply
  const handleReply = (comment: TicketComment) => {
    setIsOpenReply(true);
    setActiveParent(comment);
  };

  //open forward
  const handleForward = (comment: TicketComment) => {
    setIsOpenForward(true);
    setActiveParent(comment);
  };
  //more data
  const handleLoadMore = () => {
    if (curPaging.page < curPaging.totalPage) {
      setCurPaging((curValue: any) => ({ ...curValue, page: curValue.page + 1 }));
    }
  };
  //memo list
  const TicketReplyMemo = useMemo(() => {
    return (
      <Grid container spacing={3}>
        <TicketReply data={items} onReply={handleReply} onForward={handleForward} />
        {curPaging.page < curPaging.totalPage && (
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center">
              <Button onClick={handleLoadMore} variant="text" sx={{ textTransform: 'none' }}>
                {/* View more comments{' '} */}
                {t('ncrm_desk_ticket_view_more_comments')}
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>
    );
  }, [items]);

  return (
    <Stack spacing={2}>
      <Grid container>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end" spacing={12 / 16} sx={{ width: '100%' }}>
            <Button
              disabled={layoutData?.data?.restore?.id ? true : false}
              sx={{
                '&:hover': {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main
                }
              }}
              startIcon={<TurnLeft fontSize="small" />}
              color="primary"
              variant="outlined"
              onClick={() => handleReply(layoutData.data)}
              size="small"
            >
              {/* Reply */}
              {t('ncrm_desk_ticket_reply')}
            </Button>
            <Button
              disabled={layoutData?.data?.restore?.id ? true : false}
              sx={{
                '&:hover': {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main
                }
              }}
              color="primary"
              variant="outlined"
              onClick={() => setIsOpenComment(true)}
              size="small"
              startIcon={<ChatBubbleOutlineIcon fontSize="small" />}
            >
              {/* Comment */}
              {t('ncrm_desk_ticket_comment')}
            </Button>
            <Button
              disabled={layoutData?.data?.restore?.id ? true : false}
              startIcon={<TurnRight fontSize="small" />}
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => handleForward(layoutData.data)}
              sx={{
                '&:hover': {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              {/* Forward */}
              {t('ncrm_desk_ticket_forward')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          height: 'calc(100vh - 220px)'
        }}
        className="scroll-box"
      >
        <MainCard sx={{ width: '100%', marginBottom: '20px' }}>
          {contentField && (
            <ViewFields
              fields={[{ ...contentField, config: { ...contentField.config, hideFieldLabel: true } }]}
              menuSource={menuSource}
              menuSourceId={menuSourceId}
              column={1}
              readOnly={layoutData?.data?.restore?.id ? true : false }
            />
          )}
        </MainCard>

        {TicketReplyMemo}
        {isOpenReply && (
          <WriteReplyForm
            title="ncrm_desk_ticket_new_reply" // New Reply
            type={TICKET_COMMENT_KIND_REPLY}
            ticketId={menuSourceId}
            ticketName={pageTitle}
            menuSource={menuSource}
            parentComment={activeParent}
            isOpen={isOpenReply}
            onOpen={() => setIsOpenReply(true)}
            onClose={() => setIsOpenReply(false)}
            onReload={refetch}
          />
        )}
        {isOpenForward && (
          <WriteReplyForm
            title="ncrm_desk_ticket_new_forward" //New Forward
            type={TICKET_COMMENT_KIND_FORWARD}
            ticketId={menuSourceId}
            ticketName={pageTitle}
            menuSource={menuSource}
            parentComment={activeParent}
            onOpen={() => setIsOpenForward(true)}
            isOpen={isOpenForward}
            onClose={() => setIsOpenForward(false)}
            onReload={refetch}
          />
        )}
        {isOpenComment && (
          <WriteCommentForm
            //ticketId
            title={'ncrm_desk_ticket_new_comment'} //New Comment
            menuSource={menuSource}
            isOpen={isOpenComment}
            onClose={() => setIsOpenComment(false)}
            onReload={refetch}
            ticketId={menuSourceId}
            ticketName={pageTitle}
          />
        )}
      </Grid>
    </Stack>
  );
};

export default ViewContent;
