import MainCard from '@base/components/App/MainCard';
import { MENU_SALES } from '@base/config/menus';
import { Box, Button, Checkbox, Stack, Typography } from '@mui/material';
import useOpportunityUpdate from '@opportunity/hooks/useOpportunityUpdate';
import { useMenuSetting, useMenuSettingUpdate } from '@settings/general/hooks/useMenuSetting';
import { WRITE_TYPE_PAIN_POINT } from '@settings/preferences/config/lead/constants';
import { CollectionMethodSetting, LeadSettingValue } from '@settings/preferences/types/lead/lead';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as keyNames from '@opportunity/config/keyNames';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@opportunity/config/queryKeys';
import { Opportunity } from '@opportunity/types/interfaces';
import { SET_TIMEOUT } from '@base/config/constant';

interface PaintPointProps {
  layoutData: any;
  onRefetch?: () => void;
}

const PaintPoint = (props: PaintPointProps) => {
  const { layoutData, onRefetch } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { menuSource, menuSourceId, data } = layoutData;
  const [items, setItems] = useState<LeadSettingValue[] | CollectionMethodSetting[]>([]);
  const [options, setOptions] = useState<any>(undefined);

  let basicFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  const painPointsField = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_NAME_OPPORTUNITY_PAIN_POINTS);
  // call get option
  const { data: postData, refetch } = useMenuSetting({ key: WRITE_TYPE_PAIN_POINT, menu: MENU_SALES });

  //init value
  useEffect(() => {
    if (postData?.value) setOptions(JSON.parse(postData.value));
  }, [postData]);

  useEffect(() => {
    if (painPointsField && painPointsField?.data?.length > 0 && options !== undefined) {
      const painPointsName = painPointsField?.data?.map((v: any) => v?.name);
      const newItems = options.map((v: any) => (painPointsName.includes(v?.name) ? { ...v, isActive: true } : v));
      setItems(newItems);
    } else if (options !== undefined) {
      setItems(options);
    }
  }, [painPointsField, options]);

  const mSettingUpdate = useMenuSettingUpdate();
  const mUpdate = useOpportunityUpdate();

  const handleOnChecked = (event: React.ChangeEvent<HTMLInputElement>, item: any) => {
    let newItems = items.map((_ele: any) => {
      if (_ele.name == item.name) {
        return { ..._ele, isActive: event.target.checked };
      }
      return _ele;
    });

    const params = {
      opportunity: {
        [keyNames.KEY_NAME_OPPORTUNITY_PAIN_POINTS]: newItems
          .filter((v: any) => v?.isActive)
          .map((v: any) => ({ id: v?.id, name: v?.name })),
        id: menuSourceId
      }
    };

    mUpdate.mutate(params, {
      onSettled: () => {
        setTimeout(() => {
          onRefetch && onRefetch();
        }, SET_TIMEOUT);
      }
    });

    setItems(newItems);
  };

  return (
    <MainCard
      contentSX={{ p: 0, pb: '0px !important' }}
      border={false}
      headerSX={{ p: '8px 16px', height: '50px' }}
      title={t('Identify Pain Point')}
    >
      <Stack direction="column" spacing={0} sx={{ width: '60%', p: 1, pl: 2 }}>
        {items.map((item: any, indx: number) => (
          <Stack key={indx} direction="row" spacing={1} alignItems="center">
            <Checkbox
              checked={item?.isActive || false}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChecked(event, item)}
            />
            <Typography sx={{ position: 'relative', top: 2 }}>{item?.name} </Typography>
          </Stack>
        ))}
      </Stack>
    </MainCard>
  );
};

export default PaintPoint;
