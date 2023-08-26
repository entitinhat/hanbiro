import { useRef, useState } from 'react';

import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BusinessStatus } from '@process/types/process';

export interface DropdownMoreProps {
  items: BusinessStatus[];
  onChange?: (nValue: BusinessStatus) => void;
}

const DropdownMore = (props: DropdownMoreProps) => {
  const { items, onChange } = props;
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (item: BusinessStatus) => {
    setOpen(false);
    onChange && onChange(item);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Button size="small" color="secondary" variant="contained" endIcon={<KeyboardArrowDown />} ref={anchorRef} onClick={handleToggle}>
        More
      </Button>
      <Popper
        placement={matchesMd ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesMd ? -4 : 0, 4]
              }
            }
          ]
        }}
        sx={{ zIndex: 1310 }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper sx={{ boxShadow: (t) => t.customShadows.z1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  component="nav"
                  sx={{
                    py: 0.5,
                    width: '100%',
                    minWidth: 185,
                    maxWidth: 200,
                    borderRadius: 1
                  }}
                >
                  {items?.map((item) => (
                    <>
                      {item.button && (
                        <ListItemButton key={item.id} sx={{ height: 36 }} onClick={() => handleListItemClick(item)}>
                          <ListItemText primary={<Typography color="textPrimary">{item.button}</Typography>} />
                        </ListItemButton>
                      )}
                    </>
                  ))}
                </List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default DropdownMore;
