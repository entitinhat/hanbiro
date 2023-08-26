import { Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SelectFieldToImport from './SelectFieldToImport';

interface RowMapFieldProps {
  row: any;
  options?: any;
  rIdx: number;
  onChangeRow: (rowChange: any, idx: number) => any;
}

const RowMapField = (props: RowMapFieldProps) => {
  const { row, onChangeRow, rIdx, options } = props;
  const { t } = useTranslation();

  const valueMapping = useMemo(() => {
    const val = options.find((item: any, index: number) => item.label === row.labelTo || item.label === row.label);
    return val;
  }, [options]);

  return (
    <>
      <Grid item xs={6}>
        <Typography>{t(row.languageKey || row.label)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <SelectFieldToImport
          value={valueMapping ?? options[0]}
          row={row}
          options={options}
          onChange={(fieldSelect: any) => onChangeRow(fieldSelect, rIdx)}
        />
      </Grid>
    </>
  );
};

export default RowMapField;
