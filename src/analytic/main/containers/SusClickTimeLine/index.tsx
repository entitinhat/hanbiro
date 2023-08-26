import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import { ChartComponentProps } from '@analytic/main/components/ChartBox';
import { DatasPromise } from '@base/types/response';
import { useGetSusClicksList } from '@analytic/main/hooks/useGetSusClicksList';
import { SusClick } from '@analytic/main/types/interfaces/sus';
import { Section, StickyHeader } from '@base/containers/TimeLine/Styles';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineDot,
  TimelineSeparator,
  TimelineContent,
  TimelineOppositeContent
} from '@mui/lab';
import { forEach, keys, merge } from 'lodash';
import dayjs from 'dayjs';
import { TouchApp } from '@mui/icons-material';
import NoData from '@base/components/@hanbiro/NoData';

interface Timeline {
  date: string;
  items: SusClick[];
}

const processTimeline = (pages: DatasPromise<SusClick[]>[]): Timeline[] => {
  const data = pages?.reduce((f: any, page: DatasPromise<SusClick[]>) => {
    forEach(page.data, (d: SusClick) => {
      const createdAtDayJs = dayjs(d.createdAt);
      const date = createdAtDayJs.format('YYYY-MM-DD');
      const time = createdAtDayJs.format('hh:mm A');
      const extraData = JSON.parse(d?.extraData ?? '') ?? {};
      if (!f?.[date]) {
        f[date] = [];
      }
      f[date] = [...f[date], { ...d, ...extraData, createdTime: time }];
    });
    return f;
  }, {});

  return keys(data)
    .sort((a, b) => -1 * a.localeCompare(b))
    .map((k) => ({
      date: k,
      items: data[k]
    }));
};

const SusClickTimeLine = (props: ChartComponentProps) => {
  const { filters = {}, setToolbarProps, setLoading } = props;

  const [timelines, setTimelines] = useState<Timeline[]>([]);

  const params = merge(
    {
      filter: {
        paging: {
          page: 1,
          size: 15
        },
        sort: { field: 'createdAt', orderBy: 2 }
      }
    },
    filters
  );

  const { data, refetch, fetchNextPage, hasNextPage, isFetching, isLoading } = useGetSusClicksList(params);

  useEffect(() => {
    setLoading && setLoading(isLoading || isFetching);
  }, [isLoading, isFetching]);

  const onLoadMore = () => {
    if (!isFetching) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    setToolbarProps &&
      setToolbarProps({
        onRefetch: refetch
      });
  }, []);

  useEffect(() => {
    const timelines = processTimeline(data?.pages ?? []);
    setTimelines(timelines);
  }, [data]);

  return (
    <Box sx={{ height: '100%' }} className="scroll-box">
      <InfiniteScroll
        initialLoad={false}
        loadMore={onLoadMore}
        hasMore={hasNextPage}
        useWindow={false}
        loader={
          <Box display="flex" justifyContent="center" py="10px" key={0}>
            <CircularProgress className="loader" size={20} />
          </Box>
        }
      >
        {!timelines?.length && <NoData />}
        {!!timelines?.length &&
          timelines?.map((v: Timeline) => {
            const items: SusClick[] = v?.items ?? [];
            return (
              <Section key={v?.date ?? '-'}>
                <StickyHeader
                  sx={{
                    justifyContent: 'flex-start',
                    '& > button': {
                      left: '10px'
                    }
                  }}
                >
                  <button>{v?.date ?? '-'}</button>
                </StickyHeader>
                <Timeline sx={{ mt: 0 }} onResize={undefined} onResizeCapture={undefined}>
                  {items?.map((v: SusClick, i: number) => {
                    return (
                      <TimelineItem key={v.id}>
                        <TimelineOppositeContent sx={{ m: 'auto 0', flex: 'none' }} align="right" variant="body2" color="text.secondary">
                          {v?.createdTime ?? '--No Time--'}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color="primary">
                            <TouchApp />
                          </TimelineDot>
                          {i < items.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                          <Typography variant="h6" component="span">
                            IP: {v?.ip ?? '0.0.0.0'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            User Agent: {v?.userAgent ?? '-'}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </Section>
            );
          })}
      </InfiniteScroll>
    </Box>
  );
};

export default SusClickTimeLine;
