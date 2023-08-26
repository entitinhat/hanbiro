import { styled } from '@mui/material/styles';

export const Section = styled('section')(({ theme }) => ({
  marginTop: '20px',
  borderTop: `1px solid ${theme.palette.secondary.light}`
}));

export const StickyHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flex: 1,
  width: '100%',
  ' & button': {
    fontWeight: 'bold',
    fontSize: '13px',
    height: '28px',
    lineHeight: '27px',
    padding: '0 16px',
    '--saf-0': 'rgba(var(--sk_foreground_low, 29, 28, 29), 0.13)',
    boxShadow: '0 0 0 1px var(--saf-0), 0 1px 3px 0 rgba(0, 0, 0, 0.08)',
    borderRadius: '24px',
    position: 'relative',
    top: ' -13px',
    background: theme.palette.common.white,
    border: 'none',
    outline: 'none',
    color: theme.palette.common.black
  }
}));

export const InputBox = styled('div')(({ theme }) => ({
  paddingBottom: '10px'
}));
