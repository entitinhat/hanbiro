import React from 'react';

import { CommentOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Checkbox,
  ClickAwayListener,
  Grow,
  MenuItem,
  Paper,
  Popper,
  Select,
  Stack,
  TableCell,
  TextField,
  ToggleButton,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { checkList } from './DraggableTable';
import HanPopper from '../../../base/components/@hanbiro/Popper';

interface DraggableTableItemProps {
  item: checkList;
}

const usersData = [
  { label: 'A User', id: 1994 },
  { label: 'B User', id: 1972 },
  { label: 'C User', id: 1974 }
];

// const useStyles = makeStyles((theme: Theme) => {
//   const color = '#ffffff'; // Feel free to customise this like they do in Tooltip
//   return {
//     popoverRoot: {
//       backgroundColor: color,
//       maxWidth: 500,
//       width: 400,
//       filter: 'drop-shadow(0px 0px 30px rgba(203,203,203,0.72))',
//       borderRadius: '10px',
//       boxShadow: '0px 0px 30px rgb(203 203 203 / 72%)'
//     },
//     content: {
//       padding: 20
//     },
//     popper: {
//       zIndex: 2000,
//       '&[data-popper-placement*="bottom"] $arrow': {
//         top: 0,
//         left: 0,
//         marginTop: '-0.71em',
//         marginLeft: 4,
//         marginRight: 4,
//         '&::before': {
//           transformOrigin: '0 100%'
//         }
//       },
//       '&[data-popper-placement*="top"] $arrow': {
//         bottom: 0,
//         left: 0,
//         marginBottom: '-0.71em',
//         marginLeft: 4,
//         marginRight: 4,
//         '&::before': {
//           transformOrigin: '100% 0'
//         }
//       },
//       '&[data-popper-placement*="right"] $arrow': {
//         left: 0,
//         marginLeft: '-0.71em',
//         height: '1em',
//         width: '0.71em',
//         marginTop: 4,
//         marginBottom: 4,
//         '&::before': {
//           transformOrigin: '100% 100%'
//         }
//       },
//       '&[data-popper-placement*="left"] $arrow': {
//         right: 0,
//         marginRight: '-0.71em',
//         height: '1em',
//         width: '0.71em',
//         marginTop: 4,
//         marginBottom: 4,
//         '&::before': {
//           transformOrigin: '0 0'
//         }
//       }
//     },
//     arrow: {
//       position: 'absolute',
//       width: '1em',
//       height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
//       boxSizing: 'border-box',
//       color,
//       '&::before': {
//         content: '""',
//         margin: 'auto',
//         display: 'block',
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'currentColor',
//         transform: 'rotate(45deg)'
//       }
//     }
//   };
// });

function DraggableTableItem({ item }: DraggableTableItemProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef = React.useRef<any>(null);
  // const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null);
  // const classes = useStyles();
  // const arrow = true;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <TableCell>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Checkbox defaultChecked />
          <Typography color="secondary">#{item.id}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <TextField required placeholder="Required *" size="small" fullWidth />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TextField required type="number" size="small" sx={{ width: '100px', paddingRight: '5px' }} value={1} />
          <Select value={10} onChange={() => console.log('kkk')} size="small">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Hourly</MenuItem>
            <MenuItem value={21}>Daily</MenuItem>
            <MenuItem value={22}>Weekly</MenuItem>
          </Select>
        </Box>
      </TableCell>
      <TableCell>
        <Autocomplete
          multiple
          size="small"
          options={usersData}
          getOptionLabel={(option) => option.label}
          defaultValue={[usersData[0], usersData[1]]}
          renderInput={(params) => <TextField {...params} />}
          sx={{
            '& .MuiOutlinedInput-root': {
              p: 1
            },
            '& .MuiAutocomplete-tag': {
              bgcolor: 'primary.lighter',
              border: '1px solid',
              borderColor: 'primary.light',
              '& .MuiSvgIcon-root': {
                color: 'primary.main',
                '&:hover': {
                  color: 'primary.dark'
                }
              }
            }
          }}
        />
      </TableCell>
      <TableCell align="center">
        {/* <ToggleButton size="small" value="comment" aria-label="comment" disableRipple ref={anchorRef} onClick={handleToggle}>
          <CommentOutlined fontSize={'small'} />
        </ToggleButton> */}
        {/* <HanPopper open={open} anchorRef={anchorRef} onClose={handleClose}> */}
        <HanPopper>
          <TextField fullWidth multiline rows={5} placeholder="Enter comment" defaultValue="" />
        </HanPopper>
      </TableCell>
      {/* <TableCell sx={{ padding: '5px' }}>#{item.id}</TableCell>
      <TableCell sx={{ padding: '5px' }}>{item.title}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell> */}
    </>
  );
}

export default React.memo(DraggableTableItem);
