import { ActivityStatusOptions, ACTIVITY_MENU_DEFAULT, ACTIVITY_MENU_KEYS, ACTIVITY_MENU_TASK } from '@activity/config/constants';
import { ACTIVITY_ADD_OPTIONS } from '@activity/pages/ListPage/Toolbar';
import WritePage from '@activity/pages/WritePage';
import { RelatedActivity } from '@activity/types/activity';
import AddingMenu, { AddingMenuProps } from '@base/components/@hanbiro/List/ListToolbar/AddingMenu';
import NoData from '@base/components/@hanbiro/NoData';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { MENU_ACTIVITY } from '@base/config/menus';
import useSnackBar from '@base/hooks/useSnackBar';
import { WriteOption } from '@base/types/common';
import { BaseMutationResponse } from '@base/types/response';
import { useRelatedActivity } from '@desk/ticket/hooks/useRelatedActivity';
import useRelatedActivityMutation from '@desk/ticket/hooks/useRelatedActivityMutation';
import { DeleteTwoTone } from '@ant-design/icons';
import { Chip, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/material';
import { keys } from 'lodash';
import { useEffect, useState } from 'react';
import { ActivityQuickView } from '@base/containers/QuickView';
import { Grid } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import RouteName from '@base/components/@hanbiro/RouteName';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import ReadMoreReadLess from './ReadMoreReadLess';
import { convertUTCDateToNormalDate } from '@base/utils/helpers/dateUtils';

interface TicketRepliesProps {
  menuSource: string;
  menuSourceId: string;
  // isSmall?: boolean;
  // addingMenuProps?: AddingMenuProps;
  data: any;
}

const TicketReplies = (props: TicketRepliesProps) => {
  const { menuSourceId, data } = props;
  // const { results } = data;
  console.log('🚀 ~ file: index.tsx:36 ~ TicketReplies ~ menuSourceId:', menuSourceId);
  // const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const theme = useTheme();
  const { enqueueSuccessBar } = useSnackBar();
  const [replies, setReplies] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      if (data)
        if (JSON.stringify(data) !== JSON.stringify(replies)) {
          setReplies(data.results);
        }
    } else {
      setReplies([]);
    }
  }, [data]);

  console.log('🚀 ~ file: index.tsx:36 ~ TicketReplies ~ data:', data);
  console.log('🚀 ~ file: index.tsx:40 ~ TicketReplies ~ replies:', replies);
  // const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  // const addOptions = keys(ACTIVITY_ADD_OPTIONS).map((k: string) => {
  //   return {
  //     label: ACTIVITY_ADD_OPTIONS[k].name,
  //     value: k,
  //     icon: ACTIVITY_ADD_OPTIONS[k].icon
  //   };
  // });
  //state
  // const [items, setItems] = useState<any>([]);

  // const handleDelete = (item: RelatedActivity) => {
  //   mDeleteActivites.mutate(
  //     { ids: [item.id] },
  //     {
  //       onSuccess: (res: BaseMutationResponse) => {
  //         const nItems = items.filter((temp: RelatedActivity) => {
  //           return item.id != temp.id;
  //         });
  //         setItems(nItems);
  //         enqueueSuccessBar('Activity has removed!');
  //       },
  //       onError: (res: any) => {
  //         enqueueSuccessBar('Activity has failed!');
  //       }
  //     }
  //   );
  // };

  // const addingMenuProps = {
  //   items: addOptions,
  //   onClick: (item: string) => {
  //     setWriteOption({
  //       writeType: item === ACTIVITY_MENU_DEFAULT ? ACTIVITY_MENU_TASK : item,
  //       isOpenWrite: true
  //     });
  //   }
  // };

  //init list
  // useEffect(() => {
  //   if (data?.results) {
  //     setItems(data.results);
  //   } else {
  //     setItems([]);
  //   }
  // }, [data]);
  //items view
  // const renderItems = () => {
  //   return (
  //     <>
  //       <div>hello</div>
  //     </>
  //   );
  // };
  const renderContent = (content: string, keyIdx: string) => {
    return <ReadMoreReadLess>{content}</ReadMoreReadLess>;
  };
  return (
    <>
      {replies?.map((reply, index) => (
        <Grid sx={{ wordBreak: 'break-all', overflowWrap: 'break-word' }} item xs={12} key={index}>
          <Box>
            <ListItem sx={{ pr: 0, my: 0, display: 'flex', alignItems: 'flex-start' }}>
              <ListItemIcon sx={{ mr: 0.5 }}>
                {reply.direction === 'DIRECTION_OUT' ? (
                  <ArrowUpward sx={{ color: '#1890FF' }} />
                ) : (
                  <ArrowDownward sx={{ color: '#1890FF' }} />
                )}
              </ListItemIcon>
              <ListItemText
                sx={{ display: 'flex' }}
                primary={<RouteName name={reply.to[0].name} url={''} color="#8C8C8C" />}
                secondary={<RouteName name={convertUTCDateToNormalDate(reply.createdAt)} url={''} color="rgba(0, 0, 0, 0.54)" />}
                primaryTypographyProps={{ marginRight: 1 }}
              />
            </ListItem>
            <ListItem sx={{ py: 0, my: 0, px: 3 }}>
              <ListItemText primary={renderContent(reply?.content, 'reply' + index)} color="#262626" />
            </ListItem>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default TicketReplies;
