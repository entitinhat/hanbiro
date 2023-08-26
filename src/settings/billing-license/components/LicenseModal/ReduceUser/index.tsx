import React, { Suspense, useMemo } from 'react';

//mui
import { useTheme, TextField, Grid, Stack } from '@mui/material';
import { Button } from '@mui/material';
import MiModal from '@base/components/@hanbiro/MiModal';
import { useTranslation } from 'react-i18next';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ColumnDef } from '@tanstack/react-table';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
interface ReduceUserModal {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}
const ReduceUserModal = (props: ReduceUserModal) => {
  // console.log('prop: ' + JSON.stringify(prop))
  const theme = useTheme();
  const { t } = useTranslation();
  const { isOpen, onClose, item } = props;

  //=============table============

  // tb.item
  // tb.quantity

  const getMapColumns = () => {
    return {
      item(col: string, data: any) {
        return data?.[col];
      },
      purchased(col: string, data: any) {
        return data?.quantity;
      },
      reduct(col: string, data: any) {
        return <TextField type="number" hiddenLabel id="outlined-basic" defaultValue="0" size="small" variant="outlined" />;
      },
      user(col: string, data: any) {
        return data?.[col];
      }
    };
  };

  const fields = [
    { languageKey: 'Item', keyName: 'item', enableSorting: false, width: 'auto' },
    { languageKey: 'Purchased', keyName: 'purchased', enableSorting: false, width: 'auto' },
    { languageKey: 'Reduct', keyName: 'reduct', enableSorting: false, width: 'auto' },
    { languageKey: 'User', keyName: 'user', enableSorting: false, width: 'auto' }
  ];

  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: [item] || [],
      columns: columns,
      sx: { px: 0, pb: 1 }
    };
    return <ListTable {...listTableProps} />;
  }, [item, columns]);

  //=========== Footer ===========
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button size="small" color="error" onClick={onClose} variant="contained">
              Reduce
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }, []);

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={t('Reduct a User') as string}
        isOpen={isOpen}
        size="md"
        fullScreen={false}
        onClose={() => {
          onClose && onClose();
        }}
        footer={Footer}
        anchor="right"
      >
        {isOpen && <>{TableMemo}</>}
      </MiModal>
    </Suspense>
  );
};
export default ReduceUserModal;
