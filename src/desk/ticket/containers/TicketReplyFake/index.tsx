import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import NoData from '@base/components/@hanbiro/NoData';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { TICKET_COMMENT_KIND_NEW, TICKET_COMMENT_KIND_REPLY } from '@desk/ticket/config/constants';
import { Lock, TurnLeft, TurnRight, ArrowUpward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DeleteTwoTone } from '@ant-design/icons';

import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  styled,
  Tooltip,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InboxIcon from '@mui/icons-material/Inbox';
import { DisplayType } from '@desk/knowledge-base/types/knowledge';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import MainCard from '@base/components/App/MainCard';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PublicIcon from '@mui/icons-material/Public';
import ReadMoreReadLess from './ReadMoreReadLess';
import { CommentTicket, EmailTicket, SMSTicket, TicketComment } from '@desk/ticket/types/comment';
import { UserOrCustomer } from '@activity/types/activity';
import CommentAttachment from '@base/containers/Attachments/TimeAttachment/CommentAttachment';
import { useTranslation } from 'react-i18next';
import KBs from '@desk/knowledge-base/containers/AssignKBsContainer/KBs';
import { DeleteOutlineTwoTone } from '@mui/icons-material';
import RouteName from '@base/components/@hanbiro/RouteName';

interface TicketCommentProps {
  data?: TicketComment[];
  type: 'reply' | 'comment';
  onReply?: (item: TicketComment) => void;
  onForward?: (item: TicketComment) => void;
  onDelete?: (item: TicketComment) => void;
}
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`
}));
const TicketCommentView = (props: TicketCommentProps) => {
  const { data, type, onReply, onForward, onDelete } = props;
  // console.log('🚀 ~ file: index.tsx:53 ~ TicketReply ~ data:', data);

  //state
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [replies, setReplies] = useState<TicketComment[]>([]);
  const [downloadFile, setDownloadFile] = useState<any>(null);
  // console.log('🚀 ~ file: index.tsx:59 ~ TicketReply ~ hoverItem:', hoverItem);

  const theme = useTheme();
  const { t } = useTranslation();

  // data?.map((item) => {
  //   if (item.kind === 'KIND_REPLY') {
  //     setReplies([...replies, item]);
  //   } else if (item.kind === 'KIND_COMMENT') {
  //     setComments([...comments, item]);
  //   }
  // });

  //init list
  useEffect(() => {
    if (data) {
      if (data)
        if (JSON.stringify(data) !== JSON.stringify(comments)) {
          setComments(data);
        }
    } else {
      setComments([]);
    }
  }, [data]);

  // console.log('🚀 ~ file: index.tsx:57 ~ TicketReply ~ comments:', comments);

  // const onlyReplies = comments.filter((item) => item.kind == 'KIND_REPLY');
  // console.log('🚀 ~ file: index.tsx:90 ~ onlyReplies:', onlyReplies);
  // const onlyComments = comments.filter((item) => item.kind == 'KIND_COMMENT');
  // console.log('🚀 ~ file: index.tsx:91 ~ onlyComments:', onlyComments);

  const renderTo = (aTo: UserOrCustomer[], isEmail: boolean): string => {
    const results: string[] = [];
    if (aTo.length) {
      aTo.map((to) => {
        const extra = isEmail ? to.email : to.phone;
        const value = `${to.name} <${extra ?? ''}>`;
        results.push(value);
      });
    }
    return results.join(',');
  };

  // const renderReplySms = (sms: SMSTicket, index: number | string) => {
  //   const smsTo = renderTo(sms.to ?? [], false);
  //   const smsCC = renderTo(sms.cc ?? [], false);
  //   const smsFrom = renderTo(sms.from ?? [], false);
  //   return (
  //     <>
  //       <Stack direction="row" alignItems="center" spacing={2}>
  //         <AvatarGroup max={2}>
  //           <SmallAvatar
  //             sx={{
  //               color: 'primary.main',
  //               bgcolor: 'primary.lighter'
  //             }}
  //           >
  //             <InboxIcon fontSize="small" />
  //           </SmallAvatar>
  //         </AvatarGroup>

  //         <Box>
  //           <Typography color="secondary" fontSize="small">
  //             {`---------- ${t('ncrm_desk_ticket_sms_message')} ---------`}
  //           </Typography>
  //           <Typography color="secondary" fontSize="small">
  //             {`${t('ncrm_desk_ticket_from')}: ${smsFrom}`}
  //           </Typography>
  //           <Typography color="secondary" fontSize="small">{`${t('ncrm_desk_ticket_subject')}: ${sms?.subject}`}</Typography>
  //           <Typography color="secondary" fontSize="small">
  //             {`${t('ncrm_desk_ticket_to')}: ${smsTo}`}
  //           </Typography>
  //           {smsCC.length > 0 && (
  //             <Typography color="secondary" fontSize="small">
  //               {`${t('ncrm_desk_ticket_cc')}:  ${smsCC}`}
  //             </Typography>
  //           )}
  //         </Box>
  //       </Stack>

  //       <br />
  //       <br />
  //       {renderContent(sms?.content, 'sms' + index)}
  //     </>
  //   );
  // };

  const renderReplyEmail = (item: TicketComment, index: number | string) => {
    const { email, createdAt } = item;
    // console.log('🚀 ~ file: index.tsx:147 ~ renderReplyEmail ~ email:', email);
    const emailTo = renderTo(email?.to ?? [], true);
    const emailCC = renderTo(email?.cc ?? [], true);
    const emailFrom = renderTo(email?.from ?? [], true);
    // console.log('🚀 ~ file: index.tsx:163 ~ renderReplyEmail ~ emailFrom:', emailFrom);
    const emailFromOnlyName = emailFrom.slice(0, emailFrom.indexOf('<'));
    // console.log('🚀 ~ file: index.tsx:165 ~ renderReplyEmail ~ emailFromOnlyName:', emailFromOnlyName);

    return (
      <>
        <Grid sx={{ wordBreak: 'break-all', overflowWrap: 'break-word' }} item xs={12} key={index}>
          <Box>
            {/* <AvatarGroup max={2}>
                <SmallAvatar
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                  }}
                >
                  <MailOutlineIcon color="info" fontSize="small" />
                </SmallAvatar>
              </AvatarGroup>

              <Box>
                <Typography color="secondary" fontSize="small">
                  {`---------- ${t('ncrm_desk_ticket_email_message')} ---------`}
                </Typography>
                <Typography color="secondary" fontSize="small">
                  {`${t('ncrm_desk_ticket_from')}: ${emailFrom}`}
                </Typography>
                <Typography color="secondary" fontSize="small">{`${t('ncrm_desk_ticket_subject')}: ${email?.subject}`}</Typography>
                <Typography color="secondary" fontSize="small">
                  {`${t('ncrm_desk_ticket_to')}: ${emailTo}`}
                </Typography>
                {emailCC.length > 0 && (
                  <Typography color="secondary" fontSize="small">
                    {`${t('ncrm_desk_ticket_cc')}:  ${emailCC}`}
                  </Typography>
                )}
                {renderContent(email?.content, 'email' + index)}
              </Box> */}
            <ListItem sx={{ py: 0, my: 0 }}>
              <ListItemIcon>
                <ArrowUpward sx={{ color: '#1890FF' }} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: 'flex' }}
                primary={<RouteName name={emailFromOnlyName} url={''} color="#8C8C8C" />}
                secondary={
                  <RouteName
                    name={convertDateTimeServerToClient({ date: createdAt, humanize: true }) || ''}
                    url={''}
                    color="rgba(0, 0, 0, 0.54)"
                  />
                }
                primaryTypographyProps={{ marginRight: 1 }}
              />
            </ListItem>
            <ListItem sx={{ py: 0, my: 0, px: 3 }}>
              <ListItemText primary={renderContent(email?.content, 'email' + index)} color="#262626" />
            </ListItem>
          </Box>
        </Grid>
        {/* {email?.attachedFiles !== null && <CommentAttachment comment={email} />} */}
      </>
    );
  };

  const renderReplySms = (item: TicketComment, index: number | string) => {
    const { sms, createdAt } = item;
    const smsTo = renderTo(sms?.to ?? [], false);
    const smsCC = renderTo(sms?.cc ?? [], false);
    const smsFrom = renderTo(sms?.from ?? [], false);
    // console.log('🚀 ~ file: index.tsx:159 ~ renderReplyEmail ~ sms:', sms);

    return (
      <>
        <Grid sx={{ wordBreak: 'break-all', overflowWrap: 'break-word' }} item xs={12} key={index}>
          <Box>
            <ListItem sx={{ py: 0, my: 0 }}>
              <ListItemIcon>
                <ArrowUpward sx={{ color: '#1890FF' }} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: 'flex' }}
                primary={<RouteName name={smsFrom} url={''} color="#8C8C8C" />}
                secondary={<RouteName name={createdAt || ''} url={''} color="rgba(0, 0, 0, 0.54)" />}
                primaryTypographyProps={{ marginRight: 1 }}
              />
            </ListItem>
            <ListItem sx={{ py: 0, my: 0 }}>
              <ListItemText primary={renderContent(sms?.content, 'sms' + index)} color="#262626" sx={{ width: '720px' }} />
            </ListItem>
            <ListItem sx={{ justifyContent: 'center' }}>
              <ListItemText
                primary={<RouteName name="View All" url={''} color="#1890FF" />}
                sx={{ display: 'flex', justifyContent: 'center' }}
              />
            </ListItem>
          </Box>
        </Grid>
        {/* {email?.attachedFiles !== null && <CommentAttachment comment={email} />} */}
      </>
    );
  };

  //render new
  const renderNew = (comment: CommentTicket, index: number | string) => {
    return (
      <>
        <RawHTML>{comment?.content}</RawHTML>
        {comment?.attachedFiles !== null && <CommentAttachment comment={comment} />}
      </>
    );
  };

  //main content
  const renderContent = (content: string, keyIdx: string) => {
    return <ReadMoreReadLess>{content}</ReadMoreReadLess>;
  };
  const renderComment = (item: TicketComment, index: string | number, isIncluded = false) => {
    const { comment, createdAt } = item;
    // console.log('🚀 ~ file: index.tsx:201 ~ renderComment ~ item:', item);

    return (
      <Grid sx={{ wordBreak: 'break-all', overflowWrap: 'break-word' }} item xs={12} key={index}>
        <Box
          sx={{
            px: 2.5,
            paddingTop: 2,
            ':hover': {
              svg: {
                visibility: 'visible'
              }
            }
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <IconAvatar size={'lg'} url={item.createdBy?.photo} alt={item.createdBy?.name} />
            <Stack spacing={2} sx={{ flex: '1' }}>
              <Grid container justifyContent="space-between" sx={{ width: '100%' }}>
                <Grid item sx={{ width: '85%' }}>
                  {/* <Typography
                      component="div"
                      variant="subtitle1"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                    >
                      {item.createdBy?.name}
                      <Typography color="textSecondary" component="span">
                        <Chip
                          component="span"
                          size="small"
                          sx={{
                            ml: 2,
                            '& .MuiChip-avatar': { width: '18px', height: '18px', color: theme.palette.secondary.darker },
                            backgroundColor:
                              kind === TICKET_COMMENT_KIND_NEW
                                ? theme.palette.success.light
                                : kind === TICKET_COMMENT_KIND_REPLY
                                ? theme.palette.secondary.light
                                : theme.palette.success.main
                          }}
                          label={
                            kind === TICKET_COMMENT_KIND_NEW
                              ? t('ncrm_desk_ticket_created')
                              : kind === TICKET_COMMENT_KIND_REPLY
                              ? t('ncrm_desk_ticket_replied')
                              : t('ncrm_desk_ticket_forwarded')
                          }
                          avatar={
                            kind === TICKET_COMMENT_KIND_NEW ? (
                              <ChatBubbleOutlineIcon />
                            ) : kind === TICKET_COMMENT_KIND_REPLY ? (
                              <MailOutlineIcon />
                            ) : (
                              <ForwardToInboxIcon />
                            )
                          }
                        />
                      </Typography>
                    </Typography> */}
                  <Typography // Comment content
                    component="div"
                    variant="body1"
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', width: '720px' }}
                  >
                    {/* {comment && renderNew({ ...comment }, index)} */}
                    {renderContent(comment?.content, 'comment' + index)}
                    {/* {sms && !email && renderReplySms({ ...sms }, index)}
                    {email && !sms && renderReplyEmail({ ...email }, index)}
                    {email && sms && !isIncluded && renderReplyEmail({ ...email }, index)}
                    {email && sms && isIncluded && renderReplySms({ ...sms }, index)} */}
                  </Typography>
                  <Typography // Name & Date
                    component="div"
                    variant="body1"
                    color="#8C8C8C"
                    sx={{ overflow: 'clip', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', fontSize: '12px' }}
                  >
                    {item.createdBy?.name}
                    <Typography variant="caption" color="textSecondary" marginLeft={1}>
                      {convertDateTimeServerToClient({ date: createdAt, humanize: true })}
                      {/* {kind === TICKET_COMMENT_KIND_NEW && (
                          <Typography variant="caption" color="textSecondary" component="span">
                            {' '}
                            -{' '}
                            {comment?.display === DisplayType.PRIVATE ? (
                              <Lock sx={{ fontSize: 16 }} />
                            ) : (
                              <PublicIcon sx={{ fontSize: 16 }} />
                            )}
                          </Typography>
                        )} */}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonGroup size="small">
                    {/* <Tooltip title={t('ncrm_desk_ticket_reply')}>
                        <Button size="small" variant="outlined" color="primary" onClick={() => onReply && onReply({ ...item })}>
                          <TurnLeft fontSize="small" />
                        </Button>
                      </Tooltip>
                      <Tooltip title={t('ncrm_desk_ticket_forward')}>
                        <Button size="small" variant="outlined" color="primary" onClick={() => onForward && onForward({ ...item })}>
                          <TurnRight fontSize="small" />
                        </Button>
                      </Tooltip> */}
                    <Tooltip title={t('Delete')}>
                      <IconButton edge="end" size="large" color="error" onClick={() => onDelete && onDelete({ ...item })}>
                        <DeleteOutlineTwoTone
                          fontSize="small"
                          color="error"
                          sx={{
                            my: 'auto',
                            visibility: 'hidden'
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    );
  };
  return (
    <>
      {comments.map((_item, index: number) => {
        if (type == 'reply') {
          // if (_item.sms && _item.email) {
          return (
            <Fragment key={_item.id}>
              {renderReplyEmail(_item, `email_${_item.id}`)}
              {/* {renderReplySms(_item, `sms_${_item.id}`)} */}
            </Fragment>
          );
        }
      })}
      {comments.map((_item, index: number) => {
        if (type == 'comment') {
          // if (_item.sms && _item.email) {
          return <Fragment key={_item.id}>{renderComment(_item, _item.id)}</Fragment>;
        }
      })}
      ;
    </>
  );
};

export default TicketCommentView;
