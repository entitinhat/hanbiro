import SpanLang from '@base/components/@hanbiro/SpanLang';
import { generateUUID } from '@base/utils/helpers';
import { DeleteOutline } from '@mui/icons-material';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import { LeadSettingValue } from '@settings/preferences/types/lead/lead';
import { ChangeEvent, useEffect, useState } from 'react';

interface ChildrenWriteFieldProps {
  value: LeadSettingValue[];
  onChange: (params: LeadSettingValue[]) => void;
}
const ChildrenWriteField = (props: ChildrenWriteFieldProps) => {
  console.log('ChildrenWriteFieldProps', props);
  const { value, onChange } = props;
  const [data, setData] = useState<LeadSettingValue[]>([]);
  useEffect(() => {
    if (value) setData(value);
  }, [value]);
  const handleAddRow = () => {
    const nVal = [...data];
    nVal.push({ id: generateUUID(), name: '' });
    console.log('nVal', nVal);
    setData(nVal);
  };
  const handleDeleteRow = (index: number) => {
    const nVal = [...data];
    nVal.splice(index, 1);
    onChange && onChange(nVal);
  };
  const handleChangeItem = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    let nVal = [...data];
    nVal[index].name = e.target.value;
    onChange && onChange(nVal);
  };
  return (
    <>
      {data.map((_item, index) => (
        <Stack direction="row" spacing={1} key={index}>
          <TextField
            fullWidth
            value={_item.name}
            onChange={(e) => {
              handleChangeItem(e, index);
            }}
          />
          <IconButton
            size="small"
            aria-label="delete"
            color="error"
            onClick={() => {
              handleDeleteRow(index);
            }}
          >
            <DeleteOutline fontSize="small" color="error" />
          </IconButton>
        </Stack>
      ))}
      <Button
        size="small"
        onClick={() => {
          handleAddRow();
        }}
      >
        <SpanLang keyLang="Add Sub Item" textOnly />
      </Button>
    </>
  );
};

export default ChildrenWriteField;
