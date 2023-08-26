import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { OptionValue } from '@base/types/common';
import { Box, Typography } from '@mui/material';

interface ViewProps extends CommonViewProps {
  value: OptionValue;
}

const View = (props: ViewProps) => {
  const { value } = props;
  console.log('view====', value)
  return (
    <Box>
      <Typography>{value.languageKey}</Typography>
    </Box>
  );
};

export default View;
