import { useRef, useState } from 'react';

import { headerHeight } from '@base/config/config';
import { SearchOutlined } from '@mui/icons-material';
import { Backdrop, Box, Chip, IconButton, InputBase, Paper, Stack } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

interface SearchProps {
  openSearch: boolean;
  searchToggle: () => void;
}

const Search = ({ openSearch, searchToggle }: SearchProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexShrink: 0 }}>
      {!openSearch && (
        <IconButton
          sx={{
            borderRadius: '50%',
            color: 'common.white',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.15) : alpha(theme.palette.primary.light, 0.15)
            }
          }}
          onClick={searchToggle}
        >
          <SearchOutlined fontSize="small" />
        </IconButton>
      )}
      <Backdrop sx={{ top: headerHeight, zIndex: 1000 }} open={openSearch} onClick={searchToggle}>
        <Box
          sx={{
            position: 'fixed',
            top: 48,
            right: 0,
            left: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Paper
            sx={{
              width: 400,
              borderRadius: '0 0 8px 8px',
              // borderTop: 'none',
              boxShadow: 'none',
              bgcolor: theme.palette.mode == 'dark' ? theme.palette.header : 'white'
            }}
          >
            {/* <Box
              sx={{
                p: 0.5,
                display: 'flex',
                alignItems: 'center',
                // border: '1px solid',
                // borderColor: theme.palette.divider,
                // borderRadius: '8px 8px 0 0',
                // borderBottom: 'none',
                bgcolor: theme.palette.mode == 'dark' ? theme.palette.header : 'white'
              }}
            >
              <IconButton type="button" sx={{ p: 1 }} aria-label="search">
                <SearchOutlined />
              </IconButton>
              <InputBase sx={{ ml: 1, flex: 1, lineHeight: 2.4 }} placeholder="Search" inputProps={{ 'aria-label': 'search input' }} />
            </Box> */}
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                p: 2
              }}
            >
              <Chip variant="combined" size="small" color="secondary" label="test" onDelete={() => {}} />
            </Stack>
          </Paper>
        </Box>
      </Backdrop>
    </Box>
  );
};

export default Search;
