import React, { Suspense, useMemo, useState } from 'react';

//mui
import {
  Drawer,
  Card,
  Box,
  CardContent,
  useTheme,
  Typography,
  Autocomplete,
  TextField,
  Stack,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  CardActions,
  Paper,
  Grid
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { Button } from '@mui/material';
import DatePicker from '../../../../../base/components/@hanbiro/Date/DatePicker';
import MiModal from '@base/components/@hanbiro/MiModal';
import { useTranslation } from 'react-i18next';

interface PurchasingModal {
  onClose: () => void;
  isOpen: boolean;
}
const PurchasingModal = (props: PurchasingModal) => {
  const { onClose, isOpen } = props;
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  const colorText = '#8392a5';
  const optionAutoComplete = [{}];
  const date = new Date();
  const [dateValue, setDateValue] = useState(date);
  const { t } = useTranslation();

  //=========== Footer ===========
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
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }, []);
  return (
    <>
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
          {isOpen && (
            <Stack direction="column" spacing={2} p={2}>
              <Typography sx={{ color: colorText }}>Item Name</Typography>
              <Typography>10G Storage</Typography>
              <Typography sx={{ color: colorText }}>Billing Plan</Typography>
              <Autocomplete options={optionAutoComplete} renderInput={(params) => <TextField {...params} />} />
              <Typography sx={{ color: colorText }}>Billing Plan</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  inputFormat="YY/MM/DD"
                  fullWidth={true}
                  value={dateValue}
                  onChange={(newValue: any) => {
                    setDateValue(newValue);
                  }}
                />
              </LocalizationProvider>
              <Typography sx={{ color: colorText }}>End on</Typography>
              <Typography>2021/07/27</Typography>
              <TableContainer>
                <Table sx={{ boxShadow: 'unset' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ border: border, '&::after': { display: 'none' } }}>Term</TableCell>
                      <TableCell sx={{ border: border, '&::after': { display: 'none' } }}>Amount</TableCell>
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
                      <TableCell sx={{ border: border }}>6 months 10 days </TableCell>
                      <TableCell sx={{ border: border }}></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          )}
        </MiModal>
      </Suspense>
    </>
  );
};
export default PurchasingModal;
