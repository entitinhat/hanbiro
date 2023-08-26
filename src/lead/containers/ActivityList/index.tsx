import { ACTIVITY_MENU_KEYS } from '@activity/config/constants';
import { typeConfigs } from '@activity/config/list-field/column';
import { Activity } from '@activity/types/activity';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import RouteName from '@base/components/@hanbiro/RouteName';
import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEAD_ACTIVITY_DUMMY_DATA } from './DummyData';

interface ActivityListProps {}
const ActivityList = (props: ActivityListProps) => {
  const [data, setData] = useState<any[]>([]);
  const [maxPaging, setMaxPaging] = useState<number>(5);

  //hooks
  const theme = useTheme();
  const navigate = useNavigate();

  //get data
  const listData = LEAD_ACTIVITY_DUMMY_DATA;
  useEffect(() => {
    if (listData) {
      setData(listData);
    }
  }, [listData]);

  //handlers
  const onLoadMore = () => {
    setMaxPaging(maxPaging + 5);
  };

  const border = '1px solid ' + theme.palette.divider;

  return (
    <>
      <List sx={{ p: 0 }}>
        {data?.map((activity: Activity, index: number) => {
          const type = ACTIVITY_MENU_KEYS[activity.type];
          const url = `/activity/activity/${type}/${activity.id}`;

          if (index > maxPaging - 1) return;
          return (
            <ListItem key={index} divider={index < maxPaging - 1}>
              <ListItemIcon>
                <FormIcon icon={typeConfigs?.[activity.type]?.icon || ''} iconType="icon" fontSize="small" />
              </ListItemIcon>
              <ListItemText
                sx={{ display: 'flex' }}
                primary={<RouteName name={activity.subject} url={url} variant="body1" />}
                primaryTypographyProps={{ sx: { textOverflow: 'clip', maxWidth: '100%', variant: 'body1' } }}
              />
            </ListItem>
          );
        })}
      </List>
      {/* {data.length > maxPaging && (
            <>
              <Divider />
              <LoadingButton
                sx={{ padding: '3px 8px', m: '8px 16px' }}
                size="small"
                startIcon={<Add />}
                className="w-100 bd-0"
                onClick={() => {
                  onLoadMore && onLoadMore();
                }}
                loading={false}
              >
                Load More
              </LoadingButton>
            </>
          )} */}
    </>
  );
};

export default ActivityList;
