import { ChangeEvent, useEffect, useState } from 'react';

import { Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

const TabPersonal = () => {
  const theme = useTheme();

  return (
    <Stack sx={{margin: '1rem'}} spacing={3} >
      <Grid item xs={12} sm={6}>
        <Stack spacing={1.25}>
          <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
          <TextField fullWidth defaultValue="Anshan" id="personal-first-name" placeholder="First Name" autoFocus />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1.25}>
          <InputLabel htmlFor="personal-first-name">Last Name</InputLabel>
          <TextField fullWidth defaultValue="Handgun" id="personal-first-name" placeholder="Last Name" />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1.25}>
          <InputLabel htmlFor="personal-location">Country</InputLabel>
          <TextField fullWidth defaultValue="New York" id="personal-location" placeholder="Location" />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1.25}>
          <InputLabel htmlFor="personal-zipcode">Zipcode</InputLabel>
          <TextField fullWidth defaultValue="956754" id="personal-zipcode" placeholder="Zipcode" />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1.25}>
          <InputLabel htmlFor="personal-location">Bio</InputLabel>
          <TextField
            fullWidth
            multiline
            rows={3}
            defaultValue="Hello, I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at."
            id="personal-location"
            placeholder="Location"
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1.25}>
          <InputLabel htmlFor="personal-experience">Experiance</InputLabel>
          <Select fullWidth id="personal-experience" MenuProps={MenuProps}>
            <MenuItem value="0">Start Up</MenuItem>
            <MenuItem value="0.5">6 Months</MenuItem>
            <MenuItem value="1">1 Year</MenuItem>
            <MenuItem value="2">2 Years</MenuItem>
            <MenuItem value="3">3 Years</MenuItem>
            <MenuItem value="4">4 Years</MenuItem>
            <MenuItem value="5">5 Years</MenuItem>
            <MenuItem value="6">6 Years</MenuItem>
            <MenuItem value="10">10+ Years</MenuItem>
          </Select>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default TabPersonal;
