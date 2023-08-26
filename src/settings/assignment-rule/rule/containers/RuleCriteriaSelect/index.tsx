import React, { useState, useEffect } from 'react';

//project
import SpanLang from '@base/components/@hanbiro/SpanLang';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import Tags from '@desk/knowledge-base/containers/ViewFields/Tags/Tags';
import Classification from '@desk/ticket/containers/WriteFields/ClassificationWriteField/ClassificationWriteFieldV2';
import ProductCategory from '@desk/ticket/containers/WriteFields/ProductCategoryWriteField';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import AssignGroupAutoComplete from '@settings/preferences/containers/AssignGroupAutocomplete';
import { DESK_CRITERIA_OPTIONS, OPPORTUNITY_CRITERIA_OPTIONS } from '../../config/constants';
import { LabelValue } from '@base/types/app';
import EmailInput from '@base/components/@hanbiro/EmailInput';
import DateSelector from '../DateSelector';
import { EAREntryAssignToMode, RuleEntry } from '../../types/rule';
import { Customer } from '@customer/types/interface';
import { EAREntryCriteriaType, EAssignmentRuleModule } from '../../types/enums';
import Section from '../Section';

//material-ui
import {
  Box,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

//third-party
import { Control, FieldErrorsImpl } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ChannelType } from '@settings/preferences/types/desk/common';
import _ from 'lodash';
import { Product } from '@product/product/types/product';
import AssignUserAutoComplete from '@settings/preferences/containers/AssignUserAutocomplete';

interface ICriteriaProps {
  value: any;
  onChange: (nVal: any) => void;
  fields: any[]; //with write form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  curTab?: number;
  module?: string;
  channelType?: ChannelType;
  isDuplicateOrder?: boolean;
}
export const defaultRuleEntryValue: RuleEntry = {
  id: '',
  order: 1,
  criteria: [],
  criteriaType: EAREntryCriteriaType.CUSTOMER,
  assignTo: {
    assignsTo: [],
    mode: EAREntryAssignToMode.USER
  }
};
const Criteria: React.FC<ICriteriaProps> = (props: ICriteriaProps) => {
  const { value, onChange, fields, control, errors, curTab = 1, module, channelType, isDuplicateOrder } = props;
  const [criteria, setCriteria] = useState<RuleEntry[]>([defaultRuleEntryValue]);
  const [curType, setCurType] = useState<string>(keyNames.KEY_NAME_RULE_ENTRIES_CUSTOMER);
  const [curOptions, setCurOptions] = useState<LabelValue[]>(DESK_CRITERIA_OPTIONS);
  const theme = useTheme();
  const { t } = useTranslation();
  //handlers
  useEffect(() => {
    if (value) {
      setCriteria(value);
      setCurType(value[curTab].criteriaType);
    }
  }, [value]);
  console.log(`~~~ module`, module);
  useEffect(() => {
    let nOptions: LabelValue[] = [];
    if (module === EAssignmentRuleModule.DESK) nOptions = DESK_CRITERIA_OPTIONS;
    else nOptions = OPPORTUNITY_CRITERIA_OPTIONS;
    setCurOptions(nOptions);
  }, [module]);
  useEffect(() => {
    if (channelType == ChannelType.EMAIL) {
      var nCrit = [...value];
      if (nCrit[curTab]?.criteriaType) nCrit[curTab].criteriaType = EAREntryCriteriaType.EMAIL;
      setCriteria([...nCrit]);
      onChange && onChange([...nCrit]);
    }
  }, [channelType]);
  const handleChange = (keyName: string, value: any) => {
    var nCrit = [...criteria];
    nCrit[curTab].criteria = [{ key: keyName, condition: value }];
    setCriteria([...nCrit]);
    onChange && onChange([...nCrit]);
  };
  const handleChangeAssign = (value: any) => {
    var nCrit = [...criteria];
    nCrit[curTab].assignTo.assignsTo = [value];
    setCriteria([...nCrit]);
    onChange && onChange([...nCrit]);
  };
  const handleChangeAssignMode = (mode: string) => {
    var nCrit = [...criteria];
    nCrit[curTab].assignTo.mode = mode as EAREntryAssignToMode;
    setCriteria([...nCrit]);
    onChange && onChange([...nCrit]);
  };
  const handleChangeSortOrder = (val: number) => {
    var nCrit = [...criteria];
    nCrit[curTab].order = val;
    setCriteria([...nCrit]);
    onChange && onChange([...nCrit]);
  };
  const handleChangeCriteriaType = (val: string) => {
    var nCrit = [...criteria];
    const nVal =
      module === EAssignmentRuleModule.DESK
        ? DESK_CRITERIA_OPTIONS.find((item) => item.extra === val)?.extra ?? EAREntryCriteriaType.NONE
        : OPPORTUNITY_CRITERIA_OPTIONS.find((item) => item.extra === val)?.extra ?? EAREntryCriteriaType.NONE;
    nCrit[curTab].criteriaType = nVal;
    setCriteria([...nCrit]);
    onChange && onChange([...nCrit]);
  };
  //getCriteriaValue
  const getCriteriaValue = (key: string) => {
    return criteria[curTab]?.criteria[criteria[curTab].criteria.findIndex((_item) => _item.key == key)]?.condition;
  };

  //======================DEBUG
  // console.log('Criteria', criteria);
  // console.log('CurModule', module, 'curChannelType', channelType, 'CurTab', curTab);
  // console.log('~~~~ curTYpe', curType);
  //===========================

  //RENDER
  const renderCriteria = (curType: string) => {
    switch (curType) {
      case EAREntryCriteriaType.CUSTOMER: {
        return (
          <Section header="assignment_rule_field_more_customer">
            <CustomerAutoComplete
              addAll
              value={getCriteriaValue(keyNames.KEY_NAME_RULE_ENTRIES_CUSTOMER)}
              onChange={(val) => {
                const nUser = [...(val as Customer[])];
                const nFilter = nUser.map((user: Customer) => ({ id: user.id, name: user.name }));
                handleChange(keyNames.KEY_NAME_RULE_ENTRIES_CUSTOMER, nFilter);
              }}
            />
          </Section>
        );
      }
      case EAREntryCriteriaType.PRODUCT: {
        return (
          <Section header="assignment_rule_field_more_product">
            <ProductAutoComplete
              single={false}
              onChange={(val) => {
                var filterVal = _.cloneDeep(val);
                if (filterVal)
                  filterVal.map((item: Product) => {
                    return { id: item?.id, name: item?.name };
                  });
                handleChange(keyNames.KEY_NAME_RULE_ENTRIES_PRODUCT, filterVal);
              }}
            />
          </Section>
        );
      }
      case EAREntryCriteriaType.ATTRIBUTE: {
        return (
          <Section header="assignment_rule_field_more_attribute">
            <Stack>
              <DateSelector
                value={getCriteriaValue(keyNames.KEY_NAME_RULE_ENTRIES_ATTRIBUTE)}
                onChange={(val) => handleChange(keyNames.KEY_NAME_RULE_ENTRIES_ATTRIBUTE, val)}
              />
            </Stack>
          </Section>
        );
      }
      case EAREntryCriteriaType.TAG: {
        return (
          <Section header="assignment_rule_field_more_tag">
            <Stack>
              <Tags
                value={getCriteriaValue(keyNames.KEY_NAME_RULE_ENTRIES_TAG)}
                onChange={(val) => handleChange(keyNames.KEY_NAME_RULE_ENTRIES_TAG, val)}
              />
            </Stack>
          </Section>
        );
      }
      case EAREntryCriteriaType.CLASSIFICATION: {
        return (
          <Section header="assignment_rule_field_more_ticketclassification">
            <Stack>
              <Classification
                value={getCriteriaValue(keyNames.KEY_NAME_RULE_ENTRIES_CLASSIFICATION)}
                onChange={(val) => handleChange(keyNames.KEY_NAME_RULE_ENTRIES_CLASSIFICATION, val)}
                isPublic={false}
              />
            </Stack>
          </Section>
        );
      }
      case EAREntryCriteriaType.CATEGORY: {
        return (
          <Section header="assignment_rule_field_more_category">
            <Stack>
              <ProductCategory
                row
                hideCategoryLabel
                hideProductLabel
                isPublic={false}
                value={getCriteriaValue(keyNames.KEY_NAME_RULE_ENTRIES_CATEGORY)}
                onChange={(val) => handleChange(keyNames.KEY_NAME_RULE_ENTRIES_CATEGORY, val)}
              />
            </Stack>
          </Section>
        );
      }
      default:
        return <></>;
    }
  };
  return (
    <>
      <Box sx={{ py: 2 }}>
        <Typography fontWeight={500}>{t('ncrm_generalsetting_assignment_rule_field_basic_sort_order')}</Typography>
        <Typography fontWeight={400} fontSize={'10px'}>
          {t('ncrm_generalsetting_assignment_rule_field_basic_sort_order_sub')}
        </Typography>

        <TextField
          fullWidth
          type="number"
          value={criteria[curTab]?.order}
          onChange={(e) => handleChangeSortOrder(Number(e.target.value))}
        />
        {isDuplicateOrder && <Typography color="error">{`* ${t('ncrm_generalsetting_assignment_rule_duplicate_sort')}`}</Typography>}
      </Box>

      {channelType !== ChannelType.EMAIL ? (
        <RadioGroup
          row
          value={curType}
          onChange={(ev) => {
            setCurType(ev.target.value);
            handleChangeCriteriaType(ev.target.value);
          }}
        >
          {curOptions.map((item: LabelValue, indx: number) => {
            if (item.value !== keyNames.KEY_NAME_RULE_ENTRIES_EMAIL)
              //value contains keyName, extra contain TypeValue
              return <FormControlLabel key={indx} value={item.extra} control={<Radio />} label={t(item.label)} />;
          })}
        </RadioGroup>
      ) : (
        <Section header="assignment_rule_field_more_email">
          <Stack>
            <EmailInput
              value={getCriteriaValue(keyNames.KEY_NAME_RULE_ENTRIES_EMAIL)}
              onChange={(val) => handleChange(keyNames.KEY_NAME_RULE_ENTRIES_EMAIL, val)}
              isMultiple
            />
          </Stack>
        </Section>
      )}
      {channelType !== ChannelType.EMAIL && <Box sx={{ py: 2 }}>{renderCriteria(curType)}</Box>}
      <Grid>
        <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
          <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'assignment_rule_field_more_assignto'} />
        </InputLabel>
        <RadioGroup row value={criteria[curTab]?.assignTo?.mode ?? ''} onChange={(ev) => handleChangeAssignMode(ev.target.value)}>
          <FormControlLabel
            value={EAREntryAssignToMode.USER}
            control={<Radio />}
            label={t('ncrm_generalsetting_assignment_rule_field_basic_user')}
          />
          <FormControlLabel
            value={EAREntryAssignToMode.GROUP}
            control={<Radio />}
            label={t('ncrm_generalsetting_assignment_rule_field_basic_group')}
          />
        </RadioGroup>
        {criteria[curTab]?.assignTo?.mode == EAREntryAssignToMode.USER ? (
          // <UserAutoComplete
          //   single={true}
          //   value={criteria[curTab]?.assignTo?.assignsTo[0]?.user}
          //   showAvatar={true}
          //   onChange={(nUser: any) =>
          //     handleChangeAssign({
          //       user: {
          //         id: nUser?.id,
          //         name: nUser?.name
          //       }
          //     })
          //   }
          // />
          <AssignUserAutoComplete
            value={{
              user: criteria[curTab]?.assignTo?.assignsTo[0]?.user ?? { id: '', name: '' },
              group: { id: '', name: '' }
            }}
            single={true}
            onChange={(user: any) => {
              console.log('~~~~ user', user);
              const nUser = user?.user;
              handleChangeAssign({
                user: {
                  id: nUser?.id,
                  name: nUser?.name
                }
              });
            }}
          />
        ) : (
          <AssignGroupAutoComplete
            value={criteria[curTab]?.assignTo?.assignsTo[0]?.group}
            single={true}
            onChange={(nGroup: any) =>
              handleChangeAssign({
                group: {
                  id: nGroup?.id,
                  name: nGroup?.name
                }
              })
            }
          />
        )}
      </Grid>
    </>
  );
};

export default Criteria;
