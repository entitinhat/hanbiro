// import MUI components
import { Stack } from '@mui/system';
import { TextField, styled, FormControlLabel, Typography } from '@mui/material';

export interface H1Props {
  titlePage: boolean;
}

export const DivHeading = styled('div')(({ theme }) => ({
  padding: '15px 20px',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'none' : '#cdd4e0'}`,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.secondary.lighter
}));

export const HeadingBillingInformation = styled(Typography)<H1Props>(({ theme, titlePage }) => ({
  fontSize: '16px',
  fontWeight: titlePage ? '400' : '500',
  // color: theme.palette.mode === 'dark' ? '#d4e0ff' : theme.palette.common.white,
  cursor: 'text'
}));

export const StackItem = styled(Stack)(({ theme }) => ({
  alignItems: 'flex-start',
  marginBottom: '16px'
}));

export const InputStyle = styled(TextField)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#293958' : '#fff',
  borderColor: theme.palette.mode === 'dark' ? '#606a7e' : '#b4bdce',
  // '&:focus': {
  //   backgroundColor: `${theme.palette.mode === 'dark' ? '#141c2b' : '#fff'} `
  // },
  '& .MuiInputBase-input': {
    padding: '6px 12px !important'
  }
}));

export const FormLabelCustom = styled(FormControlLabel)(({ theme }) => ({
  '&.MuiFormControlLabel-root': {
    marginLeft: '-9px',
    cursor: 'default'
  }
}));
