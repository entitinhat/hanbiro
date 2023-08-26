import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import LoadingButton from '@base/components/@extended/LoadingButton';
import { ButtonOption } from '@base/types/extended';
import { useTheme } from '@mui/material/styles';
import { ArrowDropUpOutlined, ExpandLess } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import SpanLang from './SpanLang';
import useDevice from '@base/hooks/useDevice';

// const options: ButtonOption[] = [
//   {
//     isMain: true,
//     label: 'Save',
//     color: 'primary',
//     callback: () => console.log('save')
//   },
//   {
//     isMain: false,
//     label: 'Save and Create New',
//     color: 'secondary',
//     callback: () => console.log('Save and Create New')
//   }
// ];

interface ButtonSplitProps {
  buttons: ButtonOption[];
}

const ButtonSplit = ({ buttons }: ButtonSplitProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  //const [selectedIndex, setSelectedIndex] = React.useState(1);

  const { isMobile } = useDevice();

  // const handleClick = () => {
  //   console.info(`You clicked ${options[selectedIndex]}`);
  // };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, option: ButtonOption) => {
    //setSelectedIndex(index);
    option.onClick();
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const mainButton = buttons.find((_ele: any) => _ele.isMain) || buttons[0];
  const menuButtons = buttons.filter((_ele: any) => !_ele.isMain);

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" sx={{ boxShadow: 0 }} size="small">
        <LoadingButton
          size="small"
          variant="contained"
          loading={mainButton.isLoading}
          color={mainButton.color}
          disabled={mainButton.disabled}
          onClick={mainButton.onClick}
          sx={{ borderRight: '0px !important', p: '4px 9px' }}
        >
          <SpanLang keyLang={t(mainButton.label)} textOnly />
        </LoadingButton>
        <Button
          size="small"
          // color={mainButton.color}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label={mainButton.label || 'button label'}
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{
            width: '25px !important',
            minWidth: '25px !important',
            bgcolor: theme.palette.primary.dark
          }}
        >
          <ExpandLess fontSize="small" />
        </Button>
        <Popper
          sx={{
            zIndex: 1300
          }}
          placement={'top-end'}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          onResize={undefined}
          onResizeCapture={undefined}
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [isMobile ? -4 : 0, 4]
                }
              }
            ]
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'left bottom'
              }}
            >
              <Paper sx={{ boxShadow: theme.customShadows.z1 }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    id="split-button-menu"
                    autoFocusItem
                    sx={{
                      minWidth: 185,
                      maxWidth: 300,
                      py: 0.5
                    }}
                  >
                    {menuButtons.map((option, index) => (
                      <MenuItem key={option.label} disabled={option.disabled} onClick={(event) => handleMenuItemClick(event, option)}>
                        <SpanLang keyLang={t(option.label)} textOnly />
                      </MenuItem>
                    ))}
                    {/* {items.map((v, i) => (
                      <MenuItem key={i} onClick={(event) => handleMenuItemClick(v.value)}>
                        <Box
                          component="span"
                          sx={{
                            mr: 1,
                            lineHeight: 0.7
                          }}
                        >
                          {v?.icon}
                        </Box>
                        <SpanLang keyLang={v?.label} textOnly />
                      </MenuItem>
                    ))} */}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default ButtonSplit;
