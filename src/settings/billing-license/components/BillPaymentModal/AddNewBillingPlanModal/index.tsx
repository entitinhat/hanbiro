// import DatePicker from "@base/components/@hanbiro/Date/DatePicker";
import {
  Autocomplete,
  Box,
  Button,
  CardActions,
  CardContent,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Drawer,
  useTheme,
  Card,
  TextFieldProps
} from '@mui/material';
import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';

interface AddNewBillingPlanModal {
  action: boolean;
  methods: any;
  submit: () => void;
  close: () => void;
}

const styleDrawer = {
  position: 'absolute' as 'absolute',
  width: '420px',
  top: '0',
  bottom: '0',
  right: '0',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column'
};

const AddNewBillingPlanModal = (props: AddNewBillingPlanModal) => {
  const { action, methods, submit, close } = props;
  const { control, handleSubmit } = useFormContext();
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  let backgroundColor: string;
  const textBtnColor = '#8392a5';
  if (theme.palette.mode === 'dark') {
    backgroundColor = theme.palette.background.default;
  } else {
    backgroundColor = theme.palette.secondary.lighter;
  }
  const options = [
    { label: 'Monthly', value: 1 },
    { label: '6 Monthly', value: 2 },
    { label: 'Annually', value: 3 }
  ];
  const date = new Date();
  const [dateValue, setDateValue] = useState(date);
  return (
    <Drawer
      anchor="right"
      open={action}
      onClose={close}
      PaperProps={{
        sx: {
          width: '420px',
          height: '100vh'
        }
      }}
      className="scroll-box"
    >
      <Box sx={styleDrawer}>
        <Card sx={{ padding: 0, height: '100% !important' }}>
          <form onSubmit={handleSubmit(submit)}>
            <CardContent sx={{ borderBottom: border }}>
              <Typography sx={{ fontSize: '18', fontWeight: 'bold' }}>New Billing Plan</Typography>
            </CardContent>
            <CardContent sx={{ height: 'calc(100vh - 130px)', borderBottom: border }}>
              <Stack direction="column" spacing={2}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <Typography sx={{ color: textBtnColor }}>Plan Name</Typography>
                      <TextField {...field} variant="outlined" size="medium" />
                    </>
                  )}
                />
                <Controller
                  name="billingCycle"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Typography sx={{ color: textBtnColor }}>Billing Cycle</Typography>
                      <Autocomplete
                        options={options}
                        getOptionLabel={(option) => option.label}
                        onChange={(e, newValue) => {
                          onChange(newValue?.label ?? '');
                        }}
                        onBlur={onBlur}
                        value={options.find((option) => option.label === value) ?? null}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                      />
                    </>
                  )}
                />
                <Stack direction="row" justifyContent="space-between">
                  <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                    <FormControlLabel sx={{ width: '210px' }} value="female" control={<Radio />} label="Auto renews until canceled." />
                    <FormControlLabel value="male" control={<Radio />} label="Expires after" />
                  </RadioGroup>
                  <TextField type="number" sx={{ paddingTop: '10px', height: '38px', width: '100px' }} variant="outlined" />
                  <Typography sx={{ paddingTop: '10px', paddingLeft: '5px', display: 'inline' }}>of billing cycles.</Typography>
                </Stack>
                <Controller
                  name="startOn"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <Typography sx={{ color: textBtnColor }}>Start on</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          inputFormat="YY/MM/DD"
                          // fullWidth={true}
                          value={dateValue}
                          onChange={(newValue: any) => {
                            field.onChange(newValue?.$M + 1 + '/' + newValue?.$D + '/' + newValue?.$y);
                            setDateValue(newValue);
                          }}
                        />
                      </LocalizationProvider>
                    </>
                  )}
                />
                <Typography sx={{ color: textBtnColor }}>End on</Typography>
                <Typography>9/21/2023</Typography>
                <Typography sx={{ color: textBtnColor }}>It will be changed into the date the first purchased.</Typography>
                <Typography sx={{ color: textBtnColor }}>Invoice Date</Typography>
                <Typography>1/11/2023</Typography>
                <Typography sx={{ color: textBtnColor }}>Billing Date</Typography>
                <Typography>1/11/2023</Typography>
              </Stack>
            </CardContent>
            <CardActions sx={{ float: 'right', padding: 2 }}>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  border: border,
                  color: textBtnColor,
                  display: 'inline',
                  '&:hover': { backgroundColor: backgroundColor, border: border, color: textBtnColor }
                }}
              >
                Cancle
              </Button>
              <Button size="small" type="submit" variant="contained" sx={{ background: '#28A745' }}>
                Add
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </Drawer>
  );
};
export default AddNewBillingPlanModal;
