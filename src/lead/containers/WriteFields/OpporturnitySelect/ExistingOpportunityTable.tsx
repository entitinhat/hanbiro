import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@mui/material';

import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ListBody } from '@base/components/@hanbiro/List';
import { useOpportunities } from '@opportunity/hooks/useOpportunities';

import { opportunityField, columnRenderRemap } from './Helper';

interface ExistingOpportunityTableProps {
  onChecked: (val: any) => void;
}

const ExistingOpportunityTable = (props: ExistingOpportunityTableProps) => {
  const { onChecked } = props;
  const category = ''
  const { data: listData, isFetching: isDataFetching, refetch } = useOpportunities(opportunityField);

  const getMapColumns = () => {
    return columnRenderRemap();
  };

  const handleOnCheck = (ids: string[]) => {
    const opportunitySlected = listData?.data?.map((item: any) => {
      if(item?.id == ids[0]){
        return item
      }
    })
    onChecked && onChecked(opportunitySlected)
  }

  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        width: '45px',
        cell: ({ row }) => (
          <div className="pd-x-1">
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
              sx={{ p: 0 }}
            />
          </div>
        )
      },
      ...makeTable8Columns(opportunityField, getMapColumns(), { category }, [])
    ],
    [opportunityField]
  );

  const ExistingOpportunityTableMemo = useMemo(() => {
    
    const listTableProps: ListTableProps = {
      rows: listData?.data || [],
      onRowChecked: handleOnCheck,
      columns: tableColumns,
      isMultiSelection: false,
    };
    return <ListTable {...listTableProps} sx={{ px: 0 }}/>;

  }, [listData, tableColumns]);

  //main
  return <ListBody>{ExistingOpportunityTableMemo}</ListBody>;
}

export default ExistingOpportunityTable