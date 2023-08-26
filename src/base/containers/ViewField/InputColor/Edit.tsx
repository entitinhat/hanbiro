import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { OptionValue } from '@base/types/common';
import { Box, TextField } from '@mui/material';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (data: any) => {};
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return (
    <Box p={1}>
      <TextField
        {...componentProps}
        sx={{
          minWidth: '50px',
          '&:hover': {
            cursor: 'pointer'
          },
          '& input': { px: '4px', py: '2px', height: '28px' }
        }}
        type="color"
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};

export default Edit;
