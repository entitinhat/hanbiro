import _ from 'lodash';

import IconButton from '@base/components/@extended/IconButton';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import { OptionValue } from '@base/types/common';
import { User } from '@base/types/user';
import { removeItemAtIndex, replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { AddRounded, RemoveRounded } from '@mui/icons-material';
import { Stack, TableCell, TableRow } from '@mui/material';
import { AssignRole, MemberRole } from '@project/types/project';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

import { memberRoles } from './';

interface MemberItemProps {
  item: AssignRole;
  fieldOptions: {
    defaultOption: OptionValue;
    options: OptionValue[];
  };
  handleChange?: (val: AssignRole) => void;
  handleRemove: (id: string) => void;
}

function MemberItem(props: MemberItemProps) {
  console.log('member item', props.item);
  const { item, handleChange, fieldOptions, handleRemove } = props;
  const roleValue = memberRoles.find((v) => (v.keyName as MemberRole) == item.role)!!;

  const onChangeRole = (newVal: OptionValue) => {
    handleChange && handleChange({ ...item, role: newVal.keyName as MemberRole });
  };

  const onChangeMember = (index: number, newVal: User | User[] | null) => {
    handleChange &&
      handleChange({
        ...item,
        fields: replaceItemAtIndex(item.fields, index, {
          ...item.fields[index],
          assignTo: newVal as User[]
        })
      });
  };

  const onChangeField = (index: number, newVal: OptionValue) => {
    handleChange &&
      handleChange({
        ...item,
        fields: replaceItemAtIndex(item.fields, index, {
          ...item.fields[index],
          field: { id: newVal.keyName, name: newVal.languageKey }
        })
      });
  };

  const onRemove = (index: number) => {
    const fields = removeItemAtIndex(item.fields, index);
    if (fields.length > 0) {
      handleChange &&
        handleChange({
          ...item,
          fields: removeItemAtIndex(item.fields, index)
        });
    } else {
      handleRemove && handleRemove(item.id);
    }
  };

  const onAdd = () => {
    console.log('item', item);
    handleChange &&
      handleChange({
        ...item,
        fields: [
          ...item.fields,
          {
            field: {
              id: fieldOptions.defaultOption?.keyName,
              name: fieldOptions.defaultOption?.languageKey
            },
            assignTo: []
          }
        ]
      });
  };

  return (
    <>
      <TableRow
        sx={{
          '&:hover': { bgcolor: 'transparent !important' },
          '> .MuiTableCell-root:first-of-type': { p: 1 },
          '> .MuiTableCell-root:last-of-type': { p: 1 }
        }}
      >
        <TableCell align="center" rowSpan={item.fields.length}>
          <SelectBox value={roleValue} onChange={onChangeRole} options={memberRoles} />
        </TableCell>
        <TableCell align="center">
          <SelectBox
            value={{ keyName: item.fields[0]?.field.id, languageKey: item.fields[0]?.field.name }}
            onChange={(newVal: OptionValue) => onChangeField(0, newVal)}
            options={fieldOptions.options}
          />
        </TableCell>
        <TableCell align="center">
          <UserAutoComplete value={item.fields[0]?.assignTo} onChange={(newVal: User | User[] | null) => onChangeMember(0, newVal)} />
        </TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton size="small" color="error" onClick={() => onRemove(0)}>
              <RemoveRounded sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton size="small" color="primary" onClick={onAdd}>
              <AddRounded sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      {item.fields?.slice(1).map((v, index) => {
        return (
          <TableRow
            key={v.field.id}
            sx={{
              '&:hover': { bgcolor: 'transparent !important' },
              '> .MuiTableCell-root:first-of-type': { p: 1 },
              '> .MuiTableCell-root:last-of-type': { p: 1 }
            }}
          >
            <TableCell align="center">
              <SelectBox
                value={{ keyName: v.field.id, languageKey: v.field.name }}
                onChange={(newVal: OptionValue) => onChangeField(index + 1, newVal)}
                options={fieldOptions.options}
              />
            </TableCell>
            <TableCell align="center">
              <UserAutoComplete value={v.assignTo} onChange={(newVal: User | User[] | null) => onChangeMember(index + 1, newVal)} />
            </TableCell>
            <TableCell align="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton size="small" color="error" onClick={() => onRemove(index + 1)}>
                  <RemoveRounded sx={{ fontSize: 20 }} />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default MemberItem;
