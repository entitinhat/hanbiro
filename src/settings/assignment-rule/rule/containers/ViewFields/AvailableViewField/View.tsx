import _ from 'lodash';
import { useEffect, useState } from 'react';

import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers/generalUtils';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { EAREntryAssignCheckAvailable } from '@settings/assignment-rule/rule/types/rule';
import { CheckAvailableOptions } from '@settings/assignment-rule/rule/config/constants';

interface Props extends CommonViewProps {
  value: EAREntryAssignCheckAvailable;
  format?: 'datetime' | 'date' | 'text';
}
//CheckAvailableOptions
const View = (props: Props) => {
  const { value, format = 'text' } = props;
  const { t } = useTranslation();

  return (
    <Box>
      <Typography sx={{ wordBreak: 'break-all' }}>
        {t(
          CheckAvailableOptions[CheckAvailableOptions.findIndex((item) => item.value == value)]?.label ??
            'ncrm_generalsetting_assignment_rule_none'
        )}
      </Typography>
    </Box>
  );
};

View.defaultProps = {
  value: ''
};

export default View;
