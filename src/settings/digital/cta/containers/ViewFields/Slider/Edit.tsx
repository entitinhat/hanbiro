import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { Box, Slider } from '@mui/material';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return (
    <Box p="10px">
      <Slider
        value={value}
        step={1}
        valueLabelDisplay="auto"
        onChange={(e: any) => {
          onChange(e.target.value);
        }}
        {...componentProps}
      />
    </Box>
  );
};

export default Edit;
