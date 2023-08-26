import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React from 'react';
interface ViewProps extends CommonViewProps {
  value: any;
}

const View = (props: ViewProps) => {
  const { value } = props;
  //value is object link, openNewWindow
  return (
    <div>
      <Typography>{value?.link ?? ''}</Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={value?.openNewWindow} disabled={true} />} label="Open page in new window" />
      </FormGroup>
    </div>
  );
};

export default View;
