import React from 'react';
import _ from 'lodash';

import { CriteriaOption } from '@process/types/diagram';
import { CRITERIA_FIELD_TYPE, CRITERIA_OPERATOR, MODULE } from '@process/config/constants';
import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface CriteriaRuleProps {
  id: string;
  name: string;
  option: CriteriaOption;
}

function CriteriaRule(props: CriteriaRuleProps) {
  const { id, name, option } = props;
  const { t } = useTranslation();
  const blockCount = option.blocks.length - 1;

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="subtitle1">{t('ncrm_process_automation_criteria_name')}</Typography>
        <Typography variant="body1">{name}</Typography>
      </Stack>

      {option.blocks.map((block, bIndex) => {
        const blockAndOr = option.pattern[bIndex];
        const isBlockSplit = bIndex < blockCount;
        const conditionCount = block.conditions.length - 1;

        return (
          <React.Fragment key={bIndex}>
            <Box
              sx={{
                p: 2,
                borderLeft: '3px solid',
                borderColor: 'primary.main',
                borderRadius: 1,
                boxShadow: (t) => t.customShadows.z1
              }}
            >
              <ul className="criteria-list">
                {block.conditions.map((condition, cIndex) => {
                  const isConditionSplit = cIndex < conditionCount;
                  const conditionAndOr = block.pattern[cIndex];
                  const valueType = condition.bSide ? 'other' : 'enter';

                  let startDate = null;
                  let endDate = null;
                  if (condition.aSide.type == 'FIELD_TYPE_DATE') {
                    if (condition.value) {
                      if (condition.operator == 'CRITERIA_OPERATOR_BETWEEN') {
                        const splitValue = condition.value.split('|');
                        startDate = splitValue[0] ? new Date(splitValue[0]) : null;
                        endDate = splitValue[1] ? new Date(splitValue[1]) : null;
                      } else {
                        startDate = condition.value ? new Date(condition.value) : null;
                      }
                    }
                  }

                  return (
                    <li key={cIndex}>
                      <Stack sx={{ py: 1 }}>
                        <Stack spacing={1.5}>
                          <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack spacing={2} direction="row" alignItems="center">
                              <Stack spacing={0.5}>
                                <Typography variant="caption">{t('ncrm_process_automation_rule_module')}</Typography>
                                <Typography>{MODULE[condition.aSide.module]}</Typography>
                              </Stack>
                              <Stack spacing={0.5}>
                                <Typography variant="caption">{t('ncrm_process_automation_rule_field')}</Typography>
                                <Typography>{condition.aSide.field}</Typography>
                              </Stack>
                            </Stack>
                            {valueType == 'other' && (
                              <Stack spacing={1} direction="row" alignItems="center">
                                <Stack spacing={0.5}>
                                  <Typography variant="caption">{t('ncrm_process_automation_rule_module')}</Typography>
                                  <Typography>{condition.bSide && MODULE[condition.bSide.module]}</Typography>
                                </Stack>
                                <Stack spacing={0.5}>
                                  <Typography variant="caption">{t('ncrm_process_automation_rule_field')}</Typography>
                                  <Typography>{condition.bSide && condition.bSide.field}</Typography>
                                </Stack>
                              </Stack>
                            )}
                          </Stack>

                          <Stack
                            spacing={2}
                            direction="row"
                            alignItems="baseline"
                            justifyContent={valueType == 'enter' ? 'space-between' : 'center'}
                          >
                            <Stack spacing={0.5}>
                              <Typography variant="caption">{t('ncrm_process_automation_rule_type')}</Typography>
                              <Typography>{CRITERIA_FIELD_TYPE[condition.aSide.type]}</Typography>
                            </Stack>
                            <Stack spacing={0.5}>
                              <Typography variant="caption">{t('ncrm_process_automation_rule_operator')}</Typography>
                              <Typography>{CRITERIA_OPERATOR[condition.operator]}</Typography>
                            </Stack>
                            {valueType == 'enter' && (
                              <Stack spacing={0.5}>
                                <Typography variant="caption">{t('ncrm_process_automation_rule_caption')}</Typography>
                                {condition.aSide.type == 'FIELD_TYPE_TEXT' && `${condition.value}`}
                                {condition.aSide.type == 'FIELD_TYPE_DATE' && (
                                  <Stack direction="row" spacing={0.5}>
                                    `${dayjs(startDate).format('YYYY-MM-DD')}`
                                    {condition.operator == 'CRITERIA_OPERATOR_BETWEEN' && (
                                      <>
                                        <Typography> ~ </Typography>
                                        `${dayjs(endDate).format('YYYY-MM-DD')}`
                                      </>
                                    )}
                                  </Stack>
                                )}
                                {condition.aSide.type == 'FIELD_TYPE_NUMBER' && `${condition.value}`}
                              </Stack>
                            )}
                          </Stack>
                        </Stack>
                        {isConditionSplit && conditionAndOr && (
                          <Button size="small" variant="outlined">
                            {conditionAndOr == 'and' ? 'And' : 'Or'}
                          </Button>
                        )}
                      </Stack>
                    </li>
                  );
                })}
              </ul>
            </Box>
            {isBlockSplit && blockAndOr && (
              <Box className="add-criteria-block">
                <Button size="small" variant="outlined">
                  {blockAndOr == 'and' ? 'And' : 'Or'}
                </Button>
              </Box>
            )}
          </React.Fragment>
        );
      })}
    </Stack>
  );
}

export default React.memo(CriteriaRule);
