import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// base
import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import useDevice from '@base/hooks/useDevice';
import validators from '@base/utils/validation/fieldValidator';
import ViewField from '@base/components/@hanbiro/ViewPage/ViewField';
import RouteName from '@base/components/@hanbiro/RouteName';

// mui
import { Grid, InputLabel, Stack, useTheme, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';

// import
import ContactMethodViewField from '@lead/containers/ViewFields/ContactMethodViewField';
import { ArrowUpward } from '@mui/icons-material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface TicketReplyProps {
  value?: any;
  onReply?: (item: any) => void;
}
const Reply = (props: TicketReplyProps) => {
  const { value } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile } = useDevice();
  const [data, setData] = useState<any>('');

  const [maxPaging, setMaxPaging] = useState<number>(5);

  useEffect(() => {
    if (value) setData(value);
  }, [value]);
  console.log('🚀 ~ file: index.tsx:27 ~ Reply ~ data:', data);
  const getViewFieldProps = useMemo(
    () => (keyName: string, value: any) => {
      // console.log('viewfield propsoptions', emails);
      const viewFieldProps: CommonViewFieldProps = {
        keyName: keyName,
        value: value,
        // onChange: onChange, // for hook form
        userPermission: { isEdit: true, isShow: true },
        config: {
          showFullRow: true,
          component: ContactMethodViewField,
          componentProps: { isPreferred: keyName === 'preferred' ? true : false },
          viewProps: { isPreferred: keyName === 'preferred' ? true : false },
          validate: {
            required: validators.required
          }
        },
        onSave: (keyName, isSuccess, value) => handleSave(value, keyName),
        onClose: () => {},
        menuSource: '',
        menuSourceId: '',
        isIAMComponent: true
      };

      return viewFieldProps;
    },
    [data]
  );

  //handlers
  const handleSave = (value: any, keyName: string) => {
    let nVal = { ...data };
    nVal[keyName].value = value[keyName];
    setData(nVal);
  };
  const renderMethod = (key: string) => {
    return (
      <Stack spacing={1}>
        <InputLabel color="secondary" sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
          <SpanLang sx={{ fontWeight: theme.typography.fontWeightRegular }} keyLang={data[key].label} />
        </InputLabel>
        <ViewField {...getViewFieldProps(key, data[key].value)} />
      </Stack>
    );
  };

  return (
    // <Grid container alignItems="flex-start" sx={{ width: '100%', p: isMobile ? 1 : 3 }} spacing={3}>
    //   {Object.keys(data).map((key: string, indx: number) => {
    //     return (
    //       <React.Fragment key={indx}>
    //         <Grid item xs={6}>
    //           {renderMethod(key)}
    //         </Grid>
    //       </React.Fragment>
    //     );
    //   })}
    // </Grid>
    <>
      <List sx={{ p: 0 }}>
        {data?.data?.reply?.map((item: any, index: number) => {
          // if (index > maxPaging - 1) return;
          return (
            <>
              <ListItem key={index}>
                <ListItemIcon>
                  <ArrowUpward sx={{ color: '#1890FF' }} />
                </ListItemIcon>
                <ListItemText
                  sx={{ display: 'flex' }}
                  primary={<RouteName name={item.name || ''} url={''} color="#8C8C8C" />}
                  secondary={<RouteName name={item.createdAt || ''} url={''} color="rgba(0, 0, 0, 0.54)" />}
                  primaryTypographyProps={{ marginRight: 1 }}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={<RouteName name={item.replyContent || ''} url={''} color="#262626" />} />
              </ListItem>
              <ListItem sx={{ justifyContent: 'center' }}>
                <ListItemText
                  primary={<RouteName name="View All" url={''} color="#1890FF" />}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                />
              </ListItem>
            </>
          );
        })}
      </List>
    </>
  );
};
export default Reply;
