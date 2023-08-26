import React, { useEffect, useMemo, useState } from 'react';

//material
import { Button, ListItem } from '@mui/material';
import { Box, List, ListItemAvatar, ListItemText, Stack } from '@mui/material';

//project
import { SvgIcons } from '@base/assets/icons/svg-icons';
import LoadingButton from '@base/components/@extended/LoadingButton';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import NoData from '@base/components/@hanbiro/NoData';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import MainCard from '@base/components/App/MainCard';
import { buildTree, convertDateTimeServerToClient, getFileIcon, humanFileSize } from '@base/utils/helpers/generalUtils';

//menu
import { useSiteTicketComments } from '@public-page/site/hooks/useSiteTicketComments';
import FeedbackWriteForm from '@public-page/site/containers/desk/FeedbackWriteForm';

interface FeedbackProps {
  token: string;
  subject?: string;
  menuSourceId: string;
  isEdit?: boolean;
}

const Feedback = (props: FeedbackProps) => {
  const { token, subject, menuSourceId, isEdit = true } = props;

  //state
  const [curPaging, setCurPaging] = useState({ page: 1, size: 10, totalPage: 1 });
  const [items, setItems] = useState<any>([]);
  const [isOpenFb, setIsOpenFb] = useState(false);
  const [parentFb, setParentFb] = useState<any>(null);

  //get list
  const {
    data: postsData,
    isFetching,
    refetch
  } = useSiteTicketComments({
    ticketId: menuSourceId,
    paging: curPaging,
    token
  });
  //console.log('postsData', postsData);

  //set items
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

  //render file type icon
  const renderFileIcon = (filename: string) => {
    let icon = getFileIcon(filename);
    return <SvgIcons type={icon} />;
  };

  //render items
  const ItemsRender = useMemo(() => {
    return (
      <Stack spacing={1.25}>
        {items.length === 0 && <NoData label="No feedback found." />}
        {items.map((_item: any, index: number) => (
          <MainCard
            key={index}
            sx={{
              '& .MuiCardHeader-root': {
                p: 0
              }
            }}
            title={
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                  <ListItemAvatar>
                    <IconAvatar url={_item?.photo || ''} alt={_item.createdBy.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={_item.createdBy.name}
                    secondary={convertDateTimeServerToClient({
                      date: _item.createdAt,
                      formatOutput: 'YYYY-MM-DD HH:mm:ss'
                    })}
                  />
                </ListItem>
              </List>
            }
            secondary={
              <Box sx={{ px: 2 }}>
                <Button
                  color="primary"
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setParentFb(_item);
                    setIsOpenFb(true);
                  }}
                >
                  Feedback
                </Button>
              </Box>
            }
          >
            <Stack spacing={1}>
              <RawHTML>{_item.comment.content}</RawHTML>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {_item?.comment?.attachedFiles?.map((_file: any, fIndex: number) => (
                  <ListItem key={fIndex}>
                    <ListItemAvatar>{renderFileIcon(_file.name)}</ListItemAvatar>
                    <ListItemText
                      primary={humanFileSize(_file.size || 1)}
                      secondary={convertDateTimeServerToClient({
                        date: _file.createdAt?.toString(),
                        formatOutput: 'YYYY-MM-DD HH:mm:ss'
                      })}
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </MainCard>
        ))}
      </Stack>
    );
  }, [items]);

  //an item node
  const renderNodeItem = (node: any) => {
    return (
      <MainCard
        key={node.id}
        sx={{
          '& .MuiCardHeader-root': {
            p: 0
          }
        }}
        title={
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemAvatar>
                <IconAvatar url={node?.photo || ''} alt={node.createdBy.name} />
              </ListItemAvatar>
              <ListItemText
                primary={node.createdBy.name}
                secondary={convertDateTimeServerToClient({
                  date: node.createdAt,
                  formatOutput: 'YYYY-MM-DD HH:mm:ss'
                })}
              />
            </ListItem>
          </List>
        }
        secondary={
          <Box sx={{ px: 2 }}>
            {isEdit && (
              <Button
                color="primary"
                size="small"
                variant="outlined"
                onClick={() => {
                  setParentFb(node);
                  setIsOpenFb(true);
                }}
              >
                Feedback
              </Button>
            )}
          </Box>
        }
      >
        <Stack spacing={1}>
          <RawHTML>{node.comment.content}</RawHTML>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {node?.comment?.attachedFiles?.map((_file: any, fIndex: number) => (
              <ListItem key={fIndex}>
                <ListItemAvatar>{renderFileIcon(_file.name)}</ListItemAvatar>
                <ListItemText
                  primary={humanFileSize(_file.size || 1)}
                  secondary={convertDateTimeServerToClient({
                    date: _file.createdAt?.toString(),
                    formatOutput: 'YYYY-MM-DD HH:mm:ss'
                  })}
                />
              </ListItem>
            ))}
          </List>
        </Stack>
        {node?.children?.length > 0 && renderTreeItems(node.children)}
      </MainCard>
    );
  };

  //items list by tree
  const renderTreeItems = (treeItems: any[]) => {
    return <Stack spacing={1.25}>{treeItems.map((_item: any) => renderNodeItem(_item))}</Stack>;
  };

  const treeItems = buildTree(items, undefined);
  //console.log('treeItems', treeItems);

  return (
    <>
      <MainCard title="Feedback">
        {/* {ItemsRender} */}
        {renderTreeItems(treeItems)}
        {curPaging.page < curPaging.totalPage && (
          <LoadingButton color="lime" loading={false} loadingPosition={'start'} onClick={handleLoadMore}>
            Load More...
          </LoadingButton>
        )}
      </MainCard>
      {isEdit && (
        <FeedbackWriteForm
          isOpen={isOpenFb}
          ticketId={menuSourceId}
          ticketName={subject as string}
          parentId={parentFb?.id || ''}
          onClose={() => setIsOpenFb(false)}
          onReload={refetch}
        />
      )}
    </>
  );
};

export default Feedback;
