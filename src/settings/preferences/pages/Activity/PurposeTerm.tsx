import React, { ReactNode, useEffect, useMemo, useState } from 'react';

//material
import { useTheme } from '@mui/material/styles';
import { Box, Button, ButtonGroup, Radio, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { AddOutlined, DeleteOutline } from '@mui/icons-material';

//project
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import IconButton from '@base/components/@extended/IconButton';
import { LabelValue } from '@base/types/app';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

interface PurposeTermProps {
  items: any[];
  onChange: (data: any[]) => void;
  onAdd?: () => void;
}
//const rerender = React.useReducer(() => ({}), {})[1]; //force rerender

const PurposeTerm = (props: PurposeTermProps) => {
  const { items = [], onChange, onAdd } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  // Give our default column cell renderer editing superpowers!
  const editableColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      //console.log('table', table);
      //console.log('column id', id);
      const initialValue = getValue();

      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue || '');

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateCellData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue || '');
      }, [initialValue]);

      return (
        <Stack
          direction={'row'}
          justifyContent="space-between"
          alignItems={'center'}
          sx={{
            '&:hover #btn-group-edit': {
              display: 'block'
            }
          }}
        >
          {id != 'isDefault' && (
            <Typography>{t(value as string)}</Typography>
            // <TextField
            //   disabled
            //   variant="standard"
            //   fullWidth
            //   InputProps={{
            //     disableUnderline: true
            //   }}
            //   sx={{
            //     '& .MuiInputBase-root.Mui-focused': {
            //       border: `1px solid ${theme.palette.primary[400]}`,
            //       borderRadius: 1,
            //       p: 0.5
            //     }
            //   }}
            //   value={t(value as string)}
            //   onChange={(e) => setValue(e.target.value)}
            //   onBlur={onBlur}
            // />
          )}
          {id == 'isDefault' && (
            <>
              <Radio
                id={`${index}-${id}`}
                checked={(value as boolean) || false}
                onChange={(e) => {
                  setValue(e.target.checked);
                  //update current index to true, others are false
                  const newData = [...table.options.data];
                  newData.map((_row: any, _otherIdx: number) => {
                    if (_otherIdx !== index) {
                      newData[_otherIdx].isDefault = false;
                    } else {
                      newData[index].isDefault = true;
                    }
                  });
                  table.options.meta?.updateTableData(newData);
                }}
              />
              {/* <ButtonGroup id="btn-group-edit" sx={{ display: 'none' }}>
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
              </ButtonGroup> */}
            </>
          )}
        </Stack>
      );
    }
  };

  //build columns
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'languageKey',
        header: () => <span>{t('ncrm_generalsetting_preferences_activity_purpose')}</span>
      },
      {
        accessorKey: 'isDefault',
        header: () => <span>{t('ncrm_generalsetting_default')}</span>
      }
    ],
    []
  );

  return (
    <>
      <ReactEditable8 editableColumn={editableColumn} columns={columns} data={[...items]} setData={(newData: any) => onChange(newData)} />

      {/* <Button variant="text" startIcon={<AddOutlined />} sx={{ mt: 1 }} onClick={() => onAdd && onAdd()}>
        Add
      </Button> */}
    </>
  );
};

export default PurposeTerm;
