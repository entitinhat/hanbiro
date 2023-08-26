import IconButton from '@base/components/@extended/IconButton';
import {
  Box,
  Checkbox,
  ClickAwayListener,
  List,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
  ListItemButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Transitions from '@base/components/@extended/Transitions';
import MainCard from '@base/components/App/MainCard';
import { useTranslation } from 'react-i18next';

// sx styles
const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};
interface Column {
  languageKey: string;
  keyName: string;
  defaultViewInList: boolean;
}
interface ColumnSettingProps {
  value: Column[];
  onChange?: (newColumns: Column[]) => void;
}

const ColumnSetting: React.FC<ColumnSettingProps> = (props: ColumnSettingProps) => {
  const { value, onChange } = props;
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const { t } = useTranslation();
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>(value);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleToggleCheckbox = (keyName: string) => {
    const newCols = columns.map((item) => {
      if (item.keyName === keyName) {
        return {
          ...item,
          defaultViewInList: !item.defaultViewInList
        };
      }
      return item;
    });
    setColumns(newCols);
    onChange && onChange(newCols);
  };
  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ flexShirink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="outlined"
        aria-label="open column-setting"
        ref={anchorRef}
        aria-controls={open ? 'column-setting-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <SettingsIcon />
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        // disablePortal
        container={document.body}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps }) => {
          return (
            <Transitions type="fade" in={open} {...TransitionProps}>
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: '100%',
                  minWidth: 285,
                  maxWidth: 420,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 285
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard title="Column Setting" elevation={0} border={false} content={false}>
                    <List
                      component="nav"
                      sx={{
                        p: 0,
                        '& .MuiListItemButton-root': {
                          py: 0.5,
                          '&.Mui-selected': { bgcolor: 'grey.50', color: 'text.primary' },
                          '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                        }
                      }}
                    >
                      {columns.length > 0 &&
                        columns.map((item) => (
                          <ListItemButton key={item.keyName}>
                            <Checkbox
                              defaultChecked={item.defaultViewInList}
                              onChange={() => {
                                handleToggleCheckbox(item.keyName);
                              }}
                            />
                            <ListItemText primary={<Typography variant="h6">{t(item.languageKey)}</Typography>}></ListItemText>
                          </ListItemButton>
                        ))}
                    </List>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            </Transitions>
          );
        }}
      </Popper>
    </Box>
  );
  //  <>Column Setting</>;
};

export default ColumnSetting;
