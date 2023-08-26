import { useMemo } from 'react';
import { t } from 'i18next';
import { MENU_LEAD } from '@base/config/menus';
import * as keyNames from '@lead/config/keyNames';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import RouteName from '@base/components/@hanbiro/RouteName';
import { CrownOutlined } from '@ant-design/icons';
import { LEAD_TYPE_OPTIONS } from '@lead/config/constants';
import { LabelValue } from '@base/types/app';
import { Stack, Typography } from '@mui/material';

export const columnRenderRemap = (menu: string, isPrioritize: boolean) => ({
  code(col: string, data: any) {
    return data?.[col] ?? '';
  },
  [keyNames.KEY_LEAD_COLLECTION_METHOD](col: string, data: any) {
    return data?.[col]?.name ?? '';
  },
  [keyNames.KEY_LEAD_CONTACT_NAME](col: string, data: any) {
    const name = data?.[col] ?? '';
    return <Stack direction={'row'} spacing={1}>
              {(isPrioritize && data?.isPrioritize) && 
                <CrownOutlined style={{ color: '#FAAD14', fontSize: '1.2rem' }} />
              }
              <Typography sx={{ wordBreak: 'break-all' }}>{name} </Typography>
            </Stack> ;
  },
  [keyNames.KEY_LEAD_TITLE](col: string, data: any) {
    const name = data?.[col] ?? '';
    const id = data?.id ?? '';
    const url = `/${MENU_LEAD}/${id}`;
    return <RouteName name={name} url={url} />;
  },
  [keyNames.KEY_LEAD_ASSIGN_TO](col: string, data: any) {
    const reps = data[col] || [];
    return reps?.rowSpan ? 
    `${t(reps.name)} ${`( ${reps?.rowSpan} )`}` : 
    (reps?.name || reps?.user?.name) ? (t(reps.name) || reps?.user?.name) : <>{t('ncrm_common_unassigned')}</>;
  },
  [keyNames.KEY_LEAD_PRIORITIZE](col: string, data: any) {
    const rep = data?.[col];
    return rep && <CrownOutlined style={{ color: '#FAAD14', fontSize: '1.2rem' }} />;
  },
  [keyNames.KEY_LEAD_TYPE](col: string, data: any) {
    const rep = data?.[col];
    const type = data?.[col]?.[keyNames.KEY_LEAD_TYPE];
    return rep?.rowSpan ? (
      `${LEAD_TYPE_OPTIONS.find((item: LabelValue) => item.value == type)?.label} ${`( ${rep?.rowSpan} )`}`
    ) : rep ? (
      LEAD_TYPE_OPTIONS.find((item: LabelValue) => item.value == rep)?.label
    ) : (
      <em>(none)</em>
    );
  },
  [keyNames.KEY_LEAD_DISQUALIFIED_DATE](col: string, data: any) {
    let updatedAt = data[col] ? data[col] : '';
    return convertDateTimeServerToClient({ date: updatedAt, humanize: true, isTime: true });
  },
  [keyNames.KEY_LEAD_UN_DISQUALIFIED_DATE](col: string, data: any) {
    let updatedAt = data[col] ? data[col] : '';
    return convertDateTimeServerToClient({ date: updatedAt, humanize: true, isTime: true });
  },
  [keyNames.KEY_LEAD_PRODUCT](col: string, data: any) {
    const reps = data[col] || [];
    return reps.length > 0 ? <ListTableCellDroplist showAvatar={false} values={reps} /> : <></>;
  },
  [keyNames.KEY_LEAD_CONTACT_EMAIL](col: string, data: any) {
    const reps = data[col] || [];
    return reps.length > 0 ? (
      <ListTableCellDroplist
        showAvatar={false}
        values={reps.map((item: any) => {
          return { ...item, name: item.email };
        })}
      />
    ) : <></>;
  },
  [keyNames.KEY_LEAD_SOURCE](col: string, data: any) {
    return data[col]?.menu && data[col].menu != 'MENU_NONE' ? data[col].menu : <></>; // 
  }
});

export const isDeleteList = (groupBy: string): boolean => {
  return ['allDeleted1'].indexOf(groupBy) >= 0 || ['allDeleted2'].indexOf(groupBy) >= 0;
};

export const isBottomHeaderList = (groupBy: string): boolean => {
  return (
    ['allDeleted1'].indexOf(groupBy) >= 0 ||
    ['allDeleted2'].indexOf(groupBy) >= 0 ||
    ['myGroupLead1'].indexOf(groupBy) >= 0 ||
    ['myGroupLead2'].indexOf(groupBy) >= 0
  );
};
