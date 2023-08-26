import { Link as RouteLink } from 'react-router-dom';
import { Stack, Switch, Typography, useTheme } from '@mui/material';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { Report } from '@analytic/report/types/reports';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { dateRangeOptions } from '@base/config/options';

export const columnRenderRemap = (menu: string) => {
  return {
    name(col: string, row: Report) {
      const name = row.name ?? '';
      let url = `/analytic/report/${row.id}`;

      return (
        <RouteLink to={url} style={{ textDecoration: 'none' }}>
          <Typography color="primary" component="h6">
            {name}
          </Typography>
        </RouteLink>
      );
    },
    active(col: string, row: Report) {
      return <Switch checked={row.active || false} size="small" readOnly disabled />;
    },
    createdBy(col: string, row: Report) {
      let fUser = row.createdBy ? row.createdBy : null;
      return fUser ? (
        <Stack direction="row" alignItems="center">
          <HanAvatar size={'xs'} name={row.createdBy?.name} /> <Typography ml={1}>{row.createdBy?.name}</Typography>
        </Stack>
      ) : (
        '-'
      );
    },
    subject(col: string, row: Report) {
      return row.subject ?? 'None';
    },
    dateRange(col: string, row: Report) {
      return dateRangeOptions[row.dateRange] ?? '';
    },
    createdAt(col: string, row: Report) {
      return row.createdAt ? convertDateTimeServerToClient({ date: '' + row.createdAt, humanize: true }) : '';
    },
    updatedBy(col: string, row: Report) {
      let fUser = row.updatedBy ? row.updatedBy : null;
      return fUser ? (
        <Stack direction="row" alignItems="center">
          <HanAvatar size={'xs'} name={row.updatedBy?.name} /> <Typography ml={1}>{row.updatedBy?.name}</Typography>
        </Stack>
      ) : (
        '-'
      );
    },
    updatedAt(col: string, row: Report) {
      return row.updatedAt ? convertDateTimeServerToClient({ date: '' + row.updatedAt, humanize: true }) : '';
    },
    reportingContent(col: string, row: Report) {
      return (
        <VisibilityOutlinedIcon
          sx={{ ':hover': { color: '#07f' } }}
          fontSize="small"
          color="secondary"
          //  onClick={() => {onPreview && onPreview(row.original)}}
        />
      );
    }
  };
};
