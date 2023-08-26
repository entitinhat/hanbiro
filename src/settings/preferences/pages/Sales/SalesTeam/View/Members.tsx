import React, { useEffect, useState } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { Box, styled, SxProps, TextField, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

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
  KEY_SALES_TEAM_MEMBER_USERID,
  KEY_SALES_TEAM_MEMBER_USER
} from '@settings/preferences/config/lead/keyNames';
import { useSalesTeamMemberDelete, useSalesTeamMemberUpdate } from '@settings/preferences/hooks/sales/useSalesTeamMember';

interface Props {
  teamId?: string;
  value: any[];
  onChange?: (values: any) => void;
  tableSx?: SxProps;
  isWrite?: boolean;
}

const Members = (props: Props) => {
  const { teamId, value, onChange, tableSx, isWrite } = props;
  const [items, setItems] = useState<any[]>([]);
  const { t } = useTranslation();

  //hook
  const mDeleteMember: any = useSalesTeamMemberDelete();
  const mUpdateMember: any = useSalesTeamMemberUpdate();

  //init
  useEffect(() => {
    if (value && !_.isEqual(value, items)) {
      const newValue = value.map((_ele: any) => ({
        ..._ele,
        [KEY_SALES_TEAM_MEMBER_USERID]: _ele[KEY_SALES_TEAM_MEMBER_USER]?.user?.id || ''
      }));
      setItems(newValue);
    }
  }, [JSON.stringify(value)]);

  //delete success
  useEffect(() => {
    if (mDeleteMember.isSuccess) {
      let newItems = items.filter((_ele: any) => !mDeleteMember.variables.memberIds.includes(_ele.user.user.id));
      setItems(newItems);
    }
  }, [mDeleteMember.isSuccess]);

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
          case KEY_SALES_TEAM_MEMBER_USER:
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
            return (
              <Switch
                value={value || false}
                onChange={(v) => {
                  setValue(v);
                  table.options.meta?.updateCellData(index, id, v);
                }}
              />
            );
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
          case KEY_SALES_TEAM_MEMBER_USER:
            return <Typography>{value?.user?.name || ''}</Typography>;
          case KEY_SALES_TEAM_MEMBER_ROLE:
            return <Typography>{t(value?.languageKey || value?.name)}</Typography>;
          case KEY_SALES_TEAM_MEMBER_USERID:
            return <Typography>{value}</Typography>;
          case KEY_SALES_TEAM_MEMBER_ACTIVE:
            return (
              <Switch
                value={value || false}
                onChange={(v) => {
                  setValue(v);
                  table.options.meta?.updateCellData(index, id, v);
                }}
              />
            );
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
        accessorKey: KEY_SALES_TEAM_MEMBER_USER,
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
    const newItems = newData.map((_ele: any) => ({ ..._ele, [KEY_SALES_TEAM_MEMBER_USERID]: _ele[KEY_SALES_TEAM_MEMBER_USER].id }));
    //console.log('newItems', newItems);
    if (isWrite) {
      setItems(newItems);
      onChange && onChange(newItems);
    } else {
      if (newItems.length < items.length) {
        //there is an item deleted
        const newUserIds = newItems.map((_ele: any) => _ele.user.user.id);
        const deletedItem = items.find((_ele: any) => !newUserIds.includes(_ele.user.user.id));
        //console.log('deletedItem', deletedItem);
        if (deletedItem) {
          const deleteParams = {
            id: teamId,
            memberIds: [deletedItem.user.user.id]
          };
          mDeleteMember.mutate(deleteParams);
        }
      } else {
        let updateItem: any = null;
        items.map((_item: any) => {
          newItems.map((_newItem: any) => {
            if (_item.user.user.id === _newItem.user.user.id && _item.active !== _newItem.active) {
              updateItem = _newItem;
            }
          });
        });
        //console.log('updateItem', updateItem);
        if (updateItem) {
          const updateParams = {
            id: teamId,
            member: {
              user: { user: { id: updateItem.user.user.id } },
              active: updateItem.active
            }
          };
          mUpdateMember.mutate(updateParams);
        }
      }
    }
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
