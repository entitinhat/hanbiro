import React, { useMemo, useState } from 'react';
import { OptionValue } from '@base/types/common';

// material-ui
import {
  Box,
  Card,
  Checkbox,
  Chip,
  Divider,
  Fade,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
  useTheme
} from '@mui/material';

// third-party

// project import
import IconButton from '@base/components/@extended/IconButton';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { convertDateTimeServerToClient, formatAddress } from '@base/utils/helpers';
import RouteName from '@base/components/@hanbiro/RouteName';

// assets
import { EnvironmentOutlined, LinkOutlined, MailOutlined, MoreOutlined, PhoneOutlined } from '@ant-design/icons';
import MainCard from '@base/components/App/MainCard';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';

//menu
import * as keyNames from '@marketing-list/config/keyNames';
import { useTranslation } from 'react-i18next';
import { MENU_CUSTOMER } from '@base/config/menus';
import { MARKETING_TYPE_OPTIONS } from '@marketing-list/config/constants';

interface ListGridCardProps extends BaseListGridCardProps {
  data: any;
  category: string;
  isSplitMode?: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { category, sx, data, isChecked, onChecked, isSplitMode = false, columnsRendered } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  let url = `/customer/marketing/${data.id}`;
  //primary item

  const { id } = data;

  console.log('isSplitMode: ', isSplitMode);

  //grid item
  const ItemMemo = useMemo(() => {
    return (
      <Card elevation={0} sx={{ ...sx, minHeight: 0 }}>
        <Stack spacing={0.8}>
          {isSplitMode ? (
            <>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
                    <RouteName url={url} name={data?.name} />
                  </Stack>
                </Box>

                <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <Stack spacing={1}>
                    <Stack direction="row" mr={1}>
                      <Typography>
                        {' '}
                        {MARKETING_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === data?.type)?.languageKey ?? ''}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'wrap' }}>
                    <Stack direction="row" mr={1}>
                      <Typography> {t(data.owner.name ?? '')}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ marginLeft: '0px !important' }}>
                      <Typography>
                        {data.createdAt ? convertDateTimeServerToClient({ date: data.createdAt, isTime: false }) : <em>(none)</em>}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </>
          ) : (
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
                  <RouteName url={url} name={data?.name} />
                </Stack>
              </Box>

              <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }} spacing={1}>
                <Stack spacing={1}>
                  <Stack direction="row" mr={1}>
                    <Typography color="secondary" mr={1}>
                      {t('Marketing Type')}:
                    </Typography>
                    <Typography> {MARKETING_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === data?.type)?.languageKey ?? ''}</Typography>
                  </Stack>
                  <Stack direction="row" mr={1}>
                    <Typography color="secondary" mr={1}>
                      {t('Owner')}:
                    </Typography>
                    <Typography> {t(data.owner.name ?? '')}</Typography>
                  </Stack>
                  <Stack direction="row" mr={1}>
                    <Typography color="secondary" mr={1}>
                      {t('Updated Date')}:
                    </Typography>
                    <Typography>
                      {' '}
                      {data.updatedAt ? convertDateTimeServerToClient({ date: data.updatedAt, isTime: false }) : <em>(none)</em>}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack spacing={1} sx={{ flexWrap: 'wrap' }}>
                  <Stack direction="row" sx={{ marginLeft: '0px !important' }}>
                    <Typography color="secondary" mr={1}>
                      {t('Created Date')}:
                    </Typography>
                    <Typography>
                      {' '}
                      {data.createdAt ? convertDateTimeServerToClient({ date: data.createdAt, isTime: false }) : <em>(none)</em>}
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ marginLeft: '0px !important' }}>
                    <Typography color="secondary" mr={1}>
                      {t('Used Date')}:
                    </Typography>
                    <Typography>
                      {' '}
                      {data.lastUsedAt ? convertDateTimeServerToClient({ date: data.lastUsedAt, isTime: false }) : <em>(none)</em>}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" sx={{ marginLeft: '0px !important', marginTop: '0px !important' }}>
                    <Typography color="secondary" mr={1}>
                      {t('Active')}:
                    </Typography>
                    <Typography>
                      {' '}
                      <Switch size="small" checked={data.active} disabled />
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Card>
    );
  }, [data, isChecked, onChecked]);

  return <>{ItemMemo}</>;
};

export default ListGridCard;
