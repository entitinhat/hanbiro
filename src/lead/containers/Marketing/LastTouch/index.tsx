import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import useDevice from '@base/hooks/useDevice';
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import { LastTouchFields, TableFields } from '../json';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { generateUUID } from '@base/utils/helpers';
import { useTranslation } from 'react-i18next';
import Section from '@settings/preferences/components/Section';
import MainCard from '@base/components/App/MainCard';

interface LastTouchProps {}
const LastTouch = (props: LastTouchProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const border = '1px solid ' + theme.palette.divider;
  //state
  const [items, setItems] = useState<TableFields[]>(LastTouchFields);

  //save item
  const handleSave = (newData: any) => {
    return;
  };

  // Give our default column cell renderer editing superpowers!
  const editableColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index, original }, column: { id }, table }) => {
      //console.log('table', table);
      //console.log('column id', id);
      const initialValue = getValue();

      //get original data id (if row has no id = Add mode)
      const rowId = original.id;

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
        case 'action':
          return (
            <>
              {!rowId && (
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
              )}
            </>
          );
        default:
          return <Typography>{value}</Typography>;
      }
    }
  };

  //build columns - company
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'createdAt',
        header: () => <SpanLang textOnly keyLang={'ncrm_sales_lead_last_touch_createdAt'} />
      },
      {
        accessorKey: 'source',
        header: () => <SpanLang textOnly keyLang={'ncrm_sales_lead_last_touch_source'} />
      },
      {
        accessorKey: 'activity',
        header: () => <SpanLang textOnly keyLang={'ncrm_sales_lead_last_touch_activity'} />
      },
      {
        accessorKey: 'behavior',
        header: () => <SpanLang textOnly keyLang={'ncrm_sales_lead_last_touch_behavior'} />
      }
    ],
    []
  );

  //add new row
  const handleAddRow = () => {
    const defaultRow: any = {
      id: generateUUID(),
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
      contentSX={{ p: 0, pb: '0px !important' }}
      title={<SpanLang keyLang={'ncrm_sales_lead_last_touch'} textOnly />}
      headerSX={{ p: '8px 16px', height: '50px' }}
      border={false}
    >
      <ReactEditable8
        editableColumn={editableColumn}
        columns={columns}
        data={[...items]}
        setData={handleDataChange}
        sx={{
          border: 'none',
          ' .MuiTableCell-head': {
            fontWeight: theme.typography.fontWeightRegular
          }
        }}
      />
    </MainCard>
  );
};
export default LastTouch;
