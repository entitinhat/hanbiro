// import Filters from './Filter';
// import { Timeline } from '@base/types/timeLine';
// import Grid from '@mui/material/Grid';
// import { AntSwitch } from './AntSwitch';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import _ from 'lodash';
// import { makeSection } from '@base/utils/helpers/makeSection';
// import { Section, StickyHeader } from './Styles';
// import { useCallback, useState } from 'react';
// import { useQueryClient } from '@tanstack/react-query'; //v4
// import { MENU_SOURCE } from '@base/config/menus';
// import { TIMELINE_PAGE_SIZE } from '@base/config/constant';
// import Item from './Item';
// import { useTheme } from '@mui/material';
// import { Sync } from '@mui/icons-material';
// import { queryKeys } from '@base/config/queryKeys';
// import { useTimelines } from '@base/hooks/timeline/useTimelines';
// import { useTranslation } from 'react-i18next';

// interface TimeLineProps {
//   className?: string;
//   menuSource?: string;
//   menuSourceId?: string;
// }
// export interface Filter {
//   createdAt: {
//     from: Date;
//     to: Date;
//   };
//   createdBy: string;
//   action: string[];
// }

// const TimeLine = (props: TimeLineProps) => {
//   const { menuSource, menuSourceId } = props;
//   const theme = useTheme();
//   const { t } = useTranslation();
//   const [filter, setFilter] = useState<Filter | null>(null);
//   const queryClient = useQueryClient();
//   let queries: string[] = [];
//   if (filter != null) {
//     if (filter.createdAt) {
//       queries.push(['createdAt', '>=', '"' + filter.createdAt.from.toISOString() + '"'].join(''));
//       queries.push(['createdAt', '<=', '"' + filter.createdAt.to.toISOString() + '"'].join(''));
//     }
//     if (filter.createdBy != '') {
//       queries.push(['createdBy', '=', filter.createdBy].join(''));
//     }

//     if (filter.action.length > 0) {
//       queries.push(['action', '=', filter.action.join(',')].join(''));
//     }
//   }
//   const timelineParams = {
//     source: {
//       menu: menuSource && MENU_SOURCE[menuSource],
//       id: menuSourceId
//     },
//     filter: {
//       filters: filter,
//       sort: {
//         field: 'createdAt',
//         orderBy: 'DESC'
//       },
//       paging: {
//         size: TIMELINE_PAGE_SIZE
//       },
//       query: queries.length ? '(' + queries.join(' ') + ')' : null
//     }
//   };

//   const { data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, isError } = useTimelines(
//     [queryKeys.timelines, menuSourceId as string],
//     timelineParams
//   );
//   const onChangeFilter = useCallback((f: Filter | null) => {
//     queryClient.removeQueries([queryKeys.timelines, menuSourceId as string]);
//     setFilter(f);
//   }, []);

//   const sections = makeSection(data);

//   return (
//     <>
//       <Grid container spacing={0} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
//         <Stack direction="row" spacing={1.5}>
//           <Stack direction="row" spacing={0}>
//             <AntSwitch sx={{ mt: '0.7rem' }} />
//             <Typography sx={{ pt: '0.5rem' }} color="inherit">
//               {t('ncrm_common_timeline_autoscroll')}
//             </Typography>
//           </Stack>
//           <Button variant="text" color="inherit" startIcon={<Sync color="secondary" />}>
//             {t('ncrm_common_timeline_refresh')}
//           </Button>
//         </Stack>
//         <Filters onChangeFilter={onChangeFilter} />
//       </Grid>
//       <Grid sx={{ maxHeight: `calc(100vh - 200px)` }} className="scroll-box">
//         {Object.entries(sections).map(([date, notes]) => {
//           console.log('entries(sections)', date, notes);
          
//           return (
//             <Section key={date}>
//               <StickyHeader>
//                 <button>{date}</button>
//               </StickyHeader>
//               {notes.map((note) => (
//                 <Item key={note.id} data={note as Timeline} />
//               ))}
//             </Section>
//           );
//         })}
//       </Grid>
//     </>
//   );
// };

// export default TimeLine;
