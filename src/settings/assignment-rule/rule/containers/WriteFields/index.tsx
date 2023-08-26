import React, { ReactNode, useEffect, useMemo, useState } from 'react';

// material-ui
import { Box, Grid, styled, stepConnectorClasses, StepConnector, useTheme, Typography, Button, Stack, IconButton } from '@mui/material';
import { Add, DeleteOutline } from '@mui/icons-material';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
//project
import WriteField from '@base/containers/WriteField';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import WriteStepper from '@base/components/@hanbiro/WriteStepper';

//config
import { EAREntryAssignCheckAvailable, EAREntryAssignToMode, RuleEntry } from '../../types/rule';
import { EAREntryCriteriaType } from '../../types/enums';

interface WriteFieldsProps {
  menuApi: string;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  activeStep: number;
  setValue?: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  getOrderState?: (val: boolean) => void; //
}
const steps = ['ncrm_generalsetting_assignment_rule_summary', 'ncrm_generalsetting_assignment_rule_rule_entries'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main
    }
  }

  // [`& .${stepConnectorClasses.line}`]: {
  //   borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
  //   borderTopWidth: 3,
  //   borderRadius: 1
  // }
}));

// function QontoStepIcon(props: StepIconProps) {
//   const theme = useTheme();
//   const { active, completed, className, icon } = props;

//   return (
//     <span>
//       {completed ? (
//         <CheckCircleOutlineIcon color="primary" />
//       ) : (
//         <StepIcon
//           sx={{
//             overflow: 'visible',
//             '& 	.MuiStepIcon-text': {
//               stroke: theme.palette.primary.main
//             },
//             '& 	.MuiStepIcon-text': {
//               stroke: theme.palette.primary.main
//             }
//           }}
//           active={active}
//           completed={completed}
//           color="primary"
//           icon={icon}
//         ></StepIcon>
//       )}
//     </span>
//   );
// }
interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  console.log('curTab', value, index);
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}
const defaultRuleEntryValue: RuleEntry = {
  id: '',
  order: 1,
  criteriaType: EAREntryCriteriaType.CUSTOMER,
  criteria: [],
  assignTo: {
    assignsTo: [],
    mode: EAREntryAssignToMode.USER
  }
};
const WriteFields = (props: WriteFieldsProps) => {
  const { fields, control, errors, watch, activeStep, setValue, getOrderState } = props;
  // ===== language translate=====
  const { t } = useTranslation();
  const theme = useTheme();
  //State
  const [orderList, setOrderList] = useState<number[]>([]);
  const [validOrder, setValidOrder] = useState<boolean>(true);
  //watch
  const formEntry = watch(keyNames.KEY_NAME_ASSIGNMENT_RULE_ENTRIES);
  const formModule = watch(keyNames.KEY_NAME_ASSIGNMENT_RULE_MODULE);
  const formChannel = watch(keyNames.KEY_NAME_ASSIGNMENT_RULE_CHANNEL);
  // useEffect(() => {
  //   if (formEntry) {
  //     const nVal = [...ruleEntry];
  //     nVal[curTab] = formEntry[curTab];
  //     setRuleEntry([...nVal]);
  //   }
  // }, [formEntry, curTab]);
  //handlers

  const handleAddEntry = () => {
    var nOrder = 2;
    while (formEntry.map((rule: RuleEntry) => rule.order).includes(nOrder)) {
      nOrder++;
    }
    setValue && setValue(keyNames.KEY_NAME_ASSIGNMENT_RULE_ENTRIES, [...formEntry, { ...defaultRuleEntryValue, order: nOrder }]);
  };
  const handleDeleteEntry = (index: number) => {
    const nRuleEntry = [...formEntry];
    nRuleEntry.splice(index, 1);
    setValue && setValue(keyNames.KEY_NAME_ASSIGNMENT_RULE_ENTRIES, [...nRuleEntry]);
  };

  function chkDuplicates(arr: number[]) {
    var len = arr.length,
      tmp: number[] = [],
      arrtmp = arr.slice(),
      dupes: number[] = [];
    while (len--) {
      var val = arrtmp[len];

      if (tmp.includes(val)) {
        dupes.push(val);
      } else {
        tmp.push(val);
      }
    }
    return dupes.length ? dupes : [];
  }
  //handle Order list
  useEffect(() => {
    if (formEntry) {
      setOrderList(formEntry.map((rule: any) => rule.order));
    }
  }, [formEntry]);
  useEffect(() => {
    setValidOrder(!(chkDuplicates(orderList).length > 0));
    getOrderState && getOrderState(!(chkDuplicates(orderList).length > 0));
  }, [orderList]);
  //render
  const FirstStepFields = () => {
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        {fields?.map((_item, _index) => {
          if (_item.section == 0) return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </Stack>
    );
  };
  const SecondStepFields = (index: number) => {
    return (
      <>
        {fields?.map((_item, _index) => {
          let componentProps = {
            ..._item.componentProps,
            curTab: index,
            module: formModule,
            channelType: formChannel?.type,
            isDuplicateOrder: chkDuplicates(orderList).includes(formEntry[index].order)
          };

          if (_item.section == 1)
            return <WriteField key={_item.keyName} item={{ ..._item, componentProps }} control={control} errors={errors} />;
        })}
      </>
    );
  };

  //=================DEBUG
  // console.log('asssignment rule fields', fields);
  // console.log('chkDuplicates', chkDuplicates(orderList), orderList);
  //=====================
  const border = '2px solid ' + theme.palette.divider;

  return (
    <>
      <Grid sx={{ px: 3 }}>
        <WriteStepper middleStyle steps={steps} activeStep={activeStep}></WriteStepper>
      </Grid>

      <Box sx={{ p: 2.5 }}>
        <Grid container alignItems="center">
          {activeStep == 0 && FirstStepFields()}
          {activeStep == 1 && (
            <Box sx={{ p: 2, width: '100%' }}>
              <Stack spacing={2}>
                {formEntry.map((rule: RuleEntry, indx: number) => {
                  console.log('ruleeeeee', rule);
                  return (
                    <Box sx={{ mb: 2 }} key={indx}>
                      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={500}>{t('ncrm_generalsetting_assignment_rule_entry_the_rule_entry')}</Typography>
                        <Stack spacing={2} direction="row">
                          <Button variant="contained" size="small" onClick={handleAddEntry} startIcon={<Add />}>
                            {t('ncrm_common_btn_new')}
                          </Button>
                          {indx !== 0 && (
                            <IconButton
                              size="small"
                              aria-label="delete"
                              color="error"
                              onClick={(event: any) => {
                                handleDeleteEntry(indx);
                              }}
                            >
                              <DeleteOutline fontSize="small" color="error" />
                            </IconButton>
                          )}
                        </Stack>
                      </Grid>
                      {SecondStepFields(indx)}
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default WriteFields;
