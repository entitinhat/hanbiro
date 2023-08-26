import { ReactElement, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from '@base/components/@extended/IconButton';
import { ButtonVariantProps } from '@base/types/extended';
import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  Button,
  ClickAwayListener,
  Grow,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  PopperPlacementType,
  PopperProps,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SpanLang from '../SpanLang';
import useDevice from '@base/hooks/useDevice';

import { LabelValueIcon as BaseLabelValueIcon } from '@base/types/app'; // to apply dropDown for moreAction menu
import { Divider } from '@mui/material';

export interface LabelValueIcon extends BaseLabelValueIcon {
  // to apply dropDown for moreAction menu
  label: string;
  value: string;
  icon?: ReactElement;
}

export interface DropdownProps {
  placement?: PopperPlacementType;
  icon?: ReactElement;
  title?: string;
  listTitle?: LabelValueIcon;
  sx?: BoxProps['sx'];
  items: LabelValueIcon[];
  disabledValues?: string[];
  onChange?: (nValue: LabelValueIcon) => void;
  disabledSelection?: boolean;
  disableChangeTitle?: boolean;
  popperProps?: {
    disablePortal?: PopperProps['disablePortal'];
  };
  minWidth?: number;
  variant?: ButtonVariantProps;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'magenta'
    | 'purple'
    | 'orange'
    | 'yellow'
    | 'lime'
    | 'volcano'
    | undefined;
  size?: 'small' | 'medium' | 'large';
  sxIcon?: BoxProps['sx']; // sx custom for icon button
}

const Dropdown = (props: DropdownProps) => {
  const {
    title,
    listTitle,
    items,
    icon,
    sx,
    onChange,
    placement = 'bottom-end',
    disabledValues,
    disabledSelection,
    disableChangeTitle = false,
    color = 'inherit',
    popperProps,
    size = 'medium',
    minWidth = 185,
    variant,
    sxIcon
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const anchorRef = useRef<any>(null);
  const [selectedItem, setSelectedItem] = useState<LabelValueIcon>();
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

  const handleListItemClick = (item: LabelValueIcon) => {
    setOpen(false);
    onChange && onChange(item);
    if (!!disabledSelection) {
      return;
    }
    setSelectedItem(item);
  };

  return (
    <Box
      sx={{
        ...sx,
        flexShrink: 0,
        ml: 0.75
      }}
    >
      {title ? (
        <Button
          size="small"
          sx={{
            borderColor: theme.palette.secondary.light,
            '&:hover': {
              backgroundColor: 'inherit'
            }
          }}
          color={color}
          startIcon={icon}
          endIcon={<KeyboardArrowDown />}
          ref={anchorRef}
          onClick={handleToggle}
        >
          <SpanLang keyLang={!disableChangeTitle && selectedItem ? selectedItem.label : title} textOnly />
        </Button>
      ) : (
        <IconButton
          size={size}
          variant={variant}
          color={color}
          ref={anchorRef}
          onClick={handleToggle}
          sx={{
            ...sxIcon
          }}
        >
          {!disableChangeTitle && selectedItem ? selectedItem.icon ?? icon : icon}
        </IconButton>
      )}
      <Popper
        placement={isMobile ? 'bottom-end' : placement}
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
                offset: [isMobile ? -4 : 0, 4]
              }
            }
          ]
        }}
        sx={{ zIndex: 1310 }}
        onResize={undefined}
        onResizeCapture={undefined}
        {...popperProps}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper sx={{ boxShadow: (t) => t.customShadows.z1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  component="nav"
                  sx={{
                    p: 0,
                    width: '100%',
                    // minWidth: { minWidth },
                    // maxWidth: `${minWidth + 15}`,
                    minWidth: 300,
                    maxWidth: 300,
                    borderRadius: 0,
                    // overflowY: 'auto',
                    maxHeight: `calc(100vh - 300px)`
                    // [theme.breakpoints.down('md')]: {
                    //   maxWidth: 250
                    // }
                  }}
                  className="scroll-box"
                >
                  <>
                    {listTitle && (
                      <ListItem disablePadding sx={{ backgroundColor: theme.palette.secondary[100] }}>
                        <Stack direction="row" alignItems="center" sx={{ p: '8px 16px' }}>
                          {listTitle?.icon && <ListItemIcon sx={{ mr: 1 }}>{listTitle?.icon}</ListItemIcon>}
                          <ListItemText
                            primary={
                              <Typography color="textPrimary">
                                <SpanLang keyLang={listTitle?.label} textOnly />
                              </Typography>
                            }
                          />
                        </Stack>
                      </ListItem>
                    )}
                    {items?.map((item: any, index: number) => {
                      return (
                        <ListItem disablePadding key={index}>
                          {item.value == 'divider' ? (
                            <Box sx={{ width: '100%' }}>
                              <Divider variant="fullWidth" sx={{ mt: 1, mb: 1 }} />
                            </Box>
                          ) : (
                            <ListItemButton
                              disabled={!!disabledValues && disabledValues.includes(item.value)}
                              sx={{ height: 36 }}
                              onClick={item.onClick ? item.onClick : () => handleListItemClick(item)} // fix onClick quick toolbar mobile
                            >
                              {item.icon && <ListItemIcon sx={{ mr: 1 }}>{item.icon}</ListItemIcon>}
                              <ListItemText
                                primary={
                                  <Typography color="textPrimary">
                                    <SpanLang keyLang={item.label} textOnly />
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          )}
                        </ListItem>
                      );
                    })}
                  </>
                </List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default Dropdown;
