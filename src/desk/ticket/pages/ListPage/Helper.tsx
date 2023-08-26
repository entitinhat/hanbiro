import { AvatarGroup, Box, Tooltip, Typography, Stack } from '@mui/material';
import { convertDateTimeServerToClient, generateUUID } from '@base/utils/helpers';
import { Ticket } from '@desk/ticket/types/ticket';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import PriorityView from '@base/containers/ViewField/Priority/View';
import { Selection } from '@settings/general/types/interface';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { AssignToName } from '@base/types/user';
import RouteName from '@base/components/@hanbiro/RouteName';
import { t } from 'i18next';
import { useGetCustomerLastUpdatedList } from '@analytic/main/hooks/useGetCustomerLastUpdatedList';

import { DatasPromise } from '@base/types/response';
import { Customer } from '@analytic/main/types/interfaces/customer';

export const dataRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?Z$/;

export const columnRenderRemap = (menu: string) => ({
  code(col: string, row: Ticket) {
    return row.code;
  },
  subject(col: string, row: Ticket) {
    const name = row.subject ?? '';
    const isRead = row.isRead ?? true;
    let url = `/mdesk/ticket/${row.id}`;

    return <RouteName url={url} name={name} component="h6" isRead={isRead} />;
  },
  status(col: string, row: Ticket) {
    return <SpanLang keyLang={row.status?.languageKey} />;
  },
  priority(col: string, data: any) {
    const reps = data[col] || [];
    const sValue: Selection = {
      keyName: data.priority?.keyName ? data.priority?.keyName : data.priority?.id ? data.priority?.id : '',
      languageKey: data.priority?.languageKey ? data.priority?.languageKey : data.priority?.name ? data.priority?.name : ''
    };
    const priorityResult = (
      <Box sx={{ display: 'flex' }}>
        <PriorityView value={sValue} /> &nbsp;
        {` ${`( ${reps?.rowSpan} )`}`}
      </Box>
    );
    return reps?.rowSpan ? priorityResult : reps?.languageKey || reps?.id ? <PriorityView value={sValue} /> : '';
  },
  customer(col: string, data: any) {
    const reps = data[col] || []; // Customer data
    const resultName = `${t(reps.name)} ${`( ${reps?.rowSpan} )`}`;
    const resultUndefined = `- ${`( ${reps?.rowSpan} )`}`;
    // return reps?.rowSpan ? (reps?.name ? resultName : resultUndefined) : reps?.name ? t(reps.name) : '';
    return reps?.rowSpan ? (
      reps?.name ? (
        resultName
      ) : (
        resultUndefined
      )
    ) : reps?.name ? (
      reps?.account !== null ? (
        // If account inside customer is exist, display customer name first and account name later
        <Stack>
          {t(reps.name)}
          <Typography align="left" variant="caption" color="secondary">
            {t(reps.account?.name)}
          </Typography>
        </Stack>
      ) : (
        // If contact data is not exist, display customer name
        t(reps.name)
      )
    ) : (
      ''
    );
  },
  assignedGroup(col: string, row: Ticket) {
    return row.assignedGroup ? row.assignedGroup.name : '';
  },
  assignedUser(col: string, data: any) {
    const reps = data[col] || [];
    const resultName = `${t(reps?.name)} ${`( ${reps?.rowSpan} )`}`;
    const resultUndefined = `- ${`( ${reps?.rowSpan} )`}`;
    return reps?.rowSpan
      ? reps?.name
        ? resultName
        : resultUndefined
      : reps?.name
      ? reps?.name
      : reps?.user?.name
      ? t(reps?.user?.name)
      : '';
  },
  ccUsers(col: string, row: Ticket) {
    return !!row.ccUsers?.length ? (
      <AvatarGroup max={3} sx={{ justifyContent: 'start', '& .MuiAvatar-root': { width: 32, height: 32 } }}>
        {row.ccUsers.map((v: AssignToName, i) => (
          <>
            {v && v.user ? (
              <Tooltip key={i} title={v.user?.name}>
                <HanAvatar size={'sm'} name={v.user?.name} />
              </Tooltip>
            ) : (
              ''
            )}
          </>
        ))}
      </AvatarGroup>
    ) : (
      '-'
    );
  },
  duration(col: string, row: Ticket) {
    return row.duration + ' ' + row.durationUnit;
  },
  category(col: string, row: Ticket) {
    return (row.product ? row.product.name + '/' : '') + (row.category ? row.category.name : '');
  },
  process(col: string, data: any) {
    const reps = data[col] || [];
    const resultName = `${t(reps.name)} ${`( ${reps?.rowSpan} )`}`;
    const resultUndefined = `- ${`( ${reps?.rowSpan} )`}`;
    return reps?.rowSpan ? (reps?.name ? resultName : resultUndefined) : reps?.name ? t(reps.name) : '';
  },
  channel(col: string, data: any) {
    const reps = data[col] || [];
    const resultName = `${t(reps.name)} ${`( ${reps?.rowSpan} )`}`;
    const resultUndefined = `- ${`( ${reps?.rowSpan} )`}`;
    return reps?.rowSpan ? (reps?.name ? resultName : resultUndefined) : reps?.name ? t(reps.name) : '';
  },
  resolutionDue(col: string, row: Ticket) {
    // check data
    if (row.resolutionDue) {
      // check regex format
      if (dataRegex.test(row.resolutionDue)) {
        return convertDateTimeServerToClient({ date: row.resolutionDue });
      } else {
        return (
          <Box color="error" component={'span'}>
            {row.resolutionDue}
          </Box>
        );
      }
    } else return;
  },
  firstRespondDue(col: string, row: Ticket) {
    // check data
    if (row.firstRespondDue) {
      // check regex format
      if (dataRegex.test(row.firstRespondDue)) {
        return convertDateTimeServerToClient({ date: row.firstRespondDue });
      } else {
        return (
          <Box color="error" component={'span'}>
            {row.firstRespondDue}
          </Box>
        );
      }
    } else return;
  }
});

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedTicket'].indexOf(groupBy) >= 0;
};
