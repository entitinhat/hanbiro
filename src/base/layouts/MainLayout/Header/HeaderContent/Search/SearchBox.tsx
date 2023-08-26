import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

interface SearchBoxProps {
  searchToggle?: () => void;
}

export default function SearchBox({ searchToggle }: SearchBoxProps) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="row" sx={{ width: matchDownMd ? '100%' : 400 }} alignItems="center" spacing={1}>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: searchToggle ? 350 : '100%',
          backgroundImage: 'none',
          boxShadow: 'none',
          bgcolor: theme.palette.mode == 'dark' ? theme.palette.background.paper : theme.palette.header
        }}
      >
        <IconButton size="small" sx={{ color: 'grey.400', p: 1 }} aria-label="search">
          <SearchIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, color: 'grey.400', '& .MuiInputBase-input': { color: 'grey.400' } }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search input' }}
        />
      </Paper>
      {searchToggle && (
        <IconButton sx={{ color: 'grey.400' }} onClick={searchToggle}>
          <CloseRounded />
        </IconButton>
      )}
    </Stack>
  );
}
