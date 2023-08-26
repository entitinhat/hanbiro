import React, { ReactElement } from 'react';

import { LabelValueIcon } from '@base/components/@hanbiro/Dropdown';
import { Add, ArrowDropDown, KeyboardArrowDownOutlined } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';

export interface AddingMenuProps {
  items?: LabelValueIcon[];
  onClick: (v: string) => void;
  label?: string;
  value?: string;
  icon?: ReactElement;
  iconOnly?: boolean;
  defaultOpenItem?: number; //set open Addmenu
}

const AddingMenu = (props: AddingMenuProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const {
    label = 'ncrm_common_btn_new',
    value = '',
    icon = <Add fontSize="small" />,
    items,
    onClick,
    iconOnly = false,
    defaultOpenItem = 0
  } = props;

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  // const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleMenuItemClick = (v: string) => {
    setOpen(false);
    onClick && onClick(v);
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

  const MainButton = (props: ButtonProps) => (
    <Button
      size="small"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        handleMenuItemClick(items?.length ? (defaultOpenItem ? items[defaultOpenItem].value : items[0].value) : value)
      }}
      startIcon={!iconOnly && icon}
      {...props}
    >
      {iconOnly ? icon : label ? t(label) : `+ ${t('ncrm_common_btn_new')}`}
    </Button>
  );

  return !!items && items.length > 0 ? (
    <React.Fragment>
      <ButtonGroup
        size={'small'}
        variant="contained"
        sx={{
          boxShadow: 'none'
        }}
        ref={anchorRef}
        // aria-label="split button"
      >
        <MainButton
          sx={{
            boxShadow: 'none',
            '& .MuiButtonGroup-root': {
              // height: 32
            },
            '& .MuiButtonGroup-contained': {
              // height: 32
            },
            '& .MuiButtonGroup-grouped:not(:last-of-type) ': {
              borderRight: '0px !important'
            },
            '& .MuiButton-startIcon': {
              mr: 0
            }
          }}
          // onClick={handleToggle}
        />
        <Button
          size="small"
          sx={{
            width: '25px!important',
            minWidth: '25px!important',
            bgcolor: theme.palette.primary.dark
          }}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="menu"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation()
            handleToggle()
          }}
        >
          <KeyboardArrowDownIcon fontSize={'small'} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1300
        }}
        placement={'bottom-end'}
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
                offset: [matchesMd ? -4 : 0, 4]
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
                    minWidth: 250,
                    maxWidth: 300,
                    py: 0
                  }}
                >
                  {items.map((v, i) => (
                    <MenuItem key={i} onClick={(event) => handleMenuItemClick(v.value)} sx={{ py: 1.5 }}>
                      <Box
                        component="span"
                        sx={{
                          mr: v?.icon ? 1 : 0,
                          lineHeight: 1
                        }}
                      >
                        {v?.icon}
                      </Box>
                      <SpanLang keyLang={v?.label} textOnly />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  ) : (
    <MainButton variant="contained" sx={{ boxShadow: 'none' }} />
  );
};

export default AddingMenu;
