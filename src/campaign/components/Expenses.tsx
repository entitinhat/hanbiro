import { useEffect, useMemo, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { ColumnDef } from '@tanstack/react-table';
import { AddOutlined, DeleteOutline } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';

//project
import NumberField from '@base/components/@hanbiro/NumberField';
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import { defaultCurrencySelector } from '@base/store/selectors/app';

interface ExpensesProps {
  value: any[];
  onChange: (newVal: any[]) => void;
}

const Expenses = (props: ExpensesProps) => {
  const { value, onChange } = props;
  const { t } = useTranslation();
  const [items, setItems] = useState<any>([]);
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);
  //console.log('defaultCurrency', defaultCurrency);

  //init items
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(items)) {
        setItems(value);
      }
    } else {
      setItems([]);
    }
  }, [value]);

  // Give our default column cell renderer editing superpowers!
  const columnRender: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      //console.log('table', table);
      //console.log('column id', id);
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

      return (
        <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
          {id === 'name' && (
            <TextField autoComplete="off" fullWidth value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />
          )}
          {id === 'amount' && (
            <>
              <NumberField
                prefix={value?.currency || defaultCurrency.code}
                //thousandSeparator=","
                value={(value?.amount || 0) as number}
                onChange={(number: string | number) => {
                  const newAmount = { ...value, amount: Number(number) };
                  setValue(newAmount);
                  //update table
                  table.options.meta?.updateCellData(index, id, newAmount);
                }}
              />
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
            </>
          )}
        </Stack>
      );
    }
  };

  //build columns
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => <span>{t('Expense Name')}</span>
      },
      {
        accessorKey: 'amount',
        header: () => <span>{t('Expense Amount')}</span>
      }
    ],
    []
  );

  //create new row
  const handleAddRow = () => {
    const newItems = [...items];
    newItems.push({ name: '', amount: { amount: 0, currency: defaultCurrency.code } });
    setItems(newItems);
  };

  return (
    <Box>
      <ReactEditable8 editableColumn={columnRender} columns={columns} data={[...items]} setData={(newData: any) => onChange(newData)} />
      <Button size="small" variant="text" startIcon={<AddOutlined />} sx={{ mt: 0.5 }} onClick={handleAddRow}>
        {t('ncrm_common_btn_add')}
      </Button>
    </Box>
  );
};

export default Expenses;
