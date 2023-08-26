import { Link as RouteLink } from 'react-router-dom';
import { ClockCircleOutlined, MoreOutlined } from '@ant-design/icons';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Box, Checkbox, Chip, Divider, Fade, Grid, IconButton, ListItem, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import MainCard from '@base/components/App/MainCard';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import {
  TEMPLATE_MESSAGE_TYPE_OPTIONS,
  TEMPLATE_STAGE_OPTIONS,
  TEMPLATE_TASK_TYPE_OPTIONS,
  TEMPLATE_TYPE_OPTIONS
} from '@settings/template/config/constants';
import { statusConfigs, typeConfigs } from '@settings/template/config/list-fields/column';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';

interface ListGridCardProps extends BaseListGridCardProps {
  data: any;
  category: string;
  iSplitMode?: boolean;
  avaiLanguages: any;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { avaiLanguages, category, data, sx, isChecked, onChecked, columnsRendered: ColumnsRendered, iSplitMode = false } = props;
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { id } = data;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const group = category.split('_')[1];

  let url = `/settings/template/${group}/${data.id}`;
  //primary item
  return (
    <MainCard
      elevation={0}
      sx={{
        height: 1,
        '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.paper }
      }}
    >
      <Grid container spacing={2.25}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ maxWidth: '90%' }}>
              <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
              <RouteLink
                to={url}
                style={{
                  textDecoration: 'none',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  display: 'block',
                  maxWidth: '100%'
                }}
              >
                <Typography color="primary" variant="body1" noWrap>
                  {data?.name}
                </Typography>
              </RouteLink>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton edge="end" aria-label="comments" color="secondary" onClick={handleMenuClick}>
                <MoreOutlined style={{ fontSize: '1.15rem' }} />
              </IconButton>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button'
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                {/* <MenuItem onClick={handleMenuClose}>Share</MenuItem>
              <MenuItem onClick={handleMenuClose}>Edit</MenuItem> */}
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
              </Menu>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0
              }}
              component="ul"
            >
              {data.type ? (
                <ListItem disablePadding sx={{ width: 'auto', pr: 0.75, pb: 0.75 }}>
                  <Chip
                    color={typeConfigs['template'].color}
                    variant="outlined"
                    size="small"
                    label={TEMPLATE_TYPE_OPTIONS.find((type: any) => type.value === data.type)?.label ?? <em>(none)</em>}
                    icon={<FormIcon icon={typeConfigs?.['template']?.icon || ''} iconType="icon" size={12} />}
                  />
                </ListItem>
              ) : (
                ''
              )}
              {category == 'template_task' ? (
                <ListItem disablePadding sx={{ width: 'auto', pr: 0.75, pb: 0.75 }}>
                  <Chip
                    color={typeConfigs['task'].color}
                    variant="outlined"
                    size="small"
                    label={TEMPLATE_TASK_TYPE_OPTIONS.find((stage: any) => stage.value === data?.subType)?.label || <em>(none)</em>}
                    icon={<FormIcon icon={typeConfigs?.['task']?.icon || ''} iconType="icon" size={12} />}
                  />
                </ListItem>
              ) : (
                ''
              )}

              {category == 'template_sms' ? (
                <ListItem disablePadding sx={{ width: 'auto', pr: 0.75, pb: 0.75 }}>
                  <Chip
                    color={typeConfigs['sms'].color}
                    variant="outlined"
                    size="small"
                    label={TEMPLATE_MESSAGE_TYPE_OPTIONS.find((stage: any) => stage.value === data?.subType)?.label || <em>(none)</em>}
                    icon={<FormIcon icon={typeConfigs?.['sms']?.icon || ''} iconType="icon" size={12} />}
                  />
                </ListItem>
              ) : (
                ''
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" mr={1}>
            <Typography color="secondary" mr={1}>
              Subject:{' '}
            </Typography>
            <Typography component="span">{data.title || <em>(none)</em>}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={iSplitMode ? 12 : 6}>
          <Stack direction="row" mr={1}>
            <Typography color="secondary" mr={1}>
              Language:{' '}
            </Typography>
            <Typography component="span">
              {avaiLanguages.find((language: any) => language.code == data.language)?.title || '(none)'}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={iSplitMode ? 12 : 6}>
          <Stack direction="row" mr={1}>
            <Typography color="secondary" mr={1}>
              Active:{' '}
            </Typography>
            {data?.stage ? (
              <Chip
                variant="outlined"
                size="small"
                color={statusConfigs?.[data.stage]?.color}
                label={TEMPLATE_STAGE_OPTIONS.find((stage) => stage.value === data?.stage)?.label ?? <em>(none)</em>}
                // icon={<DoneIcon fontSize="small" />}
              />
            ) : (
              <em>(none)</em>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {/* <Box sx={{ minHeight: '36px' }}>
            <ClockCircleOutlined style={{ fontSize: '0.675rem' }} />
            <Typography variant="subtitle2" color="secondary">
              Created: {convertDateTimeServerToClient({ date: data?.createdAt })}
            </Typography>
          </Box> */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            <ClockCircleOutlined style={{ fontSize: '0.675rem' }} />
            <Typography variant="subtitle2" color="secondary">
              {convertDateTimeServerToClient({ date: data?.createdAt })}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ListGridCard;
