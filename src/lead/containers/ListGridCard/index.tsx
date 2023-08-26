import { useMemo } from 'react';
import {
  Box,
  Chip,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { CrownOutlined } from '@ant-design/icons';

import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import MainCard from '@base/components/App/MainCard';
import { MENU_LEAD } from '@base/config/menus';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';
import RouteName from '@base/components/@hanbiro/RouteName';
import GridFields from '@base/components/@hanbiro/List/GridFields';

import * as keyNames from '@lead/config/keyNames';

interface ListGridCardProps extends BaseListGridCardProps {
  data: any;
  isSplitMode: boolean;
  fields?: any[];
  mapFields?: any;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked, isSplitMode, fields, mapFields } = props;

  const { id } = data;
  const url = `/${MENU_LEAD}/${id}`;

  const theme = useTheme();
  const bgColor = theme.palette.background.paper;

  const SHOW_KEYS: string[] = [
    keyNames.KEY_LEAD_PRIORITIZE,
    keyNames.KEY_LEAD_CONTACT_NAME,
    keyNames.KEY_LEAD_SOURCE,
    keyNames.KEY_LEAD_PRODUCT,
    keyNames.KEY_LEAD_COLLECTION_METHOD,
    keyNames.KEY_LEAD_CONTACT_EMAIL,
    keyNames.KEY_LEAD_ASSIGN_TO,
    keyNames.KEY_LEAD_CREATED_AT
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
              <RouteName name={data[keyNames.KEY_LEAD_TITLE]} url={url} />
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
                <RouteName name={data[keyNames.KEY_LEAD_TITLE]} url={url} />
              </Stack>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" sx={{ pl: 1 }}>
              <Typography color="text">{data?.[keyNames.KEY_LEAD_CONTACT_NAME] || ''}</Typography>
              {data?.[keyNames.KEY_LEAD_PRIORITIZE] && <CrownOutlined style={{ color: '#FAAD14' }} />}
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
              <Box>
                {(data?.[keyNames.KEY_LEAD_SOURCE] && data?.[keyNames.KEY_LEAD_SOURCE]?.menu != 'MENU_NONE') && 
                  <Chip variant="outlined" color="secondary" label={data?.[keyNames.KEY_LEAD_SOURCE]?.menu} size="small" />
                }
              </Box>
              <Typography color="text">{data[keyNames.KEY_LEAD_COLLECTION_METHOD]?.name || ''}</Typography>
            </Stack>
          </Stack>
        ) : 
        (<GridFields fields={fields} showKeys={SHOW_KEYS} mapFields={mapFields} data={data} />)}
      </MainCard>
    );
  }, [data, isChecked, onChecked]);

  return <>{CardMemo}</>;
};

export default ListGridCard;
