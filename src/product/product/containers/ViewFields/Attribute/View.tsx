import React, { useEffect, useState } from 'react';

import { Box, Chip, ListItem, Stack } from '@mui/material';

import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import TextView from '@base/containers/ViewField/Text/View';
import { ProductAttributeValueProps } from '../../ProductAttribute';

interface Props extends CommonViewProps {
  value: ProductAttributeValueProps;
}

const View = (props: Props) => {
  const { value } = props;

  return (
    <>
      {!value?.useAttr ? (
        <TextView value="Not use attribute" />
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0,
              m: 0
            }}
            component="ul"
          >
            {value?.attributes?.map((attr: any, index: number) => (
              <ListItem
                disablePadding
                key={index}
                sx={{
                  width: 'auto',
                  pr: 0.75,
                  pb: 0.25,
                  pt: 0.25
                }}
              >
                <Chip size="small" label={attr?.name} />
              </ListItem>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default View;
