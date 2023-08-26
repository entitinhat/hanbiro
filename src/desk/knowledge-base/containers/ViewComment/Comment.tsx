import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import MainCard from '@base/components/App/MainCard';
import CommentAttachment from '@base/containers/Attachments/TimeAttachment/CommentAttachment';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { KBComment } from '@desk/knowledge-base/types/knowledge';
import { DeleteOutlineTwoTone } from '@mui/icons-material';
import { Grid, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface CommentProps {
  item: KBComment;
  onDelete?: (id: string) => void;
}
//render new
const renderNew = (comment: KBComment) => {
  console.log('comment render:', comment);
  return (
    <>
      <RawHTML>{comment?.content}</RawHTML>
      {/* {comment?.attachedFiles !== null && <CommentAttachment comment={comment} />} */}
    </>
  );
};

const Comment = (props: CommentProps) => {
  const { item, onDelete } = props;
  const { t } = useTranslation();

  const theme = useTheme();
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        p: 2,
        ':hover': {
          svg: {
            visibility: 'visible'
          }
        }
      }}
    >
      <IconAvatar size={'lg'} url={item.createdBy?.photo} alt={item.createdBy?.name} />
      <Stack spacing={2} sx={{ flex: '1' }}>
        <Grid container justifyContent="space-between" sx={{ width: '100%' }}>
          <Grid item sx={{ width: '85%' }}>
            <Typography // Comment content
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', width: '90%' }}
            >
              {renderNew(item)}
            </Typography>
            <Typography // Name & Date
              component="div"
              variant="body1"
              color="#8C8C8C"
              sx={{ overflow: 'clip', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', fontSize: '12px' }}
            >
              {item.createdBy?.name}
              <Typography variant="caption" color="textSecondary" marginLeft={1}>
                {convertDateTimeServerToClient({ date: item.createdAt, humanize: true })}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Tooltip title={t('Delete')}>
        <IconButton edge="end" size="large" color="error" onClick={() => onDelete && onDelete(item?.id)}>
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
    </Stack>
  );
};
export default Comment;
