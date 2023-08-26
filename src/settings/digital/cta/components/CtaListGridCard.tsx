import { Link as RouteLink } from 'react-router-dom';

import { MoreOutlined } from '@ant-design/icons';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { MENU_SETTING } from '@base/config/menus';
import { Box, Card, Checkbox, Chip, IconButton, Stack, Typography, useTheme } from '@mui/material';
import * as keyNames from '@settings/digital/cta/config/keyNames';
import * as constants from '@settings/digital/cta/config/constants';

import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { AccessAlarm } from '@mui/icons-material';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LANGUAGES } from '@base/config/constant';
import { t } from 'i18next';

interface ListGridCardProps extends BaseListGridCardProps {
  data: any;
  category: string;
  isSplitMode?: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked } = props;
  const { id, createdAt, updatedBy, createdBy } = data;

  const url = `/settings/digital/cta/${id}`;

  const theme = useTheme();
  const bgColor = theme.palette.background.paper;

  const languageTitle: any = useMemo(() => {
    const language = LANGUAGES?.find((_item: any) => _item?.value === data?.[keyNames.KEY_SETTING_CTA_LANGUAGE]);
    return language?.label;
  }, [data]);

  const typeTitle: any = useMemo(() => {
    const type = constants.SETTING_CTA_TYPES?.find((_item: any) => _item?.value === data?.[keyNames.KEY_SETTING_CTA_TYPE]);
    return type?.label;
  }, [data]);

  return (
    <Card elevation={0} sx={{ ...sx, bgColor: bgColor, height: '100%', minHeight: 0 }}>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
            <RouteLink to={url} style={{ textDecoration: 'none' }}>
              <Typography color="link" variant="body1" noWrap>
                {data?.[keyNames.KEY_SETTING_CTA_NAME]}
              </Typography>
            </RouteLink>
          </Stack>
          <IconButton edge="end" color="secondary">
            <MoreOutlined style={{ fontSize: '1.15rem' }} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip variant="outlined" color="secondary" label={t(typeTitle)} size="small" />
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body1" noWrap>
              {languageTitle}
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
            {/* {accounts?.length > 0 && (
              <>
                <AvatarGroup
                  max={2}
                  sx={{ justifyContent: 'start', '& .MuiAvatarGroup-avatar': { width: 32, height: 32, fontSize: 'inherit' } }}
                >
                  {accounts.map((v: UserOrCustomer) => (
                    <HanAvatar
                      key={v.id}
                      name={v.name}
                      size="sm"
                      // photo={}
                    />
                  ))}
                </AvatarGroup>
                <Divider orientation="vertical" sx={{ height: 25 }} />
              </>
            )}
            {reps?.length > 0 && (
              <AvatarGroup
                max={2}
                sx={{ justifyContent: 'start', '& .MuiAvatarGroup-avatar': { width: 32, height: 32, fontSize: 'inherit' } }}
              >
                {reps.map((v: UserOrCustomer) => (
                  <HanAvatar
                    key={v.id}
                    name={v.name}
                    size="sm"
                    // photo={}
                  />
                ))}
              </AvatarGroup>
            )} */}
            <HanAvatar
              key={createdBy?.id}
              name={createdBy?.name ?? ''}
              size="xs"
              // photo={}
            />
          </Stack>
        </Box>

        {/* <Stack direction="row" flexWrap="wrap">
          {isSplitMode ? (
            <Typography sx={{ ml: 3 }}>{mapData[keyNames.KEY_SETTING_CTA_TYPE](keyNames.KEY_SETTING_CTA_TYPE, data)}</Typography>
          ) : (
            keyOfData?.map((key: string, index: number) => {
              if (key !== 'id' && key !== 'name') {
                return (
                  <Stack key={index} direction="row" alignItems="center" mr={2} py={1}>
                    <Typography color="secondary" sx={{ textTransform: 'capitalize' }}>
                      {`${key}: `}
                    </Typography>
                    <Box sx={{ textTransform: 'capitalize', ml: 1 }}>{mapData[key](key, data)}</Box>
                  </Stack>
                );
              }
            })
          )}
        </Stack> */}
      </Stack>
    </Card>
  );
};

export default ListGridCard;
