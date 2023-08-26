import { PageLayoutData } from '@base/types/pagelayout';
import { Button, Grid, IconButton, InputAdornment, Stack, TextField, Typography, useTheme, CardContent, Card } from '@mui/material';
import NoData from '@base/components/@hanbiro/NoData';
import { useEffect, useMemo, useState } from 'react';
import { TurnLeft, TurnRight } from '@mui/icons-material';
import WriteReplyForm from '../WriteReplyForm';
import { useRecoilValue } from 'recoil';
import { viewDataByMenuAtom } from '@base/store/atoms';
import { getFieldLayoutDataByKeyName } from '@base/utils/helpers/pageLayoutUtils';
import { KEY_TICKET_CONTENT, KEY_TICKET_REPLY_MESSAGE, KEY_TICKET_SUBJECT } from '@desk/ticket/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { TICKET_COMMENT_KIND_FORWARD, TICKET_COMMENT_KIND_REPLY } from '@desk/ticket/config/constants';
import TicketReply from '../TicketOnlyReply';
import WriteCommentForm from '../WriteCommentForm';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import { PaperClipOutlined, PictureOutlined, SmileOutlined } from '@ant-design/icons';
import { TicketComment } from '@desk/ticket/types/comment';
import { useTicketComments } from '@desk/ticket/hooks/useTicketComments';
import MainCard from '@base/components/App/MainCard';
import { useTranslation } from 'react-i18next';

import ReplyTo from '@campaign/components/ReplyTo';
import Reply from '@desk/ticket/containers/ViewDetails/Reply';
import TicketKnowledgebases from '../TicketKnowledgebases';
import { useTicketCommentMutation } from '@desk/ticket/hooks/useTicketCommentMutation';
import TicketCommentView from '../TicketReplyFake';
import { useTicketRepliedActivities } from '@desk/ticket/hooks/useTicketRepliedActivities';
import TicketReplies from '@desk/ticket/containers/TicketReplies';

interface ViewContentProps {
  menuSource: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
}
const ViewDetails = (props: ViewContentProps) => {
  //props
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;
  console.log('🚀 ~ file: index.tsx:34 ~ ViewDetails ~ layoutData:', layoutData);

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
  const [replies, setReplies] = useState<any>([]);
  const [items, setItems] = useState<TicketComment[]>([]);

  const [curPaging, setCurPaging] = useState({ page: 1, size: 10, totalPage: 1 });
  //fields data
  const contentField = getFieldLayoutDataByKeyName(layoutData, KEY_TICKET_CONTENT);
  console.log('🚀 ~ file: index.tsx:51 ~ ViewDetails ~ contentField:', contentField);
  const replyField = getFieldLayoutDataByKeyName(layoutData, KEY_TICKET_REPLY_MESSAGE);
  //   const replyField = layoutData.data.message;
  const theme = useTheme();
  const { t } = useTranslation();

  //get list
  const { data: postsData, isFetching, refetch } = useTicketComments({ ticketId: menuSourceId, paging: curPaging });
  console.log('🚀 ~ file: index.tsx:66 ~ ViewDetails ~ postsData:', postsData);
  // console.log('postsData', postsData);
  const { mutationDelete } = useTicketCommentMutation(); // mutation delete
  const { data: ticketReplyHook, isLoading } = useTicketRepliedActivities(menuSourceId);

  useEffect(() => {
    if (mutationDelete.isSuccess) {
      refetch();
    }
  }, [mutationDelete.isSuccess]);

  useEffect(() => {
    if (ticketReplyHook?.results) {
      setReplies(ticketReplyHook.results);
    } else {
      setReplies([]);
    }
  }, [ticketReplyHook]);

  //update paging
  useEffect(() => {
    if (postsData?.data) {
      if (postsData?.paging?.currentPage !== curPaging.page) {
        setItems((curItems: any) => [...curItems, ...postsData.data]);
      } else {
        setItems(postsData.data);
      }
      // setReplies(ticketReplyHook);
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
  // delete

  const handleDelete = (comment: TicketComment) => {
    console.log('🚀 ~ file: index.tsx:100 ~ handleDelete ~ comment:', comment);

    mutationDelete.mutate({
      ids: [comment.id]
    });

    setItems(items.filter((currentComment) => currentComment.id != comment.id));
  };

  //more data
  const handleLoadMore = () => {
    if (curPaging.page < curPaging.totalPage) {
      setCurPaging((curValue: any) => ({ ...curValue, page: curValue.page + 1 }));
    }
  };
  console.log('🚀 ~ file: index.tsx:48 ~ ViewDetails ~ items:', items);
  const onlyReplies = items.filter((item) => item.kind == 'KIND_REPLY');
  console.log('🚀 ~ file: index.tsx:90 ~ onlyReplies:', onlyReplies);
  const onlyComments = items.filter((item) => item.kind == 'KIND_COMMENT');
  console.log('🚀 ~ file: index.tsx:91 ~ onlyComments:', onlyComments);
  //memo list
  console.log('🚀 ~ file: index.tsx:69 ~ ViewDetails ~ ticketReplyHook:', ticketReplyHook);
  // console.log('🚀 ~ file: index.tsx:149 ~ TicketReplyMemo ~ replies:', replies);

  const TicketCommentMemo = useMemo(() => {
    return (
      <>
        {onlyComments.length == 0 ? (
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 'none' }}>
              <CardContent>
                <NoData icon="ChatBubbleOutlineOutlined" label={t('ncrm_desk_ticket_no_comments_found') as string} />
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <TicketCommentView data={onlyComments} type={'comment'} onForward={handleForward} onDelete={handleDelete} />
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
        )}
      </>
    );
  }, [items]);

  console.log('🚀 ~ file: index.tsx:46 ~ ViewDetails ~ items:', items);

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
                // color: '#8C8C8C',
                // borderColor: '#D9D9D9'
              }}
              variant="outlined"
              color="secondary"
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
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => handleForward(layoutData.data)}
              sx={{
                '&:hover': {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main
                }
                // color: '#8C8C8C',
                // borderColor: '#D9D9D9'
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
        <MainCard sx={{ width: '100%', marginBottom: '20px', marginTop: '5px' }}>
          {contentField && (
            <ViewFields
              fields={[{ ...contentField, config: { ...contentField.config, hideFieldLabel: true } }]}
              menuSource={menuSource}
              menuSourceId={menuSourceId}
              column={1}
              readOnly={layoutData?.data?.restore?.id ? true : false}
            />
          )}
        </MainCard>
        <MainCard
          sx={{ width: '100%', marginBottom: '20px' }}
          contentSX={{ padding: 1 }}
          title={
            // <Button
            //   disabled={layoutData?.data?.restore?.id ? true : false}
            //   sx={{
            //     '&:hover': {
            //       color: theme.palette.primary.main,
            //       backgroundColor: theme.palette.primary.contrastText
            //       // borderColor: theme.palette.primary.main
            //     },
            //     color: '#262626',
            //     fontWeight: 400,
            //     padding: 0
            //     // backgroundColor: 'green'
            //   }}
            //   color="primary"
            //   variant="text"
            //   onClick={() => handleReply(layoutData.data)}
            //   size="large"
            // >
            t('ncrm_desk_ticket_reply')
            //</Button>
          }
          titleTypographyProps={{ px: 0 }}
        >
          {/* Reply section */}
          {replies?.length == 0 ? (
            <Grid item xs={12}>
              <Card sx={{ boxShadow: 'none' }}>
                <CardContent>
                  <NoData icon="ChatBubbleOutlineOutlined" label={t('ncrm_desk_ticket_no_replies_found') as string} />
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <TicketReplies data={ticketReplyHook} menuSource={menuSource} menuSourceId={menuSourceId} />
          )}
        </MainCard>
        {/* comment section */}
        <MainCard
          sx={{ width: '100%', marginBottom: '20px' }}
          contentSX={{ padding: 1 }}
          title={t('ncrm_desk_ticket_comment')}
          titleTypographyProps={{ px: 2, color: '#262626', fontWeight: 400 }}
        >
          {TicketCommentMemo}
        </MainCard>
        {/* no comments found part */}
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

export default ViewDetails;
