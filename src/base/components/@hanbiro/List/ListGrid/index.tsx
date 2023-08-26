import React, { CSSProperties, useEffect, useState } from 'react';
import { Box, CardProps, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import { keys, reduce, xor, cloneDeep } from 'lodash';
import { BaseListProps, ListColumn } from '@base/components/@hanbiro/List/Interface';
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import ListPagination from '@base/components/@hanbiro/List/ListPagination';

interface BaseProps {
  sx?: CardProps['sx'];
  style?: CSSProperties;
  columns?: ListColumn[];
}

export interface ListGridCardProps extends BaseProps {
  primaryKey?: string;
  onChecked?: (id: string) => void;
  isChecked?: boolean;
  data: any;
  columnsRendered?: React.FunctionComponent;
}

export interface ListGridProps extends BaseListProps, BaseProps {
  isSmall?: boolean;
  itemPerRow?: number;
  rows: any[];
  children: React.FunctionComponent<ListGridCardProps>;
  hideColumns?: string[];
  columnRenderRemap?: {
    [key: string]: any;
  };
}

export const withListGridCardColumnRender = (Component: React.FunctionComponent<any>) => {
  return ({ columns, data, t, ...restProps }: any) => {
    const ColumnComponent = () => {
      return (
        !!columns &&
        !!columns?.length &&
        columns.map((col: any, i: number) => {
          const columnComponent = !!col?.render && col.render(col.name, data);

          return (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                padding: '0.25rem 0.625rem'
              }}
              key={i}
            >
              <SpanLang
                sx={{
                  marginRight: '0.625rem',
                  color: '#8392a5'
                }}
                keyLang={col.title}
              />
              <Typography component="span">{columnComponent}</Typography>
            </Box>
          );
        })
      );
    };

    return <Component {...restProps} data={data} t={t} columnsRendered={ColumnComponent} />;
  };
};

const ListGrid = (props: ListGridProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    sx,
    style,
    rows,
    pagingProps,
    children: ChildrenComponent,
    isSmall,
    itemPerRow,
    checkedIds = [],
    onRowChecked,
    onPageChange,
    hideColumns = [],
    columns: iColumns = [],
    columnRenderRemap,
    primaryKey = 'id'
  } = props;

  console.log('...LISTGRID...', checkedIds);

  const [rowSelection, setRowSelection] = useState<any>(
    reduce(
      checkedIds,
      (f: any, id) => {
        f[id] = true;
        return f;
      },
      {}
    )
  );

  useEffect(() => {
    const rowSelectedIds = keys(rowSelection);
    const differenceIds = xor(rowSelectedIds, checkedIds);
    if (differenceIds.length > 0) {
      onRowChecked && onRowChecked(rowSelectedIds);
    }
  }, [rowSelection]);

  useEffect(() => {
    const rowSelectedIds = keys(rowSelection);
    const differenceIds = xor(rowSelectedIds, checkedIds);
    if (differenceIds.length > 0) {
      setRowSelection(
        reduce(
          checkedIds,
          (f: any, id) => {
            f[id] = true;
            return f;
          },
          {}
        )
      );
    }
  }, [checkedIds]);

  const handleOnRowChecked = (id: string) => {
    const newRowSelection = { ...rowSelection };
    if (!!newRowSelection?.[id]) {
      delete newRowSelection[id];
    } else {
      newRowSelection[id] = true;
    }
    setRowSelection({ ...newRowSelection });
  };

  const columns: ListColumn[] = !!iColumns?.length
    ? iColumns
        ?.filter((iCol: any) => {
          return !hideColumns.includes(iCol?.keyName);
        })
        .map((iCol: any) => {
          const newCol: ListColumn = { ...iCol };
          newCol.render = () => {
            return null;
          };
          if (columnRenderRemap?.[iCol?.keyName]) {
            newCol.render = columnRenderRemap[iCol.keyName];
          }
          return newCol;
        })
    : [];

  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container spacing={3} sx={{ px: 2, py: 1 }}>
        {rows.map((row: any, i: number) => (
          <Grid key={i} item xs={12} {...(isSmall ? {} : { sm: 6, lg: 4 })} {...(itemPerRow && { lg: 12 / itemPerRow })}>
            <ChildrenComponent
              sx={{
                position: 'relative',
                border: '1px solid',
                borderRadius: 1,
                px: 2,
                py: 1,
                minHeight: 130,
                borderColor: theme.palette.divider,
                ...sx
              }}
              {...{
                style,
                t,
                data: row,
                columns: columns ?? [],
                isChecked: !!rowSelection[row[primaryKey]],
                primaryKey
              }}
              onChecked={handleOnRowChecked}
            />
          </Grid>
        ))}
        {pagingProps ? (
          <Grid
            item
            xs={12}
            sx={
              matchDownSM ? { position: 'absolute', bottom: 0, zIndex: 1005, bgcolor: theme.palette.background.paper, width: '100%' } : {}
            }
          >
            <ListPagination
              gotoPage={(page: number) => onPageChange && onPageChange(page, pagingProps.pageSize)}
              setPageSize={(size: number, pageIndex) => onPageChange && onPageChange(pageIndex ?? pagingProps.pageIndex, size)}
              pageSize={pagingProps.pageSize}
              pageIndex={pagingProps.pageIndex}
              pageTotal={pagingProps.pageTotal}
              pageCount={pagingProps.pageCount}
              isSmall={isSmall}
            />
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default ListGrid;
