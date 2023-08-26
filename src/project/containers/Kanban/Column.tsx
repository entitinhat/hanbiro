import InfiniteScroll from 'react-infinite-scroller';
import { useRecoilValue } from 'recoil';

import { KanbanColumn } from '@base/types/kanban';
import { MENU_PROJECT } from '@base/config/menus';
import useInfinitePosts from '@base/hooks/useInfinitePosts';
import { pageDataByMenuAtom } from '@base/store/atoms';
import { FilterInput } from '@base/types/common';
import { DatasPromise } from '@base/types/response';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ListGridCard from '../ListGridCard';
import { Task } from '../../types/task';
import { getQuery } from '../../pages/ListPage/Task/Helper';
import { queryKeys } from '../../config/queryKeys';

interface KanbanColumnProps {
  column: KanbanColumn;
  category: string;
}

const KanbanColumn = ({ column, category }: KanbanColumnProps) => {
  console.log('kanban column', category);
  const theme = useTheme();
  const pageDataKey = `${MENU_PROJECT}_${category}`;
  const pageData = useRecoilValue(pageDataByMenuAtom(pageDataKey));
  const { filter } = pageData;

  const sectionFilter = {
    ...filter,
    headerFilters: {
      ...filter?.headerFilters,
      section: column.id
    }
  };
  const filtersQuery: FilterInput = {
    keyword: sectionFilter?.keyword ?? '',
    sort: sectionFilter?.sort,
    paging: sectionFilter?.paging,
    query: getQuery(sectionFilter)
  };

  const data = { pages: [] as any };
  const fetchNextPage = () => {};
  const hasNextPage = false;

  // const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfinitePosts<Task[]>(
  //   [queryKeys.listTask, category, column.id],
  //   '',
  //   {
  //     filter: filtersQuery
  //   },
  //   {
  //     enabled: !!category,
  //     // refetchOnMount: true,
  //     // refetchOnReconnect: true,
  //     // refetchOnWindowFocus: true,
  //     // refetchInterval: 60000, // 60 seconds
  //   }
  // );

  const onScroll = () => {
    fetchNextPage();
  };

  const totalItems = data?.pages?.[data.pages.length - 1]?.paging?.totalItems;

  return (
    <Box
      sx={{
        width: '25%',
        minWidth: '200px',
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        background: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.secondary.lighter,
        border: '1px solid',
        borderColor: theme.palette.divider,
        padding: 1,
        borderRadius: 2
      }}
    >
      <Grid alignItems="center" sx={{ px: 1.5, py: 1 }}>
        <Typography
          sx={{
            fontWeight: 500
          }}
        >
          {column.title} ({totalItems})
        </Typography>
      </Grid>
      <CardContent
        sx={{
          mt: '0.5rem',
          height: 'calc(100vh - 260px)',
          minHeight: 0,
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          px: 0,
          py: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* {isFetching && <LoadingCircular loading={isLoading} />} */}
        <InfiniteScroll initialLoad={false} loadMore={onScroll} hasMore={hasNextPage}>
          {data?.pages ? (
            data.pages?.map((page: DatasPromise<Task[]>) => {
              return page.data?.map((card: Task) => {
                // return <KanbanCard key={card.id} card={card} />;
                return (
                  <ListGridCard
                    key={card.id}
                    data={card}
                    category={category}
                    column={column}
                    kanban={true}
                    sx={{
                      position: 'relative',
                      border: '1px solid',
                      borderRadius: 1,
                      px: 1.5,
                      py: 1,
                      minHeight: 130,
                      mb: 1,
                      borderColor: theme.palette.divider
                    }}
                  />
                );
              });
            })
          ) : (
            <></>
          )}
        </InfiniteScroll>
      </CardContent>
    </Box>
  );
};

export default KanbanColumn;
