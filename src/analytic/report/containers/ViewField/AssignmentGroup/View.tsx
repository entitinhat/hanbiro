import { EAssignmentGroupType } from '@analytic/main/types/enum';
import { assignmentGroupTypeOptions } from '@analytic/report/config/options';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface ViewProps {
  value: any;
}

const View: React.FC<ViewProps> = (props: ViewProps) => {
  const { value = {} } = props;
  const theme = useTheme();
  const { assignmentGroupType, assignmentGroups = [] } = value;
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <FormControl sx={{ ml: 1, mr: 'auto', display: 'flex', mb: 1 }}>
        <RadioGroup value={assignmentGroupType} sx={{ display: 'flex', flexDirection: 'row' }}>
          {assignmentGroupTypeOptions.map((item: any, idx: number) => (
            <FormControlLabel value={item.value} key={idx} control={<Radio />} label={t(item.label)} />
          ))}
        </RadioGroup>
      </FormControl>
      {assignmentGroupType === EAssignmentGroupType.ASSIGNMENT_GROUP_TYPE_SPECIFIC && (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mr:'auto' }}>
          {assignmentGroups?.map((value: any, idx: number) => {
            const name = value?.name ?? value?.fullName ?? '-No Name-';
            return (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '30px',
                  border: '1px solid ' + theme.palette.grey[200],
                  mr: 1,
                  px: '10px',
                  py: '5px'
                }}
              >
                <Box>
                  <HanAvatar name={name} size="sm" />
                </Box>
                <Typography ml={1}>{name}</Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default View;
