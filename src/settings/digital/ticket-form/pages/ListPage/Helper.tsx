//third-party
import _ from 'lodash';
import { Link as RouteLink } from 'react-router-dom';

//project
import { convertDateTimeServerToClient } from '@base/utils/helpers';

//menu
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { TICKET_FORM_STAGES } from '@settings/digital/ticket-form/config/constants';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { LANGUAGES } from '@base/config/constant';
import RouteName from '@base/components/@hanbiro/RouteName';
import { t } from 'i18next';

export const columnRenderRemap = (menu: string) => ({
  code(col: string, data: any) {
    return data?.[col] ?? '';
  }
});

//render columns components
export const getMapColumns = (avaiLanguages: any) => {
  const stringAvatar = (name: string) => {
    return {
      sx: {
        width: '32px',
        height: '32px',
        fontSize: '14px',
        mr: 1,
        color: 'white',
        bgcolor: '#5A7FCF'
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  };

  return {
    [keyNames.KEY_TICKET_FORM_NAME](col: string, data: any) {
      let name = data[col] ? data[col] : '';
      let sourceId = data[keyNames.KEY_TICKET_FORM_ID] ?? '';
      let url = `/settings/digital/form/${sourceId}`;
      return <RouteName url={url} name={name} />;
    },
    [keyNames.KEY_TICKET_FORM_LANGUAGE](col: string, data: any) {
      return <Typography sx={{ pl: 2 }}>{LANGUAGES?.find((v: any) => v.key == data?.[col])?.label ?? data?.[col] ?? '(none)'}</Typography>;
    },
    [keyNames.KEY_TICKET_FORM_STAGE](col: string, data: any) {
      return <Typography sx={{ pl: 2 }}>{t(TICKET_FORM_STAGES.find((v: any) => v.value == data?.[col])?.label) ?? ''}</Typography>;
    },
    [keyNames.KEY_TICKET_FORM_CREATED_AT](col: string, data: any) {
      return <Typography sx={{ pl: 2 }}>{convertDateTimeServerToClient({ date: data?.[col] })}</Typography>;
    },
    [keyNames.KEY_TICKET_FORM_PRODUCTS](col: string, data: any) {
      const reps = data[col] || [];
      const isAllProducts = data?.isAllProducts;

      return (
        <Box sx={{ pl: 2 }}>
          {isAllProducts ? (
            'All Products'
          ) : reps.length > 0 ? (
            <ListTableCellDroplist showAvatar={false} values={reps} />
          ) : (
            <em>{t('crm_common_none')}</em>
          )}
        </Box>
      );
    },
    [keyNames.KEY_TICKET_FORM_TITLE](col: string, data: any) {
      const reps = data[col] || [];
      const isAllProducts = data?.isAllProducts;

      return <Typography sx={{ pl: 2 }}>{data?.[col] || '(none)'}</Typography>;
    },
    [keyNames.KEY_TICKET_FORM_CREATED_BY](col: string, data: any) {
      return (
        <Stack direction="row" alignItems="center" ml={2}>
          <Avatar {...stringAvatar(data[col]?.name)} />
          <Typography>{data[col]?.name}</Typography>
        </Stack>
      );
    },
    [keyNames.KEY_TICKET_FORM_UPDATED_BY](col: string, data: any) {
      return (
        <Stack direction="row" alignItems="center" ml={2}>
          <Avatar {...stringAvatar(data[col]?.name)} />
          <Typography>{data[col]?.name}</Typography>
        </Stack>
      );
    },
    [keyNames.KEY_TICKET_FORM_UPDATED_AT](col: string, data: any) {
      return <Typography sx={{ pl: 2 }}>{convertDateTimeServerToClient({ date: data?.[col] })}</Typography>;
    }
  };
};
