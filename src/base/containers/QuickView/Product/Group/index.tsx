import { usePublishProductsByGroup } from '@product/product/hooks/usePublishProductsByGroup';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import { Box, useTheme } from '@mui/material';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ProductQuickView, ProductItemQuickView } from '@base/containers/QuickView';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';

const ProductGroupQuickView = (props: QuickViewComponentProps) => {
  const { id, setLoading } = props;

  const { data, isLoading } = usePublishProductsByGroup({ groupId: id });

  useEffect(() => {
    setLoading && setLoading(isLoading);
  }, [isLoading]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'name',
        // width: '125px',
        header: () => <SpanLang keyLang={'Product Name'} />,
        accessorKey: 'name',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return <ProductQuickView value={{ id: row?.original?.id, name: row?.original?.name }} />;
        }
      },
      {
        id: 'unit',
        // width: '100px',
        header: () => <SpanLang keyLang={'Base Unit'} />,
        accessorKey: 'unit',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return row?.original?.unit?.name ?? '';
        }
      },
      {
        id: 'attributes',
        // width: '100px',
        header: () => <SpanLang keyLang={'Attributes'} />,
        // accessorKey: 'attrValues',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          const items: any[] = row?.original?.attributes ?? [];
          return items.length > 0 ? <ListTableCellDroplist showAvatar={false} values={items} /> : '';
        }
      },
      {
        id: 'items',
        // width: '124px',
        header: () => <SpanLang keyLang={'Items'} />,
        // accessorKey: 'items',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          let items: any[] = row?.original?.items ?? [];
          return items.length > 0 ? (
            <ListTableCellDroplist
              showAvatar={false}
              values={items}
              cellComponent={(item: any) => <ProductItemQuickView value={{ id: item?.id, name: item?.name }} />}
            />
          ) : (
            ''
          );
        }
        // width: 'auto',
      }
    ],
    [data?.data]
  );

  const pagingProps: ListPaginationProps = {
    pageCount: data?.paging?.totalItems || 0,
    pageSize: data?.paging?.itemPerPage || 15,
    pageIndex: data?.paging?.currentPage || 1,
    pageTotal: data?.paging?.totalPage || 1
  };

  const listTableProps = {
    columns: columns,
    data: data?.data ?? []
    // sx: { padding: 0 },
    // pagingProps: pagingProps,
    // onSortBy: (clName: any, isSorted: any) => {},
    // rowSelected: []
  };

  const theme = useTheme();

  console.log('...QUICKVIEW.GROUP...', data);
  return (
    <Box sx={{ p: 2 }}>
      <ReactTable8 {...listTableProps} />
    </Box>
  );
};
export default withTextAndPreviewModal(ProductGroupQuickView, { title: 'Product Group Detail' });
