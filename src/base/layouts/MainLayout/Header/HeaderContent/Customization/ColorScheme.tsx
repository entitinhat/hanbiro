import { useRef, useState } from 'react';

import { PalettesProps, presetDarkPalettes, presetPalettes } from '@ant-design/colors';
import Avatar from '@base/components/@extended/Avatar';
import Transitions from '@base/components/@extended/Transitions';
import useConfig from '@base/hooks/useConfig';
import { PresetColor } from '@base/types/config';
import { Box, ButtonBase, ClickAwayListener, Grid, Paper, Popper, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

interface ColorOptionProps {
  id: PresetColor;
  primary: string;
  lighter: string;
  label: string;
  shadow: string;
}

interface ColorProps {
  bg: string;
  id: string;
  label: string;
  handelChange: (id: string) => void;
}

const Color = (props: ColorProps) => {
  const { bg, id, label, handelChange } = props;

  const theme = useTheme();

  return (
    <Grid item>
      <ButtonBase
        sx={{
          borderRadius: '50%',
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          }
        }}
        onClick={() => handelChange(id)}
      >
        <Avatar
          color="inherit"
          size="sm"
          sx={{
            bgcolor: bg,
            color: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
            border: '3px solid'
          }}
        >
          {' '}
        </Avatar>
      </ButtonBase>
    </Grid>
  );
};

const ColorScheme = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const { mode, presetColor, onChangePresetColor } = useConfig();

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  const colors: PalettesProps = mode === 'dark' ? presetDarkPalettes : presetPalettes;
  const { blue } = colors;
  const colorOptions: ColorOptionProps[] = [
    {
      id: 'default',
      primary: blue[5],
      lighter: blue[0],
      label: 'Default',
      shadow: `0 0 0 2px ${alpha(blue[5], 0.2)}`
    }
  ];

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handelChange = (id: string) => {
    presetColor != id && onChangePresetColor(id as PresetColor);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        ref={anchorRef}
        sx={{
          borderRadius: '50%',
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          }
        }}
        onClick={handleToggle}
        color="primary"
      >
        <Avatar
          color="primary"
          size="sm"
          sx={{
            bgcolor: theme.palette.primary.main
          }}
        >
        </Avatar>
      </ButtonBase>
      <Popper
        placement={'top-start'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        // popperOptions={{
        //   modifiers: [
        //     {
        //       name: 'offset',
        //       options: {
        //         offset: [matchesXs ? -60 : 0, 9]
        //       }
        //     }
        //   ]
        // }}
        sx={{
          transform: 'translate(15px, -60px) !important'
        }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '90%'
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Grid container spacing={1.5} alignItems="center">
                  {colorOptions.map((color: ColorOptionProps, index) => (
                    <Color key={index} id={color.id} bg={color.primary} label={color.label} handelChange={handelChange} />
                  ))}
                </Grid>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default ColorScheme;
