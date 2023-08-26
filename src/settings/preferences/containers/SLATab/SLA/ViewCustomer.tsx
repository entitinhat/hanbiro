import { IdName } from '@base/types/common';
import { Box, Button, IconButton, InputAdornment, TextField, useTheme, Grid, Stack } from '@mui/material';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import { SLA } from '@settings/preferences/types/desk/common';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ColumnDef } from '@tanstack/react-table';
import { DeleteOutline } from '@mui/icons-material';
import _ from 'lodash';
import { generateUUID } from '@base/utils/helpers';

interface ViewCustomerProps {
  onClose: () => void;
  onSave: (params: any) => void;
  data: SLA | null;
  open: boolean;
}
const ViewCustomer = (props: ViewCustomerProps) => {
  const { onClose, onSave, data, open } = props;
  const [items, setItems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [rowHover, setRowHover] = useState<any>();

  const { t } = useTranslation();

  const setSearchTextDebounced = useRef(
    _.debounce((searchText) => {
      setSearchValue(searchText);
    }, 1500)
  ).current;

  const handleSaveChange = () => {
    const nData = {
      ...data,
      customers: items.filter((v: any) => !v?.isEmptyRow).map((v: any) => ({ id: v?.id, name: v?.name }))
    };
    onSave && onSave(nData);
  };

  useEffect(() => {
    if (data && data?.customers) {
      if (!_.isEqual(data.customers, items)) {
        setItems(data.customers?.map((v: any) => ({ ...v, rowId: generateUUID() })));
      } else {
        setItems([]);
      }
    }
  }, [data]);

  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;

  const handleAddRow = () => {
    const newItem = {
      isEmptyRow: true,
      rowId: generateUUID()
    };

    setItems((prev) => [...prev, newItem]);
  };

  const onDeleteRow = (rowId: number) => {
    const nCustomers = items.filter((item, idx) => {
      return item?.rowId != rowId;
    });
    setItems(nCustomers);
  };

  const handleOnCustomerChange = (nVal: any, rowId: number) => {
    // check existed
    const existed = items.find((v: any) => v?.id === nVal?.id);

    if (!existed) {
      const newItems = items.map((v: any, i: number) => {
        if (v?.rowId === rowId) {
          return { ...nVal, rowId };
        } else {
          return v;
        }
      });
      setItems(newItems);
    } else {
      onDeleteRow(rowId);
    }
  };

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" color="secondary" onClick={onClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <Button size="small" variant="contained" color="primary" onClick={handleSaveChange}>
              {t('ncrm_common_btn_save')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [items]);

  // =================== table =========================

  const getMapColumns = () => {
    return {
      name(col: string, data: any) {
        return data?.isEmptyRow ? (
          <CustomerAutoComplete single value={undefined} onChange={(nVal: any) => handleOnCustomerChange(nVal, data?.rowId)} />
        ) : (
          data?.[col]
        );
      },
      delete(col: string, data: any) {
        return (
          <IconButton
            sx={{ display: rowHover && (rowHover?.index === data?.idx || rowHover?.id === data?.id) ? 'flex' : 'none' }}
            onClick={() => {
              onDeleteRow(data?.rowId);
            }}
            size="small"
          >
            <DeleteOutline fontSize="small" color="error" />
          </IconButton>
        );
      }
    };
  };

  //table props
  const fields = [
    { languageKey: 'Customer Name', keyName: 'name', enableSorting: false, width: 'auto' },
    { languageKey: '', keyName: 'delete', enableSorting: false, width: '80px' }
  ];

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  //render table list
  const TableMemo = useMemo(() => {
    const rows =
      searchValue.trim() !== ''
        ? items?.filter((v: any) => v?.name?.includes(searchValue.trim()))?.map((v: any, i: number) => ({ ...v, idx: i })) || []
        : items?.map((v: any, i: number) => ({ ...v, idx: i })) || [];
    const listTableProps: ListTableProps = {
      rows: rows,
      columns: columns,
      sx: { px: 0 },
      setRowHover: setRowHover
    };
    return <ListTable {...listTableProps} />;
  }, [items, columns, searchValue]);

  return (
    <>
      <MiModal
        title={<SpanLang keyLang={`ncrm_generalsetting_preferences_desk_customers`} />}
        isOpen={open}
        size="md"
        fullScreen={false}
        onClose={onClose}
        footer={Footer}
        anchor={'right'}
      >
        <form>
          <Box sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Box sx={{ mt: 2, ml: 3, mr: 3, mb: 2, width: '500px' }}>
                <TextField
                  size="small"
                  variant="outlined"
                  value={searchText}
                  fullWidth
                  onChange={(event: any) => {
                    setSearchText(event.target.value);
                    setSearchTextDebounced(event.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment sx={{ height: 32 }} position="end">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
              {TableMemo}

              <Box p={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleAddRow();
                  }}
                  startIcon={<Add />}
                  disabled={searchValue !== ''}
                >
                  {t('ncrm_common_btn_add_another_line')}
                </Button>
              </Box>
            </Stack>
          </Box>
        </form>
      </MiModal>
    </>
  );
};

export default ViewCustomer;
