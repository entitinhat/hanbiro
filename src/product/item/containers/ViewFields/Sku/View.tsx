import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { useGenerateBarcode } from '@settings/preferences/hooks/product/useGenerateBarcode';

interface Props extends CommonViewProps {
  value: any;
}

const View = (props: Props) => {
  const { value } = props;
  const [skuBarcode, setSkuBarcode] = useState<any>(null);
  const mGenerateBarcode = useGenerateBarcode();

  useEffect(() => {
    if (value) {
      const params = {
        content: value?.sku,
        width: 100,
        height: 30,
        margin: 10,
        format: 'auto',
        lineColor: '#000000',
        background: '#ffffff',
        textAlign: 'center',
        textPosition: 'bottom'
      };
      mGenerateBarcode.mutate(params, {
        onSuccess: (data: any) => {
          setSkuBarcode(data.image);
        }
      });
    }
  }, [value]);

  return (
    <Box sx={{ '& img': { width: '100%', height: 80 }, width: '100%' }}>{skuBarcode && <img src={skuBarcode} alt="sku-preview" />}</Box>
  );
};

export default View;
