import { useTranslation } from 'react-i18next';

// mui import
import { Box, Card, Checkbox, Divider, Stack, Switch, Typography, useTheme } from '@mui/material';

// project import
import MainCard from '@base/components/App/MainCard';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import RouteName from '@base/components/@hanbiro/RouteName';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { MENU_PRODUCT, MENU_UNIT } from '@base/config/menus';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';
import GridFields from '@base/components/@hanbiro/List/GridFields';

// menu import
import * as keyNames from '@product/unit/config/keyNames';
import { BaseUnit } from '@product/unit/types/unit';
import { useMemo } from 'react';

interface ListGridCardProps extends BaseListGridCardProps {
  data: BaseUnit;
  isSplitMode: boolean;
  fields?: any[];
  mapFields?: any;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked, isSplitMode, fields, mapFields } = props;
  const { t } = useTranslation();
  const { id } = data;

  const url = `/${MENU_PRODUCT}/${MENU_UNIT}/${id}`;

  const theme = useTheme();
  const bgColor = theme.palette.background.paper;

  const SHOW_KEYS: string[] = [
    keyNames.KEY_UNIT_VALUES,
    keyNames.KEY_UNIT_RELATED_PRODUCTS,
    keyNames.KEY_UNIT_ACTIVE,
    keyNames.KEY_UNIT_CREATED_BY,
    keyNames.KEY_UNIT_CREATED_AT,
    keyNames.KEY_UNIT_UPDATED_AT
  ];

  const CardMemo = useMemo(() => {
    return (
      <MainCard
        boxShadow={isSplitMode ? false : true}
        sx={{ ...sx, ...(isSplitMode && { borderRadius: 0, borderBottom: `1px solid ${theme.palette.divider}` }) }}
        border={isSplitMode ? false : true}
        title={
          isSplitMode ? null : (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <MuiCheckbox value={isChecked ?? false} onChange={(val: boolean) => onChecked && onChecked(data['id'])} />
              <RouteName name={data[keyNames.KEY_UNIT_NAME]} url={url} />
            </Stack>
          )
        }
        headerSX={{ p: 1.5 }}
        contentSX={{ p: 2 }}
        divider
      >
        {isSplitMode ? (
          <Stack spacing={1}>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
              <Stack direction="row" alignItems="center">
                <MuiCheckbox value={isChecked ?? false} onChange={(val: boolean) => onChecked && onChecked(data['id'])} />
                <RouteName name={data[keyNames.KEY_UNIT_NAME]} url={url} />
              </Stack>
              <Switch value={data?.[keyNames.KEY_UNIT_ACTIVE] ?? false} readOnly size="small" />
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" sx={{ pl: 1 }}>
              <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between">
                {data[keyNames.KEY_UNIT_VALUES] && data[keyNames.KEY_UNIT_VALUES]?.length > 0 ? (
                  <ListTableCellDroplist showAvatar={false} values={data?.[keyNames.KEY_UNIT_VALUES] || []} showMenu={true} />
                ) : (
                  ''
                )}
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                {data[keyNames.KEY_UNIT_RELATED_PRODUCTS] && data[keyNames.KEY_UNIT_RELATED_PRODUCTS]?.length > 0 ? (
                  <ListTableCellDroplist showAvatar={false} values={data?.[keyNames.KEY_UNIT_RELATED_PRODUCTS] || []} showMenu={true} />
                ) : (
                  ''
                )}
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <>
            <GridFields fields={fields} showKeys={SHOW_KEYS} mapFields={mapFields} data={data} />
          </>
        )}
      </MainCard>
    );
  }, [data, isChecked, onChecked]);

  return <>{CardMemo}</>;
  ;
};

export default ListGridCard;
