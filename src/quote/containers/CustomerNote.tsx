import React, { useEffect, useState } from 'react';

//material
import { Stack, TextField } from '@mui/material';

//project
import { MENU_QUOTE } from '@base/config/menus';
import DataSourceSelect from '@base/containers/DataSourceSelect';
import { KEY_QUOTE_CUSTOMER_NOTE } from '@settings/preferences/pages/Quote';

interface CustomerNoteProps {
  value: string;
  onChange: (val: string) => void;
}
const CustomerNote = (props: CustomerNoteProps) => {
  const { value, onChange } = props;

  //state
  const [text, setText] = useState('');
  const [noteItem, setNoteItem] = useState<any>(null);

  //init value
  useEffect(() => {
    setText(value || '');
  }, [value]);

  const handleSelectChange = (selected: any) => {
    if (selected) {
      setNoteItem(selected);
      //text
      setText(selected.description);
      //callback
      onChange && onChange(selected.description);
    }
  };

  //handle value change
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value as string;
    setText(newVal);
    //callback
    onChange && onChange(newVal);
  };

  return (
    <Stack spacing={1.5}>
      {/* <DataSourceSelect
        sourceMenu={MENU_QUOTE}
        sourceKey={KEY_QUOTE_CUSTOMER_NOTE}
        sourceType="setting"
        value={noteItem}
        onChange={handleSelectChange}
      /> */}
      <TextField multiline rows={3} value={text} onChange={handleValueChange} />
    </Stack>
  );
};

export default CustomerNote;
