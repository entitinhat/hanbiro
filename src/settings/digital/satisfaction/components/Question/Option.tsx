import IconButton from '@base/components/@extended/IconButton';
import { CloseOutlined, DeleteOutlined } from '@mui/icons-material';
import { Paper, Radio, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface OptionProps {
  focusS?: number;
  focusQ?: number;
  keyS: number;
  keyQ: number;
  focusEle?: string;
  optionsQ: any;
  onRowOptionValueChange: (val: string, index: number) => void;
  onGridOptionCheckChange: (val: boolean, rIdx: number, cIdx: number) => void;
  onRemoveOptionRow: (rIdx: number) => void;
}

const Option = (props: OptionProps) => {
  const { focusS, focusQ, keyS, keyQ, focusEle, optionsQ, onRowOptionValueChange, onGridOptionCheckChange, onRemoveOptionRow } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack spacing={1.5}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell></TableCell>
              {optionsQ?.cols?.map((col: any, idx: number) => (
                <TableCell key={idx}>{col.value ? col.value : `${t('Column')} ${idx + 1}`}</TableCell>
              ))}
              {focusS === keyS && focusQ === keyQ + 1 && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {optionsQ?.rows?.map((_row: any, rIdx: number) => {
              const qRowRemoveEleId = 'q-removerowopt-' + keyS + '-' + (keyQ + 1) + '-' + (rIdx + 1);
              const qRowOptionInputEleId = 'q-rowopt-' + keyS + '-' + (keyQ + 1) + '-' + (rIdx + 1);

              return (
                <TableRow key={rIdx}>
                  <TableCell>
                    {focusS === keyS && focusQ === keyQ + 1 ? (
                      <TextField
                        autoComplete="off"
                        id={qRowOptionInputEleId}
                        placeholder={`${t('Row')} ${rIdx + 1}`}
                        value={_row.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onRowOptionValueChange(e.target.value as string, rIdx)}
                        autoFocus={qRowOptionInputEleId === focusEle}
                      />
                    ) : _row.value ? (
                      _row.value
                    ) : (
                      `${t('Row')} ${rIdx + 1}`
                    )}
                  </TableCell>
                  {optionsQ.cols.map((col: any, cIdx: number) => {
                    const qRowCheckEleId = 'q-rowchk-' + keyS + '-' + (keyQ + 1) + '-' + (rIdx + 1) + '-' + (cIdx + 1); //TODO
                    const optChecked = optionsQ.answer && optionsQ.answer[rIdx] ? optionsQ.answer[rIdx][cIdx] : false;
                    return (
                      <TableCell key={cIdx}>
                        <Radio
                          id={`${rIdx.toString()}-${cIdx.toString()}`}
                          name={rIdx.toString()}
                          checked={optChecked || false}
                          onChange={(e: any) => onGridOptionCheckChange(e.target.checked as boolean, rIdx, cIdx)}
                        />
                      </TableCell>
                    );
                  })}
                  {focusS === keyS && focusQ === keyQ + 1 && (
                    <TableCell>
                      <IconButton color="error" shape="rounded" onClick={() => onRemoveOptionRow(rIdx)}>
                        <DeleteOutlined fontSize="small" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Option;
