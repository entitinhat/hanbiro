import { Link as RouteLink } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { Box, Card, Checkbox, IconButton, Stack, Switch, Typography } from '@mui/material';
import { Report } from '@analytic/report/types/reports';
import { VisibilityOutlined } from '@mui/icons-material';
import { MENU_ANALYTIC } from '@base/config/menus';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Report;
  category: string;
  iSplitMode?: boolean;
  onPreview: (data: any) => void;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked, iSplitMode = false, onPreview } = props;

  const { id, name, createdBy, active } = data;

  let url = `/` + MENU_ANALYTIC + `/report/${data.id}`;

  return (
    <Card elevation={0} sx={{ ...sx, minHeight: 0 }}>
      <Stack spacing={0.8}>
        {iSplitMode ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
                <RouteLink to={url} style={{ textDecoration: 'none' }}>
                  <Typography color="grey.700" variant="body1" noWrap>
                    {name}
                  </Typography>
                </RouteLink>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton edge="end" color="secondary">
                  <MoreOutlined style={{ fontSize: '1.15rem' }} />
                </IconButton>
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Stack direction="row" mr={1}>
                <Stack direction="row" mr={2} alignItems="center">
                  <HanAvatar key={createdBy.id} name={createdBy.name} size="xs" />
                  <Typography ml={1}>{createdBy.name}</Typography>
                </Stack>
                <Stack mr={2} direction="row" sx={{ marginLeft: '0px !important' }} alignItems="center">
                  <Switch defaultChecked={active} size="small" readOnly disabled />
                </Stack>
                <Stack direction="row" sx={{ marginLeft: '0px !important' }} alignItems="center">
                  <VisibilityOutlined
                    sx={{ ':hover': { color: '#07f' } }}
                    fontSize="small"
                    color="secondary"
                    onClick={() => {
                      onPreview && onPreview(data);
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
                <RouteLink to={url} style={{ textDecoration: 'none' }}>
                  <Typography color="grey.700" variant="body1" noWrap>
                    {name}
                  </Typography>
                </RouteLink>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton edge="end" color="secondary">
                  <MoreOutlined style={{ fontSize: '1.15rem' }} />
                </IconButton>
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Stack direction="row" mr={1}>
                <Stack direction="row" mr={2} alignItems="center">
                  <Typography color="secondary" mr={1}>
                    Owner:{' '}
                  </Typography>
                  <HanAvatar key={createdBy.id} name={createdBy.name} size="xs" />
                  <Typography ml={1}>{createdBy.name}</Typography>
                </Stack>
                <Stack mr={2} direction="row" sx={{ marginLeft: '0px !important' }} alignItems="center">
                  <Typography color="secondary" mr={1}>
                    Active:{' '}
                  </Typography>
                  <Switch defaultChecked={active} size="small" readOnly disabled />
                </Stack>
                <Stack direction="row" sx={{ marginLeft: '0px !important' }} alignItems="center">
                  <Typography color="secondary" mr={1}>
                    Preview:{' '}
                  </Typography>
                  <VisibilityOutlined
                    sx={{ ':hover': { color: '#07f' } }}
                    fontSize="small"
                    color="secondary"
                    onClick={() => {
                      onPreview && onPreview(data);
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default ListGridCard;
