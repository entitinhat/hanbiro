import { IdName } from '@base/types/common';
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import {
  AttributesOptions,
  AttributesSelectOptions,
  DESK_CRITERIA_OPTIONS,
  OPPORTUNITY_CRITERIA_OPTIONS
} from '@settings/assignment-rule/rule/config/constants';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import { EAREntryCriteriaType } from '@settings/assignment-rule/rule/types/enums';
import { useTranslation } from 'react-i18next';

interface RenderCriteriaProps {
  critKey: string;
  condition: any;
}
const RenderCriteria = (props: RenderCriteriaProps) => {
  const { critKey, condition } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const getLabel = (item: any, key: string) => {
    switch (key) {
      case EAREntryCriteriaType.CUSTOMER: {
        return item?.name;
      }
      case EAREntryCriteriaType.ATTRIBUTE: {
        const type = AttributesSelectOptions.find((i) => i.value == item?.dateType)?.label ?? 'ncrm_generalsetting_assignment_rule_none';
        const opt = AttributesOptions.find((i) => i.value == item?.dateSelectedType)?.label ?? '';
        const optDays = item.dateSelectedType !== 'AR_ATTRIBUTE_DATE_SELECTED_ON_DATE' ? `${item.dateSelectedValue} days` : '';
        return `${t(type)} - ${t(opt)} ${optDays} `;
      }
      case EAREntryCriteriaType.TAG: {
        return item?.name;
      }
      case EAREntryCriteriaType.CLASSIFICATION: {
        return `${item?.classification?.name} - ${item?.value}`;
      }
      case EAREntryCriteriaType.CATEGORY: {
        const category = item?.category?.name ?? 'ncrm_generalsetting_assignment_rule_none';
        let products: string[] = [];
        if (item?.product && item?.product.length > 0) {
          item?.product?.map((item: IdName) => {
            products.push(item.name);
          });
        }
        const productString = products.join(', ');
        return `${t(category)} - ${productString}`;
      }
      case EAREntryCriteriaType.EMAIL: {
        const label = item?.label?.languageKey;
        const email = item?.email;
        return `${t(label)} : ${email}`;
      }
      case EAREntryCriteriaType.PRODUCT: {
        return item?.name;
      }
      default:
        t('ncrm_generalsetting_assignment_rule_none');
    }
  };
  const renderSingleChip = () => {
    const label = getLabel(condition, critKey);
    return (
      <Chip
        sx={{ py: '20px', background: theme.palette.secondary.lighter, border: '1px solid ' + theme.palette.secondary.light }}
        label={label}
        size="medium"
      />
    );
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '150px' }}>
        <Typography>
          {t(
            DESK_CRITERIA_OPTIONS.find((item) => item.extra === critKey)?.label ??
              OPPORTUNITY_CRITERIA_OPTIONS.find((item) => item.extra === critKey)?.label ??
              ''
          )}
        </Typography>
      </Box>
      {Array.isArray(condition) ? (
        <Stack direction="row" sx={{ maxWidth: '800px', flexWrap: 'wrap', gap: 2 }}>
          {condition.map((item: any, index: number) => {
            const label = getLabel(item, critKey);
            return (
              <Chip
                sx={{ py: '20px', background: theme.palette.secondary.lighter, border: '1px solid ' + theme.palette.secondary.light }}
                key={index}
                label={label}
                size="medium"
              />
            );
          })}
        </Stack>
      ) : (
        <>{renderSingleChip()}</>
      )}
    </Box>
  );
};
export default RenderCriteria;
