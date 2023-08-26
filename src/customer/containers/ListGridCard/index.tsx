import { useMemo } from 'react';

// material-ui
import { Box, Card, Checkbox, Divider, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';

// third-party
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';

// project import
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import RouteName from '@base/components/@hanbiro/RouteName';
import MainCard from '@base/components/App/MainCard';
import { MENU_CUSTOMER } from '@base/config/menus';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { selectionFieldsAtom } from '@base/store/atoms';
import { LABEL_VALUE_PRIMARY } from '@base/config/constant';

//menu
import { Customer } from '@customer/types/interface';
import * as keyNames from '@customer/config/keyNames';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_ALL, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Customer;
  category: string;
  isSplitMode: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { isSplitMode, category, data, isChecked, onChecked, sx } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const selectionFields = useRecoilValue(selectionFieldsAtom);
  //console.log('selectionFields', selectionFields);

  //get category
  let custCategory = CUSTOMER_CATEGORY_ACCOUNT;
  let cateLabel = t('Customer');
  switch (data[keyNames.KEY_NAME_CUSTOMER_CATEGORY]) {
    case 'CATEGORY_ACCOUNT':
      custCategory = CUSTOMER_CATEGORY_ACCOUNT;
      cateLabel = t('Account');
      break;
    case 'CATEGORY_CONTACT':
      custCategory = CUSTOMER_CATEGORY_CONTACT;
      cateLabel = t('Contact');
      break;
  }

  //customer type
  let typeLabel: any = <em></em>;
  if (data[keyNames.KEY_NAME_CUSTOMER_TYPE]?.languageKey) {
    typeLabel = t(data[keyNames.KEY_NAME_CUSTOMER_TYPE].languageKey);
  } else if (data[keyNames.KEY_NAME_CUSTOMER_TYPE]) {
    const typesData = selectionFields['customer_category'];
    if (typesData?.length) {
      const keyItem = typesData.find((_ele: any) => _ele.keyName === data[keyNames.KEY_NAME_CUSTOMER_TYPE]);
      if (keyItem) {
        typeLabel = t(keyItem.languageKey);
      }
    }
  }

  //contact type
  let contactTypeLabel: any = <em></em>;
  if (data[keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE]?.languageKey) {
    contactTypeLabel = t(data[keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE].languageKey);
  } else if (data[keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE]) {
    const typesData = selectionFields['contact_type'];
    if (typesData?.length) {
      const keyItem = typesData.find((_ele: any) => _ele.keyName === data[keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE]);
      if (keyItem) {
        contactTypeLabel = t(keyItem.languageKey);
      }
    }
  }

  let industries: any = [];
  data[keyNames.KEY_NAME_CUSTOMER_INDUSTRIES]?.map((_ele: any) => {
    if (_ele !== null) {
      industries.push({ ..._ele, name: _ele?.languageKey ? t(_ele.languageKey) : _ele?.name });
    }
  });

  let emails: any = [];
  data[keyNames.KEY_NAME_CUSTOMER_EMAIL]?.map((_ele: any) => {
    if (_ele.label?.label === LABEL_VALUE_PRIMARY) {
      emails.unshift({ ..._ele, name: _ele.email });
    } else {
      emails.push({ ..._ele, name: _ele.email });
    }
  });

  let phones: any = [];
  data[keyNames.KEY_NAME_CUSTOMER_PHONES]?.map((_ele: any) => {
    if (_ele.label?.label === LABEL_VALUE_PRIMARY) {
      phones.unshift({ ..._ele, name: `+${_ele.country} ${_ele.phoneNumber}` });
    } else {
      phones.push({ ..._ele, name: `+${_ele.country} ${_ele.phoneNumber}` });
    }
  });

  let mobiles: any = [];
  data[keyNames.KEY_NAME_CUSTOMER_MOBILE]?.map((_ele: any) => {
    if (_ele.label?.label === LABEL_VALUE_PRIMARY) {
      mobiles.unshift({ ..._ele, name: `+${_ele.country} ${_ele.mobileNumber}` });
    } else {
      mobiles.push({ ..._ele, name: `+${_ele.country} ${_ele.mobileNumber}` });
    }
  });

  let reps = data[keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO] ? data[keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO] : [];

  //display number based on customer category
  // const getPhoneMobile = (category: string) => {
  //   if (category === CUSTOMER_CATEGORY_ACCOUNT) {
  //     return primaryPhone ? `+${primaryPhone.country} ${primaryPhone.phoneNumber}` : <em></em>;
  //   } else {
  //     return primaryMobile ? `+${primaryMobile.country} ${primaryMobile.mobileNumber}` : <em></em>;
  //   }
  // };

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

  return (
    <MainCard
      content={false}
      boxShadow={isSplitMode ? false : true}
      sx={{ ...sx, ...(isSplitMode && { borderRadius: 0, borderBottom: `1px solid ${theme.palette.divider}` }) }}
      border={isSplitMode ? false : true}
    >
      {!isSplitMode && (
        <>
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ pb: 1 }}>
            <Checkbox
              sx={{ pr: 1 }}
              checked={isChecked ?? false}
              onClick={() => onChecked && onChecked(data[keyNames.KEY_NAME_CUSTOMER_ID])}
            />
            <RouteName name={data[keyNames.KEY_NAME_CUSTOMER_NAME]} url={url} />
          </Stack>
          <Divider />
          <Box sx={{ pt: 1.5, pb: 1.5, px: 2 }}>
            <Card elevation={0} sx={{ bgColor: theme.palette.background.paper, height: '100%', minHeight: 0 }}>
              <Stack spacing={2}>
                <Grid container>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5}>
                      <InputLabel>{cateLabel} ID: </InputLabel>
                      <Typography>{data[keyNames.KEY_NAME_CUSTOMER_CODE]}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5}>
                      <InputLabel>Customer Type: </InputLabel>
                      <Typography>{typeLabel}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5}>
                      <InputLabel>Rating: </InputLabel>
                      <Typography>
                        {data[keyNames.KEY_NAME_CUSTOMER_RATING]?.languageKey ? (
                          t(data[keyNames.KEY_NAME_CUSTOMER_RATING]?.languageKey)
                        ) : (
                          <em></em>
                        )}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    {custCategory === CUSTOMER_CATEGORY_ACCOUNT && (
                      <Stack direction="row" spacing={0.5}>
                        <InputLabel>Industry: </InputLabel>
                        {industries.length > 0 ? <ListTableCellDroplist showAvatar={false} values={industries} /> : <em></em>}
                      </Stack>
                    )}
                    {custCategory === CUSTOMER_CATEGORY_CONTACT && (
                      <Stack direction="row" spacing={0.5}>
                        <InputLabel>Contact Type: </InputLabel>
                        <Typography>{contactTypeLabel}</Typography>
                      </Stack>
                    )}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5}>
                      <InputLabel>Email: </InputLabel>
                      {emails.length > 0 ? <ListTableCellDroplist showAvatar={false} values={emails} /> : <em></em>}
                    </Stack>
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    {custCategory === CUSTOMER_CATEGORY_ACCOUNT && (
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <InputLabel>Phone: </InputLabel>
                        {phones.length > 0 ? <ListTableCellDroplist showAvatar={false} values={phones} /> : <em></em>}
                      </Stack>
                    )}
                    {custCategory === CUSTOMER_CATEGORY_CONTACT && (
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <InputLabel>Mobile: </InputLabel>
                        {mobiles.length > 0 ? <ListTableCellDroplist showAvatar={false} values={mobiles} /> : <em></em>}
                      </Stack>
                    )}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputLabel>Assigned Rep: </InputLabel>
                      {reps.length > 0 ? <ListTableCellDroplist showAvatar={false} values={reps} /> : <em></em>}
                    </Stack>
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputLabel>Created Date: </InputLabel>
                      <Typography>
                        {data[keyNames.KEY_NAME_CUSTOMER_CREATED_AT] ? (
                          convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_CUSTOMER_CREATED_AT] })
                        ) : (
                          <em></em>
                        )}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Card>
          </Box>
        </>
      )}
      {isSplitMode && (
        <Stack spacing={1.5}>
          <Stack direction={'row'} justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <Checkbox
                sx={{ pl: 0 }}
                checked={isChecked ?? false}
                onClick={() => onChecked && onChecked(data[keyNames.KEY_NAME_CUSTOMER_ID])}
              />
              <RouteName name={data[keyNames.KEY_NAME_CUSTOMER_NAME]} url={url} />
            </Stack>
            <Typography>
              {data[keyNames.KEY_NAME_CUSTOMER_RATING]?.languageKey ? t(data[keyNames.KEY_NAME_CUSTOMER_RATING]?.languageKey) : <em></em>}
            </Typography>
          </Stack>
          <Stack direction={'row'} justifyContent="space-between">
            <Typography>{typeLabel}</Typography>
            {industries.length > 0 ? <ListTableCellDroplist showAvatar={false} values={industries} /> : <em></em>}
          </Stack>
          <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
            {emails.length > 0 ? <ListTableCellDroplist showAvatar={false} values={emails} /> : <em></em>}
            {category === CUSTOMER_CATEGORY_ACCOUNT && (
              <>{phones.length > 0 ? <ListTableCellDroplist showAvatar={false} values={phones} /> : <em></em>}</>
            )}
            {category === CUSTOMER_CATEGORY_CONTACT && (
              <>{mobiles.length > 0 ? <ListTableCellDroplist showAvatar={false} values={mobiles} /> : <em></em>}</>
            )}
          </Stack>
        </Stack>
      )}
    </MainCard>
  );
};

export default ListGridCard;
