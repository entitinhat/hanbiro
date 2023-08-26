import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useProductGeneralMutaion } from '@settings/preferences/hooks/product/useProductGeneralMutaion';
import { useProductGeneralSetting } from '@settings/preferences/hooks/product/useProductGeneralSetting';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductNotification = () => {
  const theme = useTheme();
  const border = '1px solid ' + theme.palette.divider;
  const backgroundColor = theme.palette.grey[100];
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const defaultNotiValue = [
    {
      type: 'sales_end_date',
      used: false,
      before: 0,
      sendEmail: false,
      sendSms: false,
      sendNotification: false,
      sendTo: []
    },
    {
      type: 'experation_date',
      used: false,
      before: 0,
      sendEmail: false,
      sendSms: false,
      sendNotification: false,
      sendTo: []
    }
  ];
  const [notiValue, setNotiValue] = useState<any>(defaultNotiValue);
  const [showNoti, setShowNoti] = useState<boolean>(false);
  const [userGroup, setUserGroup] = useState<any>([]);

  //get data
  const params = {
    key: 'notifications',
    menu: 'product'
  };
  const { data: notiData, isLoading } = useProductGeneralSetting(params);

  //Using IAM api to get User
  // get user in group
  // const { data: userGroupData } = useSettingGroupUsers({ keyword: '', groupId: '' });

  // update
  const mUpdate = useProductGeneralMutaion();

  // init
  useEffect(() => {
    if (!isLoading && notiData) {
      const curNotiValue = JSON.parse(notiData?.value);

      setNotiValue(curNotiValue.rules);
      setShowNoti(curNotiValue.used);
    }
  }, [notiData]);
  // useEffect(() => {
  //   if (userGroupData?.data) {
  //     setUserGroup(userGroupData?.data);
  //   }
  // }, [userGroupData]);

  //notification change
  const handleNotiChange = (index: number, keyName: string, keyValue: any) => {
    const newNotiValue = [...notiValue];
    newNotiValue[index][keyName] = keyValue;
    setNotiValue(newNotiValue);
    handleNotiSave(showNoti, newNotiValue);
  };

  const handleNotiSave = (nShowNoti: boolean, nNotiValue: any) => {
    const params: any = {
      menu: 'product',
      key: 'notifications',
      value: JSON.stringify({ used: nShowNoti, rules: nNotiValue })
    };
    mUpdate.mutate(
      { menuSetting: params },
      {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ['setting_menuSetting', 'product', 'notifications'] });
        }
      }
    );
  };

  const handleShowNoti = () => {
    handleNotiSave(!showNoti, notiValue);
    setShowNoti(!showNoti);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
        borderRadius: '.25rem',
        border: border,
        mb: 2
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '15px 20px', borderBottom: showNoti ? border : 'none' }}
      >
        <Box>
          <Typography sx={{ fontWeight: 500, lineHeight: '1.25' }}>{t('ncrm_generalsetting_preferences_product_notification')}</Typography>
          <Typography variant="caption" mb={1} color="secondary">
            {t('ncrm_generalsetting_preferences_product_notification_sub_title')}
          </Typography>
        </Box>
        <Switch size="small" checked={showNoti} onChange={handleShowNoti} />
      </Stack>
      {showNoti && (
        <TableContainer>
          <Table>
            <TableHead sx={{ borderTop: 0, borderBottom: border }}>
              <TableRow>
                <TableCell sx={{ width: '35%', minWidth: '300px' }}>{t('ncrm_generalsetting_preferences_product_notification')}</TableCell>
                <TableCell>{t('ncrm_generalsetting_preferences_product_email')}</TableCell>
                <TableCell>{t('ncrm_generalsetting_preferences_product_sms')}</TableCell>
                <TableCell>{t('ncrm_generalsetting_preferences_product_notification')}</TableCell>
                <TableCell>{t('ncrm_generalsetting_preferences_product_notify_to')}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {notiValue?.map((item: any, index: number) => (
                <TableRow key={item.type}>
                  <TableCell sx={{ borderRight: '1px solid' + theme.palette.divider }}>
                    <Box>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={item.used}
                              sx={{ '& .MuiBox-root': { borderRadius: '4px' } }}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotiChange(index, 'used', e.target.checked)}
                            />
                          }
                          label={t('ncrm_generalsetting_preferences_product_send_notification_on_sales_end_date')}
                        />
                      </FormGroup>
                      {item.used && (
                        <Stack direction="row" alignItems="center" sx={{ mx: '16px' }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            divider={<Divider orientation="vertical" variant="middle" flexItem />}
                            sx={{ border: '1px solid' + theme.palette.divider, borderRadius: '0.25rem', mx: '10px' }}
                          >
                            <TextField
                              type="number"
                              value={item.before}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleNotiChange(index, 'before', e.target.value.toString())
                              }
                              sx={{
                                '& .MuiOutlinedInput-notchedOutline': { border: 0 }
                              }}
                            />
                            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ px: '8px' }}>
                              <Typography sx={{ color: theme.palette.grey[400] }}>
                                {t('ncrm_generalsetting_preferences_product_day(s)')}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Typography>{t('ncrm_generalsetting_preferences_product_before')}</Typography>
                        </Stack>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderRight: '1px solid' + theme.palette.divider }}>
                    <Checkbox
                      size="small"
                      checked={item.sendEmail}
                      sx={{ '& .MuiBox-root': { borderRadius: '4px' } }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotiChange(index, 'sendEmail', e.target.checked)}
                    />
                  </TableCell>
                  <TableCell sx={{ borderRight: '1px solid' + theme.palette.divider }}>
                    <Checkbox
                      size="small"
                      checked={item.sendSms}
                      sx={{ '& .MuiBox-root': { borderRadius: '4px' } }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotiChange(index, 'sendSms', e.target.checked)}
                    />
                  </TableCell>
                  <TableCell sx={{ borderRight: '1px solid' + theme.palette.divider }}>
                    <Checkbox
                      size="small"
                      checked={item.sendNotification}
                      sx={{ '& .MuiBox-root': { borderRadius: '4px' } }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotiChange(index, 'sendNotification', e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <UserAutoComplete
                      placeholder={t('ncrm_generalsetting_preferences_product_user_auto_placeholder') as string}
                      showAvatar={true}
                      value={item.sendTo}
                      //Using IAM api to get User
                      // options={userGroup}
                      onChange={(nUsers: any) => handleNotiChange(index, 'sendTo', nUsers)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProductNotification;
