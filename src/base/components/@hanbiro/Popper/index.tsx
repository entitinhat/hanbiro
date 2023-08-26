import { ReactElement, useRef, useState } from 'react';

import { ArrowDropDown } from '@mui/icons-material';
import { Box, Button, ClickAwayListener, Grow, IconButton, Paper, Popper, useMediaQuery } from '@mui/material';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  const color = theme.palette.background.paper;
  return {
    popoverRoot: {
      backgroundColor: color,
      // maxWidth: 500,
      // width: 400,
      // filter: 'drop-shadow(0px 0px 30px rgba(203,203,203,0.72))',
      borderRadius: '4px',
      boxShadow: theme.customShadows.z1,
      margin: '5px'
    },
    content: {
      padding: 15
    },
    popper: {
      zIndex: 1310,
      '&[data-popper-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: '-0.71em',
        marginLeft: 4,
        marginRight: 4,
        '&::before': {
          transformOrigin: '0 100%'
        }
      },
      '&[data-popper-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: '-0.71em',
        marginLeft: 4,
        marginRight: 4,
        '&::before': {
          transformOrigin: '100% 0'
        }
      },
      '&[data-popper-placement*="right"] $arrow': {
        left: 0,
        marginLeft: '-0.71em',
        height: '1em',
        width: '0.71em',
        marginTop: 4,
        marginBottom: 4,
        '&::before': {
          transformOrigin: '100% 100%'
        }
      },
      '&[data-popper-placement*="left"] $arrow': {
        right: 0,
        marginRight: '-0.71em',
        height: '1em',
        width: '0.71em',
        marginTop: 4,
        marginBottom: 4,
        '&::before': {
          transformOrigin: '0 0'
        }
      }
    },
    arrow: {
      position: 'absolute',
      width: '1em',
      height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
      boxSizing: 'border-box',
      color,
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: 'currentColor',
        transform: 'rotate(45deg)'
      }
    }
  };
});

interface HanPopperProps {
  children: React.ReactNode;
  icon?: ReactElement;
  disablePortal?: boolean;
  title?: string;
  arrow?: boolean;
  sx?: SxProps;
  color?:
    | 'primary'
    | 'secondary'
    | 'inherit'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'magenta'
    | 'purple'
    | 'orange'
    | 'yellow'
    | 'lime'
    | 'volcano';
}

function HanPopper({ children, icon, title, sx, color = 'secondary', arrow = false, disablePortal = true }: HanPopperProps) {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<any>(null);

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      {title ? (
        <Button size="small" color={color} startIcon={icon ? icon : <ArrowDropDown />} ref={anchorRef} onClick={handleToggle}>
          {title}
        </Button>
      ) : (
        <IconButton color={color} ref={anchorRef} onClick={handleToggle}>
          {icon}
        </IconButton>
      )}
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        sx={{ ...sx }}
        role={undefined}
        className={classes.popper}
        transition
        disablePortal={disablePortal}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            },
            {
              name: 'arrow',
              enabled: true,
              options: {
                element: arrowRef
              }
            }
          ]
        }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                boxShadow: 'none'
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Paper className={classes.popoverRoot}>
                  {arrow ? <span className={classes.arrow} ref={setArrowRef} /> : null}
                  <Box className={classes.content}>{children}</Box>
                </Paper>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default HanPopper;
