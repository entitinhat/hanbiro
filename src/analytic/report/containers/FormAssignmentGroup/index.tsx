import { EAssignmentGroupType } from '@analytic/main/types/enum';
import { assignmentGroupTypeOptions } from '@analytic/report/config/options';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import UserGroupSelect from '../ViewField/UserGroupSelect';
import { useTranslation } from 'react-i18next';

interface AssignmentGroupProps {
  value: any;
  onChange?: (v: any) => void;
}

const AssignmentGroup: React.FC<AssignmentGroupProps> = (props: AssignmentGroupProps) => {
  const { onChange, value = {} } = props;
  const { t } = useTranslation()
  const {
    assignmentGroupType: iAssignmentGroupType = EAssignmentGroupType.ASSIGNMENT_GROUP_TYPE_ALL,
    assignmentGroups: iAssignmentGroups = []
  } = value;

  const [assignmentGroupType, setAssignmentGroupType] = useState<string>(iAssignmentGroupType);
  const [assignmentGroups, setAssignmentGroups] = useState<any[]>(iAssignmentGroups);

  useEffect(() => {
    let oValue: any = {
      assignmentGroupType
    };
    if (assignmentGroupType === EAssignmentGroupType.ASSIGNMENT_GROUP_TYPE_SPECIFIC) {
      oValue = { ...oValue, assignmentGroups };
    }
    onChange && onChange(oValue);
  }, [assignmentGroupType, assignmentGroups]);

  const radioProps = {
    options: assignmentGroupTypeOptions,
    fieldValue: 'value',
    fieldLabel: 'label',
    defaultValue: EAssignmentGroupType.ASSIGNMENT_GROUP_TYPE_ALL
  };

  return (
    <>
      <Typography sx={{ color: orange[500] }}>
        {t('ncrm_dashboard_report_form_msg_chart_generate_base_on_group')}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <FormControl sx={{ mr: 'auto' }}>
          <RadioGroup
            value={assignmentGroupType}
            onChange={(e: any, v: any) => {
              setAssignmentGroupType(v);
            }}
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            {radioProps.options.map((v: any, idx: number) => (
              <FormControlLabel key={idx} control={<Radio />} value={v.value} label={t(v.label)} />
            ))}
          </RadioGroup>
        </FormControl>
        {assignmentGroupType === EAssignmentGroupType.ASSIGNMENT_GROUP_TYPE_SPECIFIC && (
          <UserGroupSelect value={assignmentGroups??[]} onChange={(v: any) => setAssignmentGroups(v)} />
        )}
      </Box>
    </>
  );
};

export default AssignmentGroup;
