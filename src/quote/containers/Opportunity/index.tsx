import RouteName from '@base/components/@hanbiro/RouteName';
import { MENU_OPPORTUNITY_OPPORTUNITY } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/usePageLayout';
import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { Chip, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import { default as viewConfig } from '@opportunity/config/view-field';
import { useOpportunity } from '@opportunity/hooks/useOpportunity';
import _ from 'lodash';
import { OPPORTUNITY_TYPES } from '@opportunity/config/constants';
import { OptionValue } from '@base/types/common';
import SpanLang from '@base/components/@hanbiro/SpanLang';

interface OpportunityProps {
  layoutData: any;
}

const Opportunity = (props: OpportunityProps) => {
  const { layoutData } = props;
  const { data } = layoutData;
  const theme = useTheme();
  const [item, setItem] = useState<any>(undefined);

  // layout
  const layoutMenu: string = MENU_OPPORTUNITY_OPPORTUNITY;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  // The fields on below : it has to request single api.
  const dataIgnoreFields: string[] = [];

  const ignoreFields: string[] = [...dataIgnoreFields];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: dataIgnoreFields
  });

  const opportunityId = data?.opportunity?.id || '';

  const {
    data: opportunityData,
    isLoading,
    refetch
  } = useOpportunity(viewSchema, opportunityId, {
    enabled: viewSchema.length > 0 && opportunityId !== ''
  });

  useEffect(() => {
    if (opportunityData) {
      if (!_.isEqual(opportunityData, item)) {
        setItem(opportunityData);
      }
    } else {
      setItem(undefined);
    }
  }, [opportunityData]);

  const type = OPPORTUNITY_TYPES.find((v: OptionValue) => v?.keyName === item?.type)?.languageKey || '';

  return (
    <>
      {item && (
        <Stack p={2} spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <RouteName name={item?.code} url={`/opportunity/opportunity/${item?.id}`} />
            {type && (
              <Chip
                label={<SpanLang keyLang={type} />}
                size="small"
                variant="outlined"
                sx={{ border: 'none', backgroundColor: theme.palette.secondary.lighter }}
              />
            )}
          </Stack>
          <Stack direction="row" spacing={6}>
            <Stack direction="row">
              <Typography color="secondary" mr={0.5}>
                Estimated Amount:
              </Typography>
              <Typography>{moneyFormat(item?.estimatedRevenue, item?.currency || '$')}</Typography>
            </Stack>
            <Stack direction="row">
              <Typography color="secondary" mr={0.5}>
                Created Date:
              </Typography>
              <Typography>{convertDateTimeServerToClient({ date: item?.createdAt, humanize: true })}</Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Opportunity;
