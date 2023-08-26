import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import NoData from '@base/components/@hanbiro/NoData';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { TICKET_COMMENT_KIND_NEW, TICKET_COMMENT_KIND_REPLY } from '@desk/ticket/config/constants';
import { Lock, TurnLeft, TurnRight } from '@mui/icons-material';
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
  useTheme
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
interface TicketRelyProps {
  data?: TicketComment[];
  onReply?: (item: TicketComment) => void;
  onForward?: (item: TicketComment) => void;
}
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`
}));
const TicketComment = (props: TicketRelyProps) => {
  const { data, onReply, onForward } = props;

  //state
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [downloadFile, setDownloadFile] = useState<any>(null);
  const theme = useTheme();
  const { t } = useTranslation();

  //init list
  useEffect(() => {
    if (data) {
      if (JSON.stringify(data) !== JSON.stringify(comments)) {
        setComments(data);
      }
    } else {
      setComments([]);
    }
  }, [data]);
  const renderTo = (aTo: UserOrCustomer[], isEmail: boolean = true): string => {
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

  const renderReplySms = (sms: SMSTicket, index: number | string) => {
    const smsTo = renderTo(sms.to ?? [], false);
    const smsCC = renderTo(sms.cc ?? [], false);
    const smsFrom = renderTo(sms.from ?? [], false);
    return (
      <>
        <Stack direction="row" alignItems="center" spacing={2}>
          <AvatarGroup max={2}>
            <SmallAvatar
              sx={{
                color: 'primary.main',
                bgcolor: 'primary.lighter'
              }}
            >
              <InboxIcon fontSize="small" />
            </SmallAvatar>
          </AvatarGroup>

          <Box>
            <Typography color="secondary" fontSize="small">
              {`---------- ${t('ncrm_desk_ticket_sms_message')} ---------`}
            </Typography>
            <Typography color="secondary" fontSize="small">
              {`${t('ncrm_desk_ticket_from')}: ${smsFrom}`}
            </Typography>
            <Typography color="secondary" fontSize="small">{`${t('ncrm_desk_ticket_subject')}: ${sms?.subject}`}</Typography>
            <Typography color="secondary" fontSize="small">
              {`${t('ncrm_desk_ticket_to')}: ${smsTo}`}
            </Typography>
            {smsCC.length > 0 && (
              <Typography color="secondary" fontSize="small">
                {`${t('ncrm_desk_ticket_cc')}:  ${smsCC}`}
              </Typography>
            )}
          </Box>
        </Stack>

        <br />
        <br />
        {renderContent(sms?.content, 'sms' + index)}
      </>
    );
  };

  const renderReplyEmail = (email: EmailTicket, index: number | string) => {
    const emailTo = renderTo(email.to ?? []);
    const emailCC = renderTo(email.cc ?? []);
    const emailFrom = renderTo(email.from ?? []);
    return (
      <>
        <Stack direction="row" alignItems="center" spacing={2}>
          <AvatarGroup max={2}>
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
          </Box>
        </Stack>

        <br />
        <br />
        {renderContent(email?.content, 'email' + index)}
        {email?.attachedFiles !== null && <CommentAttachment comment={email} />}
      </>
    );
  };

  //render new
  const renderNew = (comment: CommentTicket, index: number | string) => {
    console.log('comment render:', comment);
    return (
      <>
        <RawHTML>{comment?.content}</RawHTML>
        {comment?.attachedFiles !== null && <CommentAttachment comment={comment} />}
      </>
    );
  };

  //main content
  const renderContent = (content: string, keyIdx: string) => {
    return (
      <>
        <ReadMoreReadLess>{content}</ReadMoreReadLess>
      </>
    );
  };
  const renderComment = (item: TicketComment, index: string | number, isIncluded = false) => {
    const { comment, email, sms, kind, createdAt } = item;
    return (
      <Grid sx={{ wordBreak: 'break-all', overflowWrap: 'break-word' }} item xs={12} key={index}>
        <MainCard sx={{ bgcolor: theme.palette.grey.A50, overflow: 'hidden' }}>
          <Stack direction="row" spacing={1}>
            <IconAvatar size={'md'} url={item.createdBy?.photo} alt={item.createdBy?.name} />
            <Stack spacing={2} sx={{ flex: '1' }}>
              <Grid container justifyContent="space-between" sx={{ width: '100%' }}>
                <Grid item>
                  <Typography
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
                          mr: 1,
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
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {convertDateTimeServerToClient({ date: createdAt, humanize: true })}
                    {kind === TICKET_COMMENT_KIND_NEW && (
                      <Typography variant="caption" color="textSecondary" component="span">
                        {' '}
                        - {comment?.display === DisplayType.PRIVATE ? <Lock sx={{ fontSize: 16 }} /> : <PublicIcon sx={{ fontSize: 16 }} />}
                      </Typography>
                    )}
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonGroup size="small">
                    <Tooltip title={t('ncrm_desk_ticket_reply')}>
                      <Button size="small" variant="outlined" color="primary" onClick={() => onReply && onReply({ ...item })}>
                        <TurnLeft fontSize="small" />
                      </Button>
                    </Tooltip>
                    <Tooltip title={t('ncrm_desk_ticket_forward')}>
                      <Button size="small" variant="outlined" color="primary" onClick={() => onForward && onForward({ ...item })}>
                        <TurnRight fontSize="small" />
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <Typography component="div" variant="body2">
                {comment && renderNew({ ...comment }, index)}
                {sms && !email && renderReplySms({ ...sms }, index)}
                {email && !sms && renderReplyEmail({ ...email }, index)}

                {email && sms && !isIncluded && renderReplyEmail({ ...email }, index)}
                {email && sms && isIncluded && renderReplySms({ ...sms }, index)}
              </Typography>
            </Stack>
          </Stack>
        </MainCard>
      </Grid>
    );
  };
  return (
    <>
      {comments.length === 0 && (
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 'none' }}>
            <CardContent>
              <NoData icon="ChatBubbleOutlineOutlined" label={t('ncrm_desk_ticket_no_comments_found') as string} />
            </CardContent>
          </Card>
        </Grid>
      )}

      {comments.map((_item, index: number) => {
        if (_item.sms && _item.email) {
          return (
            <Fragment key={_item.id}>
              {renderComment(_item, `email_${_item.id}`)}
              {renderComment(_item, `sms_${_item.id}`, true)}
            </Fragment>
          );
        }
        return <Fragment key={_item.id}>{renderComment(_item, _item.id)}</Fragment>;
      })}
    </>
  );
};

export default TicketComment;
