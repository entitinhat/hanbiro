import React, { useEffect, useMemo, useState } from 'react';
import TicketReply from '@desk/ticket/containers/TicketReply';
import { Button, CircularProgress, Grid } from '@mui/material';
import { useTicketComments } from '@desk/ticket/hooks/useTicketComments';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

interface CommentsProps {
  menuSource: string;
  menuSourceId: string;
}

const Comments = (props: CommentsProps) => {
  const { menuSource, menuSourceId } = props;

  //state
  const [items, setItems] = useState<any>([]);
  const {t} = useTranslation()
  const [curPaging, setCurPaging] = useState({ page: 1, size: 20, totalPage: 1 });

  //get list
  const { data: postsData, isFetching } = useTicketComments({ ticketId: menuSourceId, paging: curPaging });
  //// console.log('postsData', postsData);

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

  //more data
  const handleLoadMore = () => {
    if (curPaging.page < curPaging.totalPage) {
      setCurPaging((curValue: any) => ({ ...curValue, page: curValue.page + 1 }));
    }
  };

  //memo list
  const TicketReplyMemo = useMemo(() => {
    return (
      <>
        <TicketReply data={items} />
        {curPaging.page < curPaging.totalPage && (
          <LoadingButton variant="outlined" sx={{ width: '100%' }} className="w-100 bd-0" onClick={handleLoadMore} loading={isFetching}>
            {t('ncrm_desk_ticket_load_more')}...
          </LoadingButton>
        )}
      </>
    );
  }, [items]);

  return (
    <Grid sx={{ width: '100%' }}>
      {isFetching && <CircularProgress />}
      {TicketReplyMemo}
    </Grid>
  );
};

export default Comments;
