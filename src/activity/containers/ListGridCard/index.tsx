import React from 'react';
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
import { priorityConfigs, typeConfigs } from '@activity/config/list-field/column';
import { Activity, UserOrCustomer } from '@activity/types/activity';
import { KanbanColumn } from '@base/types/kanban';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { North, South } from '@mui/icons-material';
import { Box, Card, Checkbox, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Activity;
  category: string;
  column?: KanbanColumn;
  kanban?: boolean;
  isSplitMode?: boolean; // Check split mode
}

const ListGridCard = (props: ListGridCardProps) => {
  const { category, data, sx, isChecked, onChecked, column, kanban = false, isSplitMode = false } = props;
  const { t } = useTranslation();

  const { id, direction = ACTIVITY_DIRECTION_IN, from = [], to = [] } = data;

  let url = '';
  if (data.type == ACTIVITY_TYPE_PROCESS) {
    if (data.source?.menu == 'MENU_DESK') {
      url = `/desk/ticket/${data.source.id}`;
    }
  } else {
    const type = ACTIVITY_MENU_KEYS[data.type];
    url = `/activity/${category}/${type}/${id}`;
  }

  const accounts: UserOrCustomer[] = direction === ACTIVITY_DIRECTION_IN ? from : to;
  const reps: UserOrCustomer[] = direction === ACTIVITY_DIRECTION_IN ? to : from;

  let activityDate,
    dueDate: string | null = null;
  if (data.type === ACTIVITY_TYPE_CALL || data.type === ACTIVITY_TYPE_MAIL || data.type === ACTIVITY_TYPE_SMS) {
    if (data?.startTime) {
      // activityDate = dueDate = convertDateTimeServerToClient({ date: data.startTime.toString(), humanize: false, isTime: true });
      activityDate = dueDate = convertDateTimeServerToClient({ date: data.startTime.toString(), humanize: false });
      if (column?.id == 'overdue') {
        dueDate = convertDateTimeServerToClient({ date: data.startTime.toString(), humanize: true });
      }
    }
  } else if (data.type === ACTIVITY_TYPE_TASK) {
    if (data?.endTime) {
      // activityDate = convertDateTimeServerToClient({ date: data.endTime.toString(), humanize: false, isTime: true });
      activityDate = convertDateTimeServerToClient({ date: data.endTime.toString(), humanize: false });
    }
    if (data?.dueDate) {
      if (column?.id == 'overdue') {
        dueDate = convertDateTimeServerToClient({ date: data.startTime.toString(), humanize: true });
      } else {
        dueDate = convertDateTimeServerToClient({ date: data.dueDate.toString(), humanize: false, isTime: true });
      }
    }
  }

  // Change Activity Date format from YYYY/MM/DD to YYYY-MM-DD
  if (activityDate && typeof activityDate === 'string') {
    activityDate = activityDate.replace(/\//g, '-');
  } else activityDate = '-';

  const theme = useTheme();
  const bgcolor = theme.palette.background.paper;
  const isRead = data.isRead ?? true;

  return (
    <Card elevation={0} sx={{ ...sx, backgroundColor: bgcolor, minHeight: 0 }}>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
            <FormIcon icon={typeConfigs?.[data.type]?.icon || ''} iconType="icon" size={12} />
            {!kanban &&
              data.direction &&
              (data.direction == ACTIVITY_DIRECTION_IN ? (
                <South sx={{ color: 'primary.main' }} fontSize="inherit" />
              ) : (
                <North fontSize="inherit" />
              ))}
            <RouteLink to={url} style={{ textDecoration: 'none' }}>
              <Typography color="grey.700" variant="body1" noWrap style={{ fontWeight: isRead === false ? 'bold' : '400' }}>
                {data?.subject}
              </Typography>
            </RouteLink>
          </Stack>
        </Box>
        {!isSplitMode ? (
          // Grid mode
          <>
            <Grid container>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <Box>
                    <Stack direction="row">
                      <Typography color="secondary" mr={1}>
                        {t('activity_activity_field_basic_to')}:
                      </Typography>
                      {accounts?.length > 0 && (
                        <>
                          {accounts.map((v: UserOrCustomer) => (
                            <Typography>{v?.name ?? ''}</Typography>
                          ))}
                        </>
                      )}
                    </Stack>
                  </Box>
                  <Box>
                    <Stack direction="row">
                      <Typography color="secondary" mr={1}>
                        {t('activity_call_field_basic_purpose')}:
                      </Typography>
                      {data?.purpose?.languageKey && <Typography>{t(data?.purpose?.languageKey)}</Typography>}
                    </Stack>
                  </Box>
                  <Box>
                    <Stack direction="row">
                      <Typography color="secondary" mr={1}>
                        {t('activity_activity_field_basic_from')}:
                      </Typography>
                      {reps?.length > 0 && (
                        <>
                          {reps.map((v: UserOrCustomer) => (
                            <Typography>{v?.name ?? ''}</Typography>
                          ))}
                        </>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <Box>
                    <Stack direction="row">
                      <Typography color="secondary" mr={1}>
                        {t('ncrm_activity_priority')}:
                      </Typography>
                      <Chip
                        sx={{
                          color: priorityConfigs?.[data?.priority?.keyName]?.textColor,
                          backgroundColor: priorityConfigs?.[data?.priority?.keyName]?.backgroundColor
                        }}
                        label={t(priorityConfigs?.[data.priority?.keyName]?.name)}
                        size="small"
                      />
                    </Stack>
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography color="secondary" mr={1}>
                        {t('activity_activity_field_basic_activitydate')}:
                      </Typography>
                      {activityDate && <Typography>{activityDate}</Typography>}
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </>
        ) : (
          // Split mode
          <>
            <Grid container>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <Box>
                    {accounts?.length > 0 && (
                      <>
                        {accounts.map((v: UserOrCustomer) => (
                          <Typography>{v?.name ?? ''}</Typography>
                        ))}
                      </>
                    )}
                  </Box>
                  <Box>
                    {reps?.length > 0 && (
                      <>
                        {reps.map((v: UserOrCustomer) => (
                          <Typography>{v?.name ?? ''}</Typography>
                        ))}
                      </>
                    )}
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1} alignItems="flex-end">
                  <Box>
                    <Chip
                      sx={{
                        color: priorityConfigs?.[data?.priority?.keyName]?.textColor,
                        backgroundColor: priorityConfigs?.[data?.priority?.keyName]?.backgroundColor
                      }}
                      label={t(priorityConfigs?.[data.priority?.keyName]?.name)}
                      size="small"
                    />
                  </Box>
                  <Box>{activityDate && <Typography>{activityDate}</Typography>}</Box>
                </Stack>
              </Grid>
            </Grid>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default ListGridCard;
