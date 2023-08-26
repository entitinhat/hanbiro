import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Stack, Typography } from '@mui/material';
import _ from 'lodash';
import HanAvatar from '../HanAvatar';

export const defaultColumnsRender = {
  createdAt(col: string, data: any) {
    let createdAt = data[col] ? data[col] : '';
    return convertDateTimeServerToClient({
      date: createdAt,
      humanize: true,
      isTime: true
    });
  },
  updatedAt(col: string, data: any) {
    let updatedAt = data[col] ? data[col] : '';
    return convertDateTimeServerToClient({ date: updatedAt, humanize: true, isTime: true });
  },
  createdBy(col: string, data: any) {
    const createdBy = data[col] ?? null;
    return (
      <Stack spacing={1.5} direction="row" alignItems="center" display={'flex'}>
        {/* <>
          {createdBy && (
            <HanAvatar
              key={createdBy?.id}
              name={createdBy?.name || ''}
              size="sm"
            />
          )}
        </> */}
        <Stack spacing={0}>
          <Typography variant="body1" noWrap>
            {createdBy?.name || ''}
          </Typography>
        </Stack>
      </Stack>
    );
  },
  updatedBy(col: string, data: any) {
    const updatedBy = data[col] ?? null;
    return (
      <Stack spacing={1.5} direction="row" alignItems="center" display={'flex'}>
        {/* <HanAvatar
          key={updatedBy?.id}
          name={updatedBy?.name || ''}
          size="sm"
        /> */}
        <Stack spacing={0}>
          <Typography variant="body1" noWrap>
            {updatedBy?.name || ''}
          </Typography>
        </Stack>
      </Stack>
    );
  },
  deletedAt(col: string, data: any) {
    let deletedAt = data.restore ? data.restore?.[col] : '';
    return convertDateTimeServerToClient({
      date: deletedAt,
      humanize: true,
      isTime: true
    });
  },
  deletedBy(col: string, data: any) {
    const deletedBy = data.restore?.[col] ?? null;
    return (
      <Stack spacing={1.5} direction="row" alignItems="center" display={'flex'}>
        {/* <HanAvatar
          key={deletedBy?.id}
          name={deletedBy?.name || ''}
          size="sm"
        /> */}
        <Stack spacing={0}>
          <Typography variant="body1">{deletedBy?.name || ''}</Typography>
        </Stack>
      </Stack>
    );
  }
};

export const makeTable8Columns = (fields: any[], columnRenderRemap: any, extraParams: any, hiddenColumns: string[]) => {
  //react-table columns
  let newColumns: any[] = [];
  // loadDefaultColumns
  let columnRender = {
    ...defaultColumnsRender,
    ...columnRenderRemap
  };
  // render column order by setting
  fields.length > 0 &&
    fields.map((field: any) => {
      if (hiddenColumns.indexOf(field.keyName) !== -1) {
        return;
      }
      let column: any = {
        header: field.languageKey,
        accessorKey: field.keyName,
        enableColumnFilter: false,
        enableSorting: field?.enableSorting ? true : false,
        width: field?.width ?? 'auto',
        align: field?.align ?? 'left',
        minWidth: field?.minWidth ?? 'auto'
      };

      // defaultRender
      let cellRenderFn = (col: string, data: any, extraParams: any = undefined) => {
        let dataType = typeof data[col];
        let renderData =
          dataType != 'undefined' ? (dataType == 'string' || dataType == 'number' ? data[col] : JSON.stringify(data[col])) : '';
        return <>{renderData}</>;
      };

      if (typeof columnRender[field.keyName] != 'undefined') {
        cellRenderFn = columnRender[field.keyName];
      }

      column.cell = (props: any) => {
        if (!props) {
          return null;
        }
        let col: string = field.keyName;
        let data: any = props.row.original;
        return cellRenderFn(col, data, extraParams);
      };

      newColumns.push(column);
    });

  return newColumns;
};
