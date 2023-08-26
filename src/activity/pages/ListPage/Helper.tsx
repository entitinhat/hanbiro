import React, { useMemo } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import {
  ACTIVITY_DIRECTION_IN,
  ACTIVITY_MENU_KEYS,
  ACTIVITY_TYPE_CALL,
  ACTIVITY_TYPE_MAIL,
  ACTIVITY_TYPE_PROCESS,
  ACTIVITY_TYPE_SMS,
  ACTIVITY_TYPE_TASK
} from '@activity/config/constants';
import * as keyNames from '@activity/config/keyNames';
import { statusConfigs, typeConfigs } from '@activity/config/list-field/column';
import { dateByOptions, groupByOptions, searchFields } from '@activity/config/list-field/options';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { t } from 'i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { LabelValue, SearchFilter } from '@base/types/app';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { North, South } from '@mui/icons-material';
import { Chip, Stack, Typography } from '@mui/material';
import PriorityView from '@base/containers/ViewField/Priority/View';
import { Selection } from '@settings/general/types/interface';

export const columnRenderRemap = (menu: string) => ({
  subject(col: string, data: any) {
    const name = data[col] ? data[col] : '';
    let url = '';
    console.log(`~~~~ List item data`, data);
    if (data.type == ACTIVITY_TYPE_PROCESS) {
      if (data.source?.menu == 'MENU_DESK') {
        url = `/desk/ticket/${data.source.id}`;
      }
    } else {
      const id = data.id ?? '';
      const type = ACTIVITY_MENU_KEYS[data.type];
      url = `/activity/${menu}/${type}/${id}`;
    }
    const isRead = data.isRead ?? true;

    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <FormIcon icon={typeConfigs?.[data.type]?.icon || ''} iconType="icon" size={12} />
        {data.direction &&
          (data.direction == ACTIVITY_DIRECTION_IN ? (
            <South sx={{ color: 'primary.main' }} fontSize="inherit" />
          ) : (
            <North fontSize="inherit" />
          ))}
        <RouteLink to={url} style={{ textDecoration: 'none' }}>
          <Typography noWrap color="link" style={{ fontWeight: isRead === false ? 'bold' : '400' }}>
            {name}
          </Typography>
        </RouteLink>
      </Stack>
    );
  },
  type(col: string, data: any) {
    const colData = data?.[col] ?? null;
    return colData;
  },
  confirm(col: string, data: any) {
    const colData = data?.[col] ?? t('ncrm_activity_uncomfirmed');
    return colData;
  },
  priority(col: string, data: any) {
    const colData = data?.[col] ?? null;

    const sValue: Selection = {
      keyName: colData?.keyName ?? '',
      languageKey: colData?.languageKey ?? ''
    };
    return colData ? (
      // <Chip
      //   variant="outlined"
      //   color={priorityConfigs?.[colData?.keyName]?.color}
      //   label={<SpanLang sx={{ fontSize: 12 }} keyLang={colData?.languageKey} />}
      //   size="small"
      // />
      <PriorityView value={sValue} />
    ) : (
      ''
    );
  },
  taskType(col: string, data: any) {
    return <SpanLang keyLang={data[col]?.languageKey} />;
  },
  callType(col: string, data: any) {
    return <SpanLang keyLang={data[col]?.languageKey} />;
  },
  // createdAt(col: string, data: any) {
  //   return data[col] ? <Box textAlign="right">{convertDateTimeServerToClient({ date: data[col], humanize: true })}</Box> : '';
  // },
  // updatedAt(col: string, data: any) {
  //   return data[col] ? convertDateTimeServerToClient({ date: data[col], humanize: true }) : '';
  // },
  activityDate(col: string, data: any) {
    if (data.type == ACTIVITY_TYPE_CALL || data.type == ACTIVITY_TYPE_MAIL || data.type == ACTIVITY_TYPE_SMS) {
      return data[keyNames.KEY_NAME_ACTIVITY_START_TIME] ? (
        <Typography noWrap>
          {convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_ACTIVITY_START_TIME], humanize: false })}
        </Typography>
      ) : (
        ''
      );
    } else if (data.type == ACTIVITY_TYPE_TASK) {
      return data[keyNames.KEY_NAME_ACTIVITY_END_TIME] ? (
        <Typography noWrap>
          {convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_ACTIVITY_END_TIME], humanize: false })}
        </Typography>
      ) : (
        ''
      );
    } else {
      return;
    }
  },
  status(col: string, data: any) {
    const colData = data?.[col] ?? null;
    return !!colData ? (
      <Chip
        variant="outlined"
        color={statusConfigs?.[colData]?.color}
        size="small"
        label={<SpanLang sx={{ fontSize: 12 }} keyLang={statusConfigs?.[colData]?.name} />}
      />
    ) : (
      ''
    );
  },
  to(col: string, data: any) {
    const direction = data[keyNames.KEY_NAME_ACTIVITY_DIRECTION];
    let items = data[col] ? (data[col] as any[]) : [];
    if (direction == ACTIVITY_DIRECTION_IN) {
      items = !!data?.[keyNames.KEY_NAME_ACTIVITY_FROM] ? (data[keyNames.KEY_NAME_ACTIVITY_FROM] as any[]) : [];
    }
    const total = items?.length;

    return total > 0 ? (
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography noWrap>{items[0].name}</Typography>
        {total > 1 && <Chip size="small" label={`+ ${total - 1}`} />}
      </Stack>
    ) : (
      ''
    );
  },
  // createdBy(col: string, data: any) {
  //   const createdBy = data[col] ?? null;
  //   return (
  //     <Stack spacing={1.5} sx={{ minWidth: 160 }} direction="row" alignItems="center">
  //       <HanAvatar
  //         key={createdBy.id}
  //         name={createdBy.name}
  //         size="sm"
  //         // photo={}
  //       />
  //       <Stack spacing={0}>
  //         <Typography variant="body1" noWrap>
  //           {createdBy.name}
  //         </Typography>
  //         {data.createdAt && (
  //           <Typography variant="caption" color="textSecondary" noWrap>
  //             {convertDateTimeServerToClient({ date: data.createdAt, isTime: true, humanize: false })}
  //           </Typography>
  //         )}
  //       </Stack>
  //     </Stack>
  //   );
  // },
  duration(col: string, data: any) {
    // return data[col] ? parseDurationValueToString(data[col], false) : '';
  },
  // direction(col: string, data: any) {
  //   const colData = data?.[col] ?? null;
  //   return !!colData && colData !== 'DIRECTION_NONE' ? (
  //     <Box textAlign="center">
  //       <Chip
  //         variant="combined"
  //         color="secondary"
  //         icon={colData?.direction == ACTIVITY_DIRECTION_IN ? <East fontSize="small" /> : <West fontSize="small" />}
  //         size="small"
  //       />
  //     </Box>
  //   ) : (
  //     ''
  //   );
  // },
  content(col: string, data: any) {
    const content = data[col] ?? '';
    // return <RawHTML>{content}</RawHTML>;
  },
  startTime(col: string, data: any) {
    return data[col] ? <Typography noWrap>{convertDateTimeServerToClient({ date: data[col], humanize: false })}</Typography> : '';
  },
  endTime(col: string, data: any) {
    return data[col] ? <Typography noWrap>{convertDateTimeServerToClient({ date: data[col], humanize: false })}</Typography> : '';
  },
  dueDate(col: string, data: any) {
    if (data.type == ACTIVITY_TYPE_CALL || data.type == ACTIVITY_TYPE_MAIL || data.type == ACTIVITY_TYPE_SMS) {
      return data[keyNames.KEY_NAME_ACTIVITY_START_TIME] ? (
        <Typography noWrap>
          {convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_ACTIVITY_START_TIME], isTime: true, humanize: false })}
        </Typography>
      ) : (
        ''
      );
    } else if (data.type == ACTIVITY_TYPE_TASK) {
      return data[keyNames.KEY_NAME_ACTIVITY_DUE_DATE] ? (
        <Typography noWrap>
          {convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_ACTIVITY_DUE_DATE], isTime: true, humanize: false })}
        </Typography>
      ) : (
        ''
      );
    } else {
      return;
    }
  },
  purpose(col: string, data: any) {
    return <SpanLang keyLang={data?.[col]?.name} />;
  },
  callResult(col: string, data: any) {
    return <SpanLang keyLang={data?.[col]?.name} />;
  },
  from(col: string, data: any) {
    const direction = data[keyNames.KEY_NAME_ACTIVITY_DIRECTION];
    let items = data[col] ? (data[col] as any[]) : [];
    if (direction == ACTIVITY_DIRECTION_IN) {
      items = !!data?.[keyNames.KEY_NAME_ACTIVITY_TO] ? (data[keyNames.KEY_NAME_ACTIVITY_TO] as any[]) : [];
    }
    const total = items?.length;

    const reps = data[col] || [];

    const assignedGroupResult = (
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography noWrap>{reps?.name}</Typography>
        {/* {total > 1 && <Chip size="small" label={`+ ${total - 1}`} />} */}
        {` ${`( ${reps?.rowSpan} )`}`}
      </Stack>
    );
    const resultUndefined = `- ${`( ${reps?.rowSpan} )`}`;
    const assignedResult = (
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography noWrap>{items[0]?.name}</Typography>
        {total > 1 && <Chip size="small" label={`+ ${total - 1}`} />}
      </Stack>
    );

    return reps?.rowSpan ? (reps?.name ? assignedGroupResult : resultUndefined) : total > 0 ? assignedResult : '';
  }
});

export const getQuery = (filter: SearchFilter | undefined) => {
  // filters query
  const groupBy = filter?.headerFilters?.groupBy;
  const groupByValue = useMemo(() => groupByOptions?.find((v: LabelValue) => v.value === groupBy), [groupBy]);

  const query = useMemo(() => {
    let queries: string[] = [];
    Object.keys(filter?.headerFilters).forEach((key) => {
      const value = filter?.headerFilters[key];
      const isDateTime = dateByOptions?.findIndex((v: LabelValue) => v.value === key) > -1;
      if (isDateTime) {
        // Activity Date : Call -Call Start Date, Email/SMS-Send Date, Task-Done Date 출력
        if (key == keyNames.KEY_NAME_ACTIVITY_DATE) {
          if (
            groupByValue?.extra == ACTIVITY_TYPE_CALL ||
            groupByValue?.extra == ACTIVITY_TYPE_MAIL ||
            groupByValue?.extra == ACTIVITY_TYPE_SMS
          ) {
            key = keyNames.KEY_NAME_ACTIVITY_START_TIME;
          } else if (groupByValue?.extra == ACTIVITY_TYPE_TASK) {
            key = keyNames.KEY_NAME_ACTIVITY_END_TIME;
          } else {
            return;
          }
          // Due Date: Scheduled Call-Call Start Time, Scheduled Email/SMS-Send Date, Task-Due Date
        } else if (key == keyNames.KEY_NAME_ACTIVITY_DUE_DATE) {
          if (
            groupByValue?.extra == ACTIVITY_TYPE_CALL ||
            groupByValue?.extra == ACTIVITY_TYPE_MAIL ||
            groupByValue?.extra == ACTIVITY_TYPE_SMS
          ) {
            key = keyNames.KEY_NAME_ACTIVITY_START_TIME;
          } else if (groupByValue?.extra == ACTIVITY_TYPE_TASK) {
            key = keyNames.KEY_NAME_ACTIVITY_DUE_DATE;
          } else {
            return;
          }
        }
        queries.push([key, '>=', '"' + value?.[0] + '"'].join(''));
        queries.push([key, '<=', '"' + value?.[1] + '"'].join(''));
      } else if (key == keyNames.KEY_NAME_ACTIVITY_DURATION || key == keyNames.KEY_NAME_ACTIVITY_EDURATION) {
        queries.push([key, '>=', '"' + value?.['from'].duration + '"'].join(''));
        queries.push([key, '<=', '"' + value?.['to'].duration + '"'].join(''));
      } else {
        queries.push([key, '=', value].join(''));
      }
    });

    // search query
    if (filter?.keyword != '') {
      if (searchFields?.length > 0) {
        const orQueries = searchFields?.map((field: LabelValue) => {
          return [field?.value, ':', '"' + filter?.keyword + '"'].join('');
        });
        queries.push('{' + orQueries.join(' ') + '}');
      }
    }

    if (queries?.length) {
      return '(' + queries.join(' ') + ')';
    }
    return '';
  }, [filter]);

  return query;
};

export const getQuerySlide = (obj: any[]) => {
  let ids: string[] = [];
  obj.map((v: any, i) => ids.push(v.id));

  if (ids.length > 0) {
    return '{' + ids.join(',') + '}';
  }
  return '';
};

export const toAny = (data: any) => {
  return data;
};

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedActivity'].indexOf(groupBy) >= 0;
};
