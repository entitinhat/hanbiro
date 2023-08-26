import React, { useEffect, useState } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { Box, styled, SxProps, TextField, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

//project base
import IconButton from '@base/components/@extended/IconButton';
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import Switch from '@base/components/@hanbiro/Switch';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import DataSourceSelect from '@base/containers/DataSourceSelect';

//menu
import {
  KEY_SALES_TEAM_MEMBER_ACTIVE,
  KEY_SALES_TEAM_MEMBER_ROLE,
  KEY_SALES_TEAM_MEMBER_USERNAME,
  KEY_SALES_TEAM_MEMBER_USERID
} from '@settings/preferences/config/lead/keyNames';

interface Props {
  value: any[];
  onChange?: (values: any) => void;
  tableSx?: SxProps;
  isWrite?: boolean;
}

const Members = (props: Props) => {
  const { value, onChange, tableSx, isWrite } = props;
  const [items, setItems] = useState<any[]>([]);
  const { t } = useTranslation();

  //init
  useEffect(() => {
    if (value && JSON.stringify(value) != JSON.stringify(items)) {
      setItems(value);
    }
  }, [value]);

  //column render
  const editableColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index, original }, column: { id }, table }) => {
      // console.log('table', table);
      // console.log('column id', id);
      const initialValue = getValue<any>();

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

      const onDelete = (rIndex: number) => {
        const newTableData = [...table.options.data];
        newTableData.splice(rIndex, 1);
        table.options.meta?.updateTableData(newTableData);
      };
      //edit cell
      const getEditTableColumn = (fieldId: string) => {
        switch (fieldId) {
          case KEY_SALES_TEAM_MEMBER_USERNAME:
            return (
              <UserAutoComplete
                single
                value={value}
                onChange={(selected) => {
                  setValue(selected);
                  table.options.meta?.updateCellData(index, id, selected);
                }}
              />
            );
          case KEY_SALES_TEAM_MEMBER_USERID:
            return <Typography>{value}</Typography>;
          case KEY_SALES_TEAM_MEMBER_ROLE:
            return (
              <DataSourceSelect
                single={true}
                sourceKey={'sales_role'}
                sourceType={'field'}
                keyOptionValue={'keyName'}
                keyOptionLabel={'languageKey'}
                value={value}
                onChange={(selected) => {
                  setValue(selected);
                  table.options.meta?.updateCellData(index, id, selected);
                }}
              />
            );
          case KEY_SALES_TEAM_MEMBER_ACTIVE:
            return <Switch value={value} onChange={(v) => setValue(v)} />;
          case 'delete':
            return (
              <Box sx={{ textAlign: 'right' }}>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    onDelete(index);
                  }}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Box>
            );
          default:
            return <TextField fullWidth value={value || ''} onBlur={onBlur} />;
          // return <Typography>{value}</Typography>;
        }
      };
      //view cell
      const getViewTableColumn = (fieldId: string) => {
        switch (fieldId) {
          case KEY_SALES_TEAM_MEMBER_USERNAME:
            return <Typography>{value?.displayName || ''}</Typography>;
          case KEY_SALES_TEAM_MEMBER_ROLE:
            return <Typography>{t(value?.languageKey || '')}</Typography>;
          case KEY_SALES_TEAM_MEMBER_USERID:
            return <Typography>{value}</Typography>;
          case KEY_SALES_TEAM_MEMBER_ACTIVE:
            return <Switch value={value} onChange={(v) => setValue(v)} />;
          case 'delete':
            return (
              <Box sx={{ textAlign: 'right' }}>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    onDelete(index);
                  }}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Box>
            );
          default:
            return <Typography>{value}</Typography>;
        }
      };
      return isWrite ? getEditTableColumn(id) : getViewTableColumn(id);
    }
  };

  //column configs
  const columnsEdittable = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: KEY_SALES_TEAM_MEMBER_USERNAME,
        header: ({ table }) => <SpanLang keyLang={`User`} textOnly />
      },
      {
        accessorKey: KEY_SALES_TEAM_MEMBER_USERID,
        width: '15%',
        header: ({ table }) => <SpanLang keyLang={`User Id`} textOnly />
      },
      {
        accessorKey: KEY_SALES_TEAM_MEMBER_ROLE,
        header: ({ table }) => <SpanLang keyLang={`Marketing/Sales Role`} textOnly />
      },

      {
        accessorKey: KEY_SALES_TEAM_MEMBER_ACTIVE,
        header: ({ table }) => <SpanLang keyLang={`Active`} textOnly />,
        width: '25px'
      },
      {
        accessorKey: 'delete',
        width: '25px',
        header: ({ table }) => <></>
      }
    ],
    []
  );

  //data change
  const handleTableOnChange = (newData: any) => {
    //const newItems = newData.map((_ele: any) => ({ ..._ele, [KEY_SALES_TEAM_MEMBER_USERID]: _ele[KEY_SALES_TEAM_MEMBER_USERNAME].id }));
    //console.log('newItems', newItems);
    setItems(newData);
    onChange && onChange(newData);
  };

  return (
    <>
      <ReactEditable8
        editableColumn={editableColumn}
        columns={columnsEdittable}
        data={[...items]}
        setData={(newData: any) => handleTableOnChange(newData)}
        sx={tableSx}
      />
    </>
  );
};
export default Members;
