import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Box, Chip, Stack, Typography } from '@mui/material';

interface ViewProps extends CommonViewProps {
  value: any;
}

const View = (props: ViewProps) => {
  const { value } = props;
  return (
    <Stack
      sx={{
        width: 'inherit',
        flexWrap: 'wrap'
      }}
      direction="row"
    >
      {value && value.length
        ? value.map((item: any, index: number) => {
            return <Chip sx={{ marginRight: '1px', marginTop: '1px' }} size="small" key={item.id} label={item.name} />;
          })
        : value.fullName}
    </Stack>
  );
};

export default View;
