import dayjs from 'dayjs';
import { ChangeEvent, useCallback, useMemo } from 'react';

import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import NumberField from '@base/components/@hanbiro/NumberField';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { OptionValue } from '@base/types/common';
import { InputLabel, Stack, TextField, useTheme } from '@mui/material';
import { useDefinedFields } from '@process/hooks/useProcess';

export interface FieldProperty {
  field: OptionValue;
  value: string;
}

interface FieldValueProps {
  module?: string;
  value: FieldProperty;
  onChange: (val: FieldProperty) => void;
}

function FieldValue(props: FieldValueProps) {
  const theme = useTheme();
  const { module, value: fieldValue, onChange } = props;
  console.log('fieldvalue', fieldValue);
  const { data: definedFields } = useDefinedFields(module);
  const fieldOptions = useMemo(() => {
    let options: OptionValue[] = [];
    if (definedFields && definedFields.results) {
      options = definedFields.results.map((field) => {
        return {
          keyName: field.fieldName,
          languageKey: field.fieldName,
          extra: field.fieldType
        };
      });
    }
    return options;
  }, [definedFields]);

  const onChangeField = useCallback(
    (option: OptionValue) => {
      onChange && onChange({ ...fieldValue, field: option });
    },
    [fieldValue]
  );

  const onChangeValue = useCallback(
    (newValue: string | number) => {
      console.log('newValue', newValue)
      if (typeof newValue === 'number') {
        newValue = newValue.toString();
      }
      onChange && onChange({ ...fieldValue, value: newValue });
    },
    [fieldValue]
  );

  const onChangeDate = useCallback(
    (newValue: Date | null) => {
      if (!newValue) return;
      const newDate = dayjs(newValue).format('YYYY-MM-DD');
      onChange && onChange({ ...fieldValue, value: newDate });
    },
    [fieldValue]
  );

  return (
    <Stack sx={{ mx: 1 }} spacing={1}>
      <Stack spacing={1}>
        <InputLabel sx={{ display: 'flex' }}>
          <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Field'} />
        </InputLabel>
        <SelectBox value={fieldValue.field} onChange={(newValue: OptionValue) => onChangeField(newValue)} options={fieldOptions} />
      </Stack>
      <Stack spacing={1}>
        <InputLabel sx={{ display: 'flex' }}>
          <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Value'} />
        </InputLabel>

        {(!fieldValue.field?.extra || fieldValue.field?.extra == 'FIELD_TYPE_TEXT') && (
          <TextField
            fullWidth
            value={fieldValue?.value ? fieldValue.value : ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeValue(event.target.value)}
          />
        )}
        {fieldValue.field?.extra == 'FIELD_TYPE_DATE' && (
          <DatePicker
            value={fieldValue?.value ? new Date(fieldValue.value) : new Date()}
            onChange={(newValue) => onChangeDate(newValue)}
            inputFormat={'yyyy/MM/dd'}
          />
        )}
        {fieldValue.field?.extra == 'FIELD_TYPE_NUMBER' && (
          <NumberField value={fieldValue?.value ? Number(fieldValue.value) : 0} onChange={(newValue) => onChangeValue(newValue)} />
        )}
      </Stack>
    </Stack>
  );
}

export default FieldValue;
