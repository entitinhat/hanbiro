import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Box, Button, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import useDevice from '@base/hooks/useDevice';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';

import WritePage from './Write';
import { TableFields } from '../json';

interface CompetitorProps {
  menuSourceId: string;
  value: any
}
const Competitor = (props: CompetitorProps) => {
  const { menuSourceId, value } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const border = '1px solid ' + theme.palette.divider;
  //state
  const [items, setItems] = useState<any[]>(value || []);
  const [isOpenWrite, setIsOpenWrite] = useState<boolean>(false);
  const [curEditItem, setCurEditItem] = useState<TableFields>();
  const [curEditItemIndex, setCurEditItemIndex] = useState<number>(-1);

  //save item
  const handleSave = (newData: any) => {
    return;
  };

  // Give our default column cell renderer editing superpowers!
  const editableColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index, original }, column: { id }, table }) => {

      //get original data id (if row has no id = Add mode)
      // const rowId = original.id;
      const rowId = true; // disable edit inline

      const initialValue = getValue();

      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState<any>(initialValue || '');

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateCellData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      useEffect(() => {
        setValue(initialValue || '');
      }, [initialValue]);

      switch (id) {
        case 'name':
          return (
            <>
              {rowId ? (
                <Typography>{value || ''}</Typography>
              ) : (
                <TextField
                  variant="standard"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                  sx={{
                    minWidth: '150px',
                    '& .MuiInputBase-root.Mui-focused': {
                      border: `1px solid ${theme.palette.primary[400]}`,
                      borderRadius: 1,
                      p: 0.5
                    }
                  }}
                  placeholder={id}
                  value={value as string}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                />
              )}
            </>
          );
        case 'website':
          return (
            <>
              {rowId ? (
                <Typography>{value?.protocol + value?.website  || ''}</Typography>
                // <ViewWeb value={value} />
              ) : (
                <TextField
                  variant="standard"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                  sx={{
                    minWidth: '150px',
                    '& .MuiInputBase-root.Mui-focused': {
                      border: `1px solid ${theme.palette.primary[400]}`,
                      borderRadius: 1,
                      p: 0.5
                    }
                  }}
                  placeholder={id}
                  value={value as string}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                />
              )}
            </>
          );
        case 'action':
          return (
            <Stack direction={'row'} spacing={0.5}>
              <IconButton
                size="small"
                aria-label="delete"
                color="error"
                onClick={(event: any) => {
                  event.stopPropagation();
                  setCurEditItemIndex(index);
                  setCurEditItem(table.options.data[index]);
                  setIsOpenWrite(true);
                }}
              >
                <EditOutlined fontSize="small" color="primary" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="delete"
                color="error"
                onClick={(event: any) => {
                  event.stopPropagation();
                  table.options.meta?.removeTableRow(index, id);
                }}
              >
                <DeleteOutline fontSize="small" color="error" />
              </IconButton>
            </Stack>
          );
      }
    }
  };

  //build columns - company
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => <SpanLang textOnly keyLang={'ncrm_common_name'} />
      },
      {
        accessorKey: 'website',
        header: () => <SpanLang textOnly keyLang={'sales_lead_field_basic_website'} />
      }
    ],
    []
  );

  //add new row
  const handleAddRow = () => {
    const defaultRow: any = {
      name: '',
      website: ''
    };
    setItems([...items, defaultRow]);
  };

  //table data change
  const handleDataChange = (newData: TableFields[]) => {
    setItems(newData);
    //save
    handleSave(newData);
  };
  return (
    <MainCard
      border={false}
      contentSX={{ p: 0, pb: '0px !important' }}
      headerSX={{ p: '8px 16px', height: '50px' }}
      title={<SpanLang keyLang={'ncrm_common_competitor'} textOnly />}
      secondary={
        <Box sx={{ ml: 'auto', mr: 0.5 }}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size={'small'}
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                setIsOpenWrite(true);
              }}
            >
              <SpanLang keyLang={'ncrm_common_btn_add'} textOnly />
            </Button>
          </Stack>
        </Box>
      }
    >
      <ReactEditable8
        editableColumn={editableColumn}
        columns={columns}
        data={items?.filter(Boolean)?.length > 0 ? [...items?.filter(Boolean)] : []} // catch case competitor was deleted 
        setData={handleDataChange}
        sx={{
          border: 'none',
          ' .MuiTableCell-head': {
            fontWeight: theme.typography.fontWeightRegular
          }
        }}
      />
      {isOpenWrite && (
        <WritePage
        id={menuSourceId}
          value={curEditItem ?? ''}
          isOpen={isOpenWrite}
          onClose={(formData: TableFields) => {
            if (formData.name) {
              if (curEditItemIndex !== -1) {
                setCurEditItemIndex(-1);
                setCurEditItem({});

                let nVal = [...items];
                nVal[curEditItemIndex] = formData;
                setItems(nVal);
              } else setItems([...items, formData]);
            }
            setIsOpenWrite(false);
          }}
        />
      )}
    </MainCard>
  );
};
export default Competitor;
