import { ReactElement, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

//import IconButton from '@base/components/@extended/IconButton';
import { ButtonVariantProps } from '@base/types/extended';
import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  Button,
  ClickAwayListener,
  Grow,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  PopperPlacementType,
  PopperProps,
  Typography,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface LabelValueIcon {
  label: string;
  value: string;
  icon?: ReactElement;
}

export interface DropdownProps {
  placement?: PopperPlacementType;
  icon?: ReactElement;
  title?: string;
  sx?: BoxProps['sx'];
  items: LabelValueIcon[];
  disabledValues?: string[];
  onChange?: (nValue: LabelValueIcon) => void;
  disabledSelection?: boolean;
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
}

const Dropdown = (props: DropdownProps) => {
  const {
    title,
    items,
    icon,
    sx,
    onChange,
    placement = 'bottom-end',
    disabledValues,
    disabledSelection,
    color = 'secondary',
    popperProps,
    size = 'medium',
    minWidth = 185,
    variant
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
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
    <Box sx={{ flexShrink: 0, ml: 0.75, ...sx }}>
      <IconButton
        size={size}
        //variant={variant}
        color={color}
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          borderColor: theme.palette.divider,
          '&:hover': {
            backgroundColor: theme.palette.secondary.lighter,
            borderColor: theme.palette.secondary.light
          }
        }}
      >
        {icon}
      </IconButton>
      <Popper
        placement={matchesMd ? 'bottom' : placement}
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
        {...popperProps}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper sx={{ boxShadow: 0.5 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  component="nav"
                  sx={{
                    py: 0.5,
                    width: '100%',
                    minWidth: { minWidth },
                    maxWidth: `${minWidth + 15}`,
                    borderRadius: 1,
                    // overflowY: 'auto',
                    maxHeight: `calc(100vh - 300px)`
                    // [theme.breakpoints.down('md')]: {
                    //   maxWidth: 250
                    // }
                  }}
                  className="scroll-box"
                >
                  {items?.map((item: any, index: number) => (
                    <ListItemButton
                      key={index}
                      disabled={!!disabledValues && disabledValues.includes(item.value)}
                      sx={{ height: 32 }}
                      onClick={() => handleListItemClick(item)}
                    >
                      {item.icon && item.icon}
                      <ListItemText
                        primary={
                          <Typography fontSize={'14px'} sx={{ whiteSpace: 'nowrap' }}>
                            {t(item.label)}
                          </Typography>
                        }
                      />
                    </ListItemButton>
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

export default Dropdown;
