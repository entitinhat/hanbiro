import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import RouteName from '@base/components/@hanbiro/RouteName';
import { convertDateTimeServerToClient } from '@base/utils/helpers';

import { Typography } from '@mui/material';
import { Email, Phone, User } from '../../types';

export const columnRenderRemap = () => ({
  displayName(col: string, row: User) {
    const name = row.displayName;
    let url = `/settings/manage-users-groups/users/${row.id}`;

    return <RouteName url={url} name={name} component="h6" />;
  },
  urlName(col: string, row: User) {
    const name = row.urlName;
    let url = `/settings/manage-users-groups/users/${row.id}`;

    return <RouteName url={url} name={name} component="h6" />;
  },
  emails(col: string, row: User) {
    return <ListTableCellDroplist values={row.emails} cellComponent={(item: Email) => <Typography>{item.address}</Typography>} />;
  },
  phones(col: string, row: User) {
    return <ListTableCellDroplist values={row.phones} cellComponent={(item: Phone) => <Typography>{item.number}</Typography>} />;
  },
  updatedAt(col: string, row: User) {
    let normalDate = new Date().toISOString();
    const seconds = row.updatedAt?.seconds ?? 0;
    const nanos = row.updatedAt?.nanos ?? 0;
    if (seconds) {
      normalDate = new Date(seconds * 1000).toISOString();
    } else {
      normalDate = new Date(nanos / Math.pow(10, 9)).toISOString();
    }

    return convertDateTimeServerToClient({ date: normalDate, humanize: true, isTime: true });
  }
});
