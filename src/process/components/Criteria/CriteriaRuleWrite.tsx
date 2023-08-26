import dayjs from 'dayjs';
import _ from 'lodash';
import React, { ChangeEvent, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import IconButton from '@base/components/@extended/IconButton';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import Dropdown, { LabelValueIcon } from '@base/components/@hanbiro/Dropdown';
import NumberField from '@base/components/@hanbiro/NumberField';
import RadioGroup from '@base/components/@hanbiro/RadioGroup';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import { OptionValue } from '@base/types/common';
import { removeItemAtIndex, replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { Add, CloseOutlined, Remove } from '@mui/icons-material';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { CRITERIA_FIELD_TYPE, CRITERIA_OPERATOR, CRITERIA_OPERATOR_TYPE, MODULE, MODULE_OPTIONS } from '@process/config/constants';
import statusAtom from '@process/store/atoms/status';
import { CriteriaOperator, CriteriaOption, FieldType } from '@process/types/diagram';
import { DefinedField, ModuleType } from '@process/types/process';

import { defaultCriteria } from './CriteriaWrite';

interface CriteriaRuleWriteProps {
  id: string;
  name: string;
  option: CriteriaOption;
  moduleFields: { [index: string]: DefinedField[] };
}

function CriteriaRuleWrite(props: CriteriaRuleWriteProps) {
  const { name, option, id, moduleFields } = props;
  console.log('criteria option', option);
  const setStatusesValue = useSetRecoilState(statusAtom);
  const blockCount = option.blocks.length - 1;

  const fieldOptionsFn = useCallback(
    (module: string): OptionValue[] => {
      return moduleFields[module]
        ? moduleFields[module].map((field) => {
            return {
              keyName: field.fieldName,
              languageKey: field.fieldName,
              extra: field.fieldType
            };
          })
        : [];
    },
    [moduleFields]
  );

  const operatorOptionsFn = useCallback((type: string): OptionValue[] => {
    return CRITERIA_OPERATOR_TYPE[type]
      ? CRITERIA_OPERATOR_TYPE[type].map((field) => {
          return { keyName: field.keyName, languageKey: field.operator };
        })
      : [];
  }, []);

  const selectValueType = [
    {
      label: 'Enter a value',
      value: 'enter'
    },
    {
      label: 'Select other value',
      value: 'other'
    }
  ];

  const addCondition = useCallback(
    (separate: string, bIndex: number) => {
      let block = _.cloneDeep(option.blocks[bIndex]);
      if (block.conditions) {
        block.conditions.push(defaultCriteria);
        block.pattern.push(separate);

        const newOption = {
          pattern: option.pattern,
          blocks: replaceItemAtIndex(option.blocks, bIndex, block)
        };
        changeCriteriaStatus(newOption);
      }
    },
    [option]
  );

  const deleteCondition = useCallback(
    (bIndex: number, cIndex: number) => {
      let block = _.cloneDeep(option.blocks[bIndex]);
      if (block.conditions) {
        const removeIndex = block.conditions.length - 1 == cIndex ? cIndex - 1 : cIndex;
        block.pattern = [...block.pattern.slice(0, removeIndex), ...block.pattern.slice(cIndex + 1)];
        block.conditions = removeItemAtIndex(block.conditions, cIndex);

        const newOption = {
          pattern: option.pattern,
          blocks: replaceItemAtIndex(option.blocks, bIndex, block)
        };
        changeCriteriaStatus(newOption);
      }
    },
    [option]
  );

  const AndOrCondition = useCallback(
    (separate: string, bIndex: number, andOrIndex: number) => {
      let block = _.cloneDeep(option.blocks[bIndex]);
      if (block.conditions) {
        block.pattern[andOrIndex] = separate;

        const newOption = {
          pattern: option.pattern,
          blocks: replaceItemAtIndex(option.blocks, bIndex, block)
        };
        changeCriteriaStatus(newOption);
      }
    },
    [option]
  );

  const addBlock = useCallback(
    (separate: string) => {
      let newOption = _.cloneDeep(option);
      newOption.blocks.push({
        conditions: [defaultCriteria],
        pattern: []
      });
      newOption.pattern.push(separate);
      changeCriteriaStatus(newOption);
    },
    [option]
  );

  const deleteBlock = useCallback(
    (bIndex: number) => {
      let block = _.cloneDeep(option.blocks[bIndex]);
      if (block) {
        const removeIndex = option.blocks.length - 1 == bIndex ? bIndex - 1 : bIndex;
        const newOption = {
          pattern: [...option.pattern.slice(0, removeIndex), ...option.pattern.slice(bIndex + 1)],
          blocks: removeItemAtIndex(option.blocks, bIndex)
        };
        changeCriteriaStatus(newOption);
      }
    },
    [option]
  );

  const andOrBlock = useCallback(
    (separate: string, andOrIndex: number) => {
      let newOption = _.cloneDeep(option);
      newOption.pattern[andOrIndex] = separate;
      changeCriteriaStatus(newOption);
    },
    [option]
  );

  const onChangeName = useCallback(
    (newValue: string) => {
      setStatusesValue((old) => {
        const targetIndex = old.findIndex((status) => status.id === id);
        const targetValue = { ...old[targetIndex], button: newValue };
        return replaceItemAtIndex(old, targetIndex, targetValue);
      });
    },
    [option, id]
  );

  const deleteCriteria = useCallback(() => {
    setStatusesValue((old) => {
      const targetIndex = old.findIndex((status) => status.id === id);
      return removeItemAtIndex(old, targetIndex);
    });
  }, [option, id]);

  const onChangeModule = useCallback(
    (bIndex: number, cIndex: number, side: string, keyName: string) => {
      let newOption = _.cloneDeep(option);
      let condition = newOption.blocks[bIndex].conditions[cIndex];
      if (side == 'aSide') {
        condition.aSide.module = keyName as ModuleType;
      } else {
        if (!condition.bSide) {
          condition.bSide = {
            module: keyName as ModuleType,
            field: '',
            type: 'FIELD_TYPE_TEXT'
          };
        } else {
          condition.bSide.module = keyName as ModuleType;
        }
      }
      changeCriteriaStatus(newOption);
    },
    [option]
  );

  const onChangeField = useCallback(
    (bIndex: number, cIndex: number, side: string, newValue: OptionValue) => {
      let newOption = _.cloneDeep(option);
      let condition = newOption.blocks[bIndex].conditions[cIndex];
      if (side == 'aSide') {
        condition.aSide.field = newValue.keyName;
        condition.aSide.type = newValue.extra as FieldType;
      } else {
        if (condition.bSide) {
          condition.bSide.field = newValue.keyName;
          condition.bSide.type = newValue.extra as FieldType;
        }
      }
      condition.value = '';

      changeCriteriaStatus(newOption);
    },
    [option]
  );

  const onChangeOperator = useCallback(
    (bIndex: number, cIndex: number, keyName: string) => {
      let newOption = _.cloneDeep(option);
      let condition = newOption.blocks[bIndex].conditions[cIndex];
      condition.operator = keyName as CriteriaOperator;
      changeCriteriaStatus(newOption);
    },
    [option]
  );

  const onChangeValueType = useCallback(
    (bIndex: number, cIndex: number, valueType: string) => {
      let newOption = _.cloneDeep(option);
      let condition = newOption.blocks[bIndex].conditions[cIndex];
      if (valueType == 'other') {
        condition.bSide = {
          module: 'MODULE_NONE',
          field: 'Field',
          type: 'FIELD_TYPE_TEXT'
        };
      } else {
        delete condition.bSide;
      }
      changeCriteriaStatus(newOption);
    },
    [option]
  );

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
      // console.log('newdate', newDate);
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
        // console.log('splitDate', splitDate);
        condition.value = splitDate.join('|');
        // console.log('condition value', condition.value);
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
        return replaceItemAtIndex(old, targetIndex, targetValue);
      });
    },
    [id]
  );

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="subtitle1">Criteria Name</Typography>
        <TextField size="small" value={name} onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeName(event.target.value)} />
        <IconButton size="small" color="secondary" variant="outlined" onClick={deleteCriteria}>
          <Remove sx={{ fontSize: 18 }} />
        </IconButton>
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
                  const fieldOptionsAside = fieldOptionsFn(condition.aSide.module);
                  const operatorOptions = operatorOptionsFn(condition.aSide.type);
                  const fieldOptionsBside = condition.bSide ? fieldOptionsFn(condition.bSide.module) : [];

                  const moduleValueAside = {
                    keyName: condition.aSide.module,
                    languageKey: MODULE[condition.aSide.module]
                  };
                  const fieldValueAside = {
                    keyName: condition.aSide.field,
                    languageKey: condition.aSide.field == '' ? 'Field' : condition.aSide.field
                  };
                  const moduleValueBside = condition.bSide
                    ? {
                        keyName: condition.bSide.module,
                        languageKey: MODULE[condition.bSide.module]
                      }
                    : { keyName: '', languageKey: '' };
                  const fieldValueBside = condition.bSide
                    ? {
                        keyName: condition.bSide.field,
                        languageKey: condition.bSide.field == '' ? 'Field' : condition.bSide.field
                      }
                    : { keyName: '', languageKey: '' };

                  const operatorValue = {
                    keyName: condition.operator,
                    languageKey: CRITERIA_OPERATOR[condition.operator]
                  };
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
                      // } else {
                      //   startDate = new Date();
                      //   endDate = plusDate(startDate, 3, 'day').toDate();
                    }
                  }

                  return (
                    <li key={cIndex}>
                      <Stack spacing={1}>
                        <RadioGroup
                          value={selectValueType.find((v) => v.value == valueType)}
                          options={selectValueType}
                          onChange={(newVal) => onChangeValueType(bIndex, cIndex, newVal.value)}
                        />
                        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
                          <Stack spacing={1}>
                            <Stack spacing={3} direction="row" alignItems="center" justifyContent="center">
                              <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                                <SelectBox
                                  value={moduleValueAside}
                                  onChange={(newValue: OptionValue) => onChangeModule(bIndex, cIndex, 'aSide', newValue.keyName)}
                                  options={MODULE_OPTIONS}
                                />
                                <SelectBox
                                  value={fieldValueAside}
                                  onChange={(newValue: OptionValue) => onChangeField(bIndex, cIndex, 'aSide', newValue)}
                                  options={fieldOptionsAside}
                                />
                              </Stack>
                              {valueType == 'other' && (
                                <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                                  <SelectBox
                                    value={moduleValueBside}
                                    onChange={(newValue: OptionValue) => onChangeModule(bIndex, cIndex, 'bSide', newValue.keyName)}
                                    options={MODULE_OPTIONS}
                                  />
                                  <SelectBox
                                    value={fieldValueBside}
                                    onChange={(newValue: OptionValue) => onChangeField(bIndex, cIndex, 'bSide', newValue)}
                                    options={fieldOptionsBside}
                                  />
                                </Stack>
                              )}
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                              <Typography>{CRITERIA_FIELD_TYPE[condition.aSide.type]}</Typography>
                              {valueType == 'other' && <Typography>Value</Typography>}
                              <SelectBox
                                sx={{ width: 100 }}
                                value={operatorValue}
                                onChange={(newValue: OptionValue) => onChangeOperator(bIndex, cIndex, newValue.keyName)}
                                options={operatorOptions}
                              />
                              {valueType == 'enter' && (
                                <Stack spacing={0.5} sx={{ width: '100%' }}>
                                  {condition.aSide.type == 'FIELD_TYPE_TEXT' && (
                                    <TextField
                                      fullWidth
                                      value={condition.value}
                                      onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeValue(bIndex, cIndex, event.target.value)}
                                    />
                                  )}
                                  {condition.aSide.type == 'FIELD_TYPE_DATE' && (
                                    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                                      <DatePicker
                                        value={startDate}
                                        onChange={(newValue) => onChangeDate(bIndex, cIndex, 'start', newValue)}
                                      />
                                      {condition.operator == 'CRITERIA_OPERATOR_BETWEEN' && (
                                        <>
                                          <Typography> ~ </Typography>
                                          <DatePicker
                                            value={endDate}
                                            onChange={(newValue) => onChangeDate(bIndex, cIndex, 'end', newValue)}
                                          />
                                        </>
                                      )}
                                    </Stack>
                                  )}
                                  {condition.aSide.type == 'FIELD_TYPE_NUMBER' && (
                                    <NumberField
                                      value={Number(condition.value)}
                                      onChange={(newValue: string | number) => onChangeValue(bIndex, cIndex, newValue)}
                                    />
                                  )}
                                  {condition.aSide.type == 'FIELD_TYPE_SELECT' && (
                                    <SelectBox
                                      value={operatorValue}
                                      onChange={(newValue: OptionValue) => console.log(newValue)}
                                      options={operatorOptions}
                                    />
                                  )}
                                </Stack>
                              )}
                              {valueType == 'other' && <Typography>Value</Typography>}
                            </Stack>
                          </Stack>
                          <Box sx={{ ml: 'auto' }}>
                            <IconButton size="small" color="secondary" variant="outlined" onClick={() => deleteCondition(bIndex, cIndex)}>
                              <CloseOutlined sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Box>
                        </Stack>
                      </Stack>

                      {isConditionSplit && conditionAndOr && (
                        <Dropdown
                          title={conditionAndOr == 'and' ? 'And' : 'Or'}
                          onChange={(v: LabelValueIcon) => {
                            AndOrCondition(v.value, bIndex, cIndex);
                          }}
                          items={[
                            { label: 'And', value: 'and' },
                            { label: 'OR', value: 'or' }
                          ]}
                        />
                      )}
                    </li>
                  );
                })}
                <li>
                  <Dropdown
                    title={'Add'}
                    icon={<Add />}
                    color="primary"
                    onChange={(v: LabelValueIcon) => {
                      addCondition(v.value, bIndex);
                    }}
                    items={[
                      { label: 'And', value: 'and' },
                      { label: 'OR', value: 'or' }
                    ]}
                  />
                </li>
              </ul>
            </Box>
            {isBlockSplit && blockAndOr && (
              <Stack spacing={1} direction="row" alignItems="center" className="add-criteria-block">
                <Dropdown
                  title={blockAndOr == 'and' ? 'And' : 'Or'}
                  icon={<Add />}
                  color="primary"
                  onChange={(v: LabelValueIcon) => {
                    andOrBlock(v.value, bIndex);
                  }}
                  items={[
                    { label: 'And', value: 'and' },
                    { label: 'OR', value: 'or' }
                  ]}
                />
                <IconButton variant="outlined" size="small" color="secondary" onClick={() => deleteBlock(bIndex)}>
                  <CloseOutlined sx={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
            )}
          </React.Fragment>
        );
      })}

      <Box sx={{ mt: 2 }}>
        <Dropdown
          title={'Add a block'}
          icon={<Add />}
          color="primary"
          disabledSelection={true}
          onChange={(v: LabelValueIcon) => {
            addBlock(v.value);
          }}
          items={[
            { label: 'And', value: 'and' },
            { label: 'OR', value: 'or' }
          ]}
        />
      </Box>
    </Stack>
  );
}

export default CriteriaRuleWrite;
