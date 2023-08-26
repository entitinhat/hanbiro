import React, { useState, useEffect } from 'react';

// material-ui
import {
  Box,
  Checkbox,
  Card,
  Stack,
  Typography,
  useTheme,
  Chip
} from '@mui/material';
import { AccessAlarm } from '@mui/icons-material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

// third-party
import { Link as RouteLink } from 'react-router-dom';

// project import
import IconButton from '@base/components/@extended/IconButton';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { convertDateTimeServerToClient, formatAddress } from '@base/utils/helpers';
import { useLandingPageDelete } from '@settings/digital/landing-page/hooks/useLandingPageMutations';
import { LANDING_PAGE_PUBLISH_OPTIONS } from '@settings/digital/landing-page/config/constants'

// assets

//menu
import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import { useTranslation } from 'react-i18next';

interface ListGridCardProps extends BaseListGridCardProps {
  data: any;
  category: string;
  onRefresh?: any
  onChecked?: any
}

const ListGridCard = (props: ListGridCardProps) => {
  const { category, data, isChecked, onChecked, sx, columnsRendered, onRefresh } = props;
  const mDelete = useLandingPageDelete();
  const { t } = useTranslation();
  const theme = useTheme();
  const bgColor = theme.palette.background.paper;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = (id: string) => {
    mDelete.mutate({ ids: [id] })
    handleMenuClose()
  }

  useEffect(() => {
    if (mDelete.isSuccess) {
      onRefresh && onRefresh()
    }
  }, [mDelete.isSuccess]);

  const sourceId = data[keyNames.KEY_NAME_LANDING_PAGE_ID] ? data[keyNames.KEY_NAME_LANDING_PAGE_ID] : '';
  const url = `/settings/digital/landing-page/${sourceId}`

  return (
    <>
      <Card elevation={0} sx={{ ...sx, bgColor: bgColor, height: '100%', minHeight: 0 }}>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(sourceId)} />
                <RouteLink to={url} style={{ textDecoration: 'none' }}>
                  <Typography 
                  // variant="subtitle1"
                  color="primary">
                    {data[keyNames.KEY_NAME_LANDING_PAGE_NAME] || <em>(none)</em>}
                  </Typography>
                </RouteLink>
            </Stack>
            <IconButton edge="end" color="secondary">
              <MoreVertOutlinedIcon style={{ fontSize: '1.15rem' }} />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              {/* Type */}
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Chip variant="outlined" color="secondary" label={data?.[keyNames.KEY_NAME_LANDING_PAGE_TYPE]?.label} size="small" />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              {/* Publish */}
              <Typography  color="secondary">
                { t(LANDING_PAGE_PUBLISH_OPTIONS.find((item) => 
                  item.value == data?.[keyNames.KEY_NAME_LANDING_PAGE_PUBLISH]
                ).label) }
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              {/* Create at `} */}
              <AccessAlarm style={{ fontSize: '0.875rem' }} />
              <Typography variant="caption" color="secondary">
                {convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_LANDING_PAGE_UPDATED_AT] })}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              {/* Create by */}
              <HanAvatar
                key={data?.[keyNames.KEY_NAME_LANDING_PAGE_CREATED_BY]?.id}
                name={data?.[keyNames.KEY_NAME_LANDING_PAGE_CREATED_BY]?.name ?? ''}
                size="xs"
                // photo={}
              />
            </Stack>
          </Box>

        </Stack>
      </Card>
    </>
  );
};

export default ListGridCard;
