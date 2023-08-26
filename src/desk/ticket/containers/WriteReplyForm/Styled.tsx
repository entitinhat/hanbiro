import { styled } from '@mui/material';

export const NavTabs = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  paddingLeft: 0,
  marginBottom: 0,
  listStyle: 'none',
  borderColor: theme.palette.divider,
  borderBottom: `1px solid ${theme.palette.divider}`
}));

export const NavLink = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  borderColor: theme.palette.divider,
  color: theme.palette.secondary.main,
  borderBottomWidth: '0!important',
  position: 'relative',
  marginBottom: '-1px',
  padding: '0 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: ' 38px',
  transition: 'background-color .2s',
  border: '1px solid transparent',
  borderTopLeftRadius: ' 0.25rem',
  borderTopRightRadius: '0.25rem',
  '&.active': {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.divider,
    zIndex: 5,
    color: theme.palette.primary.main
  }
}));
