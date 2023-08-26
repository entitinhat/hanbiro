import { CommentOutlined } from '@ant-design/icons';
import NoData from '@base/components/@hanbiro/NoData';
import MainCard from '@base/components/App/MainCard';
import { useKnowledgeCommentMutation } from '@desk/knowledge-base/hooks/useKBCommentMutation';
import { useKBCommentList } from '@desk/knowledge-base/hooks/useKBComments';
import { KBComment } from '@desk/knowledge-base/types/knowledge';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import WriteCommentForm from '../WriteCommentForm';
import Comment from './Comment';
interface ViewCommentProps {
  knowledgeId: string;
  knowledgeName: string;
  menuSource: string;
}
const ViewComment = (props: ViewCommentProps) => {
  const { knowledgeId, menuSource, knowledgeName } = props;
  const { t } = useTranslation();
  const [maxItem, setMaxItem] = useState<number>(3);
  const [isOpenWrite, setIsOpenWrite] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<KBComment[]>([]);
  const params = {
    filter: {
      query: `kb=${knowledgeId}`
    }
  };
  const { data: postData, refetch } = useKBCommentList(params);
  const { mutationDelete } = useKnowledgeCommentMutation();
  useEffect(() => {
    if (postData?.data) {
      setCommentList(postData?.data);
    }
  }, [postData]);

  const onDelete = (id: string) => {
    mutationDelete.mutate({ ids: [id] });
  };
  useEffect(() => {
    if (mutationDelete.isSuccess) refetch && refetch();
  }, [mutationDelete.isSuccess]);
  return (
    <>
      <MainCard
        border={false}
        title="Comment"
        sx={{ p: 0 }}
        contentSX={{ p: 0 }}
        secondary={
          <Button variant="contained" startIcon={<CommentOutlined />} onClick={() => setIsOpenWrite(true)} size="small">
            <Typography component="span" sx={{ whiteSpace: 'nowrap' }}>
              {t(`Comment`)}
            </Typography>
          </Button>
        }
      >
        {commentList?.length == 0 ? (
          <NoData />
        ) : (
          <>
            {commentList.map((item, indx: number) => {
              if (indx < maxItem) return <Comment key={indx} item={item} onDelete={onDelete} />;
            })}
            {commentList?.length > maxItem && (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  variant="text"
                  onClick={() => {
                    setMaxItem(commentList.length + 1);
                  }}
                >
                  View All
                </Button>
              </Box>
            )}
          </>
        )}
      </MainCard>
      {isOpenWrite && (
        <WriteCommentForm //ticketId
          title={'ncrm_desk_ticket_new_comment'} //New Comment
          menuSource={menuSource}
          isOpen={isOpenWrite}
          onClose={() => setIsOpenWrite(false)}
          onReload={refetch}
          knowledgeId={knowledgeId}
          knowledgeName={knowledgeName}
        />
      )}
    </>
  );
};
export default ViewComment;
