import { ClockCircleOutlined, MoreOutlined } from '@ant-design/icons';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Box, Checkbox, Chip, Divider, Fade, Grid, IconButton, ListItem, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import MainCard from '@base/components/App/MainCard';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import { SITE_MESSAGE_TYPE_OPTIONS, SITE_STAGE_OPTIONS, SITE_TASK_TYPE_OPTIONS, SITE_TYPE_OPTIONS } from '@settings/sites/config/constants';
import { statusConfigs, typeConfigs } from '@settings/sites/config/list-fields/column';
// import { avaiLanguages } from '@base/containers/LanguageSelect';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import WebIcon from '@mui/icons-material/Web';
import RouteName from '@base/components/@hanbiro/RouteName';

interface ListGridCardProps extends BaseListGridCardProps {
  data: any;
  category: string;
  iSplitMode?: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { category, data, sx, isChecked, onChecked, columnsRendered: ColumnsRendered, iSplitMode = false } = props;
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
  let url = `/settings/sites/desk/${data.id}`;
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
            <Stack direction="row" spacing={1} alignItems="center">
              {/* <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} /> */}
              <RouteName url={url} name={data?.name} variant="body1" />
            </Stack>
            {/* <Stack direction="row" spacing={1} alignItems="center">
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
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
              </Menu>
            </Stack> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" mr={1}>
            <Typography color="secondary" mr={1}>
              {t('ncrm_generalsetting_site_description')}:{' '}
            </Typography>
            <Typography component="span">{data.description || <em>(none)</em>}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={iSplitMode ? 12 : 6}>
          <Stack direction="row" mr={1}>
            <Typography color="secondary" mr={1}>
              {t('ncrm_generalsetting_site_created_by')}:{' '}
            </Typography>
            <Typography component="span">{data.createdBy?.name || '(none)'}</Typography>
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
