import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { Typography } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SalesTeamViewProps {
  value?: any[] | undefined;
  componentProps?: {
    [x: string]: any;
  };
}

const SalesTeamView = (props: SalesTeamViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (value && value?.length > 0) {
      setItems(value);
    } else {
      setItems([]);
    }
  }, [value]);

  // ------------table center-----------------
  const getMapColumns = () => {
    return {
      name(col: string, data: any, extra: any) {
        return <Typography>{data?.user?.user?.name}</Typography>;
      },
      role(col: string, data: any, extra: any) {
        return data?.role?.languageKey ? <Typography>{t(data?.role?.languageKey)}</Typography> : '';
      }
    };
  };

  const fields = useMemo(() => {
    return [
      { languageKey: 'Name', keyName: 'name', enableSorting: false, width: 'auto' },
      { languageKey: 'Role', keyName: 'role', enableSorting: false, width: 'auto' }
    ];
  }, []);

  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  // paging

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items || [],
      columns: columns,
      sx: { p: 0, mb: 0, width: '100%' }
    };
    return <ListTable {...listTableProps} />;
  }, [items, columns]);

  return <>{TableMemo}</>;
};

export default SalesTeamView;
