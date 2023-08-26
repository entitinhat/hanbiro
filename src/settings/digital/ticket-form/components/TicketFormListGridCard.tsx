import { Link as RouteLink } from 'react-router-dom';

import { MoreOutlined } from '@ant-design/icons';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { MENU_SETTING } from '@base/config/menus';
import { Box, Card, Checkbox, Chip, IconButton, Stack, Typography, useTheme } from '@mui/material';
// import * as keyNames from '@settings/digital/cta/config/keyNames';
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { AccessAlarm } from '@mui/icons-material';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TICKET_FORM_STAGES } from '@settings/digital/ticket-form/config/constants';
import { LANGUAGES } from '@base/config/constant';
import { useTranslation } from 'react-i18next';

interface ListGridCardProps extends BaseListGridCardProps {
  data: any;
  category: string;
  isSplitMode?: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked } = props;
  const { id, createdAt, updatedBy, createdBy } = data;
  const { t } = useTranslation();
  console.log('list grid data', data);

  const url = `/settings/digital/form/${id}`;

  const theme = useTheme();
  const bgColor = theme.palette.background.paper;

  const languageTitle: any = useMemo(() => {
    const language = LANGUAGES?.find((_item: any) => _item?.value === data?.[keyNames.KEY_TICKET_FORM_LANGUAGE]);
    return language?.label;
  }, [data]);

  return (
    <Card elevation={0} sx={{ ...sx, bgColor: bgColor, height: '100%', minHeight: 0 }}>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
            <RouteLink to={url} style={{ textDecoration: 'none' }}>
              <Typography color="link" variant="body1" noWrap>
                {data?.[keyNames.KEY_TICKET_FORM_NAME]}
              </Typography>
            </RouteLink>
          </Stack>
          <IconButton edge="end" color="secondary">
            <MoreOutlined style={{ fontSize: '1.15rem' }} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography color="secondary">{languageTitle}</Typography>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              {/* <Typography color="secondary"> */}
              <Chip
                variant="outlined"
                color="secondary"
                label={
                  t(TICKET_FORM_STAGES.find((v: any) => v.value == data?.[keyNames.KEY_TICKET_FORM_STAGE])?.label || '(none)') as string
                }
                size="small"
              />
              {/* </Typography> */}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography color="secondary">
              {convertDateTimeServerToClient({
                date: data?.[keyNames.KEY_TICKET_FORM_UPDATED_AT]?.toString(),
                humanize: false,
                isTime: false
              })}
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '36px' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessAlarm style={{ fontSize: '0.875rem' }} />
              <Typography variant="caption" color="secondary" sx={{ lineHeight: 1 }}>
                {convertDateTimeServerToClient({ date: createdAt?.toString(), humanize: false, isTime: false })}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <HanAvatar
              key={createdBy?.id}
              name={createdBy?.name ?? ''}
              size="xs"
              // photo={}
            />
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default ListGridCard;
