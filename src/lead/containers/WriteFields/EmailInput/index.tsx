import { useEffect, useState } from 'react';
import _ from 'lodash';

//project
import { EmailType } from '@base/types/common';
import { LABEL_VALUE_CUSTOM, LABEL_VALUE_PRIMARY, PERSONAL_LABEL_OPTIONS } from '@base/config/constant';

//material
import { AddCircleOutline, CancelOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';

//third-party
import { useTranslation } from 'react-i18next';

interface WebsiteProps {
  value: EmailType | EmailType[] | null;
  onChange: (val: EmailType | EmailType[] | null) => void;
  isMultiple?: boolean;
}

const EmailInput = (props: WebsiteProps) => {
  const { value, onChange, isMultiple = false } = props;
  const { t } = useTranslation();

  //intial
  const defaultRow: any = {
    label: LABEL_VALUE_PRIMARY,
    labelValue: '',
    email: ''
  };
  //state
  const [rows, setRows] = useState<any[]>([defaultRow]);

  //init rows
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          if (JSON.stringify(value) !== JSON.stringify(rows)) {
            setRows(value);
          }
        } else {
          setRows([_.cloneDeep(defaultRow)]);
        }
      } else {
        setRows([value]);
      }
    } else {
      setRows([_.cloneDeep(defaultRow)]);
    }
  }, [value]);

  //add more email
  const handleAddMore = () => {
    const newDefaultRow = {
      ...defaultRow,
      label: {
        languageKey: t(`ncrm_common_label_custom`),
        label: LABEL_VALUE_CUSTOM
      }
    };
    let newRows = [...rows, newDefaultRow];
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  //remove email
  const handleRemove = (i: number) => {
    let newRows = [...rows];
    newRows.splice(i, 1);
    let existPrimary = false;
    //reset primary
    newRows.map((_ele: any) => {
      if (_ele.label.label === LABEL_VALUE_PRIMARY) {
        existPrimary = true;
      }
    });
    if (!existPrimary) {
      newRows[0].label = { languageKey: t(`ncrm_common_label_primary`), label: LABEL_VALUE_PRIMARY };
      //newRows[0].primary = true;
    }
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  //value change
  const handleValueChange = (index: number, keyAttribute: string, keyValue: any) => {
    const newRows = [...rows];
    newRows[index][keyAttribute] = keyValue;
    //set primary
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  return (
    <Box sx={{ p: 0 }}>
      {rows.map((row, idx) => {
        return (
          <Stack key={idx} spacing={0.5}>
            <TextField
              fullWidth
              placeholder="Type an email address"
              value={row.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(idx, 'email', e.target.value)}
            />
          </Stack>
        );
      })}
    </Box>
  );
};

export default EmailInput;
