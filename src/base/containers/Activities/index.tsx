import { useCallback, useRef, useState } from 'react';

import { ACTIVITY_MENU_KEYS, ACTIVITY_VIEW_PAGE_SIZE } from '@activity/config/constants';
import { queryKeys } from '@activity/config/queryKeys';
import { default as configFields } from '@activity/config/view-field';
import { useActivityTimeline } from '@activity/hooks/useActivityTimeline';
import { getListQuery } from '@activity/services/graphql';
import { Activity } from '@activity/types/activity';
import { MENU_SOURCE } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { makeSection } from '@base/utils/helpers/makeSection';
import { buildListSchema } from '@base/utils/helpers/schema';
import { Sync } from '@mui/icons-material';
import { Box, Button, Grid, Icon, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { AntSwitch } from './AntSwitch';
import Filters from './Filter';
import Item from './Item';
import { Section, StickyHeader } from './Styles';
import { useTranslation } from 'react-i18next';
import RouteName from '@base/components/@hanbiro/RouteName';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { typeConfigs } from '@activity/config/list-field/column';
import NoData from '@base/components/@hanbiro/NoData';

export interface Filter {
  createdAt: {
    from: Date;
    to: Date;
  };
  assignedTo: string;
  category: string[];
  keyword?: string;
}

interface ActivitiesProps {
  menuSource: string;
  menuSourceId: string;
  isRecent?: boolean; // right mode view
  recentLimited?: number; // default to 3
}

const Activities = (props: ActivitiesProps) => {
  const { menuSource, menuSourceId, isRecent, recentLimited = 3 } = props;
  const { t } = useTranslation();
  //state
  const [isAutoScroll, setAutoScroll] = useState(false);
  const [filter, setFilter] = useState<Filter | null>(null);

  //hooks
  const queryClient = useQueryClient();
  const { data: listLayoutData, isLoading: isLayoutLoading } = usePageLayoutByMenu('activity_activity', 'list');

  let fields = [];
  if (listLayoutData && listLayoutData?.data) {
    fields = listLayoutData?.data;
  }

  const listQuerySchema = buildListSchema({ fields, configFields });
  const listFullQuery = getListQuery(listQuerySchema);

  let queries: string[] = [];
  if (filter != null) {
    if (filter.createdAt) {
      queries.push(['createdAt', '>=', '"' + filter.createdAt.from.toISOString() + '"'].join(''));
      queries.push(['createdAt', '<=', '"' + filter.createdAt.to.toISOString() + '"'].join(''));
    }
    if (filter.assignedTo != '') {
      queries.push(['assignedTo', '=', filter.assignedTo].join(''));
    }

    if (filter.category.length > 0) {
      queries.push(['category', '=', filter.category.join(',')].join(''));
    }

    if (filter.keyword != '') {
      queries.push(['subject', '=', filter.keyword].join(''));
    }
  }

  const params = {
    source: {
      menu: menuSource && MENU_SOURCE[menuSource],
      id: menuSourceId
    },
    filter: {
      //filters: filter,
      sort: {
        field: 'createdAt',
        orderBy: 'DESC'
      },
      paging: {
        size: ACTIVITY_VIEW_PAGE_SIZE
      },
      query: queries.length ? '(' + queries.join(' ') + ')' : null
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } = useActivityTimeline(
    [queryKeys.listActivity, menuSourceId],
    listFullQuery,
    params,
    { enabled: menuSourceId.length > 0 && !!listLayoutData } // fix first render schema only id
  );
  console.log('listActivity data', data);

  const onChangeFilter = useCallback((f: Filter | null) => {
    queryClient.removeQueries([queryKeys.listActivity, menuSourceId as string]);
    setFilter(f);
  }, []);

  const sections = makeSection(data);
  console.log('listActivity sections', sections);

  if (isRecent) {
    const recentActivities = [];

    for (const [date, activities] of Object.entries(sections)) {
      let enoughItem: boolean = false;
      for (const item of activities) {
        if (recentActivities.length < recentLimited) {
          recentActivities.push(item);
        } else {
          enoughItem = true;
          break;
        }
      }
    }

    return (
      <>
        <List sx={{ p: 0 }}>
          {recentActivities?.map((activity: Activity, index: number) => {
            const type = ACTIVITY_MENU_KEYS[activity.type];
            const url = `/activity/activity/${type}/${activity.id}`;

            return (
              <ListItem key={index} divider={index < recentActivities.length - 1}>
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
          {recentActivities.length === 0 && (
            <Box sx={{ padding: '16px' }}>
              <NoData />
            </Box>
          )}
        </List>
      </>
    );
  }

  //render
  return (
    <>
      <Grid container spacing={0} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1.5}>
          <Stack direction="row" spacing={0}>
            <AntSwitch sx={{ mt: '0.7rem' }} />
            <Typography sx={{ pt: '0.5rem' }} color="inherit">
              {t('ncrm_common_timeline_autoscroll')}
            </Typography>
          </Stack>
          <Button
            size="small"
            variant="text"
            color="inherit"
            startIcon={<Sync color="secondary" />}
            onClick={() => {
              refetch && refetch();
            }}
          >
            {t('ncrm_common_timeline_refresh')}
          </Button>
        </Stack>
        <Filters
          onChangeFilter={onChangeFilter}
          source={{
            id: menuSourceId,
            menu: MENU_SOURCE?.[menuSource] || ''
          }}
        />
      </Grid>
      <Grid sx={{ maxHeight: `calc(100vh - 200px)` }} className="scroll-box">
        {Object.entries(sections).map(([date, activities]) => {
          return (
            <Section key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {activities.map((activity) => (
                <Item key={activity.id} data={activity as Activity} />
              ))}
            </Section>
          );
        })}
      </Grid>
    </>
  );
};

export default Activities;
