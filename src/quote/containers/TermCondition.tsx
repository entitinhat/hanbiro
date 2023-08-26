import React, { useEffect, useState } from 'react';

//material
import { Stack, TextField } from '@mui/material';

//project
import { MENU_QUOTE } from '@base/config/menus';
import DataSourceSelect from '@base/containers/DataSourceSelect';
import { KEY_QUOTE_TERM_CONDITION } from '@settings/preferences/pages/Quote';

interface TermConditionProps {
  value?: any;
  onChange?: (val: any) => void;
}
const TermCondition = (props: TermConditionProps) => {
  const { value, onChange } = props;

  //state
  const [text, setText] = useState('');
  const [termItem, setTermItem] = useState<any>(null);

  //init value
  useEffect(() => {
    if (value) {
      setText(value?.content || '');
      setTermItem(value?.term || null);
    } else {
      setText(value || '');
      setTermItem(null);
    }
  }, [value]);

  const handleSelectChange = (selected: any) => {
    if (selected) {
      setTermItem(selected);
      //text
      setText(selected.content);
      //callback
      onChange && onChange({ term: selected, content: selected.content });
    }
  };

  //handle value change
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value as string;
    setText(newVal);
    //callback
    onChange && onChange({ term: termItem, content: newVal });
  };

  return (
    <Stack spacing={1}>
      <DataSourceSelect
        sourceMenu={MENU_QUOTE}
        sourceKey={KEY_QUOTE_TERM_CONDITION}
        sourceType="setting"
        value={termItem}
        onChange={handleSelectChange}
      />
      <TextField multiline rows={3} value={text} onChange={handleValueChange} />
    </Stack>
  );
};

export default TermCondition;
