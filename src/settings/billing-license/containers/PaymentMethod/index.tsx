// import MUI components
import { RadioGroup, FormControl, FormControlLabel, Radio, RadioProps, Box, useTheme, Typography } from '@mui/material';

const PaymentMethod = () => {
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;
  return (
    <Box border={border}>
      <Box borderBottom={border} p={2}>
        <Typography fontWeight={500}>Payment Method</Typography>
      </Box>
      <Box p={2}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="청구서와 가상계좌를 보내주면 결제합니다"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="청구서와 가상계좌를 보내주면 결제합니다"
              control={<Radio />}
              label="청구서와 가상계좌를 보내주면 결제합니다."
            />
            <FormControlLabel
              value="신용카드로 기한 내 온라인 결제합니다"
              control={<Radio />}
              label="신용카드로 기한 내 온라인 결제합니다."
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PaymentMethod;
