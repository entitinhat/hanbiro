import React, { useEffect, useState } from 'react';

import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Box, Chip, Stack, Typography } from '@mui/material';

interface Props extends CommonViewProps {
  value: any;
}

const View = (props: Props) => {
  const { value: attributes } = props;

  return (
    <Stack spacing={1}>
      {attributes?.length > 0 &&
        attributes?.map((attr: any, index: number) => {
          return <Typography key={index}>{[attr?.attr?.name, attr?.name].join(': ')}</Typography>;
        })}
    </Stack>
  );
};

export default View;
