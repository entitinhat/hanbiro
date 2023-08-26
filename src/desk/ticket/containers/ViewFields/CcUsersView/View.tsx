import React from 'react';
import TextView from '@base/containers/ViewField/Text/View';
import { Stack } from '@mui/material';

interface ViewProps {
  value: any;
  size: any;
  showAvatar: boolean;
}
const View: React.FC<ViewProps> = (props: ViewProps) => {
  const { value } = props;
  const valueString = value.map((item: any) => item?.user?.name).join(', ');
  return (
    <>
      {value?.length > 0 ? (
        <Stack direction={'row'} spacing={0.5}>
          <TextView value={valueString} />
        </Stack>
      ) : (
        <TextView value={''} />
      )}
    </>
  );
};

export default View;
