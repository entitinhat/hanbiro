import { Divider, Grid, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface ImageSizeProps {
  value?: any;
  onChange?: (value: any) => void;
  flexWrap?: any;
}

const ImageSize = (props: ImageSizeProps) => {
  const { flexWrap = 'nowrap', value, onChange } = props;

  const theme = useTheme();

  // state
  const [curValue, setCurValue] = useState<any>({ width: 300, height: 300 });

  // init
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(curValue)) {
        setCurValue(value);
      }
    } else {
      setCurValue({ width: 300, height: 300 });
    }
  }, [value]);

  // onChange
  const handleValueChange = (keyName: string, keyValue: number) => {
    const newValue = { ...curValue };
    newValue[keyName] = keyValue;
    setCurValue(newValue);
    // callback
    onChange && onChange(newValue);
  };

  return (
    <Grid container flexWrap={flexWrap}>
      <Grid item xs={flexWrap === 'nowrap' ? 6 : 12} sx={{ mr: flexWrap === 'nowrap' ? 2 : 0, mb: flexWrap === 'nowrap' ? 0 : 1 }}>
        <TextField
          type="number"
          value={curValue.width}
          // sx={{
          //   flexGrow: 1,
          //   width: '100%',
          //   '& .MuiOutlinedInput-notchedOutline': { border: 0 }
          // }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: theme.palette.grey[600] }}>Width</Typography>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Stack direction="row" alignItems="center">
                  <Divider orientation="vertical" flexItem />
                  <Typography color="secondary" sx={{ pl: '14px' }}>
                    px
                  </Typography>
                </Stack>
              </InputAdornment>
            )
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('width', parseInt(e.target.value))}
        />
      </Grid>

      <Grid item xs={flexWrap === 'nowrap' ? 6 : 12}>
        <TextField
          type="number"
          value={curValue.height}
          // sx={{
          //   flexGrow: 1,
          //   width: '100%',
          //   '& .MuiOutlinedInput-notchedOutline': { border: 0 }
          // }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: theme.palette.grey[600] }}>Height</Typography>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Stack direction="row" alignItems="center">
                  <Divider orientation="vertical" flexItem />
                  <Typography color="secondary" sx={{ pl: '14px' }}>
                    px
                  </Typography>
                </Stack>
              </InputAdornment>
            )
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('height', parseInt(e.target.value))}
        />
      </Grid>
    </Grid>
  );
};

export default ImageSize;
