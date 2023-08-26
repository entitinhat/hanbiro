import { useRef, useState } from 'react';

import { TranslationOutlined } from '@ant-design/icons';
import Transitions from '@base/components/@extended/Transitions';
import useConfig from '@base/hooks/useConfig';
import { I18n, Language } from '@base/types/config';
import {
  Box,
  ClickAwayListener,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

const Localization = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const { i18n, onChangeLocalization } = useConfig();
  const usedLanguages: Language[] = [
    {
      code: 'en',
      title: 'English'
    },
    {
      code: 'ko',
      title: '한국어'
    },
    {
      code: 'vi',
      title: 'Tiếng Việt'
    }
  ];

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

  const handleListItemClick = (lang: I18n) => {
    onChangeLocalization(lang);
    setOpen(false);
  };

  return (
    <Box sx={{ flexShrink: 0 }}>
      <IconButton
        sx={{
          borderRadius: '50%',
          color: 'common.white',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.15) : alpha(theme.palette.primary.light, 0.15)
          }
        }}
        aria-label="open localization"
        ref={anchorRef}
        aria-controls={open ? 'localization-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <TranslationOutlined />
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom-start' : 'bottom'}
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
                offset: [matchesXs ? 0 : 0, 9]
              }
            }
          ]
        }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  component="nav"
                  sx={{
                    py: 0.5,
                    width: '100%',
                    minWidth: 180,
                    maxWidth: 200,
                    borderRadius: 0.5,
                    [theme.breakpoints.down('md')]: {
                      maxWidth: 250
                    }
                  }}
                >
                  {usedLanguages.length > 0 &&
                    usedLanguages.map((item, idx) => {
                      return (
                        <ListItemButton
                          key={item.code}
                          selected={i18n === item.code}
                          onClick={() => handleListItemClick(item.code)}
                          sx={{ py: 0.5 }}
                        >
                          <ListItemText
                            primary={
                              <Grid container>
                                <Typography color="textPrimary">{item.title}</Typography>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                      );
                    })}
                </List>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Localization;
