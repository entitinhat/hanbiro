import { useTheme } from '@mui/material/styles';
import {
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
  Collapse,
  useMediaQuery
} from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ExpandLess, ExpandMore, KeyboardArrowDown } from '@mui/icons-material';
import { LabelValueIcon } from '@base/components/@hanbiro/Dropdown';
import dayjs from 'dayjs';
import { EDateRangeType } from '@base/types/app';
import { dateRangeIncludeCustomOptions } from '@base/config/options';
import { dateRangeString } from '@base/utils/helpers/dateUtils';
import DateRangePicker from '@base/components/@hanbiro/Date/DateRangePicker';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';

enum ECollapseType {
  COLLAPSE_DEFAULT,
  COLLAPSE_CUSTOMIZE
}

interface PeriodFilterProps {
  showLabel?: boolean;
  label?: string;
  options: any[];
  onChange?: (v: any) => void;
  defaultSelected?: string;
}

const PeriodFilter = (props: PeriodFilterProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  // const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const { isMobile: matchesMd, isDesktop } = useDevice();
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const [whichCollapsed, setWhichCollapsed] = useState<ECollapseType>(ECollapseType.COLLAPSE_CUSTOMIZE);
  const handleCollapseClick = (type: ECollapseType) => {
    setWhichCollapsed(
      whichCollapsed === ECollapseType.COLLAPSE_DEFAULT ? ECollapseType.COLLAPSE_CUSTOMIZE : ECollapseType.COLLAPSE_DEFAULT
    );
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const { label = '', options = [], onChange, defaultSelected = '', showLabel = true } = props;

  const defaultSelectedItem = {
    label: dateRangeIncludeCustomOptions[defaultSelected],
    value: defaultSelected
  };

  const [selectedItem, setSelectedItem] = useState<LabelValueIcon>(defaultSelectedItem);
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const handleListItemClick = (item: LabelValueIcon) => {
    setOpen(false);
    onChange && onChange(item);
    setSelectedItem(item);
  };

  const handleDateRangeOnChange = (range: any) => {
    if (!!range) {
      setSelectedItem({
        label: dateRangeIncludeCustomOptions[EDateRangeType.DATE_RANGE_CUSTOM],
        value: EDateRangeType.DATE_RANGE_CUSTOM
      });
      const { startDate, endDate } = range;
      setSelectedValue({
        startDate: dayjs(startDate).utc().startOf('day').toISOString(),
        endDate: dayjs(endDate).utc().endOf('day').toISOString()
      });
    }
  };

  useEffect(() => {
    if (!selectedItem?.value) {
      setSelectedValue(null);
    } else if (selectedItem.value !== EDateRangeType.DATE_RANGE_CUSTOM) {
      const { startDate, endDate } = dateRangeString(selectedItem.value as EDateRangeType);
      setSelectedValue({
        startDate,
        endDate
      });
    }
  }, [selectedItem]);

  useEffect(() => {
    if (selectedValue) {
      onChange && onChange(selectedValue);
    }
  }, [selectedValue]);

  const ChipMemo = useMemo(() => {
    const isCustomize = selectedItem.value === EDateRangeType.DATE_RANGE_CUSTOM;

    let value = '';
    if (isCustomize) {
      value = [dayjs(selectedValue.startDate).format('YYYY/MM/DD'), dayjs(selectedValue.endDate).format('YYYY/MM/DD')].join(' ~ ');
    } else {
      value = dateRangeIncludeCustomOptions?.[selectedItem.value] ?? '(None)';
    }

    return (
      <>
        <Typography>{t(value)}</Typography>
      </>
      // <Chip
      //   label={t(value)}
      //   variant="outlined"
      //   color="primary"
      //   size="small"
      //   onDelete={selectedItem.value !== defaultSelectedItem.value ? () => setSelectedItem(defaultSelectedItem) : undefined}
      //   sx={{
      //     '& .MuiChip-deleteIcon': {
      //       color: (theme) => `${theme.palette.warning.main}!important`
      //     }
      //   }}
      // />
    );
  }, [selectedItem]);

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Box display="flex" alignItems="center">
        {showLabel && (
          <Typography component="span" pr="5px">
            {label}
          </Typography>
        )}

        <Box ref={anchorRef}>{ChipMemo}</Box>
        <IconButton
          size="small"
          color="secondary"
          onClick={handleToggle}
          sx={{
            '&:hover': {
              background: 'none!important'
            }
          }}
        >
          <KeyboardArrowDown fontSize="small" sx={{ width: '14px', height: '14px' }} />
        </IconButton>
      </Box>
      <Popper
        placement="bottom-start" //{matchesMd ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        sx={{ mt: '-5px', zIndex: 10 }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper sx={{ boxShadow: (t) => t.customShadows.z1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{ minWidth: '250px' }}>
                  {/* Cusstom */}
                  <ListItemButton
                    sx={{
                      minWidth: '200px',
                      backgroundColor: (theme) => theme.palette.grey[50]
                    }}
                    onClick={() => handleCollapseClick(ECollapseType.COLLAPSE_CUSTOMIZE)}
                  >
                    <ListItemText primary={t('ncrm_common_dateby_custom_ranges')} />
                    {whichCollapsed === ECollapseType.COLLAPSE_DEFAULT ? (
                      <ExpandLess sx={{ width: '16px' }} />
                    ) : (
                      <ExpandMore sx={{ width: '16px' }} />
                    )}
                  </ListItemButton>
                  <Collapse in={whichCollapsed === ECollapseType.COLLAPSE_DEFAULT} timeout="auto" unmountOnExit>
                    <Box sx={{ position: 'relative', p: '5px' }}>
                      <DateRangePicker onChange={(startDate, endDate) => handleDateRangeOnChange({ startDate, endDate })} />
                    </Box>
                  </Collapse>
                  <Divider />
                  {options?.map((v) => (
                    <ListItemButton
                      disabled={v.value === selectedItem.value}
                      sx={{ height: 36 }}
                      key={v.value}
                      onClick={() => handleListItemClick(v)}
                    >
                      {v.icon && <ListItemIcon>{v.icon}</ListItemIcon>}
                      <ListItemText primary={<Typography color="textPrimary">{t(v.label)}</Typography>} />
                    </ListItemButton>
                  ))}
                  {/* <ListItemButton
                    sx={{
                      minWidth: '200px',
                      backgroundColor: (theme) => theme.palette.grey[50]
                    }}
                    onClick={() => handleCollapseClick(ECollapseType.COLLAPSE_DEFAULT)}
                  >
                    <ListItemText primary={t('ncrm_common_dateby_static_ranges')} />
                    {whichCollapsed === ECollapseType.COLLAPSE_CUSTOMIZE ? (
                      <ExpandLess sx={{ width: '16px' }} />
                    ) : (
                      <ExpandMore sx={{ width: '16px' }} />
                    )}
                  </ListItemButton>
                  <Collapse in={whichCollapsed === ECollapseType.COLLAPSE_CUSTOMIZE} timeout="auto" unmountOnExit>
                    <List
                      component="nav"
                      sx={{
                        py: 0.5,
                        width: '100%',
                        minWidth: 200,
                        maxWidth: 290,
                        borderRadius: 1,
                        overflowY: 'auto',
                        maxHeight: `calc(100vh - 300px)`,
                        [theme.breakpoints.down('md')]: {
                          maxWidth: 250
                        }
                      }}
                    >
                      {options?.map((v) => (
                        <ListItemButton
                          disabled={v.value === selectedItem.value}
                          sx={{ height: 36 }}
                          key={v.value}
                          onClick={() => handleListItemClick(v)}
                        >
                          {v.icon && <ListItemIcon>{v.icon}</ListItemIcon>}
                          <ListItemText primary={<Typography color="textPrimary">{t(v.label)}</Typography>} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse> */}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default PeriodFilter;
