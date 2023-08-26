import React, { useEffect, useState } from 'react';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { ChartComponentProps } from '@analytic/main/components/ChartBox';
import { useGetCustomerLastUpdatedList } from '@analytic/main/hooks/useGetCustomerLastUpdatedList';
import { DatasPromise } from '@base/types/response';
import { Customer } from '@analytic/main/types/interfaces/customer';

const CustomerUpdated = (props: ChartComponentProps) => {
  const { filters = {}, setToolbarProps, setLoading } = props;

  const { data, refetch, fetchNextPage, hasNextPage, isFetching, isLoading } = useGetCustomerLastUpdatedList({
    filter: {
      paging: {
        page: 1,
        size: 15
      }
    }
  });

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
        <Grid container spacing={2.5} alignItems="center" sx={{ p: '15px' }}>
          {data?.pages
            ? data.pages?.map((page: DatasPromise<Customer[]>) => {
                return page.data?.map((v: Customer) => {
                  return (
                    <Grid item xs={12} key={v.id}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <HanAvatar key={v.id} name={v.name} size="sm" />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <Typography
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                            align="left"
                            variant="subtitle1"
                          >
                            {!!v?.name ? v?.name : '---No Name---'}
                          </Typography>
                          <Typography align="left" variant="caption" color="secondary">
                            Project Leader
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography align="left" variant="caption">
                            {convertDateTimeServerToClient({
                              date: v.updatedAt,
                              humanize: true
                            })}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                });
              })
            : null}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default CustomerUpdated;
