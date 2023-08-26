import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Box, Typography } from '@mui/material';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

interface ViewProps extends CommonViewProps {
  value: string;
}

const View = (props: ViewProps) => {
  const { value } = props;
  const emptyString = '- - - -  - - - - - ';
  const {t}  = useTranslation()
  return (
    <Box>
      <Typography>{value.length == 0 ? emptyString : t(value)}</Typography>
    </Box>
  );
};

export default View;
