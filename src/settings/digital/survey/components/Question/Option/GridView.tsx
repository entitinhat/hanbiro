import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import QuestionIcon from '../Symbol';

//render question options
const OptionGridView = (props: any) => {
  //props
  const { type = '', optionsQ = [] } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  //render
  return (
    <Box>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell></TableCell>
              {optionsQ.cols.map((col: any, idx: number) => (
                <TableCell key={idx}>{col.value ? col.value : `${t('ncrm_generalsetting_survey_options_single_column')} ${idx + 1}`}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {optionsQ.rows.map((_row: any, rIdx: number) => {
              return (
                <TableRow key={rIdx}>
                  <TableCell>{_row.value ? _row.value : `${t('ncrm_generalsetting_survey_options_single_row')} ${rIdx + 1}`}</TableCell>
                  {optionsQ.cols.map((col: any, cIdx: number) => {
                    return (
                      <TableCell key={cIdx}>
                        <QuestionIcon type={type} />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OptionGridView;
