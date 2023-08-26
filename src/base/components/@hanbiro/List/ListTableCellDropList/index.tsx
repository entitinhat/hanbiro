import React, { useState } from 'react';
import { Badge, Box, Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HanAvatar from '../../HanAvatar';
import { useTranslation } from 'react-i18next';
import { KeyboardArrowDown } from '@mui/icons-material';

interface ListTableCellDroplistProps {
  values: any[];
  className?: string;
  showAvatar?: boolean;
  cellComponent?: any;
  badgeIcon?: boolean;
  showMenu?: boolean; // to stop show modal droplist on ListView
}

const ListTableCellDroplist: React.FC<ListTableCellDroplistProps> = (props) => {
  const { values, className, showAvatar = false, cellComponent, badgeIcon = false, showMenu = true } = props;

  const { t } = useTranslation();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openSort = Boolean(anchorEl);
  const handleClickItem = (event: React.MouseEvent<HTMLElement>) => {
    // stop bubble event effect when click on badge number
    event.stopPropagation();
    if (values?.length > 1 && showMenu) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    // stop bubble event effect on click outside of menu, stop show edit mode
    event.stopPropagation();
    setAnchorEl(null);
  };

  if (!values?.length) {
    return <Box />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex' }} alignItems="center">
        {cellComponent ? (
          cellComponent(values[0])
        ) : (
          <Typography component="span" sx={{ whiteSpace: 'nowrap' }}>
            {values[0]?.name}
          </Typography>
        )}
        {values.length > 1 && (
          <Typography
            component="span"
            sx={{ whiteSpace: 'nowrap', color: badgeIcon ? theme.palette.text.primary : theme.palette.success.main, ml: 0.5 }}
            onClick={handleClickItem}
          >
            {badgeIcon ? <KeyboardArrowDown fontSize="small" /> : `+${values.length - 1}`}
          </Typography>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={openSort}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 240
          }
        }}
        sx={{
          p: 0,
          '& .MuiMenu-list': {
            p: 0
          }
        }}
      >
        {!!values.length &&
          values.length > 1 &&
          values?.map((item: any, index: number) => (
            <MenuItem key={index} divider>
              {showAvatar && (
                <ListItemIcon>
                  <HanAvatar name={''} />
                </ListItemIcon>
              )}
              <ListItemText>
                {cellComponent ? (
                  cellComponent(item)
                ) : (
                  <Typography component="span" sx={{ whiteSpace: 'nowrap', pr: 1 }}>
                    {item?.name}
                  </Typography>
                )}
                {/* {item?.name} */}
              </ListItemText>
            </MenuItem>
          ))}
        <MenuItem key={values.length} sx={{ backgroundColor: 'grey.50' }}>
          <ListItemText>
            <Typography component="span" sx={{ whiteSpace: 'nowrap' }}>{`${t(`ncrm_common_total`)}: ${values.length}`}</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ListTableCellDroplist;
