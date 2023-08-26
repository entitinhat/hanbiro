import { useEffect, useMemo, useState } from 'react';

//third-party
import { Box, Typography } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';

//project base
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { useCompetitorOpportunities } from '@competitor/hooks/useCompetitorOpportunities';
import { getMapColumns as getOpportunityMapColumns } from '@opportunity/pages/ListPage/Helper';
import RouteName from '@base/components/@hanbiro/RouteName';
interface OpportunityListProps {
  menuSource: string;
  menuCategory?: string;
  menuSourceId: string;
  layoutData: any;
}

const OpportunityList = (props: OpportunityListProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData } = props;
  const [paging, setPaging] = useState<any>({ page: 1, size: 10 });
  const [items, setItems] = useState<any[]>([]);
  // const data = { paging: { totalPage: 0, totalItems: 0, currentPage: 1 } };

  //paging change
  const handlePagingChange = (page: number, size: number) => {
    setPaging({ ...paging, page, size });
  };

  const { data } = useCompetitorOpportunities(menuSourceId, {
    filter: {
      query: `competitors=${menuSourceId}`,
      sort: { field: 'createdAt', orderBy: 2 },
      paging: paging
    }
  });

  //init data
  useEffect(() => {
    if (data?.data) {
      setItems(data?.data);
    } else {
      setItems([]);
    }
    if (data?.paging) {
      setPaging({ ...paging, page: data.paging.currentPage, totalItems: data.paging.totalItems });
    }
  }, [data]);

  const getMapColumns = () => ({
    ...getOpportunityMapColumns(),
    code(col: string, data: any) {
      const url = `/opportunity/opportunity/${data?.id}`;
      return <RouteName name={data?.[col]} url={url} />;
    }
  });

  //table props
  const fields = [
    { languageKey: 'Opportunity ID', keyName: 'code', enableSorting: false, width: 'auto' },
    { languageKey: 'Customer', keyName: 'customer', enableSorting: false, width: 'auto' },
    { languageKey: 'Estimated Revenue', keyName: 'estimatedRevenue', enableSorting: false, width: 'auto' },
    { languageKey: 'Probability', keyName: 'insightWinProbability', enableSorting: false, width: 'auto' }
    //{ languageKey: '', keyName: '', enableSorting: false, width: '70px' }
  ];

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  //paging props
  const pagingProps: ListPaginationProps = {
    pageTotal: data?.paging?.totalPage || 1,
    pageCount: data?.paging?.totalItems || 0,
    pageSize: paging?.size || LIST_TABLE_PAGE_SIZE,
    pageIndex: data?.paging?.currentPage || 1
  };

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items || [],
      pagingProps,
      onPageChange: handlePagingChange,
      columns: columns,
      sx: { px: 0 }
    };
    return <ListTable {...listTableProps} />;
  }, [items, pagingProps, columns]);

  return <Box>{TableMemo}</Box>;
};

export default OpportunityList;
