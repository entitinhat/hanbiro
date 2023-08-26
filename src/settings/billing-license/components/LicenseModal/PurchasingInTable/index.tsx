import {
  Box,
  Typography,
  useTheme,
  Stack,
  Autocomplete,
  TextField,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { Suspense, useMemo, useState } from 'react';
import DatePicker from '../../../../../base/components/@hanbiro/Date/DatePicker';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import MiModal from '@base/components/@hanbiro/MiModal';
import { useTranslation } from 'react-i18next';
interface PurchasingTableModal {
  dataHeader: any;
  isOpen: boolean;
  purchasingData: string;
  onClose: () => void;
}
const PurchasingTableModal = (props: PurchasingTableModal) => {
  const { dataHeader, isOpen, purchasingData, onClose } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  const colorText = '#8392a5';
  const optionAutoComplete = [{}];
  const date = new Date();
  const [dateValue, setDateValue] = useState(date);
  const tableHeader = dataHeader;

  const colorIcon = theme.palette.mode === 'dark' ? '#fff' : '#8392a5';

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" sx={{ border: border, color: '#7987a1' }} variant="outlined" onClick={onClose}>
              Cancle
            </Button>
            <Button size="small" variant="contained">
              MakePayment
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }, []);

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={t('Purchasing') as string}
        isOpen={isOpen}
        fullScreen={false}
        onClose={() => {
          onClose && onClose();
        }}
        footer={Footer}
        size="md"
        anchor="right"
      >
        {isOpen &&
          (purchasingData == 'Monthly' || purchasingData == '' ? (
            <Stack direction="column" spacing={2} p={2}>
              <Typography sx={{ color: colorText }}>Item Name</Typography>
              <Typography>10G Storage</Typography>
              <Typography sx={{ color: colorText }}>Billing Plan</Typography>
              <Autocomplete options={optionAutoComplete} renderInput={(params) => <TextField {...params} />} />
              <Typography sx={{ color: colorText }}>Billing Plan</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dateValue}
                  onChange={(newValue: any) => {
                    setDateValue(newValue);
                  }}
                />
              </LocalizationProvider>
              <Typography sx={{ color: colorText }}>End on</Typography>
              <Typography>2021/07/27</Typography>
              <TableContainer component={Paper}>
                <Table sx={{ boxShadow: 'unset' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: '130px', border: border, '&::after': { display: 'none' } }}>User</TableCell>
                      <TableCell sx={{ border: border, '&::after': { display: 'none' } }}>Term</TableCell>
                      <TableCell sx={{ border: border, '&::after': { display: 'none' } }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        '&.MuiTableRow-root:hover': {
                          backgroundColor: 'unset !important'
                        }
                      }}
                    >
                      <TableCell sx={{ border: border }}>
                        <TextField size="small" variant="outlined" type="number" />
                      </TableCell>
                      <TableCell sx={{ border: border }}>6 months 10 days </TableCell>
                      <TableCell sx={{ border: border }}></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          ) : (
            <Stack direction="column" spacing={2} p={2}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {tableHeader.map((tb: any, index: any) => {
                        return (
                          <TableCell sx={{ border: border, borderBottom: 0, '&::after': { display: 'none' } }} key={index}>
                            {tb.name}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        '&.MuiTableRow-root:hover': {
                          backgroundColor: 'unset !important'
                        },
                        borderBottom: border
                      }}
                    >
                      <TableCell
                        colSpan={tableHeader.length}
                        sx={{ textAlign: 'center', border: border, borderBottom: 0, color: colorText }}
                      >
                        {/* <DataBaseIcon fillColor={colorText} size={60} /> */}
                        <Box sx={{ fill: colorIcon }}>
                          <FormIcon icon="database" iconType="icon" size={50} />
                        </Box>
                        <Typography>No data available.</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ width: '30%' }}>
                  <Typography>Sub-Total</Typography>
                  <Typography>Tax</Typography>
                  <hr style={{ border: border }} />
                  <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
                </Box>
              </Box>
            </Stack>
          ))}
      </MiModal>
    </Suspense>
  );
};
export default PurchasingTableModal;
