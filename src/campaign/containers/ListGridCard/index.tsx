import React, { useMemo, useState } from 'react';

// material-ui
import {
  Box,
  Checkbox,
  Chip,
  Divider,
  Fade,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme
} from '@mui/material';

// third-party

// project import
import IconButton from '@base/components/@extended/IconButton';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { convertDateTimeServerToClient, formatAddress } from '@base/utils/helpers';
import RouteName from '@base/components/@hanbiro/RouteName';

// assets
import { EnvironmentOutlined, LinkOutlined, MailOutlined, MoreOutlined, PhoneOutlined } from '@ant-design/icons';
import { Customer } from '@customer/types/interface';
import MainCard from '@base/components/App/MainCard';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';

//menu
import * as keyNames from '@customer/config/keyNames';
import { useTranslation } from 'react-i18next';
import { LABEL_VALUE_PRIMARY } from '@base/config/constant';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_ALL, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import { MENU_CUSTOMER } from '@base/config/menus';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Customer;
  category: string;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { category, data, isChecked, onChecked, sx, columnsRendered } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  let custCategory = CUSTOMER_CATEGORY_ACCOUNT;
  switch (data[keyNames.KEY_NAME_CUSTOMER_CATEGORY]) {
    case 'CATEGORY_ACCOUNT':
      custCategory = CUSTOMER_CATEGORY_ACCOUNT;
      break;
    case 'CATEGORY_CONTACT':
      custCategory = CUSTOMER_CATEGORY_CONTACT;
      break;
  }

  //primary item
  const primaryEmail = data[keyNames.KEY_NAME_CUSTOMER_EMAIL]?.find((_ele: any) => _ele.label?.label === LABEL_VALUE_PRIMARY);
  const primaryPhone = data[keyNames.KEY_NAME_CUSTOMER_PHONES]?.find((_ele: any) => _ele.label?.label === LABEL_VALUE_PRIMARY);
  const primaryMobile = data[keyNames.KEY_NAME_CUSTOMER_MOBILE]?.find((_ele: any) => _ele.label?.label === LABEL_VALUE_PRIMARY);
  //const primaryWebsite = data[keyNames.KEY_NAME_CUSTOMER_WEBSITES]?.find((_ele: any) => _ele.label?.label === LABEL_VALUE_PRIMARY);
  const primaryWebsite = data[keyNames.KEY_NAME_CUSTOMER_WEBSITES];
  const billAddress = data[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES] || null;

  //display number based on customer category
  const getPhoneMobile = (category: string) => {
    if (category === CUSTOMER_CATEGORY_ACCOUNT) {
      return primaryPhone ? `+${primaryPhone.country}${primaryPhone.phoneNumber}` : <em>(none)</em>;
    } else {
      return primaryMobile ? `+${primaryMobile.country}${primaryMobile.mobileNumber}` : <em>(none)</em>;
    }
  };

  const sourceId = data[keyNames.KEY_NAME_CUSTOMER_ID] ? data[keyNames.KEY_NAME_CUSTOMER_ID] : '';
  const url =
    category === CUSTOMER_CATEGORY_ALL
      ? `/${MENU_CUSTOMER}/${category}/${sourceId}/${custCategory}`
      : `/${MENU_CUSTOMER}/${category}/${sourceId}`;

  const photo = useMemo(() => {
    let photo = { key: '', bucket: '' };
    try {
      photo = JSON.parse(data[keyNames.KEY_NAME_CUSTOMER_PHOTO] as string);
    } catch (e) {
      //console.log('parse photo error.');
    }
    return photo;
  }, [data[keyNames.KEY_NAME_CUSTOMER_PHOTO]]);

  //grid item
  const ItemMemo = useMemo(() => {
    return (
      <MainCard
        sx={{
          height: 1,
          '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.common.white }
        }}
      >
        <Grid container spacing={2.25}>
          <Grid item xs={12}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                // secondaryAction={
                //   <IconButton edge="end" aria-label="comments" color="secondary" onClick={handleMenuClick}>
                //     <MoreOutlined style={{ fontSize: '1.15rem' }} />
                //   </IconButton>
                // }
              >
                <ListItemIcon>
                  <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked} onClick={() => onChecked && onChecked(sourceId)} />
                </ListItemIcon>
                <ListItemAvatar>
                  <IconAvatar id={photo.key} url={photo.bucket} alt={data[keyNames.KEY_NAME_CUSTOMER_NAME]} size="sm" />
                </ListItemAvatar>
                <ListItemText
                  primary={<RouteName name={data[keyNames.KEY_NAME_CUSTOMER_NAME] || '(none)'} url={url} variant="subtitle1" />}
                  secondary={
                    <Typography variant="caption" color="secondary">
                      {data?.[keyNames.KEY_NAME_CUSTOMER_TYPE]?.languageKey ? (
                        t(data?.[keyNames.KEY_NAME_CUSTOMER_TYPE]?.languageKey)
                      ) : (
                        <em>(none)</em>
                      )}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button'
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              {/* <MenuItem onClick={handleMenuClose}>Share</MenuItem>
              <MenuItem onClick={handleMenuClose}>Edit</MenuItem> */}
              <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  p: 0.5,
                  m: 0
                }}
                component="ul"
              >
                {data[keyNames.KEY_NAME_CUSTOMER_INDUSTRIES] ? (
                  data[keyNames.KEY_NAME_CUSTOMER_INDUSTRIES].map((_item: any, index: number) => (
                    <ListItem disablePadding key={index} sx={{ width: 'auto', pr: 0.75, pb: 0.75 }}>
                      <Chip color="secondary" variant="outlined" size="small" label={t(_item?.languageKey || '')} />
                    </ListItem>
                  ))
                ) : (
                  <em>(none)</em>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <List sx={{ p: 0, overflow: 'hidden', '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                  <ListItem>
                    <ListItemIcon>
                      <MailOutlined />
                    </ListItemIcon>
                    <ListItemText primary={<Typography color="secondary">{primaryEmail?.email || <em>(none)</em>}</Typography>} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography color="secondary">
                          {/* <NumericFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={user.contact} /> */}
                          {getPhoneMobile(custCategory)}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List sx={{ p: 0, overflow: 'hidden', '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                  <ListItem>
                    <ListItemIcon>
                      <EnvironmentOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography color="secondary">{billAddress ? formatAddress(billAddress) : <em>(none)</em>}</Typography>}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LinkOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link href="https://google.com" target="_blank" sx={{ textTransform: 'lowercase' }}>
                          {primaryWebsite?.website || <em>(none)</em>}
                        </Link>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between" sx={{ mt: 'auto', mb: 0, pt: 1.25 }}>
          <Typography variant="caption" color="secondary">
            Updated in {convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_CUSTOMER_UPDATED_AT] })}
          </Typography>
          <Typography variant="caption" color="secondary">
            {data[keyNames.KEY_NAME_CUSTOMER_CODE]}
          </Typography>
          {/* <Button variant="outlined" size="small" onClick={handleClickOpen}>
            Preview
          </Button> */}
        </Stack>
      </MainCard>
    );
  }, [data, isChecked, onChecked]);

  return <>{ItemMemo}</>;
};

export default ListGridCard;
