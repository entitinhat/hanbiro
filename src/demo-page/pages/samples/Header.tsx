import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme, styled, Theme } from '@mui/material/styles';
import { Box, ClickAwayListener, Grid, Menu, MenuItem, Popper, Stack, TextField, Typography, useMediaQuery } from '@mui/material';

// assets
import {
  AudioMutedOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  PaperClipOutlined,
  PhoneOutlined,
  PictureOutlined,
  SendOutlined,
  SmileOutlined,
  SoundOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import IconButton from '@base/components/@extended/IconButton';
import avatar1 from '@base/assets/images/users/avatar-1.png';
import Avatar from '@base/components/@extended/Avatar';

const Header = () => {
  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [emailDetails, setEmailDetails] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const handleClickSort = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleUserChange = () => {
    setEmailDetails((prev) => !prev);
  };

  return (
    <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar alt="Avatar 1" size="sm" src={avatar1} />
        <Stack spacing={0}>
          <Typography variant="subtitle1">jikime</Typography>
          <Typography variant="caption" color="textSecondary">
            jikime@gmail.com
          </Typography>
        </Stack>
      </Stack>
      <Stack sx={{pr: 1}} direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5}>
        <IconButton size="large" color="secondary">
          <PhoneOutlined />
        </IconButton>
        <IconButton size="large" color="secondary">
          <VideoCameraOutlined />
        </IconButton>
        <IconButton onClick={handleUserChange} size="large" color={emailDetails ? 'error' : 'secondary'}>
          {emailDetails ? <CloseOutlined /> : <InfoCircleOutlined />}
        </IconButton>
        <IconButton onClick={handleClickSort} size="large" color="secondary">
          <MoreOutlined />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseSort}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          sx={{
            p: 0,
            '& .MuiMenu-list': {
              p: 0
            }
          }}
        >
          <MenuItem onClick={handleCloseSort}>
            <DownloadOutlined style={{ paddingRight: 8 }} />
            <Typography>Archive</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseSort}>
            <AudioMutedOutlined style={{ paddingRight: 8 }} />
            <Typography>Muted</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseSort}>
            <DeleteOutlined style={{ paddingRight: 8 }} />
            <Typography>Delete</Typography>
          </MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
};

export default Header;
