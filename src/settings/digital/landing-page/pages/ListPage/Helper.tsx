import { Link as RouteLink } from 'react-router-dom';

//third-party
import _ from 'lodash';
import { t } from 'i18next';

//project
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { convertDateTimeServerToClient, formatAddress, moneyFormat } from '@base/utils/helpers';
import {
  LANDING_PAGE_STAGE_OPTIONS,
  LANDING_PAGE_PUBLISH_OPTIONS,
  LANDING_PAGE_TYPE_OPTIONS
} from '@settings/digital/landing-page/config/constants';

//menu
import * as keyNames from '@settings/digital/landing-page/config/keyNames';

// material-ui
import { Box, Chip, Stack, Typography, InputLabel, Avatar } from '@mui/material';
import { LANGUAGES } from '@base/config/constant';
import RouteName from '@base/components/@hanbiro/RouteName';
import SpanLang from '@base/components/@hanbiro/SpanLang';

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
    [keyNames.KEY_NAME_LANDING_PAGE_TYPE](col: string, data: any) {
      return <SpanLang keyLang={LANDING_PAGE_TYPE_OPTIONS.find((item) => item?.value == data[col])?.languageKey} />;
    },
    [keyNames.KEY_NAME_LANDING_PAGE_NAME](col: string, data: any) {
      let pageName = data[col] ? data[col] : '';
      let sourceId = data[keyNames.KEY_NAME_LANDING_PAGE_ID] ? data[keyNames.KEY_NAME_LANDING_PAGE_ID] : '';
      let url = `/settings/digital/landing-page/${sourceId}/`;
      return <RouteName url={url} name={pageName} />;
    },
    [keyNames.KEY_NAME_LANDING_PAGE_LANGUAGE](col: string, data: any) {
      return <SpanLang keyLang={LANGUAGES.find((item) => item?.value == data[col])?.label ?? ''} />;
    },
    [keyNames.KEY_NAME_LANDING_PAGE_STAGE](col: string, data: any) {
      return <SpanLang keyLang={LANDING_PAGE_STAGE_OPTIONS.find((item) => item?.value == data[col])?.label ?? ''} />;
    },
    // [keyNames.KEY_NAME_LANDING_PAGE_CREATED_AT](col: string, data: any) {
    //   return <Typography variant="h6">{data?.[col] ? convertDateTimeServerToClient({ date: data?.[col] }) : ''}</Typography>;
    // },
    // [keyNames.KEY_NAME_LANDING_PAGE_ID](col: string, data: any) {
    //   return <Typography variant="h6">{data[col]}</Typography>;
    // },
    [keyNames.KEY_NAME_LANDING_PAGE_ASSIGN_TO](col: string, data: any) {
      const reps = data[col] || [];
      return reps.length > 0 ? <ListTableCellDroplist showAvatar={false} values={reps} /> : <em>({t('ncrm_common_setting_none')})</em>;
    },
    // [keyNames.KEY_NAME_LANDING_PAGE_CREATED_BY](col: string, data: any) {
    //   return (
    //     <Stack direction="row" alignItems="center" ml={2}>
    //       <Avatar {...stringAvatar(data[col]?.name)} />
    //       <Typography>{data[col]?.name}</Typography>
    //     </Stack>
    //   );
    // },
    [keyNames.KEY_NAME_LANDING_PAGE_PRODUCT](col: string, data: any) {
      const reps = data[col] || [];
      const isAllProducts = data?.isAllProducts;

      return isAllProducts ? (
        <SpanLang keyLang="ncrm_common_all_product" />
      ) : reps.length > 0 ? (
        <ListTableCellDroplist showAvatar={false} values={reps} />
      ) : (
        <em>({t('ncrm_common_setting_none')})</em>
      );
    },
    [keyNames.KEY_NAME_LANDING_PAGE_PUBLISH](col: string, data: any) {
      return <SpanLang keyLang={LANDING_PAGE_PUBLISH_OPTIONS.find((item) => item?.value == data[col])?.label ?? ''} />;
    },
    [keyNames.KEY_NAME_LANDING_PAGE_PUBLISH_DATE](col: string, data: any) {
      return convertDateTimeServerToClient({ date: data?.[col] });
    },
    [keyNames.KEY_NAME_LANDING_PAGE_TEMPLATE](col: string, data: any) {
      return data[col];
    },
    [keyNames.KEY_NAME_LANDING_PAGE_TITLE](col: string, data: any) {
      return data[col];
    },
    [keyNames.KEY_NAME_LANDING_PAGE_UPDATED_AT](col: string, data: any) {
      return convertDateTimeServerToClient({ date: data?.[col] });
    }
    // [keyNames.KEY_NAME_LANDING_PAGE_UPDATED_BY](col: string, data: any) {
    //   return (
    //     <Stack direction="row" alignItems="center" ml={2}>
    //       <Avatar {...stringAvatar(data[col]?.name)} />
    //       <Typography>{data[col]?.name}</Typography>
    //     </Stack>
    //   );
    // }
  };
};

//columns render in grid split mode
export const getMapColumnsInSplitMode = (category: string) => {
  return {
    [keyNames.KEY_NAME_LANDING_PAGE_NAME](col: string, data: any) {
      let pageName = data[col] ? data[col] : '';
      let sourceId = data[keyNames.KEY_NAME_LANDING_PAGE_ID] ? data[keyNames.KEY_NAME_LANDING_PAGE_ID] : '';
      let url = `/settings/digital/landing-page/${sourceId}/`;
      return (
        <RouteLink to={url} style={{ textDecoration: 'none' }}>
          <Typography variant="h6" color="primary">
            {pageName}
          </Typography>
        </RouteLink>
      );
    }
  };
};
