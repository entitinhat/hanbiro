import _, { findIndex } from 'lodash';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { EAREntryAssignToMode, IAssignToName } from '@settings/assignment-rule/rule/types/rule';
import { CheckAssignOptions } from '@settings/assignment-rule/rule/config/constants';

interface Props extends CommonViewProps {
  value: {
    mode: EAREntryAssignToMode;
    assignsTo: IAssignToName[];
  };
  format?: 'datetime' | 'date' | 'text';
}
//CheckAvailableOptions
const View = (props: Props) => {
  const { value, format = 'text' } = props;
  const [curAssignName, setCurAssignName] = useState<string>('');
  const { t } = useTranslation();
  useEffect(() => {
    if (value && value?.assignsTo) {
      if (value?.mode === EAREntryAssignToMode.USER) {
        const assignName = value?.assignsTo[0]?.user?.name;
        setCurAssignName(assignName ?? '');
      } else {
        const assignName = value?.assignsTo[0]?.group?.name;
        setCurAssignName(assignName ?? '');
      }
    } else setCurAssignName('(none)');
  }, [value]);
  return (
    <Box>
      {curAssignName !== '(none)' && (
        <Typography sx={{ wordBreak: 'break-all' }}>
          <>{CheckAssignOptions[CheckAssignOptions.findIndex((item) => item.value === value?.mode)]}</>
        </Typography>
      )}
      <Typography sx={{ wordBreak: 'break-all' }}>{curAssignName}</Typography>
    </Box>
  );
};

export default View;
