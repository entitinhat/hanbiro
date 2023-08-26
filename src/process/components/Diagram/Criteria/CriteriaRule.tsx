import dayjs from 'dayjs';
import _ from 'lodash';
import React, { ChangeEvent, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import NumberField from '@base/components/@hanbiro/NumberField';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { CRITERIA_FIELD_TYPE, CRITERIA_OPERATOR, MODULE } from '@process/config/constants';
import statusAtom from '@process/store/atoms/status';
import { CriteriaOption } from '@process/types/diagram';

interface CriteriaRuleProps {
  id: string;
  name: string;
  option: CriteriaOption;
  mode: 'edit' | 'view';
}

function CriteriaRule(props: CriteriaRuleProps) {
  const { mode, name, option, id } = props;
  const setStatusesValue = useSetRecoilState(statusAtom);
  const blockCount = option.blocks.length - 1;
  // console.log('statusValue', statusesValue);

  const onChangeValue = useCallback(
    (bIndex: number, cIndex: number, newValue: string | number) => {
      let newOption = _.cloneDeep(option);
      let condition = newOption.blocks[bIndex].conditions[cIndex];
      if (typeof newValue === 'number') {
        condition.value = newValue.toString();
      } else {
        condition.value = newValue;
      }
      changeCriteriaStatus(newOption);
    },
    [option]
  );

  const onChangeDate = useCallback(
    (bIndex: number, cIndex: number, range: string, newValue: Date | null) => {
      if (!newValue) return;
      let newOption = _.cloneDeep(option);
      let condition = newOption.blocks[bIndex].conditions[cIndex];
      const newDate = dayjs(newValue).format('YYYY-MM-DD');
      if (condition.operator == 'CRITERIA_OPERATOR_BETWEEN') {
        let splitDate: string[] = ['', ''];
        if (condition.value) {
          splitDate = condition.value.split('|');
        }
        if (range == 'start') {
          splitDate[0] = newDate;
        } else {
          splitDate[1] = newDate;
        }
        condition.value = splitDate.join('|');
      } else {
        condition.value = newDate;
      }
      changeCriteriaStatus(newOption);
    },
    [option]
  );

  const changeCriteriaStatus = useCallback(
    (newOption: CriteriaOption) => {
      setStatusesValue((old) => {
        const targetIndex = old.findIndex((status) => status.id === id);
        const targetValue = { ...old[targetIndex], criteria: newOption };
        return [...old.slice(0, targetIndex), targetValue, ...old.slice(targetIndex + 1)];
      });
    },
    [id]
  );

  const onChangeName = useCallback(
    (newValue: string) => {
      setStatusesValue((old) => {
        const targetIndex = old.findIndex((status) => status.id === id);
        const targetValue = { ...old[targetIndex], button: newValue };
        return [...old.slice(0, targetIndex), targetValue, ...old.slice(targetIndex + 1)];
      });
    },
    [option, id]
  );

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="subtitle1">Criteria Name</Typography>
        {mode == 'edit' ? (
          <TextField
            size="small"
            fullWidth
            value={name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeName(event.target.value)}
          />
        ) : (
          <Typography variant="body1">{name}</Typography>
        )}
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
                                <Typography variant="caption">Module</Typography>
                                <Typography>{MODULE[condition.aSide.module]}</Typography>
                              </Stack>
                              <Stack spacing={0.5}>
                                <Typography variant="caption">Field</Typography>
                                <Typography>{condition.aSide.field}</Typography>
                              </Stack>
                            </Stack>
                            {valueType == 'other' && (
                              <Stack spacing={1} direction="row" alignItems="center">
                                <Stack spacing={0.5}>
                                  <Typography variant="caption">Module</Typography>
                                  <Typography>{condition.bSide && MODULE[condition.bSide.module]}</Typography>
                                </Stack>
                                <Stack spacing={0.5}>
                                  <Typography variant="caption">Field</Typography>
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
                              <Typography variant="caption">Type</Typography>
                              <Typography>{CRITERIA_FIELD_TYPE[condition.aSide.type]}</Typography>
                            </Stack>
                            <Stack spacing={0.5}>
                              <Typography variant="caption">Operator</Typography>
                              <Typography>{CRITERIA_OPERATOR[condition.operator]}</Typography>
                            </Stack>
                            {valueType == 'enter' && (
                              <Stack spacing={0.5} sx={{ width: '100%' }} alignItems="center">
                                <Typography variant="caption">Value</Typography>
                                {condition.aSide.type == 'FIELD_TYPE_TEXT' &&
                                  (mode == 'edit' ? (
                                    <TextField
                                      size="small"
                                      fullWidth
                                      value={condition.value}
                                      onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeValue(bIndex, cIndex, event.target.value)}
                                    />
                                  ) : (
                                    `${condition.value}`
                                  ))}
                                {condition.aSide.type == 'FIELD_TYPE_DATE' && (
                                  <Stack direction="row" spacing={0.5} sx={{ width: '100%' }} alignItems="center">
                                    {mode == 'edit' ? (
                                      <DatePicker
                                        size="small"
                                        value={startDate}
                                        onChange={(newValue) => onChangeDate(bIndex, cIndex, 'start', newValue)}
                                        inputFormat={'yyyy/MM/dd'}
                                      />
                                    ) : (
                                      `${dayjs(startDate).format('YYYY-MM-DD')}`
                                    )}
                                    {condition.operator == 'CRITERIA_OPERATOR_BETWEEN' && (
                                      <>
                                        <Typography> ~ </Typography>
                                        {mode == 'edit' ? (
                                          <DatePicker
                                            size="small"
                                            value={endDate}
                                            onChange={(newValue) => onChangeDate(bIndex, cIndex, 'end', newValue)}
                                            inputFormat={'yyyy/MM/dd'}
                                          />
                                        ) : (
                                          `${dayjs(endDate).format('YYYY-MM-DD')}`
                                        )}
                                      </>
                                    )}
                                  </Stack>
                                )}
                                {condition.aSide.type == 'FIELD_TYPE_NUMBER' &&
                                  (mode == 'edit' ? (
                                    <NumberField
                                      size="small"
                                      value={Number(condition.value)}
                                      onChange={(newValue: string | number) => onChangeValue(bIndex, cIndex, newValue)}
                                    />
                                  ) : (
                                    `${condition.value}`
                                  ))}
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

export default CriteriaRule;
