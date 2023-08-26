import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Stack, TextField, Typography } from '@mui/material';

interface ViewProps extends CommonViewProps {
  value: any;
}

const View = (props: ViewProps) => {
  const { value } = props;

  return (
    <Stack direction="column" width="100%">
      <Stack direction="row" width="50%" mb={1}>
        <Typography sx={{ mr: 2 }}>Width: </Typography>
        <Typography>{`${value?.width}px`}</Typography>
      </Stack>

      <Stack direction="row" width="50%">
        <Typography sx={{ mr: 2 }}>Height: </Typography>
        <Typography>{`${value?.height}px`}</Typography>
      </Stack>
    </Stack>
  );
};

export default View;
