import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Timeline as MUITimeline } from '@mui/lab';
import { Box, Button, Divider, Stack, SxProps } from '@mui/material';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';

import NoData from '@base/components/@hanbiro/NoData';
import useDevice from '@base/hooks/useDevice';
import { MENU_SOURCE } from '@base/config/menus';
import { DESC, TIMELINE_PAGE_SIZE } from '@base/config/constant';
import { queryKeys } from '@base/config/queryKeys';
import { useTimelines } from '@base/hooks/timeline/useTimelines';
import { Timeline as TypeTimeline } from '@base/types/timeLine';
import { keyStringify } from '@base/utils/helpers';
import { User } from '@base/types/user';

import Filter, { IFilter } from './Filter';
import Item from './Item';

interface TimelineProps {
  sx?: SxProps;
  isRecent?: boolean; // right mode view
  recentLimited?: number; // default 3
  menuSource?: string;
  menuSourceId?: string;
  getAssignRep?: () => User | undefined;
}

const Timeline = (props: TimelineProps) => {
  const { sx, menuSource, menuSourceId, isRecent = false, recentLimited = 3, getAssignRep } = props;

  const { isMobile } = useDevice();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [maxItems, setMaxItems] = useState<number>(3);
  const [filter, setFilter] = useState<IFilter | null>(null);
  const [queries, setQueries] = useState<string[]>([]);

  const [pageSize, setPageSize] = useState<number>(TIMELINE_PAGE_SIZE);

  useEffect(() => {
    if (filter) {
      console.log('queries', filter);
      let nQueries: string[] = [];
      if (filter.createdAt) {
        nQueries.push(['createdAt', '>=', '"' + filter.createdAt.from.toISOString() + '"'].join(''));
        nQueries.push(['createdAt', '<=', '"' + filter.createdAt.to.toISOString() + '"'].join(''));
      }
      if (filter?.createdBy) {
        console.log('do here ', filter.createdBy);

        nQueries.push(['createdBy', '=', filter.createdBy].join(''));
      }
      if (filter.action?.length > 0) {
        nQueries.push(['action', '=', filter.action.join(',')].join(''));
      }
      setQueries(nQueries);
    }
  }, [filter]);

  const timelineParams: any = {
    source: {
      menu: menuSource && MENU_SOURCE[menuSource],
      id: menuSourceId
    },
    filter: {
      filters: null,
      sort: {
        field: 'createdAt',
        orderBy: DESC
      },
      paging: {
        page: 1,
        size: isRecent ? recentLimited : pageSize
      },
      query: isRecent ? '' : queries.length ? '(' + queries.join(' ') + ')' : ''
    }
  };

  const { data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, isError } = useTimelines(
    [queryKeys.timelines, JSON.stringify(keyStringify(timelineParams, '')), menuSourceId ?? ''],
    timelineParams
  );

  console.log('...timeline...', hasNextPage, data);

  const sections = data?.pages?.[0]?.data ?? [];
  const paging = data?.pages?.[0]?.paging ?? {
    currentPage: 1,
    itemPerPage: TIMELINE_PAGE_SIZE,
    nextPage: 0,
    previousPage: 0,
    totalItems: 0,
    totalPage: 0
  };

  return (
    <Box sx={{ ...sx, ...(!isRecent && { p: '0px !important', mx: '-16px !important', mt: '-16px !important' }) }}>
      {!isRecent && (
        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
            <Filter
              onChangeFilter={(value: any) => {
                setFilter(value);
              }}
              getAssignRep={getAssignRep}
            />
          </Box>
          <Divider />
        </React.Fragment>
      )}
      {_.isEmpty(sections) && (
        <Box sx={{ padding: '16px' }}>
          <NoData />
        </Box>
      )}
      <MUITimeline
        position="right"
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: isMobile ? 0.1 : isRecent ? 0.35 : 0.17
          }
        }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {sections?.map((note: TypeTimeline, index: number) => {
          return <Item key={index} data={note} isRecent={isRecent} />;
        })}

        {hasNextPage && !isRecent && (
          <Box sx={{ pl: 2 }}>
            <Button
              size="small"
              onClick={() => {
                setPageSize(pageSize + TIMELINE_PAGE_SIZE);
              }}
            >
              {t('ncrm_common_btn_view_more')}
            </Button>
          </Box>
        )}
      </MUITimeline>
    </Box>
  );
};

export default Timeline;
